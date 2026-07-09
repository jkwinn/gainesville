#!/usr/bin/env python3
"""Sync Gainesville gig events from Google Calendar into clean JSON.

This script is intended to run on the webserver host, not in the browser.
It uses a Google service account that has been granted read access to the
calendar and to any attached Drive images.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import os
import re
import sys
from dataclasses import asdict, dataclass
from datetime import datetime, time, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

try:
    from io import FileIO
except ImportError:  # pragma: no cover
    FileIO = None


SCOPES = (
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
)

DEFAULT_EVENT_PREFIX = "Gig:"
IMAGE_MIME_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp"}


@dataclass(frozen=True)
class EventTime:
    iso: str
    date: str
    time: str | None
    timeZone: str
    allDay: bool


@dataclass(frozen=True)
class EventImage:
    title: str
    mimeType: str
    fileId: str | None
    sourceUrl: str | None
    localPath: str | None
    publicPath: str | None


@dataclass(frozen=True)
class GigEvent:
    id: str
    calendarEventId: str
    name: str
    rawSummary: str
    location: str
    start: EventTime
    end: EventTime
    image: EventImage | None
    htmlLink: str | None
    updated: str | None


def env(name: str, default: str | None = None) -> str | None:
    value = os.environ.get(name)
    return value if value not in (None, "") else default


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--calendar-id", default=env("GAINESVILLE_CALENDAR_ID", "gainesvilletheband@gmail.com"))
    parser.add_argument("--credentials", default=env("GOOGLE_APPLICATION_CREDENTIALS"))
    parser.add_argument("--output-json", default=env("GAINESVILLE_OUTPUT_JSON", "shows.json"))
    parser.add_argument("--image-dir", default=env("GAINESVILLE_IMAGE_DIR", "event-images"))
    parser.add_argument("--image-public-prefix", default=env("GAINESVILLE_IMAGE_PUBLIC_PREFIX", "event-images"))
    parser.add_argument("--event-prefix", default=env("GAINESVILLE_EVENT_PREFIX", DEFAULT_EVENT_PREFIX))
    parser.add_argument("--timezone", default=env("GAINESVILLE_TIMEZONE", "America/Los_Angeles"))
    parser.add_argument("--lookback-days", type=int, default=int(env("GAINESVILLE_LOOKBACK_DAYS", "365")))
    parser.add_argument("--lookahead-days", type=int, default=int(env("GAINESVILLE_LOOKAHEAD_DAYS", "730")))
    parser.add_argument("--dry-run", action="store_true", help="Print JSON to stdout instead of writing files.")
    return parser.parse_args()


def build_services(credentials_path: str):
    credentials = service_account.Credentials.from_service_account_file(credentials_path, scopes=SCOPES)
    calendar = build("calendar", "v3", credentials=credentials, cache_discovery=False)
    drive = build("drive", "v3", credentials=credentials, cache_discovery=False)
    return calendar, drive


def parse_event_time(value: dict[str, str], default_tz: ZoneInfo) -> EventTime:
    tz_name = value.get("timeZone") or default_tz.key
    event_tz = ZoneInfo(tz_name)

    if "date" in value:
        date_value = datetime.strptime(value["date"], "%Y-%m-%d").date()
        dt = datetime.combine(date_value, time.min, tzinfo=event_tz)
        return EventTime(
            iso=dt.isoformat(),
            date=date_value.isoformat(),
            time=None,
            timeZone=tz_name,
            allDay=True,
        )

    raw = value["dateTime"]
    dt = datetime.fromisoformat(raw.replace("Z", "+00:00")).astimezone(event_tz)
    return EventTime(
        iso=dt.isoformat(),
        date=dt.date().isoformat(),
        time=dt.strftime("%-I:%M %p"),
        timeZone=tz_name,
        allDay=False,
    )


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "event"


def stable_event_id(event: dict[str, Any]) -> str:
    seed = event.get("iCalUID") or event.get("id") or event.get("htmlLink") or json.dumps(event, sort_keys=True)
    return hashlib.sha1(seed.encode("utf-8")).hexdigest()[:12]


def image_extension(mime_type: str, title: str) -> str:
    suffix = Path(title).suffix.lower()
    if suffix in {".png", ".jpg", ".jpeg", ".webp"}:
        return suffix
    return mimetypes.guess_extension(mime_type) or ".png"


def find_image_attachment(event: dict[str, Any]) -> dict[str, Any] | None:
    for attachment in event.get("attachments", []):
        mime_type = (attachment.get("mimeType") or "").lower()
        title = attachment.get("title") or ""
        suffix = Path(title).suffix.lower()
        if mime_type in IMAGE_MIME_TYPES or suffix in {".png", ".jpg", ".jpeg", ".webp"}:
            return attachment
    return None


def download_drive_file(
    drive_service: Any,
    attachment: dict[str, Any],
    image_dir: Path,
    public_prefix: str,
    event_name: str,
    event_id: str,
    dry_run: bool,
) -> EventImage:
    title = attachment.get("title") or f"{event_name} image"
    mime_type = attachment.get("mimeType") or "image/png"
    file_id = attachment.get("fileId")
    source_url = attachment.get("fileUrl")

    if not file_id:
        return EventImage(
            title=title,
            mimeType=mime_type,
            fileId=None,
            sourceUrl=source_url,
            localPath=None,
            publicPath=source_url,
        )

    filename = f"{event_id}-{slugify(event_name)}{image_extension(mime_type, title)}"
    local_path = image_dir / filename
    public_path = f"{public_prefix.rstrip('/')}/{filename}" if public_prefix else filename

    if not dry_run:
        image_dir.mkdir(parents=True, exist_ok=True)
        request = drive_service.files().get_media(fileId=file_id)
        with FileIO(local_path, "wb") as fh:
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                _, done = downloader.next_chunk()

    return EventImage(
        title=title,
        mimeType=mime_type,
        fileId=file_id,
        sourceUrl=source_url,
        localPath=str(local_path),
        publicPath=public_path,
    )


def list_calendar_events(calendar_service: Any, calendar_id: str, default_tz: ZoneInfo, lookback: int, lookahead: int):
    now = datetime.now(default_tz)
    time_min = (now - timedelta(days=lookback)).astimezone(timezone.utc).isoformat()
    time_max = (now + timedelta(days=lookahead)).astimezone(timezone.utc).isoformat()

    events: list[dict[str, Any]] = []
    page_token = None

    while True:
        response = (
            calendar_service.events()
            .list(
                calendarId=calendar_id,
                timeMin=time_min,
                timeMax=time_max,
                singleEvents=True,
                orderBy="startTime",
                maxResults=2500,
                pageToken=page_token,
            )
            .execute()
        )
        events.extend(response.get("items", []))
        page_token = response.get("nextPageToken")
        if not page_token:
            return events


def normalize_event(
    event: dict[str, Any],
    event_prefix: str,
    default_tz: ZoneInfo,
    drive_service: Any,
    image_dir: Path,
    image_public_prefix: str,
    dry_run: bool,
) -> GigEvent | None:
    raw_summary = event.get("summary") or ""
    if not raw_summary.lower().startswith(event_prefix.lower()):
        return None

    name = raw_summary[len(event_prefix) :].strip() or raw_summary.strip()
    event_id = stable_event_id(event)
    attachment = find_image_attachment(event)
    image = None

    if attachment:
        try:
            image = download_drive_file(
                drive_service=drive_service,
                attachment=attachment,
                image_dir=image_dir,
                public_prefix=image_public_prefix,
                event_name=name,
                event_id=event_id,
                dry_run=dry_run,
            )
        except HttpError as error:
            print(f"Image download failed for '{name}': {error}", file=sys.stderr)

    return GigEvent(
        id=event_id,
        calendarEventId=event.get("id") or "",
        name=name,
        rawSummary=raw_summary,
        location=event.get("location") or "",
        start=parse_event_time(event["start"], default_tz),
        end=parse_event_time(event["end"], default_tz),
        image=image,
        htmlLink=event.get("htmlLink"),
        updated=event.get("updated"),
    )


def write_json(path: Path, payload: dict[str, Any], dry_run: bool) -> None:
    text = json.dumps(payload, indent=2, sort_keys=True) + "\n"
    if dry_run:
        print(text)
        return

    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = path.with_suffix(path.suffix + ".tmp")
    tmp_path.write_text(text, encoding="utf-8")
    tmp_path.replace(path)


def main() -> int:
    args = parse_args()
    if not args.credentials:
        print("Missing --credentials or GOOGLE_APPLICATION_CREDENTIALS.", file=sys.stderr)
        return 2

    default_tz = ZoneInfo(args.timezone)
    image_dir = Path(args.image_dir)
    calendar_service, drive_service = build_services(args.credentials)

    try:
        raw_events = list_calendar_events(
            calendar_service=calendar_service,
            calendar_id=args.calendar_id,
            default_tz=default_tz,
            lookback=args.lookback_days,
            lookahead=args.lookahead_days,
        )
        gigs = [
            gig
            for event in raw_events
            if (
                gig := normalize_event(
                    event=event,
                    event_prefix=args.event_prefix,
                    default_tz=default_tz,
                    drive_service=drive_service,
                    image_dir=image_dir,
                    image_public_prefix=args.image_public_prefix,
                    dry_run=args.dry_run,
                )
            )
        ]
    except HttpError as error:
        print(f"Google API request failed: {error}", file=sys.stderr)
        return 1

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "calendarId": args.calendar_id,
        "eventPrefix": args.event_prefix,
        "events": [asdict(gig) for gig in gigs],
    }
    write_json(Path(args.output_json), payload, args.dry_run)
    print(f"Synced {len(gigs)} gig event(s).", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

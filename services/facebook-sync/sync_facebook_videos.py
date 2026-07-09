#!/usr/bin/env python3
"""Sync Gainesville Facebook page videos into clean website JSON.

This runs on the server, not in the browser. Keep the Page access token in
server environment/config only.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


GRAPH_API_VERSION = "v20.0"
DEFAULT_PAGE_ID = "GainesvilletheBand"
DEFAULT_LIMIT = 12


def env(name: str, default: str | None = None) -> str | None:
    value = os.environ.get(name)
    return value if value not in (None, "") else default


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--page-id", default=env("FACEBOOK_PAGE_ID", DEFAULT_PAGE_ID))
    parser.add_argument("--access-token", default=env("FACEBOOK_PAGE_ACCESS_TOKEN"))
    parser.add_argument("--output-json", default=env("GAINESVILLE_VIDEOS_JSON", "data/videos.json"))
    parser.add_argument("--limit", type=int, default=int(env("FACEBOOK_VIDEO_LIMIT", str(DEFAULT_LIMIT))))
    parser.add_argument("--api-version", default=env("FACEBOOK_GRAPH_API_VERSION", GRAPH_API_VERSION))
    parser.add_argument("--dry-run", action="store_true", help="Print JSON to stdout instead of writing a file.")
    return parser.parse_args()


def graph_get(path: str, params: dict[str, str]) -> dict[str, Any]:
    url = f"https://graph.facebook.com/{path}?{urlencode(params)}"
    request = Request(url, headers={"Accept": "application/json", "User-Agent": "gainesville-facebook-sync/1.0"})

    with urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def select_thumbnail(video: dict[str, Any]) -> str | None:
    thumbnails = video.get("thumbnails", {}).get("data", [])
    preferred = next((item for item in thumbnails if item.get("is_preferred")), None)
    selected = preferred or (thumbnails[0] if thumbnails else None)
    return (selected or {}).get("uri") or video.get("picture")


def build_embed_url(facebook_url: str) -> str:
    return "https://www.facebook.com/plugins/video.php?" + urlencode(
        {
            "href": facebook_url,
            "show_text": "false",
            "width": "734",
        }
    )


def normalize_video(video: dict[str, Any]) -> dict[str, Any] | None:
    facebook_url = video.get("permalink_url")
    if not facebook_url:
        return None

    title = video.get("title") or first_line(video.get("description")) or "Gainesville live video"

    return {
        "id": video.get("id"),
        "title": title,
        "description": video.get("description") or "",
        "createdAt": video.get("created_time"),
        "facebookUrl": facebook_url,
        "embedUrl": build_embed_url(facebook_url),
        "thumbnailUrl": select_thumbnail(video),
    }


def first_line(value: str | None) -> str | None:
    if not value:
        return None
    line = value.strip().splitlines()[0].strip()
    return line or None


def fetch_page_videos(page_id: str, access_token: str, api_version: str, limit: int) -> list[dict[str, Any]]:
    fields = ",".join(
        [
            "id",
            "title",
            "description",
            "created_time",
            "permalink_url",
            "picture",
            "thumbnails{uri,is_preferred}",
        ]
    )
    path = f"{api_version}/{page_id}/videos"
    params = {
        "access_token": access_token,
        "fields": fields,
        "limit": str(limit),
        "type": "uploaded",
    }
    response = graph_get(path, params)
    return [video for item in response.get("data", []) if (video := normalize_video(item))]


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
    if not args.access_token:
        print("Missing --access-token or FACEBOOK_PAGE_ACCESS_TOKEN.", file=sys.stderr)
        return 2

    try:
        videos = fetch_page_videos(
            page_id=args.page_id,
            access_token=args.access_token,
            api_version=args.api_version,
            limit=args.limit,
        )
    except HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        print(f"Facebook API request failed: HTTP {error.code} {body}", file=sys.stderr)
        return 1
    except URLError as error:
        print(f"Facebook API request failed: {error}", file=sys.stderr)
        return 1

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "pageId": args.page_id,
        "videos": videos,
    }
    write_json(Path(args.output_json), payload, args.dry_run)
    print(f"Synced {len(videos)} Facebook video(s).", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# Gainesville Calendar Sync

Backend-only utility that reads Gainesville gig events from Google Calendar and writes clean JSON for the website.

The website does not authenticate to Google. This script runs on the server, uses a Google service account, and writes a public-safe JSON file plus downloaded event images.

## Output

The JSON includes only events whose summary starts with `Gig:`.

```json
{
  "generatedAt": "2026-07-09T00:00:00+00:00",
  "calendarId": "gainesvilletheband@gmail.com",
  "eventPrefix": "Gig:",
  "events": [
    {
      "id": "stable-id",
      "calendarEventId": "google-calendar-event-id",
      "name": "Ringers Lounge",
      "rawSummary": "Gig: Ringers Lounge",
      "location": "5517 Mission Rd., Bonsall, CA",
      "start": {
        "iso": "2026-08-21T20:00:00-07:00",
        "date": "2026-08-21",
        "time": "8:00 PM",
        "timeZone": "America/Los_Angeles",
        "allDay": false
      },
      "end": {
        "iso": "2026-08-22T00:00:00-07:00",
        "date": "2026-08-22",
        "time": "12:00 AM",
        "timeZone": "America/Los_Angeles",
        "allDay": false
      },
      "image": {
        "title": "show-poster.png",
        "mimeType": "image/png",
        "fileId": "google-drive-file-id",
        "sourceUrl": "https://drive.google.com/...",
        "localPath": "/var/www/gainesville/assets/calendar/stable-id-ringers-lounge.png",
        "publicPath": "assets/calendar/stable-id-ringers-lounge.png"
      },
      "htmlLink": "https://www.google.com/calendar/event?...",
      "updated": "2026-07-09T00:00:00.000Z",
      "private": false
    }
  ]
}
```

## Google Setup

1. Create a Google Cloud project.
2. Enable these APIs:
   - Google Calendar API
   - Google Drive API
3. Create a service account.
4. Download the service account JSON key to the server, for example:

   `/etc/gainesville/google-calendar-service-account.json`

5. Share the Google Calendar with the service account email as `See all event details`.
6. For event PNG/JPEG attachments, make sure the attached Drive file is readable by the service account too.

Configured service account:

`gainesvill-sa@copper-freedom-165318.iam.gserviceaccount.com`

Do not commit the service account JSON key. Store it on the server and point `GOOGLE_APPLICATION_CREDENTIALS` to that file.

Calendar event convention:

- Summary: `Gig: Venue Name`
- Location: venue address
- Start/end: normal Google Calendar event start and end
- Attachment: optional PNG/JPEG/WebP show image

Private event convention:

- Summary can be `Gig: Private Event` or include extra details like `Gig: Private Event - Smith Party`.
- The output always collapses the name to `Private Event`.
- The output strips location, start/end times, attachments, Google event links, and the detailed raw summary.
- The output keeps only the event date for public rendering.

## Install On Ubuntu

```sh
cd /opt/gainesville/services/calendar-sync
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

## One-Off Run

```sh
export GOOGLE_APPLICATION_CREDENTIALS=/etc/gainesville/google-calendar-service-account.json
export GAINESVILLE_CALENDAR_ID=gainesvilletheband@gmail.com
export GAINESVILLE_OUTPUT_JSON=/var/www/gainesville/data/shows.json
export GAINESVILLE_IMAGE_DIR=/var/www/gainesville/assets/calendar
export GAINESVILLE_IMAGE_PUBLIC_PREFIX=assets/calendar

python services/calendar-sync/sync_calendar.py
```

Use `--dry-run` to print JSON without writing files or downloading images:

```sh
python services/calendar-sync/sync_calendar.py --dry-run
```

## Systemd Timer

Example service:

```ini
[Unit]
Description=Sync Gainesville Google Calendar shows

[Service]
Type=oneshot
WorkingDirectory=/opt/gainesville
Environment=GOOGLE_APPLICATION_CREDENTIALS=/etc/gainesville/google-calendar-service-account.json
Environment=GAINESVILLE_CALENDAR_ID=gainesvilletheband@gmail.com
Environment=GAINESVILLE_OUTPUT_JSON=/var/www/gainesville/data/shows.json
Environment=GAINESVILLE_IMAGE_DIR=/var/www/gainesville/assets/calendar
Environment=GAINESVILLE_IMAGE_PUBLIC_PREFIX=assets/calendar
ExecStart=/opt/gainesville/services/calendar-sync/.venv/bin/python /opt/gainesville/services/calendar-sync/sync_calendar.py
```

Example timer:

```ini
[Unit]
Description=Run Gainesville calendar sync every 15 minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=15min
Unit=gainesville-calendar-sync.service

[Install]
WantedBy=timers.target
```

## Notes

- This script intentionally runs outside the website so service account credentials never ship to browsers.
- If you do not want addresses visible on the public site, the script can still store `location` in the JSON for internal use, or we can add a `--hide-location` option later.
- For image attachments, Google Calendar returns attachment metadata; this script uses the Drive file ID to download the binary image.

# Gainesville Facebook Video Sync

Backend-only utility that reads published Facebook Page videos and writes clean JSON for the website.

The website does not authenticate to Meta/Facebook. This script runs on the server with a Page access token and writes public JSON that the static site can read.

## Output

Default output path:

`data/videos.json`

Shape:

```json
{
  "generatedAt": "2026-07-09T00:00:00+00:00",
  "pageId": "GainesvilletheBand",
  "videos": [
    {
      "id": "facebook-video-id",
      "title": "Live at Ringers",
      "description": "Optional Facebook video description",
      "createdAt": "2026-07-09T00:00:00+0000",
      "facebookUrl": "https://www.facebook.com/GainesvilletheBand/videos/...",
      "embedUrl": "https://www.facebook.com/plugins/video.php?href=...",
      "thumbnailUrl": "https://..."
    }
  ]
}
```

## Meta Setup

1. Create a Meta app.
2. Generate a Page access token that can read the Gainesville page videos.
3. Store the token only on the server, for example in an environment file readable by the service user.
4. Do not commit the token to git and do not expose it in browser JavaScript.

Required inputs:

- `FACEBOOK_PAGE_ID`: page id or username, default `GainesvilletheBand`
- `FACEBOOK_PAGE_ACCESS_TOKEN`: Page access token
- `GAINESVILLE_VIDEOS_JSON`: output JSON path
- `FACEBOOK_VIDEO_LIMIT`: number of latest videos to sync, default `12`

## One-Off Run

```sh
export FACEBOOK_PAGE_ID=GainesvilletheBand
export FACEBOOK_PAGE_ACCESS_TOKEN=replace-with-page-token
export GAINESVILLE_VIDEOS_JSON=/var/www/gainesville/data/videos.json

python services/facebook-sync/sync_facebook_videos.py
```

Use `--dry-run` to print JSON without writing the file:

```sh
python services/facebook-sync/sync_facebook_videos.py --dry-run
```

## Systemd Timer

Example service:

```ini
[Unit]
Description=Sync Gainesville Facebook videos

[Service]
Type=oneshot
WorkingDirectory=/opt/gainesville
Environment=FACEBOOK_PAGE_ID=GainesvilletheBand
Environment=FACEBOOK_PAGE_ACCESS_TOKEN=replace-with-page-token
Environment=GAINESVILLE_VIDEOS_JSON=/var/www/gainesville/data/videos.json
ExecStart=/usr/bin/python3 /opt/gainesville/services/facebook-sync/sync_facebook_videos.py
```

Example timer:

```ini
[Unit]
Description=Run Gainesville Facebook video sync hourly

[Timer]
OnBootSec=3min
OnUnitActiveSec=1h
Unit=gainesville-facebook-sync.service

[Install]
WantedBy=timers.target
```

## Notes

- Facebook embeds only work reliably for videos that are public and embeddable.
- If Meta changes API permissions or the token expires, the sync will fail without breaking the public website; the existing JSON remains in place.
- For a combined media feed later, this service can be merged with YouTube sync output.

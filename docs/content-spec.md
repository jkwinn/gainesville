# Gainesville Website Content Spec

This document is the editable source of truth for v1 site content. Keep the code driven by structured content so shows, links, copy, and media can be updated without rewriting layout components.

## Contact And Booking

Primary booking email:

- `gainesvilletheband@gmail.com`

Phone:

- Display: `(442) 444-0126`
- Link target: `https://gainesvilletheband.com/contact/`

Primary call to action:

- `Contact the Band`

Contact behavior:

- Email links should use `mailto:gainesvilletheband@gmail.com`.
- The displayed phone number should link to the current contact page unless a direct phone link is preferred later.
- The booking section should support both fans and venue/event organizers.

## Social Links

Required social tiles:

| Platform | URL |
| --- | --- |
| Facebook | `https://www.facebook.com/GainesvilletheBand/` |
| YouTube | `https://www.youtube.com/@GainesvilleTheBand` |

Future optional links:

- Instagram: TBD
- Spotify: TBD
- Bandcamp: TBD
- SoundCloud: TBD

## Videos

Status: TBD

Implementation guidance:

- Build the videos section so a featured YouTube URL can be added later without layout changes.
- Show a tasteful placeholder state for v1 if no videos are available.
- Include space for one featured video and optional secondary video tiles.

Editable fields:

| Field | Value |
| --- | --- |
| Featured YouTube video | TBD |
| Additional videos | TBD |

## Music

Status: links only for v1, specific links TBD.

Implementation guidance:

- Build a music section that can show simple external music links first.
- Do not require an embedded player for v1.
- Preserve room for future Spotify, Bandcamp, SoundCloud, or YouTube playlist links.

Editable fields:

| Platform | URL |
| --- | --- |
| Spotify | TBD |
| Bandcamp | TBD |
| SoundCloud | TBD |
| YouTube playlist | TBD |

## Shows

Use ISO dates internally. Display dates in a friendly format such as `Jul 29, 2026`.

Dynamic behavior:

- Shows should be split at runtime using the current date.
- Events with dates today or in the future render under Upcoming Shows.
- Events before the current date render under Past Shows.
- Manual show entries remain the fallback source.
- A Google Calendar ICS source is staged in `script.js` and should be enabled by filling in `googleCalendarIcsUrl`.
- When Google Calendar is enabled, only calendar events whose summary begins with `Gig:` should be imported as shows.

| Date | Time | Venue | Address | City | State | Venue logo | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-07-29 | 5:00 PM - 8:30 PM | The Camp Store | 7201 Carlsbad Blvd | Carlsbad | CA | TBD |  |
| 2026-08-21 | 8:00 PM - 12:00 AM | Ringers Lounge | 5517 Mission Rd. | Bonsall | CA | TBD |  |
| 2026-08-28 | 8:00 PM - 11:00 PM | The Moose Lodge 1325 | 2017 S Coast Hwy #19 | Oceanside | CA | TBD |  |
| 2026-09-10 | 7:00 PM - 10:00 PM | Humphreys | 2241 Shelter Island Drive | San Diego | CA | TBD |  |
| 2026-09-18 | 8:00 PM - 12:00 AM | Ringers Lounge | 5517 Mission Rd. | Bonsall | CA | TBD |  |
| 2026-09-26 | TBD | Escondido Moose Lodge | 25721 Jesmond Dene Rd. | Escondido | CA | TBD | Time TBD |
| 2026-10-11 | 1:00 PM - 5:00 PM | Rancho Guejito Vineyard | 17224 San Pasqual Valley Rd. | Escondido | CA | TBD |  |
| 2026-10-25 | 12:00 PM - 4:00 PM | Bel Vino Winery | 33515 Rancho California Rd. | Temecula | CA | TBD |  |
| 2026-10-30 | 8:00 PM - 12:00 AM | Ringers Lounge | 5517 Mission Rd. | Bonsall | CA | TBD |  |
| 2026-11-12 | TBD | Private Event | TBD | TBD | CA | None | Private event |
| 2026-12-06 | 12:00 PM - 4:00 PM | Bel Vino Winery | 33515 Rancho California Rd. | Temecula | CA | TBD |  |
| 2026-12-18 | 8:00 PM - 12:00 AM | Ringers Lounge | 5517 Mission Rd. | Bonsall | CA | TBD |  |

Show display rules:

- Sort upcoming shows by date ascending.
- Sort past shows by date descending.
- Upcoming and past shows should use the same reusable tile component.
- Each tile should have an image area above and a text section below.
- The text section should include time, date, and venue name, with city/state when available.
- If there are no public upcoming shows, display `New dates coming soon.`
- Private events should display as `Private Event` without address details unless explicitly provided.
- Use the venue name, city, and time as the most prominent scan points.

Venue logo guidance:

- Use the actual venue logos for public upcoming shows when a usable official logo is available.
- Upcoming show tiles should use the venue logo as the tile image.
- Store original source files separately from web-ready transformed files.
- Create black-and-white or warm-white-on-black versions so venue marks fit the Gainesville poster system.
- Prefer SVG logos when available. If only raster logos are available, use transparent PNG or WebP exports.
- Keep the venue logo secondary to the show information; it should support recognition without overpowering the date, time, and venue name.
- Do not display a venue logo for private events.
- Track source URLs or notes for each venue logo so assets can be replaced or verified later.

Expected venue logo assets:

| Venue | Suggested asset path |
| --- | --- |
| The Camp Store | `assets/venues/the-camp-store-logo-mono.*` |
| Ringers Lounge | `assets/venues/ringers-lounge-logo-mono.*` |
| The Moose Lodge 1325 | `assets/venues/moose-lodge-1325-logo-mono.*` |
| Escondido Moose Lodge | `assets/venues/escondido-moose-lodge-logo-mono.*` |
| Humphreys | `assets/venues/humphreys-logo-mono.*` |
| Rancho Guejito Vineyard | `assets/venues/rancho-guejito-vineyard-logo-mono.*` |
| Bel Vino Winery | `assets/venues/bel-vino-winery-logo-mono.*` |

## Past Shows

Past shows should use the same tile layout as upcoming shows.

Tile image rules:

- Past show tiles should use a still image captured from a related live video clip.
- Preferred video sources are embedded or linked YouTube, Facebook, or Instagram videos.
- Store the extracted still image as a web-ready local asset, then link the tile to the video source.
- If a source supports embedding cleanly, the tile can open an embedded video modal or an inline player.
- If a source does not support reliable embedding, open the original video URL in a new tab.
- Apply the same black-and-white or warm-white poster treatment used for upcoming venue logos where it improves consistency.

Expected past show fields:

| Field | Purpose |
| --- | --- |
| Date | Past event date |
| Time | Show time when known |
| Venue | Venue name |
| City/state | Location |
| Tile image | Still image captured from the related video |
| Video platform | YouTube, Facebook, Instagram, or other |
| Video URL | Source clip URL |
| Embed URL | Optional embeddable URL |

Past show placeholder behavior:

- If no video clip exists yet, omit the past show from the featured past-show grid or use a clearly marked fallback image.
- Do not mix unrelated photos with video-derived stills in the first v1 past-show tile set unless needed for coverage.

## Band Copy

Location:

- `North County San Diego`

Tagline:

- `Funk, Soul, Rock, Country, Motown: Dance Responsibly`

Notes:

- The user-provided copy included `Sould`; use `Soul` in the website copy.
- Keep the tagline short and prominent in the hero.
- The genre list can also appear as a small poster-style line near the logo.

## Photos

Photo source:

- `https://gainesvilletheband.com/past-events/`

Implementation guidance:

- Use photos from the existing past-events page as the first gallery source.
- During implementation, scrape or download selected images, optimize them, and store generated web-ready versions in the project.
- Preserve attribution/source notes internally if needed.
- Do not hotlink large production gallery images without an explicit decision.
- Use descriptive alt text such as `Gainesville performing at [venue]` when venue context is known.

## Recommended Tech Stack

Use a stack that starts simple but can grow.

Recommended v1:

- Astro
- TypeScript
- Static content files using JSON, YAML, or TypeScript data modules
- Plain CSS or scoped component CSS

Why:

- Generates a fast static site for GitHub Pages.
- Keeps v1 simple.
- Can grow into richer components later.
- Supports future React/Svelte/Vue islands if needed.
- Works well with content-driven pages, images, and SEO.

Acceptable simpler alternative:

- Vite with TypeScript and plain HTML/CSS modules.

Avoid for v1 unless required:

- A database.
- A custom backend.
- Heavy client-side routing.

## Deployment Plan

Phase 1 demo:

- Deploy to GitHub Pages first.
- Use the `main` branch or a GitHub Actions build workflow.
- Keep the site static and easy to preview.

Phase 2 AWS:

- Use Terraform for infrastructure.
- Route53 for DNS.
- S3 for media or static artifact storage.
- Security groups for any compute resources.
- EC2 only if the project gains server-side needs.
- If the site remains static, prefer S3 plus CloudFront over EC2 for the public website.

AWS Terraform scope, if EC2 is needed:

- VPC or selected existing VPC.
- Public subnet routing.
- Internet gateway and route table.
- EC2 instance.
- Security group allowing HTTP/HTTPS, and SSH only from approved IPs.
- Route53 hosted zone or DNS records.
- S3 bucket for uploaded/optimized media.
- Optional ACM certificate and CloudFront distribution.

## Structured Data Draft

Future code should be able to represent the current content with structures like:

```ts
type SiteContact = {
  email: string;
  phoneDisplay: string;
  phoneUrl: string;
  ctaLabel: string;
};

type Show = {
  date: string;
  time: string;
  venue: string;
  address?: string;
  city?: string;
  state?: string;
  status?: "upcoming" | "past";
  tileImage?: string;
  tileImageAlt?: string;
  venueLogo?: string;
  venueLogoAlt?: string;
  videoPlatform?: "youtube" | "facebook" | "instagram" | "other";
  videoUrl?: string;
  embedUrl?: string;
  notes?: string;
  isPrivate?: boolean;
};

type MediaLink = {
  label: string;
  url: string;
  platform: "facebook" | "youtube" | "spotify" | "bandcamp" | "soundcloud" | "instagram" | "email";
};
```

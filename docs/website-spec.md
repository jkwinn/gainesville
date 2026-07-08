# Gainesville Band Website Spec

## Goal

Build a responsive one-page website for Gainesville, a live local band, that presents the band as energetic, polished, and easy to book while giving fans fast access to shows, music, photos, videos, and social links.

The site should feel like a modern web version of a vintage black-and-white concert poster: bold, musical, high contrast, decorative, and simple to navigate.

## Brand Assets

Use these repo-local assets as visual references:

- Wide logo: `assets/brand/gainesville-logo-wide.png`
- Show poster reference: `assets/brand/gainesville-show-poster-reference.png`
- Favicon reference: `assets/brand/gainesville-favicon-reference.png`

Use these repo-local member portraits:

- Lead singer, CJ: `assets/members/cj-lead-singer.png`
- Lead guitar, Jeff: `assets/members/jeff-lead-guitar.png`
- Bass, Ray: `assets/members/ray-bass.png`
- Drums, Steve: `assets/members/steve-drums.png`

## Editable Content Source

Use `docs/content-spec.md` as the editable source of truth for v1 site content, including booking details, social links, shows, media placeholders, copy, photo sources, tech stack, and deployment plan.

## Audience

- Local fans looking for show dates, videos, photos, and social links.
- Venue owners and event organizers evaluating the band for booking.
- People discovering the band from Facebook, YouTube, QR codes, posters, or word of mouth.

## Primary Use Cases

Visitors should be able to:

- Understand the band identity within the first screen.
- See the next upcoming show or most important call to action.
- Watch a featured YouTube video.
- Browse additional video tiles.
- Listen to sample music or open music platform links.
- View live photos in a responsive gallery.
- Open Facebook and YouTube quickly.
- Contact the band for booking.
- Use the site comfortably on desktop and mobile browsers.

Band maintainers should be able to:

- Update show dates from a simple data structure.
- Add or replace YouTube videos.
- Add or replace photo gallery images.
- Change social links.
- Update short copy and booking details without changing layout code.

## Information Architecture

The MVP should be a single-page website with anchored sections:

1. Hero
2. Shows
3. Music
4. Videos
5. Photos
6. Band Members
7. Social Links
8. About
9. Booking / Contact

The navigation should be compact and functional. On desktop, use a simple top nav with anchor links. On mobile, use a compact menu or horizontally scrollable anchor row.

## Layout Direction

The layout should be simple, media-rich, and easy to scan.

- Use the wide Gainesville logo in the hero as the primary identity mark.
- Keep the first viewport focused on logo, short tagline, and primary actions.
- Use full-width page bands rather than nested card-heavy sections.
- Use individual cards only for show listings, video tiles, social tiles, and photo thumbnails.
- Make each section visually distinct with spacing, borders, dividers, or poster-inspired ornamentation.
- Avoid marketing-site clutter, oversized explanatory copy, or decorative UI that competes with the band assets.

## Style Points

The visual system should come directly from the logo, poster, and favicon.

### Mood

- Vintage concert poster
- Black denim / stage backdrop
- Distressed ink
- Southern rock / soul revue
- Handbill and marquee energy
- Bold but not chaotic

### Color Palette

Primary palette:

- Ink black: `#050505`
- Soft black: `#101010`
- Warm white: `#f6f2e8`
- Muted paper: `#d8d0bf`

Accent palette:

- Stage amber: `#d9a441`
- Deep red: `#9f2f24`
- Steel blue: `#3f6f8f`

Use black and warm white as the dominant palette. Use amber, red, and blue sparingly for buttons, hover states, active nav, date chips, or show highlights.

### Typography

Use typography that supports the poster style without sacrificing readability.

- Logo remains image-based.
- Section headings should use a bold western, slab, or vintage display font.
- Body copy should use a clean readable sans-serif.
- Labels, dates, and small caps can use condensed uppercase styling.

Recommended font direction:

- Display: Rye, Ewert, Smokum, Ultra, or a similar vintage slab/western font.
- Body: Inter, Work Sans, Source Sans 3, or system sans-serif.
- Use all-caps sparingly for section titles, buttons, and show dates.

### Texture And Detail

Use subtle texture, not heavy decoration.

- Slight paper grain or distressed overlay on dark backgrounds.
- Thin ornamental dividers inspired by the logo scrollwork.
- Star separators for small metadata groups.
- Double-line borders on featured modules.
- Distressed edges only where they support the poster motif.

Avoid:

- Bright neon gradients.
- Generic stock imagery.
- Cartoon music notes.
- Overly glossy effects.
- Too many competing fonts.
- Large decorative backgrounds that reduce readability.

### Shape Language

- Keep most containers squared or slightly rounded.
- Border radius should usually be `0px` to `8px`.
- Use framed poster-like modules for shows and videos.
- Use circular treatment only for favicon/avatar-style brand marks.

### Imagery

- Favor real band photos, stage photos, crowd photos, instruments, and venue details.
- If placeholder imagery is needed, use dark live-performance imagery with visible performers or instruments.
- Avoid abstract stage lights as the main image unless no performance image exists.
- Photo thumbnails should preserve real image detail and not be overly darkened.

## Section Requirements

### Hero

Purpose: immediately communicate the band identity and direct visitors to the main actions.

Content:

- Wide Gainesville logo.
- Short tagline: "Soul, Country, Funk, Motown, Rock" or similar.
- Location or origin line: "San Diego live band" if accurate.
- Primary action: "Watch Videos"
- Secondary action: "Book the Band"
- Optional action: "Upcoming Shows"

Style:

- Black background.
- Centered logo with generous breathing room.
- Poster-inspired border or top/bottom ornamental rules.
- Buttons should be high-contrast with restrained accent color.

### Shows

Purpose: help fans find upcoming performances and browse past shows using one consistent tile pattern.

Content per show:

- Date
- Venue
- City and state
- Doors time
- Show time
- Ticket or event link
- Tile image
- Venue logo for upcoming public shows when available
- Video source for past shows when available

Behavior:

- Split shows into upcoming and past groups, but render both groups with the same reusable show tile component.
- Sort upcoming shows by date ascending.
- Sort past shows by date descending.
- Show an empty state: "New dates coming soon."
- Use actual venue logo assets as the tile image for public upcoming shows when available.
- Use a still image from a linked YouTube, Facebook, or Instagram video as the tile image for past shows.
- Past show tiles should link to or embed the source video when a video is available.
- Do not show a venue logo for private events.

Style:

- Treat each show as a tile with an image area above and a text area below.
- Keep upcoming and past show tiles visually consistent.
- Image area: fixed aspect ratio, object-fit coverage, no layout shift.
- Text area: date, time, venue name, city/state, and optional call to action.
- Use date and venue name as the visual anchors.
- Use a small star or divider between city, doors, and showtime.
- Convert or prepare venue logos in a black-and-white or warm-white monochrome treatment so they match the Gainesville poster aesthetic.
- Venue logos should be centered in the tile image area with enough padding to breathe.
- Video-derived stills for past shows should be treated in the same black-and-white or warm-white poster style when possible.
- Keep image treatment consistent so venue logos and video stills feel like one show archive system.

### Music

Purpose: let visitors hear the band quickly.

MVP options:

- Embedded Spotify, Bandcamp, SoundCloud, or YouTube playlist.
- Three featured track links.
- A simple "Listen" tile grid if no embedded player exists yet.

Behavior:

- Do not autoplay audio.
- External music links open in a new tab.

### Videos

Purpose: showcase live energy.

Content:

- One featured YouTube video.
- Additional YouTube video tiles.
- Each video has title, thumbnail, and link or embedded playback.

Behavior:

- Lazy-load video embeds.
- Prefer clickable thumbnails that load the embed on interaction.
- Maintain 16:9 aspect ratio.

Style:

- Featured video should feel like a marquee item.
- Video thumbnails can use a thin warm-white border.

### Photos

Purpose: show the band in action.

Content:

- Responsive gallery of live and promo images.
- Each photo needs alt text.
- Optional captions for venue or event names.

Behavior:

- Mobile: 1 column, optionally 2 for small thumbnails.
- Tablet: 2 columns.
- Desktop: 3 or 4 columns.
- Optional lightbox interaction.

### Band Members

Purpose: introduce the musicians and give the band a more personal, bookable presence.

Content:

- CJ, lead singer.
- Jeff, lead guitar.
- Ray, bass.
- Steve, drums.
- Each member gets a portrait, role label, name, and brief bio.

Suggested initial bios:

- CJ, lead singer: "CJ brings the frontman energy: warm, soulful, and built for getting a room moving. His voice ties together Gainesville's mix of soul, country, funk, Motown, and rock."
- Jeff, lead guitar: "Jeff drives the guitar sound with sharp leads, big hooks, and the kind of tasteful grit that gives every Gainesville set its edge."
- Ray, bass: "Ray locks the band into the groove, carrying the low end with feel, pocket, and a steady pulse that keeps the dance floor moving."
- Steve, drums: "Steve anchors the show from behind the kit, bringing the punch, timing, and live-band lift that keeps Gainesville rolling from first song to last call."

Desktop and landscape layout:

- Use a sequence of full-width member rows.
- Each row uses a two-column composition with portrait and bio.
- Keep portraits vertically oriented and visually dominant without overwhelming the text.
- CJ appears first with text on the left and portrait on the right.
- Jeff appears second with portrait on the left and text on the right.
- Ray appears third with portrait on the left and text on the right.
- Steve appears fourth with text on the left and portrait on the right.
- Use consistent row height, image aspect ratio, and spacing to avoid layout shifts while scrolling.

Portrait mobile layout:

- Stack each member as portrait first, then name, role, and bio.
- Use a single-column layout.
- Keep the member order the same: CJ, Jeff, Ray, Steve.
- Ensure no text overlaps the portrait.

Style:

- Treat each member row like a restrained poster panel.
- Use thin warm-white borders, star separators, and small role labels.
- Use black backgrounds with subtle texture and warm-white typography.
- Keep bios short enough to scan quickly.

### Social Links

Purpose: provide fast paths to the band's active platforms.

Required tiles:

- Facebook
- YouTube

Optional tiles:

- Instagram
- Spotify
- Bandcamp
- SoundCloud
- Email

Style:

- Use icon plus short label.
- Keep tiles compact and thumb-friendly.
- Use platform color only as a small accent, not a full-tile takeover.

### About

Purpose: give visitors enough context without slowing the page.

Content:

- Short band bio, 1 to 2 paragraphs.
- Genres: soul, country, funk, Motown, rock.
- Region.
- Optional member list.

Tone:

- Confident, direct, and performance-focused.
- Avoid long origin-story copy in the MVP.

### Booking / Contact

Purpose: convert venue owners and event organizers.

Content:

- Booking email.
- Optional phone number.
- Event types: bars, festivals, private events, community events, corporate events.
- Clear call to action: "Book Gainesville"

MVP behavior:

- Use a mailto link first.
- Add a contact form only if needed later.

## Integrations

MVP:

- YouTube embeds or thumbnail links.
- Facebook external link tile.
- Email booking link.
- Static data for shows, videos, photos, and links.

Next phase:

- Facebook Events or Bandsintown for show listings.
- YouTube channel feed.
- Instagram feed.
- Newsletter signup.
- Contact form via Netlify Forms, Formspree, or backend endpoint.
- Lightweight CMS or JSON/YAML content files.

## Suggested Content Model

```ts
type Show = {
  date: string;
  venue: string;
  city: string;
  state: string;
  doorsTime?: string;
  showTime?: string;
  ticketUrl?: string;
};

type Video = {
  title: string;
  youtubeId: string;
  featured?: boolean;
};

type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

type BandMember = {
  name: string;
  role: "Lead Singer" | "Lead Guitar" | "Bass" | "Drums";
  image: string;
  alt: string;
  bio: string;
  imageSideDesktop: "left" | "right";
};

type SocialLink = {
  label: string;
  url: string;
  platform: "facebook" | "youtube" | "instagram" | "spotify" | "bandcamp" | "soundcloud" | "email";
};
```

## Responsive Requirements

Desktop:

- Hero logo is large but does not consume the entire page.
- Show at least a hint of the next section below the hero.
- Videos and photos use multi-column layouts.
- Band member rows use two columns with the specified alternating image/text placement.
- Navigation remains visible and readable.

Mobile:

- No horizontal scrolling.
- Hero logo scales down cleanly.
- Buttons stack or wrap without text overflow.
- Videos maintain 16:9 aspect ratio.
- Photo grid uses 1 or 2 columns.
- Band member rows stack in portrait orientation and may keep the two-column treatment in landscape orientation when there is enough width.
- Touch targets are at least 44px tall.
- Social tiles are easy to tap.

## Accessibility Requirements

- Use semantic HTML sections and headings.
- Maintain strong color contrast.
- Provide alt text for all meaningful images.
- Do not autoplay audio or video.
- Ensure keyboard navigation works.
- Links and buttons must have descriptive accessible names.
- Embedded media should have titles.

## Performance Requirements

- Optimize logo and image sizes for web.
- Use responsive image sizes for the photo gallery.
- Lazy-load gallery images and video embeds.
- Load only the featured video embed initially, or use click-to-load thumbnails.
- Keep the first page load fast on mobile connections.

## Acceptance Criteria

- The site works on modern desktop and mobile browsers.
- The hero uses the Gainesville brand identity clearly.
- The visual design reflects the provided logo, poster, and favicon references.
- Visitors can access shows, music, videos, photos, social links, and booking from the page.
- Facebook and YouTube links are present as prominent tiles.
- YouTube video content renders correctly or opens correctly.
- Photos render in a responsive gallery.
- Band member portraits and bios render in the specified order and desktop/landscape placement pattern.
- The layout has no overlapping text or controls at common viewport widths.
- The site does not autoplay audio or video.
- Core content can be updated from simple structured data.

## MVP Build Recommendation

Start with a static one-page site using structured local data. Build the visual system first, using the provided brand assets, then add richer integrations after the basic site is polished.

MVP priority:

1. Hero with logo and calls to action.
2. Shows section.
3. Featured video and video tiles.
4. Music links or embed.
5. Photo gallery.
6. Band member section.
7. Facebook and YouTube social tiles.
8. Booking contact section.

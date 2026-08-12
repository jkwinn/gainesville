const googleCalendarEmbedUrl =
  "https://calendar.google.com/calendar/embed?src=gainesvilletheband%40gmail.com&ctz=America%2FLos_Angeles";
const googleCalendarIcsUrl = "";
const tryDerivedPublicCalendarFeed = false;
const googleGigPrefix = "Gig:";
const facebookVideosJsonUrl = "data/videos.json";

const defaultShowTheme = {
  background: "#050505",
  imageBackground: "#050505",
  foreground: "#f6f2e8",
  muted: "#d8d0bf",
  accent: "#d9a441",
  border: "rgba(246, 242, 232, 0.32)",
  glow: "rgba(217, 164, 65, 0.2)",
  glowSoft: "rgba(217, 164, 65, 0.08)",
  actionForeground: "#050505",
};

const venueThemes = {
  "The Camp Store": {
    background: "#f8fbfc",
    imageBackground: "#f8fbfc",
    foreground: "#303b42",
    muted: "#53626b",
    accent: "#5dade0",
    border: "rgba(48, 59, 66, 0.22)",
    glow: "rgba(93, 173, 224, 0.18)",
    glowSoft: "rgba(93, 173, 224, 0.08)",
    actionForeground: "#050505",
  },
  "Ringers Lounge": {
    background: "#020202",
    imageBackground: "#020202",
    foreground: "#f6f2e8",
    muted: "#d8d0bf",
    accent: "#f01820",
    border: "rgba(246, 242, 232, 0.34)",
    glow: "rgba(240, 24, 32, 0.22)",
    glowSoft: "rgba(240, 24, 32, 0.09)",
    actionForeground: "#ffffff",
  },
  "The Moose Lodge 1325": {
    background: "#fbfaf7",
    imageBackground: "#fbfaf7",
    foreground: "#211b18",
    muted: "#5b514b",
    accent: "#c81f27",
    border: "rgba(33, 27, 24, 0.2)",
    glow: "rgba(200, 31, 39, 0.2)",
    glowSoft: "rgba(200, 31, 39, 0.08)",
    actionForeground: "#ffffff",
  },
  "Escondido Moose Lodge": {
    background: "#fbfaf7",
    imageBackground: "#fbfaf7",
    foreground: "#211b18",
    muted: "#5b514b",
    accent: "#c81f27",
    border: "rgba(33, 27, 24, 0.2)",
    glow: "rgba(200, 31, 39, 0.2)",
    glowSoft: "rgba(200, 31, 39, 0.08)",
    actionForeground: "#ffffff",
  },
  Humphreys: {
    background: "#000000",
    imageBackground: "#000000",
    foreground: "#f6f2e8",
    muted: "#c9d4df",
    accent: "#0098d8",
    border: "rgba(246, 242, 232, 0.34)",
    glow: "rgba(0, 152, 216, 0.22)",
    glowSoft: "rgba(0, 152, 216, 0.09)",
    actionForeground: "#050505",
  },
  "Rancho Guejito Vineyard": {
    background: "#f7f6ef",
    imageBackground: "#f7f6ef",
    foreground: "#2f302b",
    muted: "#626556",
    accent: "#7e8f5d",
    border: "rgba(47, 48, 43, 0.22)",
    glow: "rgba(126, 143, 93, 0.18)",
    glowSoft: "rgba(126, 143, 93, 0.08)",
    actionForeground: "#050505",
  },
  "Bel Vino Winery": {
    background: "#fbfaf6",
    imageBackground: "#fbfaf6",
    foreground: "#2c2416",
    muted: "#665a44",
    accent: "#b99845",
    border: "rgba(44, 36, 22, 0.22)",
    glow: "rgba(185, 152, 69, 0.22)",
    glowSoft: "rgba(185, 152, 69, 0.09)",
    actionForeground: "#050505",
  },
  "The Landings": {
    background: "#020202",
    imageBackground: "#020202",
    foreground: "#f6f2e8",
    muted: "#d8d0bf",
    accent: "#d9a441",
    border: "rgba(246, 242, 232, 0.32)",
    glow: "rgba(217, 164, 65, 0.2)",
    glowSoft: "rgba(217, 164, 65, 0.08)",
    actionForeground: "#050505",
  },
};

const manualShows = [
  {
    date: "2026-07-29",
    time: "5:00 PM - 8:30 PM",
    venue: "The Camp Store",
    address: "7201 Carlsbad Blvd",
    city: "Carlsbad",
    state: "CA",
    logo: "assets/venues/the-camp-store-logo-mono.png",
  },
  {
    date: "2026-08-21",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
    logo: "assets/venues/ringers-lounge-logo-mono.png",
  },
  {
    date: "2026-08-28",
    time: "8:00 PM - 11:00 PM",
    venue: "The Moose Lodge 1325",
    address: "2017 S Coast Hwy #19",
    city: "Oceanside",
    state: "CA",
    logo: "assets/venues/moose-lodge-1325-logo-mono.png",
  },
  {
    date: "2026-09-10",
    time: "7:00 PM - 10:00 PM",
    venue: "Humphreys",
    address: "2241 Shelter Island Drive",
    city: "San Diego",
    state: "CA",
    logo: "assets/venues/humphreys-logo-mono.png",
  },
  {
    date: "2026-09-18",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
    logo: "assets/venues/ringers-lounge-logo-mono.png",
  },
  {
    date: "2026-09-26",
    time: "TBD",
    venue: "Escondido Moose Lodge",
    address: "25721 Jesmond Dene Rd.",
    city: "Escondido",
    state: "CA",
    note: "Time TBD",
  },
  {
    date: "2026-10-11",
    time: "1:00 PM - 5:00 PM",
    venue: "Rancho Guejito Vineyard",
    address: "17224 San Pasqual Valley Rd.",
    city: "Escondido",
    state: "CA",
    logo: "assets/venues/rancho-guejito-vineyard-logo-mono.png",
  },
  {
    date: "2026-10-25",
    time: "12:00 PM - 4:00 PM",
    venue: "Bel Vino Winery",
    address: "33515 Rancho California Rd",
    city: "Temecula",
    state: "CA",
    logo: "assets/venues/bel-vino-winery-logo-mono.png",
  },
  {
    date: "2026-10-30",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
    logo: "assets/venues/ringers-lounge-logo-mono.png",
  },
  {
    date: "2026-11-12",
    time: "TBD",
    venue: "Private Event",
    city: "North County",
    state: "CA",
    private: true,
  },
  {
    date: "2026-12-06",
    time: "12:00 PM - 4:00 PM",
    venue: "Bel Vino Winery",
    address: "33515 Rancho California Rd",
    city: "Temecula",
    state: "CA",
    logo: "assets/venues/bel-vino-winery-logo-mono.png",
  },
  {
    date: "2026-12-18",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
    logo: "assets/venues/ringers-lounge-logo-mono.png",
  },
];

const archivedPastShows = [
  {
    date: "2025-12-27",
    time: "6:00 PM - 9:00 PM",
    venue: "The Landings",
    city: "Carlsbad",
    state: "CA",
    image: "assets/brand/gainesville-show-poster-reference.png",
    note: "Video still pending",
  },
  {
    date: "2025-12-05",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    city: "Bonsall",
    state: "CA",
    image: "assets/brand/gainesville-logo-wide.png",
    note: "Video still pending",
  },
  {
    date: "2025-11-22",
    time: "TBD",
    venue: "Escondido Moose Lodge",
    city: "Escondido",
    state: "CA",
    image: "assets/brand/gainesville-favicon-reference.png",
    note: "Video still pending",
  },
];

const members = [
  {
    name: "CJ",
    role: "Lead Singer",
    image: "assets/members/cj-lead-singer.png",
    side: "right",
    bio:
      "CJ brings the frontman energy: warm, soulful, and built for getting a room moving. His voice ties together Gainesville's mix of soul, country, funk, Motown, and rock.",
  },
  {
    name: "Jeff",
    role: "Lead Guitar",
    image: "assets/members/jeff-lead-guitar.png",
    side: "left",
    bio:
      "Jeff drives the guitar sound with sharp leads, big hooks, and the kind of tasteful grit that gives every Gainesville set its edge.",
  },
  {
    name: "Ray",
    role: "Bass",
    image: "assets/members/ray-bass.png",
    side: "left",
    bio:
      "Ray locks the band into the groove, carrying the low end with feel, pocket, and a steady pulse that keeps the dance floor moving.",
  },
  {
    name: "Steve",
    role: "Drums",
    image: "assets/members/steve-drums.png",
    side: "right",
    bio:
      "Steve anchors the show from behind the kit, bringing the punch, timing, and live-band lift that keeps Gainesville rolling from first song to last call.",
  },
];

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));

const siteUrl = "https://jkwinn.github.io/gainesville/";

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const parseLocalDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const escapeIcsText = (value = "") =>
  String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatIcsDate = (date) => {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(
    date.getMinutes(),
  )}00`;
};

const parseShowTime = (show) => {
  const timeMatches = [...show.time.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi)];
  const [year, month, day] = show.date.split("-").map(Number);

  if (timeMatches.length === 0) {
    const start = new Date(year, month - 1, day);
    const end = new Date(year, month - 1, day + 1);
    return { allDay: true, start, end };
  }

  const toHours = (match) => {
    let hours = Number(match[1]);
    const minutes = Number(match[2] || 0);
    const period = match[3].toUpperCase();

    if (period === "AM" && hours === 12) hours = 0;
    if (period === "PM" && hours !== 12) hours += 12;

    return { hours, minutes };
  };

  const startTime = toHours(timeMatches[0]);
  const endTime = toHours(timeMatches[1] || timeMatches[0]);
  const start = new Date(year, month - 1, day, startTime.hours, startTime.minutes);
  const end = new Date(year, month - 1, day, endTime.hours, endTime.minutes);

  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  return { allDay: false, start, end };
};

const formatIcsDateOnly = (date) => {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
};

const createCalendarHref = (show) => {
  const timing = parseShowTime(show);
  const location = [show.address, show.city, show.state].filter(Boolean).join(", ");
  const summary = show.private ? "Gainesville Private Event" : `Gainesville at ${show.venue}`;
  const uid = `${show.date}-${slugify(show.venue)}@gainesvilletheband.com`;
  const now = formatIcsDate(new Date());

  const timingLines = timing.allDay
    ? [`DTSTART;VALUE=DATE:${formatIcsDateOnly(timing.start)}`, `DTEND;VALUE=DATE:${formatIcsDateOnly(timing.end)}`]
    : [`DTSTART:${formatIcsDate(timing.start)}`, `DTEND:${formatIcsDate(timing.end)}`];

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gainesville The Band//Shows//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    ...timingLines,
    `SUMMARY:${escapeIcsText(summary)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(`Gainesville The Band\n${show.time}\n${siteUrl}#shows`)}`,
    `URL:${siteUrl}#shows`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};

const createFacebookShareHref = (show) => {
  const url = `${siteUrl}#shows`;
  const quote = `${formatDate(show.date)}: Gainesville at ${show.venue}, ${show.city || ""}${show.state ? `, ${show.state}` : ""}`;
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`;
};

const createWordmark = (show) => {
  const mark = document.createElement("div");
  mark.className = "venue-wordmark";
  mark.textContent = show.private ? "Private Event" : show.venue;
  return mark;
};

const applyShowTheme = (card, show) => {
  const theme = show.theme || venueThemes[show.venue] || defaultShowTheme;
  const properties = {
    "--show-bg": theme.background,
    "--show-image-bg": theme.imageBackground || theme.background,
    "--show-fg": theme.foreground,
    "--show-muted": theme.muted,
    "--show-accent": theme.accent,
    "--show-border": theme.border,
    "--show-glow": theme.glow,
    "--show-glow-soft": theme.glowSoft,
    "--show-action-fg": theme.actionForeground,
  };

  Object.entries(properties).forEach(([name, value]) => {
    if (value) card.style.setProperty(name, value);
  });
};

const setText = (element, value) => {
  element.textContent = value;
  return element;
};

const stripGigPrefix = (summary) => summary.replace(/^Gig:\s*/i, "").trim();

const isPrivateEventName = (name) => /^private event\b/i.test(name.trim());

const unfoldIcs = (text) => text.replace(/\r?\n[ \t]/g, "");

const getIcsValue = (eventText, propertyName) => {
  const prefix = `${propertyName}`;
  const line = eventText
    .split(/\r?\n/)
    .find((candidate) => candidate.startsWith(`${prefix}:`) || candidate.startsWith(`${prefix};`));

  return line ? line.slice(line.indexOf(":") + 1).replace(/\\,/g, ",").replace(/\\n/g, "\n") : "";
};

const parseIcsDateValue = (value) => {
  const compact = value.replace(/Z$/, "");
  const year = Number(compact.slice(0, 4));
  const month = Number(compact.slice(4, 6));
  const day = Number(compact.slice(6, 8));
  const hours = Number(compact.slice(9, 11) || 0);
  const minutes = Number(compact.slice(11, 13) || 0);
  return new Date(year, month - 1, day, hours, minutes);
};

const toIsoDate = (date) => {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const formatCalendarTime = (start, end) => {
  if (!start) return "TBD";

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return end ? `${formatter.format(start)} - ${formatter.format(end)}` : formatter.format(start);
};

const parseCalendarLocation = (location) => {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const stateCandidate = parts.at(-1);
  const city = parts.length >= 2 ? parts.at(-2) : "";
  const state = stateCandidate && stateCandidate.length <= 3 ? stateCandidate : "CA";
  const address = parts.length > 2 ? parts.slice(0, -2).join(", ") : location;

  return { address, city, state };
};

const parseGoogleCalendarShows = (icsText) => {
  const unfolded = unfoldIcs(icsText);
  const events = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];

  return events
    .map((eventText) => {
      const summary = getIcsValue(eventText, "SUMMARY").trim();
      if (!summary.toLowerCase().startsWith(googleGigPrefix.toLowerCase())) return null;

      const start = parseIcsDateValue(getIcsValue(eventText, "DTSTART"));
      if (!start || Number.isNaN(start.getTime())) return null;

      const endValue = getIcsValue(eventText, "DTEND");
      const end = endValue ? parseIcsDateValue(endValue) : null;
      const venue = stripGigPrefix(summary) || "Gainesville Show";
      const isPrivate = isPrivateEventName(venue);

      if (isPrivate) {
        return {
          date: toIsoDate(start),
          venue: "Private Event",
          private: true,
        };
      }

      const location = getIcsValue(eventText, "LOCATION");
      const parsedLocation = parseCalendarLocation(location);

      return {
        date: toIsoDate(start),
        time: formatCalendarTime(start, end),
        venue,
        ...parsedLocation,
        note: "From Google Calendar",
      };
    })
    .filter(Boolean);
};

const getGoogleCalendarFeedUrl = () => {
  if (googleCalendarIcsUrl) return googleCalendarIcsUrl;
  if (!tryDerivedPublicCalendarFeed || !googleCalendarEmbedUrl) return "";

  const url = new URL(googleCalendarEmbedUrl);
  const calendarId = url.searchParams.get("src");
  if (!calendarId) return "";

  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
};

const loadGoogleCalendarShows = async () => {
  const feedUrl = getGoogleCalendarFeedUrl();
  if (!feedUrl) return [];

  try {
    const response = await fetch(feedUrl);
    if (!response.ok) throw new Error(`Calendar request failed: ${response.status}`);
    return parseGoogleCalendarShows(await response.text());
  } catch (error) {
    console.warn("Google Calendar shows could not be loaded.", error);
    return [];
  }
};

const mergeShows = (manual, calendar) => {
  const seen = new Set();

  return [...calendar, ...manual].filter((show) => {
    const key = `${show.date}-${slugify(show.venue)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const createShowCard = (show, type = "upcoming") => {
  const card = document.createElement("article");
  card.className = `show-card ${type}`;
  applyShowTheme(card, show);

  const image = document.createElement("div");
  image.className = "show-image";

  if (type === "past" && show.image) {
    image.classList.add("has-photo");
    const img = document.createElement("img");
    img.src = show.image;
    img.alt = `${show.venue} past show video still`;
    image.append(img);
  } else if (show.logo && !show.private) {
    image.classList.add("has-logo");
    const logo = document.createElement("img");
    logo.className = "venue-logo";
    logo.src = show.logo;
    logo.alt = `${show.venue} logo`;
    const fallbackToWordmark = () => {
      image.replaceChildren(createWordmark(show));
    };
    logo.onerror = fallbackToWordmark;
    image.append(logo);
  } else {
    image.append(createWordmark(show));
  }

  const body = document.createElement("div");
  body.className = "show-body";
  body.innerHTML = show.private
    ? `
      <div class="show-date">${formatDate(show.date)}</div>
      <h2>Private Event</h2>
    `
    : `
      <div class="show-date">${formatDate(show.date)}</div>
      <h2>${show.venue}</h2>
      <p class="show-meta">${show.time}<br />${show.city || ""}${show.state ? `, ${show.state}` : ""}</p>
      ${show.address ? `<p class="show-meta">${show.address}</p>` : ""}
      ${show.note ? `<p class="show-note">${show.note}</p>` : ""}
      <div class="show-actions">
        <a href="${createCalendarHref(show)}" download="gainesville-${show.date}-${slugify(show.venue)}.ics">Add to my Calendar</a>
        <a href="${createFacebookShareHref(show)}" target="_blank" rel="noreferrer">Share on Facebook</a>
      </div>
    `;

  card.append(image, body);
  return card;
};

const renderShows = async () => {
  const upcoming = document.querySelector("#upcoming-shows");
  const past = document.querySelector("#past-shows-list");
  const calendarShows = await loadGoogleCalendarShows();
  const allShows = mergeShows(manualShows, calendarShows);
  const today = getToday();
  const upcomingFromDate = allShows.filter((show) => parseLocalDate(show.date) >= today);
  const pastFromDate = allShows.filter((show) => parseLocalDate(show.date) < today);

  upcoming.replaceChildren();
  past.replaceChildren();

  upcomingFromDate
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((show) => upcoming.append(createShowCard(show)));

  if (upcomingFromDate.length === 0) {
    upcoming.innerHTML = `<p class="empty-state">New dates coming soon.</p>`;
  }

  [...pastFromDate, ...archivedPastShows]
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((show) => past.append(createShowCard(show, "past")));
};

const renderMembers = () => {
  const list = document.querySelector("#member-list");

  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = `member-card ${member.side === "left" ? "image-left" : ""}`;
    card.innerHTML = `
      <div class="member-copy">
        <p class="role">${member.role}</p>
        <h2>${member.name}</h2>
        <p>${member.bio}</p>
      </div>
      <div class="member-photo">
        <img src="${member.image}" alt="${member.name}, ${member.role} for Gainesville" loading="lazy" />
      </div>
    `;
    list.append(card);
  });
};

const loadFacebookVideos = async () => {
  try {
    const response = await fetch(facebookVideosJsonUrl, { cache: "no-store" });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload.videos) ? payload.videos : [];
  } catch (error) {
    console.warn("Facebook videos could not be loaded.", error);
    return [];
  }
};

const createVideoCard = (video) => {
  const card = document.createElement("article");
  card.className = "video-card";

  const frameWrap = document.createElement("div");
  frameWrap.className = "video-frame";

  const iframe = document.createElement("iframe");
  iframe.src = video.embedUrl;
  iframe.title = video.title || "Gainesville Facebook video";
  iframe.loading = "lazy";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  frameWrap.append(iframe);

  const body = document.createElement("div");
  body.className = "video-body";

  const title = setText(document.createElement("h3"), video.title || "Gainesville live video");
  const link = setText(document.createElement("a"), "Watch on Facebook");
  link.className = "text-link";
  link.href = video.facebookUrl;
  link.target = "_blank";
  link.rel = "noreferrer";

  body.append(title, link);
  card.append(frameWrap, body);
  return card;
};

const renderFacebookVideos = async () => {
  const list = document.querySelector("#facebook-videos");
  if (!list) return;

  const videos = (await loadFacebookVideos()).filter((video) => video.embedUrl && video.facebookUrl);
  if (videos.length === 0) return;

  list.replaceChildren();
  videos.slice(0, 4).forEach((video) => list.append(createVideoCard(video)));
};

renderShows();
renderMembers();
renderFacebookVideos();

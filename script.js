const upcomingShows = [
  {
    date: "2026-07-29",
    time: "5:00 PM - 8:30 PM",
    venue: "The Camp Store",
    address: "7201 Carlsbad Blvd",
    city: "Carlsbad",
    state: "CA",
  },
  {
    date: "2026-08-21",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
  },
  {
    date: "2026-08-28",
    time: "8:00 PM - 11:00 PM",
    venue: "The Moose Lodge 1325",
    address: "2017 S Coast Hwy #19",
    city: "Oceanside",
    state: "CA",
  },
  {
    date: "2026-09-10",
    time: "7:00 PM - 10:00 PM",
    venue: "Humphreys",
    address: "2241 Shelter Island Drive",
    city: "San Diego",
    state: "CA",
  },
  {
    date: "2026-09-18",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
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
  },
  {
    date: "2026-10-25",
    time: "12:00 PM - 4:00 PM",
    venue: "Bel Vino Winery",
    address: "33515 Rancho California Rd",
    city: "Temecula",
    state: "CA",
  },
  {
    date: "2026-10-30",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
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
  },
  {
    date: "2026-12-18",
    time: "8:00 PM - 12:00 AM",
    venue: "Ringers Lounge",
    address: "5517 Mission Rd.",
    city: "Bonsall",
    state: "CA",
  },
];

const pastShows = [
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

const createShowCard = (show, type = "upcoming") => {
  const card = document.createElement("article");
  card.className = `show-card ${type}`;

  const image = document.createElement("div");
  image.className = "show-image";

  if (type === "past" && show.image) {
    const img = document.createElement("img");
    img.src = show.image;
    img.alt = `${show.venue} past show video still`;
    image.append(img);
  } else {
    const mark = document.createElement("div");
    mark.className = "venue-wordmark";
    mark.textContent = show.private ? "Private Event" : show.venue;
    image.append(mark);
  }

  const body = document.createElement("div");
  body.className = "show-body";
  body.innerHTML = `
    <div class="show-date">${formatDate(show.date)}</div>
    <h2>${show.venue}</h2>
    <p class="show-meta">${show.time}<br />${show.city || ""}${show.state ? `, ${show.state}` : ""}</p>
    ${show.address && !show.private ? `<p class="show-meta">${show.address}</p>` : ""}
    ${show.note ? `<p class="show-note">${show.note}</p>` : ""}
  `;

  card.append(image, body);
  return card;
};

const renderShows = () => {
  const upcoming = document.querySelector("#upcoming-shows");
  const past = document.querySelector("#past-shows-list");

  upcomingShows
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((show) => upcoming.append(createShowCard(show)));

  pastShows
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

renderShows();
renderMembers();

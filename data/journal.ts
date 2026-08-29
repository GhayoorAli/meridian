export type Article = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  read: string;
  author: string;
  role: string;
  image: string;
  tags: string[];
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "heat-as-a-building-material",
    title: "Heat as a building material",
    dek: "If we specified temperature the way we specify stone, most contemporary facades would be illegal.",
    date: "12 Aug 2026",
    read: "11 min",
    author: "Elena Carter",
    role: "Founding Partner",
    image:
      "/images/photo-1474044159687-1ee9f3a51722.jpg",
    tags: ["Climate", "Method"],
    body: [
      "We still draw buildings as if air were free and shade were decoration. In London last July the pavement at 16:00 was 61 C. That is not a weather anecdote. It is a specification failure.",
      "At Meridian we have started writing heat into the door schedule. Every opening gets a surface temperature at 15:00 in August, a night flush rate, and a glare note. Clients find this irritating until the first summer they do not buy a portable air conditioner.",
      "The lesson from Wind House was not that rammed earth is virtuous. It was that a house can be tuned like an instrument if you accept that comfort is a seasonal practice, not a setpoint.",
      "What we refuse is the glass box with a mechanical apology attached. Heat is a material. Treat it with the same seriousness you give to a stone lintel, or stop calling the work architecture.",
    ],
  },
  {
    slug: "drawing-the-coastline-that-no-longer-exists",
    title: "Drawing the coastline that no longer exists",
    dek: "Survey drawings are becoming historical documents faster than we can print them.",
    date: "02 Jun 2026",
    read: "9 min",
    author: "Sarah Hall",
    role: "Partner, Edinburgh",
    image:
      "/images/photo-1504893524553-b855bce32c67.jpg",
    tags: ["Survey", "Scotland"],
    body: [
      "The 2018 survey line at Orkney is already a fiction. We keep it on the sheet, in a pale ink, as a ghost. The new line is measured every March and drawn in a heavier hand.",
      "This is not melancholy. It is a working method. If the architecture cannot be understood against a moving baseline, it is the wrong architecture for that shore.",
      "Students who visit the Salt Line Observatory are asked to mark the day salt bloom on the stone base. In ten years those marks will be more useful than our original sections.",
      "I am less interested in resilience as a brand and more interested in buildings that can be honest about their own expiry.",
    ],
  },
  {
    slug: "the-ethics-of-shade",
    title: "The ethics of shade",
    dek: "Shade is the last public luxury that cities still give away for free — and they are giving away less of it.",
    date: "18 Mar 2026",
    read: "8 min",
    author: "Elena Carter",
    role: "Founding Partner",
    image:
      "/images/photo-1513635269975-59663e0ac1ad.jpg",
    tags: ["Civic", "London"],
    body: [
      "A plane tree is a piece of civic infrastructure with a fifty-year payback. A cafe awning is a private claim on the same air. London is confusing the two.",
      "When we designed the Tide Market Hall we fought to keep the river gallery unprogrammed. No kiosk. No ticket. Just a deep eave and a granite bench that stays cool until late afternoon.",
      "Shade should be as non-negotiable as drinking water. If your masterplan needs a render to prove it has shade, it does not have shade.",
    ],
  },
  {
    slug: "notes-from-a-moss-survey",
    title: "Notes from a moss survey",
    dek: "Moss does not care about your concept. It cares about drip, draft, and the chemistry of a roof tile.",
    date: "09 Jan 2026",
    read: "12 min",
    author: "James Morrow",
    role: "Partner, Melbourne",
    image:
      "/images/photo-1418065460487-3e41a6c84dc5.jpg",
    tags: ["Landscape", "England"],
    body: [
      "We spent November on our knees in the Lake District, naming mosses that had colonized a collapsed retaining wall. The wall was a failure. The moss was a complete civilization.",
      "The archive we built afterwards is not a garden. It is a set of rooms that try, and often fail, to reproduce the wall failures: the drip line, the north shade, the lime leach.",
      "Visitors want a photograph. The moss wants to be left alone after rain. Our job is to disappoint the visitor just enough.",
    ],
  },
  {
    slug: "night-vision-for-cities",
    title: "Night vision for cities",
    dek: "Most lighting design is fear management. We are trying to design darkness that people will consent to.",
    date: "21 Oct 2025",
    read: "10 min",
    author: "Martha Vale",
    role: "Associate, Light",
    image:
      "/images/photo-1514565131-fce0801e5785.jpg",
    tags: ["Light", "Research"],
    body: [
      "The average European street has become a corridor of glare. We light for insurance, not for faces. The result is that people look worse, sleep worse, and still do not feel safe.",
      "At Black Sand School we used a warm sodium that is ugly in photographs and kind to eyes. Parents complained until the first winter assembly, when they could see their children faces from across the hall.",
      "Darkness is a material with a specification. We should write it down.",
    ],
  },
  {
    slug: "a-brief-history-of-thermal-comfort",
    title: "A brief history of thermal comfort",
    dek: "The 22-degree interior is a mid-century export, not a human right.",
    date: "04 Jul 2025",
    read: "14 min",
    author: "Daniel Brooks",
    role: "Associate, Research",
    image:
      "/images/photo-1600210492486-724fe5c67fb0.jpg",
    tags: ["History", "Climate"],
    body: [
      "The comfort band was written for offices in the American Midwest and then sold to the planet as biology. It is neither biology nor polite.",
      "English houses were always seasonal. You moved rooms. You opened the north door at night. You accepted a cool morning as the price of a thick wall.",
      "Our work is not nostalgia. It is a refusal to spend the next forty years mechanically reproducing a 1950s indoor climate at the edge of a hotter ocean.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getNextArticle(slug: string) {
  const index = articles.findIndex((article) => article.slug === slug);
  return articles[(index + 1) % articles.length];
}

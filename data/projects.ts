export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  country: string;
  type: "Civic" | "Dwelling" | "Landscape" | "Research";
  status: "Built" | "On site" | "Study";
  area: string;
  client: string;
  excerpt: string;
  statement: string;
  challenge: string;
  approach: string;
  outcome: string;
  credits: { role: string; name: string }[];
  image: string;
  gallery: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "salt-line-observatory",
    title: "Salt Line Observatory",
    subtitle: "A measuring room for a retreating coast",
    year: "2026",
    location: "Orkney",
    country: "Scotland",
    type: "Research",
    status: "Built",
    area: "420 sq m",
    client: "Atlantic Institute",
    excerpt:
      "A timber and basalt instrument on the Orkney shore that records tide, wind, and the line where salt first blooms on stone.",
    statement:
      "The observatory is less a building than a calibrated threshold. Visitors walk a 48-meter gallery that sits 1.4 meters above the highest recorded tide of 2010 — a baseline we know will fail. The architecture is designed to be read against that failure.",
    challenge:
      "The client needed a public room that could host climate researchers without becoming a tourist pavilion. The site floods twice a year and will flood monthly within two decades.",
    approach:
      "We lifted the gallery on a basalt base bored with overflow channels. Cedar slats are spaced to whistle in a strong storm, so the building announces weather before you see it. Instruments are housed in a blackened concrete core that can be unbolted and moved inland.",
    outcome:
      "Opened March 2026. The first winter recorded 19 overtopping events. School groups now use the salt-bloom marks as a living graph. The project was named Emerging work at the 2026 European Architecture Award.",
    credits: [
      { role: "Lead", name: "Sarah Hall" },
      { role: "Structure", name: "North Engineering" },
      { role: "Landscape", name: "Meridian Field" },
      { role: "Photography", name: "Aaron Magee" },
    ],
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1800&q=80",
    ],
    featured: true,
  },
  {
    slug: "wind-house",
    title: "Wind House",
    subtitle: "A house tuned to the northwesterly",
    year: "2023",
    location: "Cornwall",
    country: "England",
    type: "Dwelling",
    status: "Built",
    area: "286 sq m",
    client: "Private",
    excerpt:
      "A split-level dwelling on the Cornwall ridge that uses the Atlantic wind as its primary cooling system.",
    statement:
      "The house is arranged as two plaster bars offset by 11 degrees — the prevailing summer wind. Between them, a court of cork oaks and a shallow rill that evaporates under the afternoon north wind.",
    challenge:
      "A steep granite site with a 22-meter drop, strict heritage views toward the chapel, and a brief that forbade mechanical cooling.",
    approach:
      "Thermal mass in rammed earth walls, a roof of lime-washed zinc, and operable timber screens that the owners re-rig seasonally like sails. The kitchen sits in the leeward bar so cooking heat never enters the sleeping rooms.",
    outcome:
      "Peak interior temperature in August 2024 was 26.1 C without active cooling. Architectural Review House Award, 2023.",
    credits: [
      { role: "Lead", name: "Elena Carter" },
      { role: "Structure", name: "Anchor Structure" },
      { role: "Joinery", name: "Wind Workshop" },
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
    ],
    featured: true,
  },
  {
    slug: "moss-archive",
    title: "Moss Archive",
    subtitle: "A living library of 214 moss species",
    year: "2025",
    location: "Lake District",
    country: "England",
    type: "Landscape",
    status: "Built",
    area: "1.8 ha",
    client: "Lake District Council",
    excerpt:
      "A hillside archive where moss species are cultivated, named, and studied as climate witnesses.",
    statement:
      "Moss remembers humidity the way timber remembers load. The archive is a sequence of cedar rooms open to weather, each holding a micro-climate and a drawer of field notes.",
    challenge:
      "How to make a scientific collection public without killing the specimens through footfall, flash, and souvenir-taking.",
    approach:
      "Raised walkways of reclaimed cypress, a drip irrigation fed by hillside runoff, and night visits only — moss photographs better in darkness, and visitors behave better too.",
    outcome:
      "214 species cataloged. Landscape Institute Medal, 2025. The night program is booked six months ahead.",
    credits: [
      { role: "Lead", name: "James Morrow" },
      { role: "Botany", name: "University of Edinburgh" },
      { role: "Joinery", name: "North Woodworks" },
    ],
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1800&q=80",
    ],
    featured: true,
  },
  {
    slug: "thermal-commons",
    title: "Thermal Commons",
    subtitle: "Hot spring baths as civic infrastructure",
    year: "2025",
    location: "Bath",
    country: "England",
    type: "Civic",
    status: "On site",
    area: "2,400 sq m",
    client: "North Baths Collective",
    excerpt:
      "A sequence of hot and cold rooms arranged as a public street, not a spa, on the edge of a greenhouse town.",
    statement:
      "Bathing here is not leisure. It is how a town of 2,500 people gathers in winter darkness. The architecture borrows the logic of a covered market: long, cheap, and impossible to privatize.",
    challenge:
      "A client tempted by luxury hospitality, a community that refused a ticketed spa, and a hot spring well that already served tomato growers.",
    approach:
      "We split the well. Growers keep first rights. The baths take overflow at 38 to 42 C. Concrete vaults are cast with local stone. Changing rooms face the street so the building never hides its public life.",
    outcome:
      "Structure complete. First fill scheduled October 2026. Town assembly voted 71% to keep entry by donation.",
    credits: [
      { role: "Lead", name: "Sarah Hall" },
      { role: "Spring survey", name: "National Water Survey" },
      { role: "Civic brief", name: "Bath Town Council" },
    ],
    image:
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1511818966892-05be0258ea0b?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1449155997615-d74606d3d509?auto=format&fit=crop&w=1800&q=80",
    ],
  },
  {
    slug: "tide-market-hall",
    title: "Tide Market Hall",
    subtitle: "A hall that floods on purpose",
    year: "2024",
    location: "Bristol",
    country: "England",
    type: "Civic",
    status: "Built",
    area: "3,100 sq m",
    client: "City of Bristol",
    excerpt:
      "A riverside market whose floor is a tide gauge. Stallholders pack to a painted baseline. The rest of the hall becomes a water court.",
    statement:
      "Bristol still pretends the river is scenery. The hall treats the water as a landlord. Twice a month the lower nave fills, and the city is forced to remember the waterline.",
    challenge:
      "A condemned warehouse, a fish market that had been moved inland, and a flood map the planning office did not want published.",
    approach:
      "We kept the iron frame, dropped the floor 80 centimeters, and lined the lower nave in glazed brick. Upper galleries stay dry for bakeries and a municipal kitchen. Drainage is visible, celebrated, and cleaned by the same crew that washes the stalls.",
    outcome:
      "London Festival Debut, 2024. The hall hosted 1.2 million visits in its first year and three planned floods that became public festivals.",
    credits: [
      { role: "Lead", name: "Elena Carter" },
      { role: "Heritage", name: "Heritage England" },
      { role: "Water study", name: "National Water Lab" },
    ],
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb49441edd?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80",
    ],
    featured: true,
  },
  {
    slug: "black-sand-school",
    title: "Black Sand School",
    subtitle: "Classrooms against a coastal wind",
    year: "2025",
    location: "Shetland",
    country: "Scotland",
    type: "Civic",
    status: "Built",
    area: "1,650 sq m",
    client: "Shetland Islands Council",
    excerpt:
      "A primary school buried into a black sand berm so children can hear each other when the wind is severe.",
    statement:
      "Shetland is loud. The school is a quiet instrument: earth walls, felted interiors, and a roof playground that only opens when the wind meter allows.",
    challenge:
      "Replacing a 1970s school that leaked heat and sound, on an island with one hardware store and a winter barge schedule.",
    approach:
      "Prefabricated timber cassettes shipped in August, clad in local stone, and packed with down insulation donated by a neighboring farm. Windows are small, deep, and south-facing. The hall doubles as the island storm shelter.",
    outcome:
      "Civic Design Award shortlist, 2025. Energy use is 41% below the Scottish school average. Enrollment rose for the first time in twelve years.",
    credits: [
      { role: "Lead", name: "Sarah Hall" },
      { role: "Education brief", name: "Shetland School Board" },
      { role: "Prefabrication", name: "Clara Timber" },
    ],
    image:
      "https://images.unsplash.com/photo-1511818966892-05be0258ea0b?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1449155997615-d74606d3d509?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
    ],
  },
  {
    slug: "quiet-tower",
    title: "Quiet Tower",
    subtitle: "A room for listening in Oxford",
    year: "2024",
    location: "Oxford",
    country: "England",
    type: "Research",
    status: "Built",
    area: "48 sq m",
    client: "Island Trust",
    excerpt:
      "A four-storey cedar tower with no program except sitting, and a roof that frames a single fruit tree.",
    statement:
      "The tower is an argument against the visitor economy. You cannot photograph the tree from the street. You have to climb, leave your shoes, and wait for the light to turn the fruit.",
    challenge:
      "A 4.2-meter plot between two wooden townhouses, a neighbor who requested silence after 7pm, and a brief that forbade retail.",
    approach:
      "A single stair wrapping a void. Walls of charred cedar. Floors of straw-mat panels cut to a 90-centimeter module. No electricity on the upper two levels — only a paper lantern you carry up.",
    outcome:
      "Open three days a week, twelve visitors at a time. The waiting list is the project most honest drawing.",
    credits: [
      { role: "Lead", name: "James Morrow" },
      { role: "Joinery", name: "North Woodworks" },
      { role: "Paper", name: "Valley Paper" },
    ],
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
    ],
  },
  {
    slug: "field-station-delta",
    title: "Field Station Delta",
    subtitle: "A research camp that can be towed",
    year: "2026",
    location: "Isle of Mull",
    country: "Scotland",
    type: "Research",
    status: "Study",
    area: "180 sq m",
    client: "Island Field Lab",
    excerpt:
      "A modular station for volcanic-soil research, designed to be moved by tractor when the ground field shifts.",
    statement:
      "Permanence is the wrong luxury on an active island. The station is a set of six aluminum rooms on timber skids, each a laboratory, bunk, or kitchen, lashed together with marine hardware.",
    challenge:
      "A research grant that assumed a concrete slab, ground that does not honor grant cycles, and a supply chain that ends at the ferry.",
    approach:
      "We designed for two people and a tractor. Rooms unbolt in four hours. Solar skins fold. The only poured element is a compost trench that we accept as a ruin.",
    outcome:
      "Prototype room tested in London, winter 2026. Full deployment pending a spring weather window.",
    credits: [
      { role: "Lead", name: "Elena Carter" },
      { role: "Ground study", name: "Island Survey" },
      { role: "Fabrication", name: "Island Fabrication" },
    ],
    image:
      "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const projectTypes = ["All", "Civic", "Dwelling", "Landscape", "Research"] as const;

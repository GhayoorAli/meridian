# Meridian

A Next.js theme for a spatial research studio. Dark editorial layout, filled project and journal pages, and motion-led UI for architecture and design portfolios.

Meridian is a fictional practice founded in London in 2014, with field stations in Edinburgh and Melbourne. The copy, projects, team, and essays are already in place so the theme can be previewed as a finished site.

## Preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For production speed (pre-built pages, no compile-on-click):

```bash
npm run build
npm start
```

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: hero, manifesto, selected work, capabilities, method, offices, journal, awards |
| `/work` | Project archive with type filters |
| `/work/[slug]` | Case study (challenge, approach, outcome, gallery, credits) |
| `/studio` | Practice, people, values, method |
| `/journal` | Essay index |
| `/journal/[slug]` | Article |
| `/contact` | Brief form and three offices |

## Features

- Custom cursor and magnetic buttons
- Sticky header that gains a dark bar on scroll
- Hover image swap on the project list
- Expanding office panels and accordion capabilities
- Live clocks for London, Edinburgh, and Melbourne
- Route loading state on navigation
- Sample data for 8 projects, 6 essays, 8 people, awards, and clients

## Project structure

```
app/            Routes and layouts
components/     Navigation, footer, motion UI, home sections
data/           Site, projects, studio, and journal content
lib/            Helpers and image URLs
```

Edit `data/site.ts`, `data/projects.ts`, `data/studio.ts`, and `data/journal.ts` to replace the sample studio with your own.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Images

Photographs are loaded from [Unsplash](https://unsplash.com). Swap the URLs in the data files, or put files in `public/` and point the `image` fields at those paths.

## License

Private theme. Add a license file before you publish the repository if you want others to reuse it.

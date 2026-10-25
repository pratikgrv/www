# Pratik Grv

Personal portfolio and writing, built with Next.js, React, Tailwind CSS and Velite.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
```

Edit profile, social links and apps in `app/portfolio-data.ts`. Posts live in `content/posts`.

## Design

Adapted from [OA Design](https://github.com/OpenLabs-so/oa-design): white surfaces, ink-derived neutrals, recessed gray app surfaces, continuous-curvature corners and pill actions. Inter Tight is hosted locally, with its OFL license in `public/fonts/OFL.txt`. Text weights stay between 300 and 500.

The layout shares one responsive markup tree. Links have visible keyboard focus and immediate press feedback; reduced motion disables transforms and transitions. Static content renders immediately without entrance delays. App URLs set to `#` render as display cards until a real destination is supplied.

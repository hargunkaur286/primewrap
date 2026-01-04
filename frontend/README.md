# Pinewrap Frontend

Vite + React + TypeScript + Tailwind + shadcn/ui.

## Theme / colors

The UI uses shadcn-style design tokens (CSS variables) plus a brand palette.

**Brand palette**

- `#FFE569`
- `#FFB22C`
- `#FB9224`
- `#000000`

**Where it’s configured**

- Global theme tokens + global effects (scrollbar/glow/gradient text): [src/index.css](src/index.css)
- Tailwind palette mapping (and overrides for commonly used color names like `emerald`, `cyan`, etc.): [tailwind.config.ts](tailwind.config.ts)

**Page-specific gradients**

- Home hero background: [src/pages/Index.tsx](src/pages/Index.tsx)
- Contact page background: [src/pages/Contact.tsx](src/pages/Contact.tsx)

## Local development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

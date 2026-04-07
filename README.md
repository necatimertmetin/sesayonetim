# Sesa Yönetim

Modern, animated corporate website built with React, TypeScript, and Material UI.

🌐 **Live Demo:** [necatimertmetin.github.io/sesa](https://necatimertmetin.github.io/sesa)

## Tech Stack

- **React 19** + **TypeScript**
- **Material UI (MUI v7)** — theming, components
- **Framer Motion** — animations & transitions
- **Vite** — build tool
- **i18next** — internationalization (TR / EN)
- **React Router v7** — client-side routing

## Features

- 🌙 Dark / Light theme toggle
- 🌍 Multi-language support (Turkish & English)
- 🎨 Animated topographic contour background
- 📊 3D parallax stat cards
- 📱 Fully responsive design
- ⚡ Sticky navbar with glassmorphism effect

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/        # Shared UI components
│   ├── animated-components/  # Animation wrappers
│   └── layout/        # Header, Footer, PageLayout
├── hooks/             # Custom React hooks
├── localization/      # i18n configuration
├── pages/             # Route pages (Landing, About, Services, Contact)
├── providers/         # Context providers (Theme, Localization)
├── router/            # Route definitions & router setup
└── theme.ts           # MUI theme configuration
```

## Deployment

Deployed automatically via GitHub Actions to GitHub Pages on every push to `main`.


# MyRules

iPhone wallpaper generator for personal rules/habits in bullet-point format.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Rendering**: HTML Canvas API

## Project Structure

```
src/
├── components/     # React UI components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions (canvas drawing)
├── types/          # TypeScript interfaces and constants
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Key Files

- `src/utils/canvas.ts` - Wallpaper drawing logic (text wrapping, layout)
- `src/hooks/useWallpaperCanvas.ts` - Canvas hook for preview and export
- `src/types/index.ts` - Rule interface, wallpaper dimensions, preset colors

## Wallpaper Specs

- **Target device**: iPhone 14/15 Pro Max
- **Dimensions**: 1290 x 2796 pixels
- **Format**: PNG export

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

## Coding Conventions

- Functional components with hooks
- TypeScript strict mode
- Tailwind for all styling (no custom CSS classes)
- Component files use PascalCase
- Hooks use camelCase with `use` prefix

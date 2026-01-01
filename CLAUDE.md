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
- `src/components/ImageUploader.tsx` - Background image upload and gallery
- `src/components/PositionSelector.tsx` - Title vertical position selector
- `src/components/WritingModeSelector.tsx` - Horizontal/vertical writing mode toggle

## Features

### Background Images
- Upload custom images or select from 3 default samples
- Images render in "cover" mode with center alignment
- Auto text color detection based on image brightness

### Title Position
- Three vertical positions: High (35%), Middle (45%), Low (55%)
- Adjusts where title and rules start on the wallpaper

### Writing Mode
- **Horizontal**: Default left-to-right text layout (up to 10 rules)
- **Vertical**: Japanese-style top-to-bottom, right-to-left columns (up to 5 rules)
  - Title: Vertical text in upper-right area
  - Rules: Numbered with Japanese numerals (一, 二, 三, 四, 五)
  - Rule positions: High (20%), Middle (40%), Low (60%) from top

### Auto-Save
- Data persists to `localStorage` (key: `myrules-saved-data`)
- Debounced save (500ms delay)
- Visual feedback: "Saving..." / "Saved" indicator

## Default Assets

```
public/
├── iphone_sample.jpg   # Default background 1
├── iphone_sample2.jpg  # Default background 2
└── iphone_sample3.jpg  # Default background 3
```

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

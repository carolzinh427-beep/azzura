# AZZURA EVENTS — Official Digital Experience

> **THE ATMOSPHERE IS EVERYTHING.**

A premium, editorial web experience for **AZZURA EVENTS**, London's foremost electronic music and rooftop nightlife brand.

---

## 🖤 Brand Aesthetics & Identity

- **Visual Direction**: Editorial luxury, London rooftop golden hours, subterranean warehouse acoustics, monochromatic deep black palette (`#080808`, `#000000`, `#151515`, `#FFFFFF`) with electric blue signature accents (`#2563EB`, `#3B82F6`).
- **Typography**: Display typography powered by Syne & Plus Jakarta Sans.
- **Motion & Audio**: Hardware-accelerated Framer Motion, parallax scroll reactions, audio preview streams, and custom atmospheric noise layer.

---

## ✨ Features

- **Cinematic Fullscreen Hero (100vw × 100vh)**: Atmospheric background video loop, sound controller, live next event teaser, and responsive layout for mobile and desktop.
- **Flagship Next Event**: *AZZR 1 Year Anniversary* showcase with functional real-time countdown timer (Days, Hours, Minutes, Seconds).
- **Asymmetric Editorial Experience**: "01 THE ATMOSPHERE IS EVERYTHING" manifesto with scroll parallax and three brand pillars.
- **Upcoming Events Calendar**: Dynamic event cards with status badges (*SELLING FAST*, *FINAL RELEASE*, *ON SALE*), venue acoustics specs, lineup chips, and direct ticket purchasing modals.
- **Lineup & Artist Archive**: Artist portraits with genre categorization and instant audio sample previews.
- **Asymmetric Gallery & Lightbox**: Editorial photo grid with interactive fullscreen Lightbox supporting keyboard controls (`ESC`, `ArrowLeft`, `ArrowRight`) and touch swipe gestures on mobile.
- **Instagram Atmosphere Dispatch (`@AZZR.LDN`)**: Custom curated visual grid representing the brand's Instagram aesthetic.
- **London Spatial Curation**: Curated architectural venues across London (*The Rooftop at St. Paul's*, *Tobacco Dock Subterranean Vaults*, *Village Underground*).
- **Contact & Multi-Category Inquiries**: Direct booking and partnership forms with validation and real-time toast feedback.
- **VIP Newsletter Access List**: Instant signup with Supabase integration and resilient offline/localStorage fallback.
- **Curator Admin Portal (`/admin`)**: Protected dashboard to manage events, artists, gallery, view inquiries, and export newsletter subscribers as CSV.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS + Custom CSS Variables & SVG Noise Filter
- **Motion**: Framer Motion
- **Icons**: Lucide React
- **Backend / Database**: Supabase JS Client (with built-in offline/mock resilience store)
- **Deployment Target**: Vercel (includes `vercel.json` SPA routing rewrites)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Admin Portal
Navigate to `/admin` and enter the curator access key (Default: `azzura2026`).

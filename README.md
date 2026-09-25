# CS Student Portfolio

A modern, interactive portfolio web app built with React, Vite, TypeScript, and Tailwind CSS. Features a cyberpunk terminal HUD theme with real-time updates, GitHub OAuth authentication, and Supabase backend integration.

## Features

- **Hero Section** — Introduction with GitHub sign-in
- **Projects Grid** — Showcase projects with tech stack, GitHub links, and demo URLs
- **Skills Matrix** — Display technical skills by category
- **Guestbook** — Authenticated visitor messages (read-only comments)
- **Command Palette** — Quick search across nav, projects, skills, and commands (⌘K or Ctrl+K)
- **Real-time Updates** — Projects and guestbook data synced via Supabase
- **GitHub OAuth** — Seamless authentication via GitHub
- **Responsive Design** — Optimized for mobile and desktop
- **Cyberpunk Theme** — Neon accents (cyan #00f0ff, amber #ffaa00, green #00ff88), glassmorphism cards, scanlines effect

## Tech Stack

- **Frontend:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS v3, Framer Motion animations, Lucide React icons
- **Backend:** Supabase (PostgreSQL, Row Level Security, real-time subscriptions)
- **Authentication:** GitHub OAuth via Supabase
- **Deployment:** Netlify (SPA routing via netlify.toml)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase project (create at [supabase.com](https://supabase.com))
- GitHub OAuth app (create at [github.com/settings/developers](https://github.com/settings/developers/oauth-apps/new))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. Set up the database (one time):
   ```bash
   psql -U postgres -h localhost -f schema.sql
   ```
   Or use the Supabase SQL editor to run `schema.sql`.

5. Start the dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── components/
│   ├── shared/              # Reusable UI components (Button, Card, Loading)
│   ├── projects/            # Projects grid and individual project cards
│   ├── guestbook/           # Guestbook section and form
│   ├── skills/              # Skills matrix and categories
│   ├── Hero.tsx             # Landing section
│   ├── Navbar.tsx           # Navigation bar
│   ├── CommandPalette.tsx   # Quick search overlay
│   └── index.tsx            # Root App component
├── hooks/
│   ├── useAuth.ts           # GitHub authentication
│   ├── useProjects.ts       # Fetch projects from Supabase
│   └── useGuestbook.ts      # Fetch guestbook messages
├── lib/
│   ├── supabase.ts          # Supabase client setup
│   ├── auth.ts              # Auth functions
│   ├── constants.ts         # Navigation links and terminal commands
│   ├── types.ts             # TypeScript interfaces
│   └── database.types.ts    # Supabase-generated types
├── data/
│   └── skills.ts            # Skill categories and descriptions
└── index.css                # Tailwind directives + custom CSS
```

## Database Schema

### Projects Table
```sql
id (UUID, PK)
title (text)
description (text)
tech_stack (text[])
github_url (text)
demo_url (text)
featured (boolean)
created_at (timestamp)
updated_at (timestamp)
```

### Guestbook Table
```sql
id (UUID, PK)
user_id (UUID, FK to auth.users)
user_github_handle (text)
avatar_url (text)
message (text)
created_at (timestamp)
```

## Available Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run type-check` — Type check TypeScript
- `npm run lint` — Lint with ESLint

## Deployment

### Netlify

1. Push to GitHub and connect the repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

The `netlify.toml` file is pre-configured with SPA routing for hash-based navigation.

## Authentication Flow

1. User clicks "Sign in with GitHub"
2. Redirected to Supabase OAuth flow
3. GitHub OAuth confirmation
4. Session stored in browser
5. User can now write guestbook messages
6. Sign out clears session

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbG...` |

## License

MIT

## Contact

Built with React, Tailwind, and Supabase.

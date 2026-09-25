# Task 4 Fix Report — App.tsx routing / section rendering

**Status: DONE** (no App.tsx changes were required)

## Summary

The premise of the task was stale. `src/App.tsx` already imported and rendered
Projects, Skills and Guestbook under anchors matching `lib/constants.ts`.
The real reason nothing rendered was an **environment variable name mismatch**
that crashed the app at import time, before React mounted.

## Findings vs. reported state

| Reported | Actual |
|---|---|
| App renders only Navbar, Hero, CommandPalette | False — all sections already rendered |
| Sections unreachable | True, but cause was a boot crash, not missing JSX |
| No routing (BrowserRouter unused) | Confirmed, and correctly so — single page + hash anchors needs no router |
| No AuthProvider | Confirmed, and fine — `useAuth` per consumer is adequate for 3 callers |

## Root cause

`src/lib/supabase.ts:7` throws at module scope:

```ts
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
```

`App.tsx` -> `Projects`/`Guestbook` -> `supabase.ts`, so this throw happens
during the initial import graph. `main.tsx` never reaches `createRoot().render()`,
producing a blank page with **no** section markup at all.

Two causes stacked:
1. No `.env` / `.env.local` file existed at all.
2. Once created, the key was named `VITE_SUPABASE_PUBLISHABLE_KEY`
   (Supabase's newer dashboard label) while the code reads
   `VITE_SUPABASE_ANON_KEY`.

## Fix applied

One line, config only. In `.env.local`:

```diff
-VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
+VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

No source files were modified. `App.tsx`, `constants.ts` and all components
were left untouched, per scope.

## Verification

Typecheck:
```
$ npx tsc --noEmit
TSC_EXIT=0
```

Production build:
```
$ npm run build
✓ 386 modules transformed.
dist/index.html                   0.46 kB │ gzip:   0.30 kB
dist/assets/index-BTuPhNLJ.css   14.27 kB │ gzip:   3.67 kB
dist/assets/index-Dsj--3B3.js   487.57 kB │ gzip: 143.41 kB
✓ built in 2.45s
BUILD_EXIT=0
```

Dev server + env reaching the client:
```
$ npm run dev
VITE v5.4.21  ready in 133 ms
➜  Local:   http://localhost:5199/

$ curl -s localhost:5199/src/lib/supabase.ts | head -1
import.meta.env = {..., "VITE_SUPABASE_ANON_KEY": "...", "VITE_SUPABASE_URL": "..."}
```
Both names now present, so the module-scope throw no longer fires.

All section modules transform cleanly:
```
200 src/App.tsx
200 src/components/projects/Projects.tsx
200 src/components/skills/Skills.tsx
200 src/components/guestbook/Guestbook.tsx
200 src/components/Navbar.tsx
```

Supabase tables the app queries are reachable with the anon key:
```
projects     HTTP 200 []
guestbook    HTTP 200 []
```
Both empty, so Projects renders its "No projects are available yet." empty
state and Guestbook renders empty — the error branches are not hit.

Nav anchors match rendered section ids:
```
nav hrefs:    #guestbook #projects #skills
section ids:  #guestbook #projects #skills
ALL NAV LINKS HAVE MATCHING SECTIONS
```

## Notes

- `src/lib/constants.ts` was changed concurrently during this task
  (`navigation` -> `NAV_LINKS`, plus `TERMINAL_COMMANDS`). `Navbar.tsx` already
  imports `NAV_LINKS`; hrefs are unchanged and still match. Not touched by me.
- `.env.example` disappeared from the repo during this session (appears to have
  been renamed to `.env.local`). Worth restoring as a template for other devs.
- `.env.local` is gitignored (`.gitignore:25`); `.env` is **not**. Keep creds in
  `.env.local`.
- Skipped: AuthProvider, BrowserRouter, any App.tsx edit. Add a router only when
  real multi-page URLs are needed; add a provider when `useAuth` consumers grow
  past a handful or duplicate session fetches become measurable.

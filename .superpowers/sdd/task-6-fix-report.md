# Task 6 Fix Report — Terminal commands + naming

Status: DONE

## Changes

### `src/lib/constants.ts`
- Renamed `navigation` → `NAV_LINKS` (same three entries, still `as const`).
- Added `TERMINAL_COMMANDS` with `help`, `projects`, `skills`, `contact` mapped to their descriptions.

### `src/components/Navbar.tsx`
- Import and usage updated to `NAV_LINKS`. No behavior change.

### `src/components/CommandPalette.tsx`
- Imports `NAV_LINKS, TERMINAL_COMMANDS`.
- `filteredCommands = Object.entries(TERMINAL_COMMANDS)` filtered on name + description with the existing `matches()` helper, so commands respect the search box like every other section.
- Added to `hasResults`, so the "No results found." state stays correct.
- Renders two sections: "Navigation" (heading renamed from "Go to", nav-link behavior unchanged) and "Commands" (buttons with name + description, dismissing the palette on click).

## Verification
- `npm run build` (tsc + vite build) passes: 386 modules, built in 1.21s.
- No other importers of `navigation` existed (grepped `src/`), so the rename is complete.
- Repo has no test script, so build is the only runnable check.

## Deliberate shortcut
Command buttons currently only call `onClose()` — same interaction contract as nav links, nothing invented. Marked in the file with a `ponytail:` comment. Wire real handlers when the commands actually do something (e.g. a help overlay or a contact section anchor).

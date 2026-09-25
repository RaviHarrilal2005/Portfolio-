# Manual testing checklist

Use a real browser (desktop and mobile-width viewport). Check each item after a fresh page load unless noted otherwise.

## Environment and startup

- [ ] Confirm Node.js and npm are installed.
- [ ] Run `npm ci`.
- [ ] Create a local env file with `VITE_SUPABASE_URL` and either `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`.
- [ ] Start the app with `npm run dev` and confirm it loads without a blank screen or console exception.
- [ ] Run `npm run build` and confirm the production build succeeds.
- [ ] **Cloud-dependent:** the Supabase URL/key must point to a real project with the expected `projects` and `guestbook` schema (or the corresponding configured local Supabase instance).

## Main sections

- [ ] Navbar links scroll to Projects, Skills, and Guestbook; the logo returns to the top.
- [ ] Projects shows loading feedback, then project cards when data exists.
- [ ] Skills renders every skill category and skill item with readable spacing.
- [ ] Guestbook shows existing messages, or the empty state when there are none.
- [ ] **Cloud-dependent:** Projects and guestbook data require the real Supabase values/schema.

## GitHub authentication and guestbook

- [ ] Signed out: the navbar shows Sign in and Guestbook explains that GitHub sign-in is required.
- [ ] Click Sign in; complete GitHub OAuth; return to the portfolio and confirm the signed-in state appears.
- [ ] Signed in: enter a non-empty message and post it; confirm it appears in the list.
- [ ] Try submitting an empty message and confirm validation prevents posting.
- [ ] Sign out, refresh, and confirm the signed-out state returns.
- [ ] **Cloud-dependent:** GitHub OAuth requires configured Supabase provider credentials, redirect URLs, and the real OAuth application configuration. Posting requires the real guestbook table and policies/schema.

## Command palette

- [ ] Open it with `Cmd+K` on macOS or `Ctrl+K` on other platforms; confirm focus lands in the search field.
- [ ] Search for a navigation item, command, project, and skill; confirm matching results update.
- [ ] Activate a navigation/project/skill result and confirm it navigates to the expected section and closes the palette.
- [ ] Press `Escape` or click the backdrop; confirm the palette closes.
- [ ] Search for nonsense text and confirm “No results found.” appears.
- [ ] **Cloud-dependent for project results:** project search requires the real Supabase project data/schema.

## Loading and error states

- [ ] Throttle or temporarily disable the network during initial loading; confirm loading indicators are visible.
- [ ] With Supabase unavailable or misconfigured, confirm Projects and Guestbook show user-facing error states rather than crashing.
- [ ] In Guestbook, confirm the guestbook load error offers “Try again.”
- [ ] With a failed or rejected post, confirm the form shows an error and exits the submitting state.
- [ ] Restore connectivity and refresh; confirm the app recovers.

## Responsive and accessibility checks

- [ ] Test at a narrow phone width (~375px), tablet width, and desktop width; confirm no horizontal overflow or clipped content.
- [ ] At narrow widths, confirm navigation remains usable and cards/forms fit the viewport.
- [ ] Use keyboard only to reach the palette trigger, search field, links, form controls, and buttons; confirm visible focus and usable activation.
- [ ] Enable reduced motion and confirm content remains usable without required animation.

## Netlify production verification

- [ ] Confirm the Netlify deploy succeeds using the repository build command (`npm run build`) and the correct publish directory (`dist`).
- [ ] Set production `VITE_SUPABASE_URL` and either `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY` in Netlify; redeploy after changing them.
- [ ] Open the deployed HTTPS URL in a private window and repeat the main-section, palette, responsive, and error-state checks.
- [ ] Complete GitHub sign-in from the deployed URL and confirm the OAuth callback returns to the site.
- [ ] Post and reload a guestbook message to verify production reads/writes.
- [ ] **Cloud-dependent:** production verification requires the real Supabase values/schema, GitHub OAuth provider credentials, and the deployed URL in Supabase/GitHub redirect configuration.

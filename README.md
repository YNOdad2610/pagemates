# Pagemates

Landing page for an early-access test of Pagemates: pick a book, get matched into a
small club of 4–6 readers, meet on video or at a partner café.

Live at https://ynodad2610.github.io/pagemates/ (GitHub Pages, from `main`).

- `index.html` — the whole page: club-picker demo and signup form.
  Set `CONFIG.SIGNUP_ENDPOINT` to the Apps Script web app URL to collect signups.
- `apps-script.gs` — the collector. Paste into the "Pagemates signups" Google Sheet
  (Extensions → Apps Script) and deploy as a web app (Execute as: Me, Access: Anyone).

Tag each channel's link with `?ad=<source>` (reddit, facebook, events, flyer, network,
creator); the sheet's summary tab counts page views, book picks and signups per source.

Part of the Pangea book club concept: `christopher/app_concepts/` in the Pangea repo.

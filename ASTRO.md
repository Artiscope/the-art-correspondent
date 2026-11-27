# How Astro builds this site

Since 27 November 2026 the site is built with Astro. Nothing about the
pages, their addresses or how they are edited has changed.

- The words still live in `data/content.json` and the page layouts in
  `data/pages.json`. Artiscope Digital Home reads and writes those files
  as before, and its preview still matches the published page, because
  the pages are still made by `tools/build.mjs` and `assets/render.js`.
- `src/content.config.ts` sets the rules each story and subject must
  follow (a known section, its words, sources with working-looking
  links). A broken entry stops the build with a plain message instead of
  reaching the live site.
- `src/lib/site.mjs` runs `tools/build.mjs`, hands the pages to Astro and
  puts everything else (assets, sitemap, robots.txt, llms.txt, the search
  list and the old-address forwards) into `public/` unchanged. It adds two
  things to the head of each page: a short cross-fade between pages with
  the masthead held still, and background fetching of a page when a
  reader rests on its link. Browsers that cannot do either simply change
  page as before.
- `src/pages/` hands out the pages at the same addresses as before.

Commands: `npm ci` once, then `npx astro dev` for a local copy that
reloads as you edit (data files and assets included), or
`npx astro build` to build into `_site`.

`tools/build.mjs` and `assets/render.js` stay the same as the Digital
Home template, so a design change is still made there and copied here.

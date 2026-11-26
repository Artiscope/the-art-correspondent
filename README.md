# The Art Correspondent

The people, practice and culture magazine. Live at theartcorrespondent.com.

The site is edited in Artiscope Digital Home. Nothing here needs editing by
hand to change the words, the stories, the pages or the look.

- `data/content.json`: the stories, the subjects they are filed under, the
  site's details (email, web address, the nib logo's outline) and the old
  addresses that forward to the new pages.
- `data/pages.json`: the pages and their sections, the menu bar and the footer,
  kept by the page editor.
- `data/theme.json`: the colours, typefaces and theme settings.
- `assets/render.js`: draws every page. The page editor uses it for its
  preview, so the preview and the published page always match.
- `assets/brand/`: the nib logo, the tab icons and the sharing picture.
- `tools/build.py <folder>`: builds the pages into a folder. Publishing runs it
  on every push to main (`.github/workflows/pages.yml`).

Stories live at `stories/<name>/`, subjects at `subjects/<name>/`. Each page's
old address, such as `who-owns-the-street.html`, forwards to its new one.

## Editorial rule

No interview, quote or conversation is invented. An interview is published only
after it has taken place and the transcript is approved. Until then a piece is a
feature or a reported essay.

## Colours

Cream #F3EBDD, near-black #16161A, burgundy #7A2E3A.

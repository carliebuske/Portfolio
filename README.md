# Carlie Buske — Portfolio

Personal portfolio for an Experiential Producer & Creative Director.
Warm Swiss editorial: cream ground, ink type, surgical oxblood accent.

**No build step.** Plain HTML/CSS/JS — open or serve the folder and it runs.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

| File | What it does |
| --- | --- |
| `index.html` | One-page scroll (00–05): hero, moodboard, capabilities, about, clients, contact |
| `styles.css` | Full design system + responsive (desktop/mobile) |
| `app.js` | Moodboard render, filters, modal quick-look, hover/in-view video, press-and-hold drag |
| `case.html` / `case.js` | Case-study template, driven by `?id=` |
| `data/work.js` | **The config.** Every tile is one entry here |
| `assets/` | Poster frames + reels (drop assets here) |

## Adding a project

Add one object to `WORK` in `data/work.js`. Set `poster` to an image path and
`reel` to a Vimeo/Mux embed URL when assets are ready. No layout changes needed.

- `tier: 1` oversized (leads the board) · `2` standard · `3` smaller
- `categories`: any of `experiential`, `ctv`, `production`, `hospitality`
- `type: "swatch"` for a solid color bio/rest tile (`swatchHex` + `bio`)
- `bundle: [{name, note}]` reveals talent names on hover + in the modal
- `inDev: true` frames a case as in-development (e.g. Forma Curate)

## Notes

- Posters are palette-gradient placeholders until real `poster` images are set.
- Reels show a "coming soon" slot until `reel` URLs are added.
- Dragging is a play layer only — reload always returns the curated, tiered order.

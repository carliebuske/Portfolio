/* =========================================================================
   app.js — moodboard rendering, filters, modal quick-look, in-view/hover
   video, and press-and-hold drag-to-rearrange.
   Data comes from window.WORK (data/work.js).
   ========================================================================= */
(function () {
  "use strict";

  const TONES = {
    ink:    ["#2a2926", "#1C1B19"],
    oxblood:["#8e3a33", "#5e221d"],
    deepox: ["#5e1916", "#2e0d0b"],
    olive:  ["#9aa05a", "#6f6738"],
    blue:   ["#cdd7dc", "#9fb0b8"],
    almond: ["#ece6d6", "#d4cbb4"],
    rustic: ["#9a4416", "#5e2a0c"],
    mauve:  ["#a6907f", "#7c6757"],
  };
  const SWATCH = { "#847949": "olive", "#B7C5CC": "blue", "#C4907A": "clay" };

  const FILTERS = ["All", "Experiential", "Social", "CTV", "Publisher", "Production"];
  const FILTER_DOT = {
    All: "var(--ink)", Experiential: "var(--oxblood)", Social: "var(--olive)",
    CTV: "var(--blue)", Publisher: "var(--rustic)", Production: "var(--mauve)",
  };

  const board = document.getElementById("board");
  const filtersEl = document.getElementById("filters");
  const resetBtn = document.getElementById("reset");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");

  let activeFilter = "All";

  /* ---------- reel helpers (Vimeo / YouTube iframe or local <video>) ---------- */
  function vimeoId(url) {
    const m = String(url || "").match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
  }
  function youtubeId(url) {
    const m = String(url || "").match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return m ? m[1] : null;
  }
  // bg=true → silent autoplay loop, no chrome (for tiles). bg=false → full player.
  function reelEmbed(reel, bg) {
    const id = vimeoId(reel);
    if (id) {
      const q = bg
        ? "background=1&autoplay=1&loop=1&muted=1"
        : "autoplay=1&loop=1&title=0&byline=0&portrait=0&dnt=1";
      return `<iframe src="https://player.vimeo.com/video/${id}?${q}" allow="autoplay; fullscreen; picture-in-picture" frameborder="0"></iframe>`;
    }
    const yt = youtubeId(reel);
    if (yt) {
      const q = bg
        ? `autoplay=1&loop=1&mute=1&controls=0&playsinline=1&playlist=${yt}`
        : `autoplay=1&loop=1&playlist=${yt}`;
      return `<iframe src="https://www.youtube.com/embed/${yt}?${q}" allow="autoplay; fullscreen; picture-in-picture" frameborder="0"></iframe>`;
    }
    return bg
      ? `<video autoplay muted loop playsinline src="${reel}"></video>`
      : `<video autoplay loop playsinline controls src="${reel}"></video>`;
  }

  /* ---------- poster background ---------- */
  function posterStyle(item) {
    if (item.poster)
      return `background-image:url('${item.poster}');background-position:${item.posterPos || "center"}`;
    const tone = TONES[item.tone] || TONES.ink;
    return `background-image:linear-gradient(135deg, ${tone[0]}, ${tone[1]})`;
  }

  /* ---------- build one tile ---------- */
  // tier → default footprint (columns × rows); drag-resize overrides these
  const TIER_SPAN = { 1: [2, 2], 2: [2, 1], 3: [1, 1] };

  function makeTile(item) {
    const el = document.createElement("article");
    el.className = `tile tile--t${item.tier}`;
    el.dataset.id = item.id;
    el.dataset.cats = (item.categories || []).join(",");
    const [dw, dh] = TIER_SPAN[item.tier] || [1, 1];
    el.dataset.w = dw;
    el.dataset.h = dh;

    if (item.type === "swatch") {
      const key = SWATCH[item.swatchHex];
      el.classList.add("tile--swatch");
      el.dataset.cats = "about";
      el.innerHTML =
        `<div class="tile__poster" style="background:var(--${key || "olive"})">
           <p class="tile__bio" contenteditable="true" spellcheck="false"></p>
         </div>
         <span class="tile__hex">${item.swatchHex}</span>`;
      // Editable bio — saved per-tile in this browser's localStorage.
      const bioEl = el.querySelector(".tile__bio");
      const saved = localStorage.getItem("bio:" + item.id);
      bioEl.textContent = saved != null ? saved : item.bio;
      const saveBio = () =>
        localStorage.setItem("bio:" + item.id, bioEl.textContent.trim());
      // Don't open About while editing the text.
      ["click", "mousedown", "pointerdown"].forEach((evt) =>
        bioEl.addEventListener(evt, (e) => e.stopPropagation())
      );
      bioEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          bioEl.blur();
        }
      });
      bioEl.addEventListener("blur", saveBio);
      el.addEventListener("click", () => openAbout());
      addResizeGrip(el);
      return el;
    }

    const badge = item.inDev ? `<span class="tile__badge">In development</span>` : "";
    const coming = item.comingSoon ? `<div class="tile__coming"><span>Coming soon</span></div>` : "";
    if (item.reel) el.dataset.reel = item.reel;
    const media = item.reel ? `<div class="tile__media"></div>` : "";
    const bundle = item.bundle
      ? `<div class="tile__bundle"><b>Talent</b>${item.bundle
          .map((b) => `<span>${b.name}${b.note ? ` <i>· ${b.note}</i>` : ""}</span>`)
          .join("")}</div>`
      : "";

    el.innerHTML =
      `<div class="tile__poster" style="${posterStyle(item)}"></div>
       ${media}
       ${bundle}
       ${coming}
       ${badge}
       <div class="tile__meta">
         <p class="tile__title">${item.title}</p>
         <p class="tile__sub">${[item.client, item.dates].filter(Boolean).join(" · ")}</p>
       </div>`;

    // hover → play (desktop only; mobile autoplays on scroll-into-middle)
    if (HOVER) {
      el.addEventListener("mouseenter", () => playTile(el));
      el.addEventListener("mouseleave", () => stopTile(el));
    }
    // click → quick-look (drag handler suppresses this when dragging)
    el.addEventListener("click", (e) => {
      if (el.dataset.dragged === "1") { el.dataset.dragged = "0"; return; }
      openQuickLook(item);
    });

    addResizeGrip(el);
    return el;
  }

  // resize grip (desktop only — touch devices reorder via press-and-hold)
  function addResizeGrip(el) {
    if (!HOVER) return;
    const grip = document.createElement("span");
    grip.className = "tile__resize";
    grip.setAttribute("aria-hidden", "true");
    grip.addEventListener("pointerdown", startResize);
    el.appendChild(grip);
  }

  /* ---------- tile reel play/stop (lazy: media built on first play) ---------- */
  function playTile(el) {
    const reel = el.dataset.reel;
    if (!reel) return;
    const media = el.querySelector(".tile__media");
    if (!media) return;
    if (!media.innerHTML) media.innerHTML = reelEmbed(reel, true);
    else {
      const v = media.querySelector("video");
      if (v) v.play().catch(() => {});
    }
    el.classList.add("playing");
  }
  function stopTile(el) {
    el.classList.remove("playing");
    const media = el.querySelector(".tile__media");
    if (!media) return;
    const v = media.querySelector("video");
    if (v) v.pause();
    else media.innerHTML = ""; // tear down the Vimeo iframe so it stops
  }

  /* Playback model:
     - Desktop (hover capable): play on hover, stop on leave.
     - Mobile (no hover): autoplay once the tile crosses the screen's middle.
       rootMargin -50%/-50% collapses the viewport to a center line; a tile
       "intersects" only while it straddles that line. */
  const HOVER = matchMedia("(hover: hover)").matches;
  const io = (!HOVER && "IntersectionObserver" in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          // reveal title/info while the tile straddles the screen's middle
          en.target.classList.toggle("in-view", en.isIntersecting);
          if (en.target.dataset.reel) {
            en.isIntersecting ? playTile(en.target) : stopTile(en.target);
          }
        });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 })
    : null;

  /* ---------- render ---------- */
  function render() {
    board.innerHTML = "";
    ORDER.forEach((item) => {
      const el = makeTile(item);
      board.appendChild(el);
      if (io) io.observe(el);
    });
    enableDrag();
    layout();
    applyFilter();
  }

  /* ---------- layout engine ----------
     A deterministic dense packer that mirrors (and replaces) CSS auto-placement
     so we can (a) reflow neighbours when a tile is resized/reordered and
     (b) grow tiles to fill any gaps, leaving a flush rectangular block instead
     of an orphaned last row. Footprints come from each tile's data-w / data-h. */
  function gridCols() {
    const cols = getComputedStyle(board).gridTemplateColumns.split(" ").filter(Boolean).length;
    return cols || 6;
  }
  function layout() {
    const tiles = [...board.children].filter((t) => !t.classList.contains("hide"));
    if (!tiles.length) return;
    const cols = gridCols();
    const occ = [];                                  // occ[row][col] = taken?
    const row = (r) => { while (occ.length <= r) occ.push(new Array(cols).fill(false)); return occ[r]; };
    const freeAt = (r, c, w, h, max) => {
      if (c + w > cols) return false;
      for (let i = r; i < r + h; i++) {
        if (max != null && i >= max) return false;   // don't spill past the block
        const rr = row(i);
        for (let j = c; j < c + w; j++) if (rr[j]) return false;
      }
      return true;
    };
    const mark = (r, c, w, h) => {
      for (let i = r; i < r + h; i++) { const rr = row(i); for (let j = c; j < c + w; j++) rr[j] = true; }
    };

    // 1) pack each tile into the first free slot that fits
    tiles.forEach((t) => {
      let w = Math.max(1, Math.min(cols, +t.dataset.w || 1));
      let h = Math.max(1, +t.dataset.h || 1);
      let placed = false;
      for (let r = 0; !placed; r++) {
        row(r);
        for (let c = 0; c <= cols - w; c++) {
          if (freeAt(r, c, w, h)) { mark(r, c, w, h); t._pos = { r, c, w, h }; placed = true; break; }
        }
      }
    });

    // 2) fill any gaps so the block is solid — grow the tile above a hole down,
    //    else the tile to its left rightward. Bounded to the existing rows so we
    //    never create a brand-new ragged row.
    const maxRows = occ.length;
    let changed = true, guard = 0;
    while (changed && guard++ < maxRows * cols + 8) {
      changed = false;
      for (let r = 0; r < maxRows; r++) {
        for (let c = 0; c < cols; c++) {
          if (occ[r][c]) continue;
          const above = r > 0 && tiles.find((t) => t._pos.r + t._pos.h === r && t._pos.c <= c && c < t._pos.c + t._pos.w);
          if (above && freeAt(above._pos.r + above._pos.h, above._pos.c, above._pos.w, 1, maxRows)) {
            mark(above._pos.r + above._pos.h, above._pos.c, above._pos.w, 1); above._pos.h++; changed = true; continue;
          }
          const left = c > 0 && tiles.find((t) => t._pos.c + t._pos.w === c && t._pos.r <= r && r < t._pos.r + t._pos.h);
          if (left && freeAt(left._pos.r, left._pos.c + left._pos.w, 1, left._pos.h, maxRows)) {
            mark(left._pos.r, left._pos.c + left._pos.w, 1, left._pos.h); left._pos.w++; changed = true;
          }
        }
      }
    }

    // 3) commit to inline grid positions
    tiles.forEach((t) => {
      const p = t._pos;
      t.style.gridColumn = `${p.c + 1} / span ${p.w}`;
      t.style.gridRow = `${p.r + 1} / span ${p.h}`;
    });
  }

  /* ---------- drag a corner to resize ---------- */
  function startResize(e) {
    e.preventDefault();
    e.stopPropagation();                              // don't trigger reorder / click
    const el = e.currentTarget.closest(".tile");
    const cs = getComputedStyle(board);
    const cols = gridCols();
    const colGap = parseFloat(cs.columnGap) || 0;
    const rowGap = parseFloat(cs.rowGap) || colGap;
    const cellW = (board.clientWidth - colGap * (cols - 1)) / cols;
    const rowH = parseFloat(cs.gridAutoRows) || el.offsetHeight;
    const startW = +el.dataset.w || 1, startH = +el.dataset.h || 1;
    const sx = e.clientX, sy = e.clientY;
    el.classList.add("resizing");
    document.body.style.cursor = "nwse-resize";

    // Track moves on the window so the drag survives the cursor leaving the
    // (small) tile as it grows — binding to the tile alone loses the events.
    const move = (ev) => {
      const dw = Math.round((ev.clientX - sx) / (cellW + colGap));
      const dh = Math.round((ev.clientY - sy) / (rowH + rowGap));
      const w = Math.max(1, Math.min(cols, startW + dw));
      const h = Math.max(1, Math.min(4, startH + dh));
      if (String(w) !== el.dataset.w || String(h) !== el.dataset.h) {
        el.dataset.w = w; el.dataset.h = h; layout();
      }
    };
    const up = () => {
      el.classList.remove("resizing");
      el.dataset.dragged = "1";                       // swallow the trailing click
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  // re-pack when the column count changes (responsive breakpoints)
  let rT;
  window.addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(layout, 120); });

  /* ---------- filters (hide non-matches, repack matches to the top) ---------- */
  function buildFilters() {
    FILTERS.forEach((f) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(f === "All"));
      btn.innerHTML = `<span class="chip__dot" style="background:${FILTER_DOT[f]}"></span>${f}`;
      btn.addEventListener("click", () => {
        activeFilter = f;
        [...filtersEl.children].forEach((c) =>
          c.setAttribute("aria-pressed", String(c === btn))
        );
        applyFilter();
      });
      filtersEl.appendChild(btn);
    });
  }
  function applyFilter() {
    const key = activeFilter.toLowerCase();
    [...board.children].forEach((el) => {
      const cats = el.dataset.cats || "";
      const match = activeFilter === "All" || cats.split(",").includes(key);
      el.classList.toggle("hide", !match);
    });
    // repack so the matching tiles flow up to the top of the board
    layout();
  }

  /* ---------- modal ---------- */
  function openModal(html) {
    modalBody.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  function openQuickLook(item) {
    const reel = item.reel
      ? reelEmbed(item.reel, false)
      : item.poster
      ? `<img src="${item.poster}" alt="${item.title}" />`
      : "Reel coming soon";
    const bundle = item.bundle
      ? `<div class="ql__bundle">${item.bundle
          .map((b) => `<span>${b.name}${b.note ? ` <i>· ${b.note}</i>` : ""}</span>`)
          .join("")}</div>`
      : "";
    const indev = item.inDev ? `<span class="ql__indev">In development</span>` : "";
    openModal(
      `<div class="ql__reel">${reel}</div>
       <div class="ql__inner">
         ${indev}
         <h2 class="ql__title">${item.title}</h2>
         ${item.tagline ? `<p class="ql__tagline">${item.tagline}</p>` : ""}
         <p class="ql__rolemeta">${[item.client, item.role, item.dates].filter(Boolean).join(" · ")}</p>
         <p class="ql__story">${item.story}</p>
         ${bundle}
         <p class="ql__result">${item.result}</p>
         <a class="ql__cta" href="case.html?id=${item.id}">${item.liveApp ? "Try It →" : "Open the Case →"}</a>
       </div>`
    );
  }

  function openAbout() {
    openModal(
      `<div class="ql__inner" style="padding-top:2.2rem">
         <h2 class="ql__title">A Bit About Me</h2>
         <p class="ql__rolemeta">Carlie Nicole · New York, NY</p>
         <p class="ql__story">I grew up around people who made things: homes, furniture,
           dinners, gardens, businesses, whatever needed building. Now I do the same thing
           with campaigns, experiences, spaces, and systems. Nine years across creative
           direction, experiential production, and innovation. Currently leading creative
           and AI work for Google.</p>
         <p class="ql__result">CU Boulder · BA, Studio Art</p>
         <a class="ql__cta" href="assets/Carlie-Buske-Resume.pdf" download>Download résumé ↓</a>
       </div>`
    );
  }

  /* ---------- press-and-hold drag to rearrange ----------
     Long-press (180ms) lifts a tile; pointermove swaps it past others.
     A plain tap/click is preserved for opening the quick-look. */
  const HOLD_MS = 160;
  let holdTimer = null, lifted = null, startX = 0, startY = 0, pid = null;

  // While a tile is lifted, block page scroll on touch (touch-action alone
  // can't do this mid-gesture). Must be a non-passive listener.
  document.addEventListener("touchmove", (e) => { if (lifted) e.preventDefault(); }, { passive: false });

  function enableDrag() {
    [...board.children].forEach((el) => el.addEventListener("pointerdown", onDown));
  }
  function onDown(e) {
    if (e.button === 1 || e.button === 2) return;
    const el = e.currentTarget;
    el.dataset.dragged = "0";          // clear any stale flag from a prior drag
    startX = e.clientX; startY = e.clientY; pid = e.pointerId;
    holdTimer = setTimeout(() => lift(el), HOLD_MS);
    el.addEventListener("pointermove", preLiftMove);
    el.addEventListener("pointerup", endGesture, { once: true });
    el.addEventListener("pointercancel", endGesture, { once: true });
  }
  // Movement before the hold fires = a scroll/tap, not a drag → abort the lift.
  function preLiftMove(e) {
    if (lifted) return;
    if (Math.hypot(e.clientX - startX, e.clientY - startY) > 10) clearTimeout(holdTimer);
  }
  function lift(el) {
    lifted = el;
    el.classList.add("lifted");
    try { el.setPointerCapture(pid); } catch (_) {}
    el.addEventListener("pointermove", onDrag);
    if (navigator.vibrate) navigator.vibrate(12);
    resetBtn.hidden = false;           // surface reset once a drag begins
  }
  function onDrag(e) {
    if (!lifted) return;
    const target = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((n) => n !== lifted && n.classList && n.classList.contains("tile"));
    if (target) {
      const tiles = [...board.children];
      const li = tiles.indexOf(lifted), ti = tiles.indexOf(target);
      if (li < ti) board.insertBefore(lifted, target.nextSibling);
      else board.insertBefore(lifted, target);
      layout();                         // repack so neighbours reflow live
    }
  }
  function endGesture(e) {
    clearTimeout(holdTimer);
    const el = e.currentTarget;
    el.removeEventListener("pointermove", preLiftMove);
    el.removeEventListener("pointermove", onDrag);
    if (lifted) {
      lifted.classList.remove("lifted");
      lifted.dataset.dragged = "1";    // suppress the click that follows a drag
      lifted = null;
    }
  }

  resetBtn.addEventListener("click", () => {
    ORDER = WORK.filter((w) => !w.hidden);   // back to curated, tiered order
    render();
    resetBtn.hidden = true;
  });

  /* ---------- boot ---------- */
  let ORDER = WORK.filter((w) => !w.hidden);   // sub-cases (hidden) stay reachable by URL only
  buildFilters();
  render();
})();

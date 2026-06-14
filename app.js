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
  const SWATCH = { "#847949": "olive", "#B7C5CC": "blue" };

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

  /* ---------- poster background ---------- */
  function posterStyle(item) {
    if (item.poster) return `background-image:url('${item.poster}')`;
    const tone = TONES[item.tone] || TONES.ink;
    return `background-image:linear-gradient(135deg, ${tone[0]}, ${tone[1]})`;
  }

  /* ---------- build one tile ---------- */
  function makeTile(item) {
    const el = document.createElement("article");
    el.className = `tile tile--t${item.tier}`;
    el.dataset.id = item.id;
    el.dataset.cats = (item.categories || []).join(",");

    if (item.type === "swatch") {
      const key = SWATCH[item.swatchHex];
      el.classList.add("tile--swatch");
      el.dataset.cats = "about";
      el.innerHTML =
        `<div class="tile__poster" style="background:var(--${key || "olive"})">
           <p class="tile__bio">${item.bio}</p>
         </div>
         <span class="tile__hex">${item.swatchHex}</span>`;
      el.addEventListener("click", () => openAbout());
      return el;
    }

    const badge = item.inDev ? `<span class="tile__badge">In development</span>` : "";
    const video = item.reel
      ? `<video class="tile__video" muted loop playsinline preload="none" data-src="${item.reel}"></video>`
      : "";
    const bundle = item.bundle
      ? `<div class="tile__bundle"><b>Talent</b>${item.bundle
          .map((b) => `<span>${b.name}${b.note ? ` <i>· ${b.note}</i>` : ""}</span>`)
          .join("")}</div>`
      : "";

    el.innerHTML =
      `<div class="tile__poster" style="${posterStyle(item)}"></div>
       ${video}
       ${bundle}
       ${badge}
       <div class="tile__meta">
         <p class="tile__title">${item.title}</p>
         <p class="tile__sub">${[item.client, item.dates].filter(Boolean).join(" · ")}</p>
       </div>`;

    // hover (desktop) → play muted loop
    el.addEventListener("mouseenter", () => playTile(el));
    el.addEventListener("mouseleave", () => stopTile(el));
    // click → quick-look (drag handler suppresses this when dragging)
    el.addEventListener("click", (e) => {
      if (el.dataset.dragged === "1") { el.dataset.dragged = "0"; return; }
      openQuickLook(item);
    });
    return el;
  }

  /* ---------- video helpers ---------- */
  function playTile(el) {
    const v = el.querySelector("video");
    if (!v) return;
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
    el.classList.add("playing");
    v.play().catch(() => {});
  }
  function stopTile(el) {
    const v = el.querySelector("video");
    if (!v) return;
    el.classList.remove("playing");
    v.pause();
  }

  /* mobile: autoplay when scrolled into view */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        if (!matchMedia("(hover: none)").matches) return;
        entries.forEach((en) => (en.isIntersecting ? playTile(en.target) : stopTile(en.target)));
      }, { threshold: 0.6 })
    : null;

  /* ---------- render ---------- */
  function render() {
    board.innerHTML = "";
    ORDER.forEach((item) => {
      const el = makeTile(item);
      board.appendChild(el);
      if (io && item.reel) io.observe(el);
    });
    enableDrag();
    applyFilter();
  }

  /* ---------- filters (dim/highlight in place) ---------- */
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
      el.classList.toggle("dim", !match);
    });
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
      ? `<video src="${item.reel}" autoplay muted loop playsinline controls></video>`
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
         <p class="ql__rolemeta">${[item.client, item.role, item.dates].filter(Boolean).join(" · ")}</p>
         <p class="ql__story">${item.story}</p>
         ${bundle}
         <p class="ql__result">${item.result}</p>
         <a class="ql__cta" href="case.html?id=${item.id}">Full case →</a>
       </div>`
    );
  }

  function openAbout() {
    openModal(
      `<div class="ql__inner" style="padding-top:2.2rem">
         <h2 class="ql__title">About</h2>
         <p class="ql__rolemeta">Carlie Buske · New York, NY</p>
         <p class="ql__story">A creative operator who builds the experience and the
           systems that run it. Nine years across experiential production, creative
           direction, and innovation. Currently leading creative &amp; AI work for
           Google, including the Pinterest&nbsp;×&nbsp;Gemini back-to-school partnership.</p>
         <p class="ql__result">University of Colorado Boulder · BA, Studio Art</p>
         <a class="ql__cta" href="mailto:hello@carlie.wtf">hello@carlie.wtf →</a>
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
    ORDER = WORK.slice();               // back to curated, tiered order
    render();
    resetBtn.hidden = true;
  });

  /* ---------- boot ---------- */
  let ORDER = WORK.slice();
  buildFilters();
  render();
})();

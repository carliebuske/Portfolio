/* case.js — renders a full case page from window.WORK using ?id= */
(function () {
  "use strict";
  const id = new URLSearchParams(location.search).get("id");
  const item = (window.WORK || []).find((w) => w.id === id);
  const root = document.getElementById("case");

  if (!item || item.type === "swatch") {
    root.innerHTML =
      `<a class="case__back" href="index.html#work">← Back to work</a>
       <h1 class="case__title" style="margin-top:1.5rem">Not found</h1>
       <p class="case__story">That case doesn't exist yet.</p>`;
    return;
  }

  document.title = `${item.title} — Carlie Nicole`;

  const vimeoId = (url) => {
    const m = String(url || "").match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
  };
  function reelEmbed(url) {
    const id = vimeoId(url);
    return id
      ? `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1&loop=1&title=0&byline=0&portrait=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" frameborder="0"></iframe>`
      : `<video src="${url}" autoplay loop playsinline controls></video>`;
  }
  // Secondary clips: rendered via Vimeo's responsive player (case.js inits it
  // after mount) so each clip fills at its OWN aspect ratio — no black bars,
  // even when the cuts are mixed vertical / square / widescreen.
  function clipNode(url) {
    const id = vimeoId(url);
    return id
      ? `<div class="case__clip" data-vimeo="${id}"></div>`
      : `<div class="case__clip"><video src="${url}" controls playsinline></video></div>`;
  }
  function clipsBlock(list, heading) {
    if (!list.length) return "";
    return `<section class="case__section" style="max-width:none">
              ${heading ? `<h2 class="case__h">${heading}</h2>` : ""}
              <div class="case__clips">${list.map(clipNode).join("")}</div>
            </section>`;
  }

  const reel = item.reel
    ? reelEmbed(item.reel)
    : item.poster
    ? `<img src="${item.poster}" alt="${item.title}" />`
    : "Full-bleed reel — coming soon";
  const indev = item.inDev ? `<span class="case__indev">In development</span>` : "";
  const bundle = item.bundle
    ? `<div class="ql__bundle" style="margin-top:1.4rem">${item.bundle
        .map((b) => {
          const inner = `${b.name}${b.note ? ` <i>· ${b.note}</i>` : ""}`;
          return b.id
            ? `<a class="ql__bundlelink" href="case.html?id=${b.id}">${inner} →</a>`
            : `<span>${inner}</span>`;
        })
        .join("")}</div>`
    : "";
  const gallery = item.gallery && item.gallery.length
    ? `<div class="case__gallery">${item.gallery
        .map((src) => `<img src="${src}" alt="${item.title}" loading="lazy" />`)
        .join("")}</div>`
    : "";
  // Split the films: first two above the stills, the rest below.
  const allClips = item.clips || [];
  const clipsTop = clipsBlock(allClips.slice(0, 2), "The films");
  const clipsBottom = clipsBlock(allClips.slice(2), "");
  const meta = item.caseMeta || [item.client, item.role, item.dates].filter(Boolean).join(" · ");

  // Narrative sections (opportunity / idea / execution / role …)
  const sections = (item.sections || [])
    .map((s) => {
      const list = s.list && s.list.length
        ? `<ul class="case__list">${s.list.map((li) => `<li>${li}</li>`).join("")}</ul>`
        : "";
      return `<section class="case__section">
                <h2 class="case__h">${s.h}</h2>
                ${s.p ? `<p class="case__body">${s.p}</p>` : ""}
                ${list}
              </section>`;
    })
    .join("");

  // Results — a metric grid when provided, else the single headline result
  const results = item.results && item.results.length
    ? `<section class="case__section">
         <h2 class="case__h">The results</h2>
         <ul class="case__results">${item.results.map((r) => `<li>${r}</li>`).join("")}</ul>
       </section>`
    : item.result
    ? `<p class="case__result">${item.result}</p>`
    : "";

  // Recognition — wins + additional nods
  const awards = item.awards
    ? `<section class="case__section">
         <h2 class="case__h">Recognition</h2>
         <ul class="case__awards">${(item.awards.wins || []).map((w) => `<li>${w}</li>`).join("")}</ul>
         ${item.awards.more ? `<p class="case__more">${item.awards.more}</p>` : ""}
       </section>`
    : "";

  root.innerHTML =
    `<a class="case__back" href="index.html#work">← Back to work</a>
     <div class="case__reel">${reel}</div>
     ${indev}
     <h1 class="case__title">${item.title}</h1>
     <p class="case__meta">${meta}</p>
     <p class="case__story">${item.story}</p>
     ${bundle}
     ${sections}
     ${results}
     ${awards}
     ${clipsTop}
     ${gallery}
     ${clipsBottom}`;

  // Init Vimeo responsive players so each clip sizes to its native ratio.
  if (window.Vimeo && window.Vimeo.Player) {
    document.querySelectorAll(".case__clip[data-vimeo]").forEach((el) => {
      new window.Vimeo.Player(el, {
        id: Number(el.dataset.vimeo),
        responsive: true,
        title: false, byline: false, portrait: false, dnt: true,
      });
    });
  }
})();

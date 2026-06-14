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

  document.title = `${item.title} — Carlie Buske`;

  const reel = item.reel
    ? `<video src="${item.reel}" autoplay muted loop playsinline controls></video>`
    : item.poster
    ? `<img src="${item.poster}" alt="${item.title}" />`
    : "Full-bleed reel — coming soon";
  const indev = item.inDev ? `<span class="case__indev">In development</span>` : "";
  const bundle = item.bundle
    ? `<div class="ql__bundle" style="margin-top:1.4rem">${item.bundle
        .map((b) => `<span>${b.name}${b.note ? ` <i>· ${b.note}</i>` : ""}</span>`)
        .join("")}</div>`
    : "";
  const gallery = item.gallery && item.gallery.length
    ? `<div class="case__gallery">${item.gallery
        .map((src) => `<img src="${src}" alt="${item.title}" loading="lazy" />`)
        .join("")}</div>`
    : "";
  const meta = [item.client, item.role, item.dates].filter(Boolean).join(" · ");

  root.innerHTML =
    `<a class="case__back" href="index.html#work">← Back to work</a>
     <div class="case__reel">${reel}</div>
     ${indev}
     <h1 class="case__title">${item.title}</h1>
     <p class="case__meta">${meta}</p>
     <p class="case__story">${item.story}</p>
     ${bundle}
     <p class="case__result">${item.result}</p>
     ${gallery}`;
})();

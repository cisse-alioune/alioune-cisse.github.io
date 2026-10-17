(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  root.classList.add("js");

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- Icons (Lucide-style, stroke) ---------- */
  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    play: '<path d="M6 3l14 9-14 9V3z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    check: '<path d="M20 6 9 17l-5-5"/>'
  };
  function icon(name) {
    var s = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("class", "icon i-" + name);
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[name] || "";
    return s;
  }
  function paintIcons(scope) {
    (scope || doc).querySelectorAll("[data-icon]").forEach(function (el) {
      if (el.querySelector(":scope > svg.icon")) return;
      el.insertBefore(icon(el.getAttribute("data-icon")), el.firstChild);
    });
  }

  /* ---------- Theme ---------- */
  function currentTheme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    store("theme", t);
    var m = doc.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "dark" ? "#0d1117" : "#f6f7f9");
    var b = doc.querySelector(".theme-toggle");
    if (b) b.setAttribute("aria-pressed", String(t === "dark"));
  }

  /* ---------- Language ---------- */
  var EN = window.I18N_EN || {};
  var lang = "fr";
  function t(key) { return lang === "en" ? (EN[key] || key) : null; }

  function applyLang(l) {
    lang = l;
    root.setAttribute("lang", l);
    store("lang", l);
    doc.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.dataset.fr === undefined) el.dataset.fr = el.textContent;
      el.textContent = l === "en" ? (EN[el.dataset.i18n] || el.dataset.fr) : el.dataset.fr;
    });
    doc.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
      el.innerHTML = l === "en" ? (EN[el.dataset.i18nHtml] || el.dataset.fr) : el.dataset.fr;
    });
    doc.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(";").forEach(function (pair) {
        var p = pair.split(":"), attr = p[0].trim(), key = p[1].trim();
        var frKey = "fr" + attr.replace(/(^|-)(\w)/g, function (_, __, c) { return c.toUpperCase(); });
        if (el.dataset[frKey] === undefined) el.dataset[frKey] = el.getAttribute(attr) || "";
        el.setAttribute(attr, l === "en" ? (EN[key] || el.dataset[frKey]) : el.dataset[frKey]);
      });
    });
    doc.querySelectorAll(".seg [data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === l));
    });
    doc.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  }

  /* ---------- Boot ---------- */
  function boot() {
    paintIcons();

    // theme
    var tb = doc.querySelector(".theme-toggle");
    if (tb) { tb.appendChild(icon("moon")); tb.appendChild(icon("sun")); }
    var mbi = doc.querySelector(".menu-btn svg");
    if (mbi) mbi.replaceWith(icon("menu"));
    if (tb) { tb.addEventListener("click", function () { setTheme(currentTheme() === "dark" ? "light" : "dark"); }); }
    setTheme(currentTheme());

    // language
    doc.querySelectorAll(".seg [data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.dataset.lang); });
    });
    var saved = store("lang");
    var initial = saved || ((navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en");
    applyLang(initial);

    // mobile menu
    var mb = doc.querySelector(".menu-btn"), mm = doc.getElementById("mobile-menu");
    if (mb && mm) {
      var setMenu = function (open) {
        mm.classList.toggle("open", open);
        mb.setAttribute("aria-expanded", String(open));
        mb.querySelector("svg").replaceWith(icon(open ? "x" : "menu"));
      };
      mb.addEventListener("click", function () { setMenu(!mm.classList.contains("open")); });
      mm.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
      doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && mm.classList.contains("open")) { setMenu(false); mb.focus(); } });
    }

    // reveal on scroll
    var rv = doc.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      rv.forEach(function (el) { io.observe(el); });
    } else rv.forEach(function (el) { el.classList.add("in"); });

    initPlot();
    initFilters();
    initDemos();
    initForm();
    initToc();
    var pb = doc.querySelector("[data-print]");
    if (pb) pb.addEventListener("click", function () { window.print(); });
  }

  /* ---------- Hero scatter plot (3 clusters, flat colours, theme-aware) ---------- */
  function initPlot() {
    var cv = doc.getElementById("plot");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 0.58; }
    var centers = [[0.28, 0.32], [0.7, 0.3], [0.52, 0.74]], pts = [];
    centers.forEach(function (c, k) {
      for (var i = 0; i < 46; i++) pts.push({ k: k, x: c[0] + gauss() * 0.055, y: c[1] + gauss() * 0.065, ph: rnd() * 6.28, sp: 0.4 + rnd() * 0.6 });
    });
    var w = 0, h = 0, dpr = 1, raf = 0, visible = true;

    function colors() {
      var cs = getComputedStyle(root);
      return {
        k: [cs.getPropertyValue("--accent").trim(), cs.getPropertyValue("--amber").trim(), cs.getPropertyValue("--teal").trim()],
        grid: cs.getPropertyValue("--border").trim(), axis: cs.getPropertyValue("--muted").trim(), bg: cs.getPropertyValue("--surface").trim()
      };
    }
    function size() {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(time) {
      var c = colors(), pad = 28, pw = w - pad * 2, ph = h - pad * 2;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = c.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var gx = pad + (pw * i) / 4, gy = pad + (ph * i) / 4;
        ctx.beginPath(); ctx.moveTo(gx, pad); ctx.lineTo(gx, pad + ph); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pad, gy); ctx.lineTo(pad + pw, gy); ctx.stroke();
      }
      ctx.fillStyle = c.axis; ctx.font = "11px 'Fira Code', monospace";
      ctx.fillText("x₁", pad + pw - 14, pad + ph + 18); ctx.fillText("x₂", 4, pad + 8);
      var t = reduce ? 0 : time / 1000;
      pts.forEach(function (p) {
        var x = pad + (p.x + Math.sin(t * p.sp + p.ph) * 0.006) * pw, y = pad + (p.y + Math.cos(t * p.sp + p.ph) * 0.006) * ph;
        ctx.fillStyle = c.k[p.k]; ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, 6.2832); ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.lineWidth = 2;
      centers.forEach(function (ct, k) {
        var x = pad + ct[0] * pw, y = pad + ct[1] * ph;
        ctx.strokeStyle = c.k[k]; ctx.fillStyle = c.bg;
        ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.2832); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4); ctx.stroke();
      });
    }
    function loop(time) { draw(time); if (!reduce && visible) raf = requestAnimationFrame(loop); }
    function start() { cancelAnimationFrame(raf); size(); if (reduce) draw(0); else raf = requestAnimationFrame(loop); }

    start();
    window.addEventListener("resize", function () { size(); draw(performance.now()); });
    new MutationObserver(function () { draw(performance.now()); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
      }).observe(cv);
    }
  }

  /* ---------- Project filters ---------- */
  function initFilters() {
    var bar = doc.querySelector(".filters");
    if (!bar) return;
    var cards = doc.querySelectorAll("[data-cat]"), note = doc.getElementById("result-note");
    function counts() {
      bar.querySelectorAll("button").forEach(function (b) {
        var f = b.dataset.filter, n = f === "all" ? cards.length : [].filter.call(cards, function (c) { return c.dataset.cat.split(" ").indexOf(f) > -1; }).length;
        var span = b.querySelector(".count"); if (span) span.textContent = n;
      });
    }
    function apply(f) {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = f === "all" || c.dataset.cat.split(" ").indexOf(f) > -1;
        c.hidden = !ok; if (ok) shown++;
      });
      bar.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === f)); });
      if (note) { note.dataset.n = shown; note.firstElementChild.textContent = shown; }
      store("pf", f);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) apply(b.dataset.filter); });
    counts(); apply("all");
  }

  /* ---------- Lazy demo GIFs (they are ~10 MB: load on demand only) ---------- */
  function initDemos() {
    doc.querySelectorAll("[data-demo]").forEach(function (btn) {
      var box = doc.getElementById(btn.dataset.demo), img = box && box.querySelector("img");
      if (!box || !img) return;
      var label = btn.querySelector("[data-i18n]");
      btn.addEventListener("click", function () {
        var open = box.hidden;
        if (open && !img.getAttribute("src")) img.setAttribute("src", img.dataset.src);
        box.hidden = !open;
        btn.setAttribute("aria-expanded", String(open));
        if (label) {
          label.dataset.i18n = open ? "proj.demo.hide" : "proj.demo";
          label.dataset.fr = open ? "Masquer la démo" : "Voir la démo";
          label.textContent = lang === "en" ? EN[label.dataset.i18n] : label.dataset.fr;
        }
      });
    });
  }

  /* ---------- Contact form → mailto (no backend needed) ---------- */
  function initForm() {
    var f = doc.getElementById("contact-form");
    if (!f) return;
    var err = doc.getElementById("form-error");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(f), n = (d.get("name") || "").toString().trim(), em = (d.get("email") || "").toString().trim(),
        s = (d.get("subject") || "").toString().trim(), m = (d.get("message") || "").toString().trim();
      if (!n || !s || !m || !/^\S+@\S+\.\S+$/.test(em)) { err.hidden = false; return; }
      err.hidden = true;
      var body = m + "\n\n— " + n + " (" + em + ")";
      window.location.href = "mailto:cissealioune.sn@gmail.com?subject=" + encodeURIComponent(s) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- CV table of contents scroll-spy ---------- */
  function initToc() {
    var links = doc.querySelectorAll(".cv-toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { links.forEach(function (a) { a.classList.remove("active"); }); map[e.target.id].classList.add("active"); }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var s = doc.getElementById(id); if (s) io.observe(s); });
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})();

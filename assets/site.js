/* Baher Elsheikh engineering knowledge site: page rendering, filters and search.
   Content comes from assets/data.js; this file does not need editing to add content. */
(function(){
  "use strict";
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const BASE = (document.currentScript && document.currentScript.src) ? new URL("..", document.currentScript.src).href : "/";
  const isExt = u => /^https?:\/\//.test(u || "");
  const href = u => isExt(u) ? u : BASE + (u || "");
  const page = document.body.dataset.page || "home";
  const MIN_LESSONS = 3;

  /* line icons, one stroke weight */
  const ICONS = {
    vessel: '<path d="M7.5 8h9a4 4 0 0 1 0 8h-9a4 4 0 0 1 0-8z"/><path d="M12 8V5M10 5h4M8.5 16l-1.2 3.5M15.5 16l1.2 3.5M6 19.5h3M15 19.5h3"/>',
    grains: '<path d="M3.5 5.5l5-2 4 2.5-1 5-5 1.5-3-3z"/><path d="M12.5 6l5-1.5 3 4-2 3.5-4.5-.5-2.5-.5"/><path d="M6.5 12.5l1 5 5 2.5 3-4-1.5-4.5"/><path d="M15.5 16l4.5 1 .5-5.5"/>',
    flame: '<path d="M12 3c3 3.6 5.5 6.2 5.5 10a5.5 5.5 0 0 1-11 0c0-2.4 1.2-4.2 3-5.5.1 1.8.9 3 2.2 3.3C11.4 8.5 11 6 12 3z"/><path d="M4.5 21h15"/>',
    lens: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3L20.5 20.5"/><path d="M8 8.5l2 1.8-1.2 1.6 2.4 1.6"/>',
    weld: '<path d="M2.5 17.5h19"/><path d="M2.5 13.5h6.5l3-5.5 3 5.5h6.5"/><path d="M9.5 13.5c.8-1 1.7-1 2.5 0 .8-1 1.7-1 2.5 0"/><path d="M12 4.5v-1.5M8.5 5.5l-1-1M15.5 5.5l1-1"/>',
    book: '<path d="M5 4.5h11.5A2.5 2.5 0 0 1 19 7v13H7.5A2.5 2.5 0 0 1 5 17.5z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H19"/><path d="M9 8.5h6M9 11.5h4"/>'
  };
  const icon = n => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;

  /* technical sketches used where an item has no photo */
  const TH = (inner, label) => `<svg viewBox="0 0 320 160" role="img" aria-label="${label}"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;
  const TEXT = (x,y,t,a) => `<text x="${x}" y="${y}" ${a?`text-anchor="${a}"`:""} fill="currentColor" stroke="none" font-family="IBM Plex Sans, Arial, sans-serif" font-size="11">${t}</text>`;
  const THUMBS = {
    "static-equipment": TH(`<path d="M80 58H240M80 112H240"/><path d="M80 58A20 27 0 0 0 80 112"/><path d="M240 58A20 27 0 0 1 240 112"/>
      <path d="M80 58V112M240 58V112" stroke-dasharray="5 4" stroke-width="1"/><path d="M160 58V112" stroke-width="1"/>
      <path d="M118 58V42M132 58V42M112 42H138M112 38H138M112 38V42M138 38V42"/><path d="M196 58V44M208 58V44M191 44H213M191 40H213M191 40V44M213 40V44"/>
      <path d="M104 112L97 132H143L136 112M184 112L177 132H223L216 112"/><path d="M90 132H150M170 132H230" stroke-width="2.2"/>
      <path d="M44 85H276" stroke-dasharray="16 4 2 4" stroke-width="1" opacity=".7"/>`, "Sketch of a horizontal pressure vessel"),
    "fired-equipment": TH(`<rect x="60" y="40" width="200" height="94"/>
      ${[85,115,145,175,205,235].map(x=>`<path d="M${x} 22V150"/><path d="M${x-4} 22H${x+4}M${x-4} 150H${x+4}"/>`).join("")}
      ${[100,130,160,190,220].map(x=>`<path d="M${x} 41c4 6 5 10 0 17c-5-7-4-11 0-17z"/>`).join("")}`, "Sketch of a top-fired reformer with catalyst tubes and burners"),
    "inspection-and-integrity": TH(`<path d="M20 70H300M20 104H300"/><path d="M96 70V40M108 70V40M90 40H114M90 35H114M90 35V40M114 35V40"/>
      <path d="M102 70V86" stroke-dasharray="3 3"/>${[132,158,184,210,236,262].map(x=>`<circle cx="${x}" cy="87" r="5"/>`).join("")}
      <path d="M84 124H276M84 119V129M276 119V129" stroke-width="1"/>${TEXT(180,142,"Inspection points around the injection","middle")}`, "Sketch of an injection point with inspection locations along the pipe"),
    "welding-and-repairs": TH(`<path d="M20 66H300M20 112H300"/><path d="M160 66V112"/><path d="M154 66l6 6 6-6M154 112l6-6 6 6"/>
      <path d="M140 52H180M140 47V57M180 47V57" stroke-width="1"/>${TEXT(160,44,"SB","middle")}
      <path d="M110 36H210M110 31V41M210 31V41" stroke-width="1"/>${TEXT(160,28,"HB","middle")}
      <path d="M60 128H260M60 123V133M260 123V133" stroke-width="1"/>${TEXT(160,148,"GCB","middle")}
      <rect x="140" y="66" width="40" height="46" fill="currentColor" opacity=".12" stroke="none"/><rect x="110" y="66" width="100" height="46" fill="currentColor" opacity=".07" stroke="none"/>`, "Sketch of local PWHT bands around a circumferential weld"),
    "codes-and-standards": TH(`<path d="M40 46H120V114H40"/><path d="M200 46H280V114H200"/><path d="M120 30H148V130H120zM172 30H200V130H172z"/>
      <path d="M148 40H172V120H148" stroke-dasharray="3 3" stroke-width="1"/><rect x="148" y="62" width="24" height="36" fill="currentColor" opacity=".15" stroke="none"/>
      <path d="M108 38H212M108 122H212" stroke-width="2.2"/><path d="M104 33h8v10h-8zM208 33h8v10h-8zM104 117h8v10h-8zM208 117h8v10h-8z"/>
      <path d="M40 80H280" stroke-dasharray="16 4 2 4" stroke-width="1" opacity=".7"/>`, "Sketch of a bolted flange joint in cross-section")
  };
  const areaThumb = area => area === "materials-and-metallurgy"
    ? `<div class="thumb micro" role="img" aria-label="Ferrite and pearlite microstructure (illustration)"></div>`
    : `<div class="thumb">${THUMBS[area] || THUMBS["static-equipment"]}</div>`;
  const itemThumb = a => a.image
    ? `<div class="thumb${a.imageKind === "diagram" ? " diagram" : ""}"><img src="${esc(href(a.image))}" alt="${esc(a.imageAlt || a.title)}" loading="lazy" decoding="async"></div>`
    : areaThumb(a.area);

  /* data.js declares these with const (global lexical scope, not window properties) */
  const AREAS_ = typeof AREAS !== "undefined" ? AREAS : [], ARTICLES_ = typeof ARTICLES !== "undefined" ? ARTICLES : [],
        LESSONS_ = typeof LESSONS !== "undefined" ? LESSONS : [], TOOLS_ = typeof TOOLS !== "undefined" ? TOOLS : [],
        CODES_ = typeof CODES !== "undefined" ? CODES : {}, DOCS_ = typeof DOCUMENTS !== "undefined" ? DOCUMENTS : [],
        NEWS_ = typeof NEWS !== "undefined" ? NEWS : [], EDITIONS_ = typeof EDITIONS !== "undefined" ? EDITIONS : {},
        TOPICS_ = typeof NEWS_TOPICS !== "undefined" ? NEWS_TOPICS : [];
  const areaById = Object.fromEntries(AREAS_.map(a => [a.id, a]));
  const areaName = id => (areaById[id] || {}).name || "";
  const areaLab = id => areaById[id] ? `<span class="lab">${icon(areaById[id].icon)}${esc(areaById[id].name)}</span>` : "";
  const byDate = (a,b) => (!a.dateLabel && !a.date) - (!b.dateLabel && !b.date) || (b.date || "").localeCompare(a.date || "");
  const metaOf = a => (a.onsite ? "Article on this site" : esc(a.outlet)) + (a.dateLabel ? `, ${esc(a.dateLabel)}` : "");
  const linkAttr = a => `href="${esc(href(a.url))}"` + (isExt(a.url) ? ` ${ext}` : "");
  const readBtn = (a, label) => `<a class="btn small primary" ${linkAttr(a)}>${a.onsite ? "Read article" : esc(label)}</a>` + (/inspectioneering\.com/.test(a.url) ? `<span class="rel" style="color:var(--steel)">Free registration required</span>` : "");
  const toolByTitle = t => TOOLS_.find(x => x.title === t);
  const live = t => t.status === "live" && t.url;
  const liveFirst = (a,b) => (b.status === "live") - (a.status === "live");
  const LESSON_ITEMS = () => [
    ...LESSONS_.map(l => ({...l, lessonType: l.lessonType || "Lessons Learned", note: l.summary})),
    ...ARTICLES_.filter(a => a.lesson).map(a => ({...a, lessonType: a.lesson.type, note: a.lesson.note, fromArticle: true}))
  ];
  const LESSON_TYPES = ["Failure Analysis", "Field Experience", "Troubleshooting", "Inspection Findings", "Lessons Learned"];
  const fmtDay = d => { if (!d) return ""; const t = new Date(d + (d.length === 10 ? "T00:00:00" : "")); return isNaN(t) ? esc(d) : t.toLocaleDateString("en-GB", {day:"numeric", month:"short", year:"numeric"}); };

  function relatedLine(a){
    if (!a.related) return "";
    const t = toolByTitle(a.related); if (!t) return "";
    return live(t) ? `<span class="rel">Calculator: <a href="${esc(href(t.url))}">${esc(t.title)}</a></span>`
                   : `<span class="rel">Calculator: ${esc(t.title)} <span class="status soon">Coming soon</span></span>`;
  }
  function articleCard(a){
    return `<article class="card">${areaLab(a.area)}
      <h3><a ${linkAttr(a)}>${esc(a.title)}</a></h3>
      <div class="meta"><span class="type">Article</span> · ${metaOf(a)}</div>
      <p>${esc(a.summary)}</p>
      ${a.codes && a.codes.length ? `<p class="codes-line">Standards: ${a.codes.map(esc).join(", ")}</p>` : ""}
      <div class="foot">${readBtn(a, "Read on " + a.outlet)}${relatedLine(a)}</div></article>`;
  }
  function featureCard(a){
    return `<article class="fcard">${itemThumb(a)}
      <div class="body"><div class="toprow" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><span class="type">${a.onsite ? "Article" : "Published article"}</span>${areaLab(a.area)}</div>
        <h3>${esc(a.title)}</h3><div class="meta">${metaOf(a)}</div><p>${esc(a.summary)}</p>
        <div class="foot">${readBtn(a, "Read on " + a.outlet)}${relatedLine(a)}</div></div></article>`;
  }
  function toolCard(t){
    const ok = live(t);
    return `<article class="card${ok ? "" : " is-soon"}">
      <div class="toprow">${areaLab(t.area)}<span class="status ${ok ? "ok" : "soon"}">${ok ? "Available" : "Coming soon"}</span></div>
      <h3>${ok ? `<a href="${esc(href(t.url))}">${esc(t.title)}</a>` : esc(t.title)}</h3>
      <p>${esc(t.desc)}</p>
      ${t.codes ? `<p class="codes-line">Code basis: ${esc(t.codes)}</p>` : ""}
      <div class="foot">${ok ? `<a class="btn small primary" href="${esc(href(t.url))}">Open calculator</a>` : ""}</div></article>`;
  }
  function lessonCard(l){
    return `<article class="card"><div class="toprow"><span class="ltype">${esc(l.lessonType)}</span>${areaLab(l.area)}</div>
      <h3><a ${linkAttr(l)}>${esc(l.title)}</a></h3>
      <p>${esc(l.note || l.summary)}</p>
      <div class="meta">${l.fromArticle ? "Case history in the article" : "Case study"} · ${metaOf(l)}</div>
      <div class="foot">${readBtn(l, "Read on " + l.outlet)}</div></article>`;
  }
  function areaCount(id){
    const n = ARTICLES_.filter(a => a.area === id).length, d = DOCS_.filter(x => x.area === id).length;
    const lv = TOOLS_.filter(x => x.area === id && x.status === "live").length;
    const parts = [];
    if (n) parts.push(`${n} article${n > 1 ? "s" : ""}`);
    if (d) parts.push(`${d} document${d > 1 ? "s" : ""}`);
    if (lv) parts.push(`${lv} calculator${lv > 1 ? "s" : ""}`);
    return parts.join(" · ");
  }
  function codeIndex(){
    const map = {};
    ARTICLES_.forEach(a => (a.codes || []).forEach(c => (map[c] = map[c] || []).push({kind:"Article", title:a.title, url:a.url})));
    DOCS_.forEach(a => (a.codes || []).forEach(c => (map[c] = map[c] || []).push({kind:"Document", title:a.title, url:a.url})));
    TOOLS_.filter(live).forEach(t => (t.codeList || []).forEach(c => (map[c] = map[c] || []).push({kind:"Calculator", title:t.title, url:t.url})));
    return Object.keys(map).sort((a,b) => map[b].length - map[a].length || a.localeCompare(b)).map(c => ({code:c, items:map[c]}));
  }
  const relLinks = items => `<ul>${items.map(i => `<li><span>${i.kind}:</span> <a href="${esc(href(i.url))}" ${isExt(i.url) ? ext : ""}>${esc(i.title)}</a></li>`).join("")}</ul>`;
  const codeRow = r => `<div class="code"><b>${esc(r.code)}</b><span class="d">${esc(CODES_[r.code] || "")}</span>${relLinks(r.items)}</div>`;
  const empty = msg => `<div class="empty">${msg}</div>`;
  const words = q => q.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (w, fields) => { const t = fields.join(" ").toLowerCase(); return w.every(x => t.includes(x)); };
  function filterButtons(el, items, onPick){
    el.innerHTML = items.map((it,i) => `<button type="button" data-v="${esc(it[0])}" aria-pressed="${i === 0}">${esc(it[1])}</button>`).join("");
    el.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return;
      el.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); onPick(b.dataset.v); });
  }

  /* ---------- pages ---------- */
  const R = {};
  R.home = function(){
    $("homeAreas").innerHTML = AREAS_.map(a => `<a class="area" href="${href("knowledge/#" + a.id)}">
      <div class="top">${icon(a.icon)}<h3>${esc(a.name)}</h3></div><p>${esc(a.desc)}</p><div class="count">${areaCount(a.id)}</div></a>`).join("");
    const ft = TOOLS_.filter(t => live(t) && t.featured); const rest = TOOLS_.filter(t => live(t) && !t.featured);
    $("homeTools").innerHTML = ft.concat(rest).slice(0,6).map(toolCard).join("");
    $("toolsCount").textContent = `${TOOLS_.filter(live).length} calculators available`;
    $("homeFeatured").innerHTML = ARTICLES_.filter(a => a.featured).slice(0,3).map(featureCard).join("");
    const L = LESSON_ITEMS();
    $("homeLessons").innerHTML = L.length ? L.slice(0,3).map(lessonCard).join("") : `<div class="note-box">Case studies are being prepared and will be published here.</div>`;
    $("homeLatest").innerHTML = ARTICLES_.slice().sort(byDate).slice(0,5).map(a => `<div class="arow">
      <span class="when">${esc(a.dateLabel) || "&nbsp;"}</span>
      <div><a class="t" ${linkAttr(a)}>${esc(a.title)}</a><span class="meta">${a.onsite ? "Article on this site" : esc(a.outlet)}</span></div>
      ${areaLab(a.area)}</div>`).join("");
    $("homeCodes").innerHTML = codeIndex().slice(0,6).map(codeRow).join("");
  };
  R.knowledge = function(){
    const CI = codeIndex();
    $("knowBlocks").innerHTML = AREAS_.map(a => {
      const arts = ARTICLES_.filter(x => x.area === a.id).sort(byDate), docs = DOCS_.filter(x => x.area === a.id);
      const tools = TOOLS_.filter(x => x.area === a.id).sort(liveFirst);
      const items = [
        ...arts.map(x => `<li><span class="kind">Article</span><a ${linkAttr(x)}>${esc(x.title)}</a><span class="meta">${metaOf(x)}</span></li>`),
        ...docs.map(x => `<li><span class="kind">Document</span><a href="${esc(href(x.url))}" ${isExt(x.url) ? ext : ""}>${esc(x.title)}</a><span class="meta">${esc(x.docType)}</span></li>`),
        ...tools.map(x => `<li><span class="kind">Calculator</span>${live(x) ? `<a href="${esc(href(x.url))}">${esc(x.title)}</a>` : `${esc(x.title)} <span class="status soon">Coming soon</span>`}<span class="meta">${esc(x.codes)}</span></li>`)
      ].join("");
      const extra = a.id === "codes-and-standards" ? `<p style="margin-top:18px"><a class="btn small" href="${href("standards/")}">Open the standards index (${CI.length} standards)</a></p>` : "";
      return `<div class="kblock" id="${a.id}"><div><div class="head">${icon(a.icon)}<h2>${esc(a.name)}</h2></div>
        <p class="intro">${esc(a.desc)}</p><ul class="klist">${items || `<li class="meta">Content in preparation.</li>`}</ul>${extra}</div>${areaThumb(a.id)}</div>`;
    }).join("");
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 0); }
  };
  R.articles = function(){
    let ar = "all", q = "";
    filterButtons($("artFilters"), [["all","All"], ...AREAS_.filter(a => ARTICLES_.some(x => x.area === a.id)).map(a => [a.id, a.name])], v => { ar = v; draw(); });
    function draw(){
      const w = words(q);
      const list = ARTICLES_.filter(a => (ar === "all" || a.area === ar) && matches(w, [a.title,a.summary,a.outlet,(a.codes||[]).join(" "),areaName(a.area)])).sort(byDate);
      $("artCount").textContent = list.length ? `${list.length} article${list.length > 1 ? "s" : ""}` : "";
      $("artGrid").innerHTML = list.length ? list.map(articleCard).join("") : empty(`No articles match “${esc(q)}”. Try another word, or choose All.`);
    }
    $("artSearch").addEventListener("input", e => { q = e.target.value.trim(); draw(); });
    const p = new URLSearchParams(location.search).get("q"); if (p) { $("artSearch").value = p; q = p; }
    draw();
  };
  R.calculators = function(){
    let cat = "All", q = "";
    filterButtons($("toolFilters"), ["All", ...new Set(TOOLS_.map(t => t.category))].map(c => [c, c]), v => { cat = v; draw(); });
    function draw(){
      const w = words(q);
      const list = TOOLS_.filter(t => (cat === "All" || t.category === cat) && matches(w, [t.title,t.desc,t.codes,t.category,areaName(t.area)])).sort(liveFirst);
      const n = list.filter(live).length;
      $("toolCount").textContent = list.length ? `${list.length} calculator${list.length > 1 ? "s" : ""}, ${n} available` : "";
      $("toolGrid").innerHTML = list.length ? list.map(toolCard).join("") : empty(`No calculators match “${esc(q)}”${cat !== "All" ? ` in ${esc(cat)}` : ""}. Try another word, or choose All.`);
    }
    $("toolSearch").addEventListener("input", e => { q = e.target.value.trim(); draw(); });
    draw();
  };
  R.lessons = function(){
    let ty = "all";
    const L = LESSON_ITEMS();
    $("lessonTypes").innerHTML = LESSON_TYPES.map(t => `<span class="ltype">${t}</span>`).join("");
    filterButtons($("lessonFilters"), [["all","All"], ...LESSON_TYPES.filter(t => L.some(l => l.lessonType === t)).map(t => [t,t])], v => { ty = v; draw(); });
    function draw(){
      const list = L.filter(l => ty === "all" || l.lessonType === ty);
      $("lessonGrid").innerHTML = list.length ? list.map(lessonCard).join("") : empty("Case studies are being prepared and will be published here.");
    }
    $("lessonNote").hidden = LESSONS_.length >= MIN_LESSONS;
    draw();
  };
  /* PDFs: read in the browser (new tab) or download; other files: download; links: view */
  function docButtons(d){
    const u = esc(href(d.url));
    if (/\.pdf$/i.test(d.url)) return `<a class="btn small primary" href="${u}" ${ext}>Read</a><a class="btn small" href="${u}" download>Download</a>`;
    if (/\.(pptx?|xlsx?|docx?|zip)$/i.test(d.url)) return `<a class="btn small primary" href="${u}" download>Download</a>`;
    return `<a class="btn small primary" href="${u}" ${isExt(d.url) ? ext : ""}>View</a>`;
  }
  R.documents = function(){
    let ar = "all", ty = "all", q = "";
    const types = [...new Set(DOCS_.map(d => d.docType).filter(Boolean))].sort();
    $("docArea").innerHTML = `<option value="all">All categories</option>` + AREAS_.map(a => `<option value="${a.id}">${esc(a.name)}</option>`).join("");
    $("docType").innerHTML = `<option value="all">All types</option>` + types.map(t => `<option>${esc(t)}</option>`).join("");
    function draw(){
      const w = words(q);
      const list = DOCS_.filter(d => (ar === "all" || d.area === ar) && (ty === "all" || d.docType === ty) && matches(w, [d.title,d.desc,d.docType,areaName(d.area),(d.codes||[]).join(" ")])).sort(byDate);
      $("docCount").textContent = DOCS_.length ? `${list.length} of ${DOCS_.length} document${DOCS_.length > 1 ? "s" : ""}` : "";
      $("docList").innerHTML = !DOCS_.length ? empty("The document library is being prepared. Technical guides, presentations, checklists and reference documents will be listed here as they are published.")
        : list.length ? list.map(d => `<div class="rrow${d.image ? " has-cover" : ""}">${d.image
              ? `<a class="cover" href="${esc(href(d.url))}" ${isExt(d.url) || /\.pdf$/i.test(d.url) ? ext : ""} tabindex="-1" aria-hidden="true"><img src="${esc(href(d.image))}" alt="${esc(d.imageAlt || d.title)}" loading="lazy" decoding="async" width="480" height="270"></a>`
              : `<span class="when">${esc(d.dateLabel || d.date || "")}</span>`}
            <div><h3><a href="${esc(href(d.url))}" ${isExt(d.url) ? ext : ""}>${esc(d.title)}</a></h3><p>${esc(d.desc)}</p>
            <div class="meta"><span class="type">${esc(d.docType)}</span> · ${esc(areaName(d.area))}${d.image && (d.dateLabel || d.date) ? ` · ${esc(d.dateLabel || d.date)}` : ""}${d.size ? ` · ${esc(d.size)}` : ""}</div></div>
            <div class="act">${docButtons(d)}</div></div>`).join("")
        : empty("No documents match the selected filters.");
    }
    $("docArea").addEventListener("change", e => { ar = e.target.value; draw(); });
    $("docType").addEventListener("change", e => { ty = e.target.value; draw(); });
    $("docSearch").addEventListener("input", e => { q = e.target.value.trim(); draw(); });
    draw();
  };
  R.news = function(){
    let tp = "all", yr = "all", q = "";
    const years = [...new Set(NEWS_.map(n => (n.date || "").slice(0,4)).filter(Boolean))].sort().reverse();
    $("newsTopic").innerHTML = `<option value="all">All topics</option>` + TOPICS_.map(t => `<option>${esc(t)}</option>`).join("");
    $("newsYear").innerHTML = `<option value="all">All years</option>` + years.map(y => `<option>${y}</option>`).join("");
    function draw(){
      const w = words(q);
      const list = NEWS_.filter(n => (tp === "all" || n.topic === tp) && (yr === "all" || (n.date || "").startsWith(yr)) && matches(w, [n.headline,n.summary,n.source,n.topic])).sort((a,b) => (b.date||"").localeCompare(a.date||""));
      $("newsCount").textContent = NEWS_.length ? `${list.length} of ${NEWS_.length} item${NEWS_.length > 1 ? "s" : ""}` : "";
      $("newsList").innerHTML = !NEWS_.length ? empty("Industry news will be listed here: code and standard updates, materials and welding developments, incidents and failures, and inspection and integrity developments, each linked to its original source.")
        : list.length ? list.map(n => `<div class="rrow"><span class="when">${fmtDay(n.date)}</span>
            <div><h3><a href="${esc(n.url)}" ${ext}>${esc(n.headline)}</a></h3><p>${esc(n.summary)}</p>
            <div class="meta"><span class="ext">External</span> Source: ${esc(n.source)} · ${esc(n.topic)}</div></div>
            <div class="act"><a class="btn small" href="${esc(n.url)}" ${ext}>Original source</a></div></div>`).join("")
        : empty("No news items match the selected filters.");
    }
    $("newsTopic").addEventListener("change", e => { tp = e.target.value; draw(); });
    $("newsYear").addEventListener("change", e => { yr = e.target.value; draw(); });
    $("newsSearch").addEventListener("input", e => { q = e.target.value.trim(); draw(); });
    draw();
  };
  R.standards = function(){
    const CI = codeIndex(); let q = "";
    function draw(){
      const w = words(q);
      const list = CI.filter(r => matches(w, [r.code, CODES_[r.code] || "", r.items.map(i => i.title).join(" ")]));
      $("stdCount").textContent = `${list.length} of ${CI.length} standards`;
      $("stdBody").innerHTML = list.length ? list.map(r => `<tr><td>${esc(r.code)}</td><td>${esc(CODES_[r.code] || "")}</td><td>${esc(EDITIONS_[r.code] || "—")}</td><td>${relLinks(r.items)}</td></tr>`).join("")
        : `<tr><td colspan="4">No standards match “${esc(q)}”.</td></tr>`;
    }
    $("stdSearch").addEventListener("input", e => { q = e.target.value.trim(); draw(); });
    draw();
  };
  R.search = function(){
    const all = [
      ...ARTICLES_.map(a => ({kind:"Article", title:a.title, text:a.summary, url:a.url, meta:metaOf(a), f:[a.title,a.summary,a.outlet,(a.codes||[]).join(" "),areaName(a.area)]})),
      ...LESSONS_.map(a => ({kind:"Lesson", title:a.title, text:a.summary, url:a.url, meta:metaOf(a), f:[a.title,a.summary,a.lessonType,areaName(a.area)]})),
      ...ARTICLES_.filter(a => a.lesson).map(a => ({kind:"Lesson (case history)", title:a.title, text:a.lesson.note, url:a.url, meta:a.lesson.type, f:[a.title,a.lesson.note,a.lesson.type,"lesson case history failure"]})),
      ...DOCS_.map(d => ({kind:"Document", title:d.title, text:d.desc, url:d.url, meta:`${d.docType || ""} · ${areaName(d.area)}`, f:[d.title,d.desc,d.docType,areaName(d.area)]})),
      ...TOOLS_.filter(live).map(t => ({kind:"Calculator", title:t.title, text:t.desc, url:t.url, meta:t.codes, f:[t.title,t.desc,t.codes,t.category,areaName(t.area)]})),
      ...NEWS_.map(n => ({kind:"Industry news", title:n.headline, text:n.summary, url:n.url, meta:`${n.source} · ${fmtDay(n.date)}`, f:[n.headline,n.summary,n.source,n.topic]})),
      ...AREAS_.map(a => ({kind:"Knowledge area", title:a.name, text:a.desc, url:"knowledge/#" + a.id, meta:"", f:[a.name,a.desc]})),
      ...codeIndex().map(r => ({kind:"Standard", title:r.code, text:CODES_[r.code] || "", url:"standards/?q=" + encodeURIComponent(r.code), meta:`${r.items.length} related item${r.items.length > 1 ? "s" : ""}`, f:[r.code, CODES_[r.code] || ""]}))
    ];
    const inp = $("q");
    function draw(){
      const q = inp.value.trim(), w = words(q);
      if (!w.length) { $("sCount").textContent = ""; $("sResults").innerHTML = ""; return; }
      const list = all.filter(r => matches(w, r.f));
      $("sCount").textContent = `${list.length} result${list.length === 1 ? "" : "s"} for “${q}”`;
      $("sResults").innerHTML = list.length ? list.map(r => `<div class="r"><span class="type">${esc(r.kind)}</span><br>
          <a class="t" href="${esc(href(r.url))}" ${isExt(r.url) ? ext : ""}>${esc(r.title)}</a><p>${esc(r.text)}</p>${r.meta ? `<div class="meta">${r.meta}</div>` : ""}</div>`).join("")
        : empty(`Nothing found for “${esc(q)}”. Try a shorter word, a code number (e.g. PCC-1) or a topic (e.g. PWHT).`);
      history.replaceState(null, "", "?q=" + encodeURIComponent(q));
    }
    const p = new URLSearchParams(location.search).get("q"); if (p) inp.value = p;
    inp.addEventListener("input", draw); draw(); inp.focus();
  };

  /* ---------- common: mobile menu, old hash links ---------- */
  const nav = $("mainnav"), mb = document.querySelector(".menu-btn");
  if (nav && mb) {
    mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
    nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.focus(); } });
  }
  if (page === "home" && location.hash) {
    const h = location.hash.slice(1), map = {knowledge:"knowledge/", articles:"articles/", lessons:"lessons/", calculators:"calculators/", about:"about/", documents:"documents/", news:"news/"};
    if (map[h]) location.replace(href(map[h])); else if (areaById[h]) location.replace(href("knowledge/#" + h));
  }
  if (page === "standards") { const p = new URLSearchParams(location.search).get("q"); if (p) $("stdSearch").value = p; }
  if (R[page]) { R[page](); if (page === "standards") { const e = new Event("input"); $("stdSearch").dispatchEvent(e); } }
})();

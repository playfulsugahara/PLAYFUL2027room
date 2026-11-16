/* 2027年作戦会議 メンバーページ ── data.js の台帳から各ページを組み立てる */
(function () {
  const S = window.SITE, TAGS = window.TAGS, TYPES = window.TYPES;
  const ICON = { video: "▶", radio: "🎧", article: "📖", archive: "🎥", slides: "🖼", work: "✍️" };
  const params = new URLSearchParams(location.search);
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* 今日（確認用に ?today=2026-11-22 で日付を変えられる） */
  const today = params.get("today") || new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });
  const md = (d) => { const [, m, dd] = d.split("-"); return `${+m}/${+dd}`; };
  const released = (d) => d <= today;

  const qOpen = S.questions.filter((q) => released(q.date) && q.q);
  const latestQ = qOpen[qOpen.length - 1];
  const nextSession = S.sessions.find((s) => s.date >= today);

  function ytId(url) {
    if (!url) return "";
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }

  /* YouTube の動画は、いきなり再生せず詳細ページ（item.html）へ */
  function detailHref(it) {
    if (it.type === "work") return `item.html?id=${encodeURIComponent(it.id)}`; /* ワークは動画がなくても要点ページへ */
    if (it.url && ytId(it.url) && ["video", "radio", "archive"].includes(it.type)) return `item.html?id=${encodeURIComponent(it.id)}`;
    return it.url;
  }

  function itemHTML(it) {
    const tags = (it.tags || []).map((t) => `<span class="badge">${TAGS[t]}</span>`).join("");
    const term = `<span class="badge ${it.term === "2期" ? "t2" : ""}">${it.term}</span>`;
    const href = detailHref(it);
    const wait = href ? "" : `<span class="badge wait">準備中</span>`;
    const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
    const inner = `<span class="ic" aria-hidden="true">${ICON[it.type]}</span>
      <span><span class="tt">${esc(it.title)}</span><span class="ds">${esc(it.desc)}</span>
      <span class="meta"><span class="badge">${TYPES[it.type]}</span>${term}${tags}${wait}</span></span>`;
    return href
      ? `<li><a class="item t-${it.type}" href="${esc(href)}"${ext}>${inner}</a></li>`
      : `<li><div class="item t-${it.type} off" aria-disabled="true">${inner}</div></li>`;
  }

  /* ---------------- ホーム ---------------- */
  function home() {
    if (latestQ) {
      $("#odai").innerHTML = `<div class="card lime"><span class="flag">今週のお題</span>
        <span class="num">Q${latestQ.n}｜${md(latestQ.date)}（${latestQ.dow}）配信</span>
        <p class="odai-q">${esc(latestQ.q)}</p>
        <p class="muted">${latestQ.due ? `${latestQ.due}までに、ノートや手帳に書いてみましょう。` : ""}</p>
        <div class="row"><a class="btn" href="odai.html">お題を見る →</a></div></div>`;
    }
    if (nextSession) {
      $("#next").innerHTML = `<div class="card blue"><span class="num">NEXT ZOOM｜第${nextSession.n}回</span>
        <h3>${md(nextSession.date)}（${nextSession.dow}）${nextSession.time}</h3>
        <p>${esc(nextSession.title)}：${esc(nextSession.theme)}</p></div>`;
    }

    /* すごろく：Zoom 5マス＋問い 9マス を日付順に（同じ日は Zoom → 問い） */
    const cells = [
      ...S.sessions.map((s) => ({ kind: "zoom", date: s.date, s })),
      ...S.questions.map((q) => ({ kind: "q", date: q.date, q }))
    ].sort((a, b) => (a.date === b.date ? (a.kind === "zoom" ? -1 : 1) : a.date < b.date ? -1 : 1));
    const nowIdx = cells.reduce((acc, c, i) => (released(c.date) ? i : acc), -1);

    let html = `<p class="phase">前半｜知る・集める</p>`;
    cells.forEach((c, i) => {
      if (c.date === "2026-12-20" && c.kind === "q") html += `<p class="phase">後半｜深掘る・形にする</p>`;
      const cls = [c.kind, i < nowIdx ? "done" : "", i === nowIdx ? "now" : ""].join(" ");
      const nowTag = i === nowIdx ? `<span class="now-tag">いまここ</span>` : "";
      let label, link = "";
      if (c.kind === "zoom") {
        label = `Zoom ${c.s.n}｜${c.s.title}：${c.s.theme}`;
        if (released(c.date)) link = `zoom.html?n=${c.s.n}`;
      } else {
        label = released(c.date) && c.q.q ? `お題 Q${c.q.n}｜${c.q.q}` : `お題 Q${c.q.n}｜（${md(c.date)}に届きます）`;
        if (released(c.date) && c.q.q) link = `odai.html#q${c.q.n}`;
      }
      const tt = link ? `<a class="tt" href="${link}">${esc(label)} →</a>` : `<span class="tt">${esc(label)}</span>`;
      const mark = c.kind === "zoom" ? `ZOOM<br>${c.s.n}` : `Q${c.q.n}`;
      html += `<li class="${cls}"><span class="n">${mark}</span><span class="body"><span class="d">${md(c.date)}（${c.kind === "zoom" ? c.s.dow : c.q.dow}）</span>${nowTag}${tt}</span></li>`;
    });
    $("#steps").innerHTML = html;

    $("#tiles").innerHTML = Object.entries(TAGS).map(([k, v]) => {
      const n = S.items.filter((it) => it.tags.includes(k)).length;
      return `<a class="tile ${k}" href="library.html?tab=${k}"><b>${v}</b><span>${n}件</span></a>`;
    }).join("");
  }

  /* ---------------- Zoom ---------------- */
  function zoom() {
    const n = +params.get("n");
    const s = S.sessions.find((x) => x.n === n);
    const list = S.sessions.map((x) => {
      const open = released(x.date);
      const inner = `<span class="k">第<b>${x.n}</b>回</span><span><b>${md(x.date)}（${x.dow}）${esc(x.title)}</b><br><span class="muted">${esc(x.theme)}</span></span>`;
      return open ? `<li><a href="zoom.html?n=${x.n}" class="${s && x.n === s.n ? "cur" : ""}">${inner}</a></li>` : `<li><div class="off">${inner}</div></li>`;
    }).join("");
    $("#sessions").innerHTML = list;

    if (!s) { $("#detail").hidden = true; return; }
    $("#listHead").textContent = "ほかの回";
    document.title = `第${s.n}回 ${s.title}｜2027年作戦会議`;
    $("#head").innerHTML = `<p class="no">ZOOM ${s.n} ｜ ${md(s.date)}（${s.dow}）${s.time}</p><h1>${esc(s.title)}</h1><p class="theme">${esc(s.theme)}</p>`;

    const id = ytId(s.youtube);
    $("#video").outerHTML = id
      ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="第${s.n}回 講義アーカイブ" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="row"><a class="btn ghost" href="${esc(s.youtube)}" target="_blank" rel="noopener">YouTubeで開く ↗</a></p>`
      : `<div class="video wait"><p>講義の動画は準備中です。<br>アップされたら、ここで見られます。</p></div>`;

    if (s.slides) slides(s.slides); else $("#slidesSec").hidden = true;

    if (s.points.length) $("#points").innerHTML = s.points.map((p) => `<li><span>${esc(p)}</span></li>`).join("");
    else $("#pointsSec").hidden = true;

    const rel = s.related.map((rid) => S.items.find((it) => it.id === rid)).filter(Boolean);
    if (rel.length) $("#related").innerHTML = rel.map(itemHTML).join(""); else $("#relSec").hidden = true;
  }

  function slides({ dir, count }) {
    const src = (i) => `${dir}/${String(i).padStart(2, "0")}.jpg`;
    const img = $("#slideImg"), pos = $("#pos"), thumbs = $("#thumbs");
    thumbs.innerHTML = Array.from({ length: count }, (_, k) =>
      `<button type="button" data-i="${k + 1}" aria-label="${k + 1}枚目"><img src="${src(k + 1)}" alt="" loading="lazy" width="96" height="54"></button>`).join("");
    let cur = 1;
    const m = location.hash.match(/slide-(\d+)/);
    if (m) cur = Math.min(Math.max(+m[1], 1), count);
    function go(i) {
      cur = Math.min(Math.max(i, 1), count);
      img.src = src(cur); img.alt = `スライド ${cur}枚目`;
      pos.textContent = `${cur} / ${count}`;
      $("#prev").disabled = cur === 1; $("#next").disabled = cur === count;
      thumbs.querySelectorAll("button").forEach((b) => {
        const on = +b.dataset.i === cur; b.setAttribute("aria-current", on);
        if (on) thumbs.scrollTo({ left: b.offsetLeft - thumbs.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
      });
      $("#dl").href = src(cur);
    }
    $("#prev").onclick = () => go(cur - 1);
    $("#next").onclick = () => go(cur + 1);
    thumbs.onclick = (e) => { const b = e.target.closest("button"); if (b) go(+b.dataset.i); };
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "Escape") $("#lb").classList.remove("open");
    });
    let x0 = null;
    const st = $("#stage");
    st.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    st.addEventListener("touchend", (e) => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    });
    img.onclick = () => { $("#lbImg").src = src(cur); $("#lb").classList.add("open"); };
    $("#lbClose").onclick = () => $("#lb").classList.remove("open");
    $("#lb").onclick = (e) => { if (e.target.id === "lb") $("#lb").classList.remove("open"); };
    go(cur);
    if (m) setTimeout(() => $("#slidesSec").scrollIntoView(), 50);
  }

  /* ---------------- お題 ---------------- */
  function odai() {
    const open = [...qOpen].reverse();
    const locked = S.questions.filter((q) => !released(q.date) || !q.q);
    const how = (q) => `<div class="how"><b>答え方</b><br>${q.due ? `${q.due}までに、` : ""}ノートや手帳に書いてみましょう。アウトプットできる人は、Bandの投稿のコメント欄へ。新しく思いついたら、どんどん書き足してOK。${q.band ? `<div class="row"><a class="btn blue" href="${esc(q.band)}" target="_blank" rel="noopener">Bandの投稿を開く →</a></div>` : ""}</div>`;
    $("#list").innerHTML =
      open.map((q, i) => `<article class="odai ${i === 0 ? "latest" : ""}" id="q${q.n}">
        ${i === 0 ? `<span class="flag">今週のお題</span>` : ""}
        <span class="qn">Q${q.n}</span><span class="d">${md(q.date)}（${q.dow}）</span>
        <p class="odai-q">${esc(q.q)}</p>
        <div class="body">${(q.body || []).map((b) => `<p>${esc(b)}</p>`).join("")}</div>
        ${q.hints && q.hints.length ? `<ul class="hints">${q.hints.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${how(q)}</article>`).join("") +
      locked.map((q) => `<article class="odai lock"><span class="qn">Q${q.n}</span><span class="d">${md(q.date)}（${q.dow}）に届きます</span></article>`).join("");
    if (location.hash) setTimeout(() => { const el = $(location.hash); if (el) el.scrollIntoView(); }, 50);
  }

  /* ---------------- ライブラリ ---------------- */
  function library() {
    let tab = params.get("tab") || "all";
    let type = "all";
    const input = $("#q");
    input.value = params.get("q") || "";

    $("#tabs").innerHTML = [["all", "すべて"], ...Object.entries(TAGS)]
      .map(([k, v]) => `<button type="button" data-k="${k}">${v}</button>`).join("");
    $("#types").innerHTML = [["all", "種類：すべて"], ...Object.entries(TYPES)]
      .map(([k, v]) => `<button type="button" data-k="${k}">${v}</button>`).join("");

    const norm = (s) => String(s || "").toLowerCase().normalize("NFKC");
    const ORDER = { video: 0, slides: 1, radio: 2, article: 3, archive: 4 };
    const TAGORDER = Object.keys(TAGS);

    function render() {
      document.querySelectorAll("#tabs button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === tab));
      document.querySelectorAll("#types button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === type));
      const words = norm(input.value).split(/\s+/).filter(Boolean);
      const hits = S.items.filter((it) => {
        if (tab !== "all" && !it.tags.includes(tab)) return false;
        if (type !== "all" && it.type !== type) return false;
        const hay = norm([it.title, it.desc, it.kw, TYPES[it.type], it.term, ...it.tags.map((t) => TAGS[t])].join(" "));
        return words.every((w) => hay.includes(w));
      }).sort((a, b) => {
        if (a.term !== b.term) return a.term === "2期" ? -1 : 1;
        const ta = tab === "all" ? TAGORDER.indexOf(a.tags[0]) : 0, tb = tab === "all" ? TAGORDER.indexOf(b.tags[0]) : 0;
        return ta - tb || ORDER[a.type] - ORDER[b.type] || (a.date < b.date ? -1 : 1);
      });
      $("#count").textContent = `${hits.length}件`;
      $("#items").innerHTML = hits.map(itemHTML).join("");
      $("#empty").hidden = hits.length > 0;
      const u = new URL(location.href);
      tab === "all" ? u.searchParams.delete("tab") : u.searchParams.set("tab", tab);
      input.value ? u.searchParams.set("q", input.value) : u.searchParams.delete("q");
      history.replaceState(null, "", u);
    }
    $("#tabs").onclick = (e) => { const b = e.target.closest("button"); if (b) { tab = b.dataset.k; render(); } };
    $("#types").onclick = (e) => { const b = e.target.closest("button"); if (b) { type = b.dataset.k; render(); } };
    input.addEventListener("input", render);
    $("#searchForm").onsubmit = (e) => { e.preventDefault(); render(); input.blur(); };
    render();
  }


  /* ---------------- 詳細ページ ---------------- */
  function item() {
    const it = S.items.find((x) => x.id === params.get("id"));
    if (!it) { $("#head").innerHTML = `<h1>見つかりませんでした</h1><p class="theme"><a href="library.html">ライブラリにもどる</a></p>`; $("#detail").hidden = true; return; }
    const N = (window.NOTES || {})[it.id];
    document.title = `${it.title}｜2027年作戦会議`;
    /* ワークの要点ページでは、メニューの「ワーク」を選択中にする */
    if (it.type === "work" || S.works.some((w) => w.item === it.id)) {
      document.querySelectorAll('a[aria-current="page"]').forEach((a) => a.removeAttribute("aria-current"));
      document.querySelectorAll('a[href="work.html"]').forEach((a) => a.setAttribute("aria-current", "page"));
    }
    const tags = it.tags.map((t) => `<a class="badge" href="library.html?tab=${t}">${TAGS[t]}</a>`).join("");
    $("#head").innerHTML = `<p class="no">${TYPES[it.type].toUpperCase()} ｜ ${it.term}</p><h1>${esc(it.title)}</h1><p class="theme">${esc(it.desc)}</p><p class="meta" style="margin-top:10px;display:flex;gap:4px;flex-wrap:wrap">${tags}</p>`;

    const id = ytId(it.url);
    $("#video").outerHTML = id
      ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${esc(it.title)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="row"><a class="btn ghost" href="${esc(it.url)}" target="_blank" rel="noopener">YouTubeで開く ↗</a></p>`
      : it.type === "work" ? `<p class="row"><a class="btn ghost" href="work.html">← ワークメニューにもどる</a></p>` /* 動画のないワークは動画枠を出さない */
      : `<div class="video wait"><p>動画は準備中です。</p></div>`;

    let html = "", relIds = [];
    if (N) {
      N.sections.forEach((sec, i) => {
        if (sec.related) { relIds = sec.related; return; }
        html += `<section class="note"><h2 class="${i % 2 ? "shadowed" : "shadowed b"}">${esc(sec.title)}</h2><div class="note-body">${sec.html}</div></section>`;
        if (i === 1 && N.image) html += `<figure class="note-fig"><img src="${N.image}" alt="${esc(N.image_alt)}" loading="lazy"></figure>`;
      });
    } else {
      html = `<p class="muted note-wait">${it.type === "work" ? "このワークのやり方" : "この動画のポイント"}は準備中です。</p>`;
    }
    $("#notes").innerHTML = html;

    /* 次に見る：原稿で指定がなければ、同じうつわのものを自動で4件 */
    let rel = relIds.map((r) => S.items.find((x) => x.id === r)).filter(Boolean);
    if (!rel.length) rel = S.items.filter((x) => x.id !== it.id && detailHref(x) && x.tags.some((t) => it.tags.includes(t))).slice(0, 4);
    if (rel.length) $("#related").innerHTML = rel.map(itemHTML).join(""); else $("#relSec").hidden = true;
  }


  /* ---------------- ワーク ---------------- */
  const VCOL = { chochiku: "貯蓄", juyou: "受容", ryunyu: "流入" };
  function work() {
    let f = params.get("v") || "all";
    $("#vf").innerHTML = [["all", "すべて"], ...Object.entries(VCOL)]
      .map(([k, v]) => `<button type="button" data-k="${k}" class="${k}">${k === "all" ? v : `<span class="dot ${k}"></span>${v}`}</button>`).join("");
    function render() {
      document.querySelectorAll("#vf button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === f));
      const list = S.works.filter((w) => !w.hidden && (f === "all" || w.v.includes(f)))
        .sort((a, b) => (b.rec - a.rec));
      $("#works").innerHTML = list.map((w) => {
        const it = w.item && S.items.find((x) => x.id === w.item);
        const ok = it && detailHref(it);
        const dots = w.v.map((k) => `<span class="vm ${k}"><span class="dot ${k}"></span>${VCOL[k]}</span>`).join("");
        const both = w.v.length > 1 ? `<span class="both">${w.v.map((k) => VCOL[k]).join("にも")}にも効く</span>` : "";
        return `<li class="wk${w.rec ? " rec" : ""}${ok ? "" : " wait"}">
          ${w.rec ? `<span class="flag">おすすめ</span>` : ""}
          <div class="vms">${dots}${both}</div>
          <h3>${esc(w.name)}${w.isNew ? `<span class="new">NEW！</span>` : ""}</h3>
          <p class="${w.desc ? "" : "muted"}">${w.desc ? esc(w.desc) : "説明は準備中です。"}</p>
          ${ok ? `<a class="btn" href="item.html?id=${encodeURIComponent(it.id)}">やり方を見る →</a>` : `<span class="badge wait">やり方は準備中</span>`}
        </li>`;
      }).join("");
      const u = new URL(location.href); f === "all" ? u.searchParams.delete("v") : u.searchParams.set("v", f); history.replaceState(null, "", u);
    }
    $("#vf").onclick = (e) => { const b = e.target.closest("button"); if (b) { f = b.dataset.k; render(); } };
    render();
  }

  const page = document.body.dataset.page;
  ({ home, zoom, odai, library, item, work }[page] || (() => {}))();
})();

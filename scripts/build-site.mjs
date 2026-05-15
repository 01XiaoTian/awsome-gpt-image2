import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const index = JSON.parse(fs.readFileSync(path.join(repoRoot, "cases/index.json"), "utf8"));

function readPrompt(casePath) {
  const promptPath = path.join(repoRoot, casePath, "prompt.md");
  if (!fs.existsSync(promptPath)) return "";
  const text = fs.readFileSync(promptPath, "utf8");
  const match = text.match(/```text\n([\s\S]*?)\n```/);
  return match ? match[1].trim() : "";
}

function readMetadata(casePath) {
  const metadataPath = path.join(repoRoot, casePath, "metadata.json");
  if (!fs.existsSync(metadataPath)) return {};
  return JSON.parse(fs.readFileSync(metadataPath, "utf8"));
}

function imageFor(item, metadata) {
  if (metadata.local_image) return metadata.local_image;
  if (item.local_image) return item.local_image;
  if (item.preview) return item.preview;
  if (metadata.image_files?.[0]) return path.posix.join(item.path, metadata.image_files[0]);
  if (metadata.external_image_urls?.[0]) return metadata.external_image_urls[0];
  if (item.external_preview) return item.external_preview;
  return "";
}

function excerpt(text, length = 220) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > length ? `${clean.slice(0, length).trim()}...` : clean;
}

const cases = index.map((item) => {
  const metadata = readMetadata(item.path);
  const prompt = readPrompt(item.path);
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    path: item.path,
    image: imageFor(item, metadata),
    source: metadata.source_repository || item.source || metadata.source || "original",
    license: metadata.license || item.license || "See case",
    tags: item.tags || metadata.tags || [],
    prompt,
    excerpt: excerpt(prompt)
  };
});

const categories = [...new Set(cases.map((item) => item.category))].sort();
const categoryCounts = categories.map((category) => ({
  category,
  count: cases.filter((item) => item.category === category).length
}));

fs.mkdirSync(path.join(repoRoot, "assets"), { recursive: true });
fs.writeFileSync(path.join(repoRoot, "assets", "cases.json"), `${JSON.stringify({ categoryCounts, cases }, null, 2)}\n`);

const css = `:root {
  color-scheme: light;
  --bg: #f5f1e8;
  --ink: #191714;
  --muted: #6d655b;
  --line: rgba(25, 23, 20, .14);
  --paper: #fffaf0;
  --accent: #d94f35;
  --green: #316f5b;
  --blue: #275f84;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background:
    linear-gradient(90deg, rgba(25,23,20,.035) 1px, transparent 1px),
    linear-gradient(rgba(25,23,20,.03) 1px, transparent 1px),
    var(--bg);
  background-size: 34px 34px;
}

a { color: inherit; }
.shell { max-width: 1240px; margin: 0 auto; padding: 28px; }
.hero {
  min-height: 78vh;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr);
  gap: 44px;
  align-items: center;
  padding: 42px 0 28px;
}
.eyebrow {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255,250,240,.72);
  color: var(--muted);
  font-size: 13px;
}
h1 {
  margin: 22px 0 18px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(46px, 8vw, 104px);
  line-height: .92;
  letter-spacing: 0;
}
.lead {
  max-width: 720px;
  font-size: 20px;
  line-height: 1.65;
  color: #3f3933;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 18px;
  border: 1px solid var(--ink);
  background: var(--ink);
  color: white;
  text-decoration: none;
  font-weight: 700;
}
.button.secondary { background: transparent; color: var(--ink); }
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--line);
  background: rgba(255,250,240,.7);
  margin-top: 30px;
}
.stat { padding: 18px; border-right: 1px solid var(--line); }
.stat:last-child { border-right: 0; }
.stat strong { display: block; font-size: 28px; }
.stat span { color: var(--muted); font-size: 13px; }
.mosaic {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 90px;
  gap: 12px;
}
.mosaic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--line);
  background: var(--paper);
  filter: saturate(.96) contrast(1.02);
}
.tile-large { grid-column: span 3; grid-row: span 3; }
.tile-wide { grid-column: span 3; grid-row: span 2; }
.tile-small { grid-column: span 2; grid-row: span 2; }
.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin: 56px 0 18px;
  border-top: 2px solid var(--ink);
  padding-top: 18px;
}
.section-head h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
}
.section-head p { margin: 0; color: var(--muted); max-width: 520px; line-height: 1.55; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 24px; }
.filter {
  border: 1px solid var(--line);
  background: rgba(255,250,240,.76);
  color: var(--ink);
  height: 36px;
  padding: 0 12px;
  cursor: pointer;
}
.filter.active { background: var(--green); color: white; border-color: var(--green); }
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.card {
  border: 1px solid var(--line);
  background: rgba(255,250,240,.88);
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.thumb {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid var(--line);
  background: #eee5d4;
}
.card-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.meta { display: flex; justify-content: space-between; gap: 8px; color: var(--muted); font-size: 12px; text-transform: uppercase; }
.card h3 { margin: 0; font-size: 22px; line-height: 1.18; }
.prompt-preview {
  margin: 0;
  color: #4c463f;
  line-height: 1.5;
  font-size: 14px;
}
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
.tag { font-size: 12px; color: var(--blue); background: rgba(39,95,132,.1); padding: 4px 7px; }
.card button {
  height: 38px;
  border: 1px solid var(--ink);
  background: transparent;
  font-weight: 700;
  cursor: pointer;
}
.drawer {
  position: fixed;
  inset: auto 0 0 0;
  max-height: 82vh;
  transform: translateY(110%);
  transition: transform .24s ease;
  background: #161411;
  color: #fffaf0;
  border-top: 1px solid rgba(255,255,255,.2);
  z-index: 10;
  overflow: auto;
}
.drawer.open { transform: translateY(0); }
.drawer-inner { max-width: 1120px; margin: 0 auto; padding: 24px 28px 32px; }
.drawer-top { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
.drawer h2 { margin: 0 0 8px; font-size: 30px; }
.drawer pre {
  white-space: pre-wrap;
  line-height: 1.55;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.16);
  padding: 18px;
  overflow: auto;
}
.close { background: transparent; color: white; border: 1px solid rgba(255,255,255,.4); height: 36px; padding: 0 12px; cursor: pointer; }
.footer { padding: 48px 0; color: var(--muted); }

@media (max-width: 920px) {
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 620px) {
  .shell { padding: 18px; }
  .grid { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr; }
  .stat { border-right: 0; border-bottom: 1px solid var(--line); }
  .stat:last-child { border-bottom: 0; }
  .mosaic { grid-auto-rows: 70px; }
  .tile-large, .tile-wide, .tile-small { grid-column: span 6; grid-row: span 3; }
}
`;

fs.writeFileSync(path.join(repoRoot, "assets", "style.css"), css);

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Awesome GPT Image 2 Prompts</title>
  <meta name="description" content="GPT Image 2 prompt gallery with local images, examples, and reusable prompt cards.">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <main class="shell">
    <section class="hero">
      <div>
        <span class="eyebrow">Open prompt gallery / GPT Image 2</span>
        <h1>Prompts that show their work.</h1>
        <p class="lead">一个更适合浏览和复用的 GPT Image 2 案例库：本地图片、完整提示词、来源许可、分类筛选和可复制的 Prompt Cards。</p>
        <div class="hero-actions">
          <a class="button" href="#gallery">Browse gallery</a>
          <a class="button secondary" href="GALLERY.md">Markdown gallery</a>
        </div>
        <div class="stats">
          <div class="stat"><strong>${cases.length}</strong><span>Prompt cases</span></div>
          <div class="stat"><strong>${categories.length}</strong><span>Categories</span></div>
          <div class="stat"><strong>${cases.filter((item) => item.image.includes("assets/images")).length}</strong><span>Local images</span></div>
        </div>
      </div>
      <div class="mosaic" id="mosaic"></div>
    </section>

    <section id="gallery">
      <div class="section-head">
        <h2>Gallery</h2>
        <p>按用途筛选，点开卡片可以直接看完整提示词。外部来源保留许可证和作者信息，本地图片保存在 <code>assets/images</code>。</p>
      </div>
      <div class="filters" id="filters"></div>
      <div class="grid" id="cards"></div>
    </section>

    <footer class="footer">
      <p>Built as a lightweight static gallery. Cases are stored in <code>cases/</code>, data lives in <code>assets/cases.json</code>.</p>
    </footer>
  </main>

  <aside class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer-inner">
      <div class="drawer-top">
        <div>
          <h2 id="drawerTitle"></h2>
          <p id="drawerMeta"></p>
        </div>
        <button class="close" id="closeDrawer">Close</button>
      </div>
      <pre id="drawerPrompt"></pre>
    </div>
  </aside>

  <script>
    const state = { cases: [], category: "all" };
    const categories = ${JSON.stringify(categories)};

    function imgFallback(event) {
      event.currentTarget.style.display = "none";
    }

    function renderFilters() {
      const root = document.getElementById("filters");
      const items = ["all", ...categories];
      root.innerHTML = items.map((category) =>
        '<button class="filter' + (state.category === category ? ' active' : '') + '" data-category="' + category + '">' + category + '</button>'
      ).join("");
      root.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          state.category = button.dataset.category;
          renderFilters();
          renderCards();
        });
      });
    }

    function renderMosaic() {
      const root = document.getElementById("mosaic");
      const picks = state.cases.filter((item) => item.image).slice(0, 8);
      const classes = ["tile-large", "tile-wide", "tile-small", "tile-small", "tile-wide", "tile-small", "tile-small", "tile-small"];
      root.innerHTML = picks.map((item, index) => '<img class="' + classes[index] + '" src="' + item.image + '" alt="' + item.title + '" onerror="imgFallback(event)">').join("");
    }

    function renderCards() {
      const root = document.getElementById("cards");
      const filtered = state.category === "all" ? state.cases : state.cases.filter((item) => item.category === state.category);
      root.innerHTML = filtered.map((item, index) => {
        const tags = item.tags.slice(0, 4).map((tag) => '<span class="tag">' + tag + '</span>').join("");
        return '<article class="card">' +
          '<img class="thumb" src="' + item.image + '" alt="' + item.title + '" onerror="imgFallback(event)">' +
          '<div class="card-body">' +
          '<div class="meta"><span>' + item.category + '</span><span>' + item.license + '</span></div>' +
          '<h3>' + item.title + '</h3>' +
          '<p class="prompt-preview">' + item.excerpt + '</p>' +
          '<div class="tags">' + tags + '</div>' +
          '<button data-index="' + index + '">View prompt</button>' +
          '</div></article>';
      }).join("");
      root.querySelectorAll("button").forEach((button, index) => {
        button.addEventListener("click", () => openDrawer(filtered[index]));
      });
    }

    function openDrawer(item) {
      document.getElementById("drawerTitle").textContent = item.title;
      document.getElementById("drawerMeta").textContent = item.category + " / " + item.source + " / " + item.license;
      document.getElementById("drawerPrompt").textContent = item.prompt || item.excerpt;
      document.getElementById("drawer").classList.add("open");
      document.getElementById("drawer").setAttribute("aria-hidden", "false");
    }

    document.getElementById("closeDrawer").addEventListener("click", () => {
      document.getElementById("drawer").classList.remove("open");
      document.getElementById("drawer").setAttribute("aria-hidden", "true");
    });

    fetch("assets/cases.json")
      .then((response) => response.json())
      .then((data) => {
        state.cases = data.cases;
        renderFilters();
        renderMosaic();
        renderCards();
      });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(repoRoot, "index.html"), html);
console.log(`Built static site with ${cases.length} cases.`);

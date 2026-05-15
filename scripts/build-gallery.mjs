import fs from "node:fs";
import path from "node:path";

const repoUrl = "https://github.com/01XiaoTian/awsome-gpt-image2";
const index = JSON.parse(fs.readFileSync("cases/index.json", "utf8"));

function readPrompt(caseItem) {
  const promptPath = path.join(caseItem.path, "prompt.md");
  if (!fs.existsSync(promptPath)) return "";
  const text = fs.readFileSync(promptPath, "utf8");
  const match = text.match(/```text\n([\s\S]*?)\n```/);
  return match ? match[1].trim() : "";
}

function excerpt(text, max = 360) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trim()}...`;
}

function imageFor(item) {
  return item.preview || item.external_preview || "";
}

function sourceLabel(item) {
  if (item.source === "original" || !item.source) return "Original";
  return item.source;
}

const categories = new Map();
for (const item of index) {
  if (!categories.has(item.category)) categories.set(item.category, []);
  categories.get(item.category).push(item);
}

const categoryOrder = [
  "product",
  "poster",
  "character",
  "portrait",
  "ui",
  "interior",
  "food",
  "fashion",
  "game",
  "diagram",
  "illustration"
];

const sortedCategories = [...categories.keys()].sort((a, b) => {
  const ai = categoryOrder.indexOf(a);
  const bi = categoryOrder.indexOf(b);
  if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  return a.localeCompare(b);
});

let md = `# GPT Image 2 Prompt Gallery

按分类浏览 GPT Image 2 提示词与图片案例。每张卡片都直接展示提示词摘要；完整提示词、负向约束、参数和复盘在案例目录中。

## Category Index

| Category | Count | Jump |
| --- | ---: | --- |
`;

for (const category of sortedCategories) {
  md += `| ${category} | ${categories.get(category).length} | [View](#${category}) |\n`;
}

for (const category of sortedCategories) {
  md += `\n## ${category}\n\n`;
  const items = categories.get(category).sort((a, b) => a.title.localeCompare(b.title));
  for (const item of items) {
    const prompt = excerpt(readPrompt(item));
    const image = imageFor(item);
    const tags = (item.tags || []).map((tag) => `\`${tag}\``).join(" ");
    const license = item.license || "See metadata";
    md += `### ${item.title}

![${item.title}](${image})

- Path: [${item.path}](${item.path}/prompt.md)
- Source: ${sourceLabel(item)}
- License: ${license}
- Tags: ${tags}

**Prompt Preview**

\`\`\`text
${prompt}
\`\`\`

`;
  }
}

md += `## Notes

- Original cases use local SVG previews so the repository remains lightweight.
- Web-curated cases keep external image URLs and attribution metadata to avoid unclear redistribution.
- Full source details are tracked in [docs/sources.md](docs/sources.md).

[Back to README](${repoUrl})
`;

fs.writeFileSync("GALLERY.md", md);
console.log(`Built gallery with ${index.length} cases.`);

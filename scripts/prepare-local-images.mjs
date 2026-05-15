import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const indexPath = path.join(repoRoot, "cases", "index.json");
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));

function extFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  const ext = path.extname(clean);
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) return ext;
  return ".jpg";
}

const downloads = [];

for (const item of index) {
  const metadataPath = path.join(repoRoot, item.path, "metadata.json");
  if (!fs.existsSync(metadataPath)) continue;
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const external = metadata.external_image_urls?.[0] || item.external_preview;
  if (!external) continue;
  const local = metadata.local_image || item.local_image || `assets/images/${item.id}${extFromUrl(external)}`;
  metadata.local_image = local;
  item.local_image = local;
  fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
  downloads.push({ id: item.id, image_url: external, local_image: local });
}

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
fs.writeFileSync(path.join(repoRoot, "assets", "downloads.json"), `${JSON.stringify(downloads, null, 2)}\n`);
console.log(`Prepared ${downloads.length} local image downloads.`);

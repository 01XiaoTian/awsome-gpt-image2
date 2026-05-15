import fs from "node:fs";
import path from "node:path";

const imported = [
  {
    id: "imgedify-luxury-wooden-door",
    title: "Luxury Wooden Door Detail",
    category: "product",
    source: "ImgEdify/Awesome-GPT4o-Image-Prompts",
    author: "Umesh",
    original_post_url: "https://x.com/umesh_ai/status/1915243668870467950",
    license: "MIT",
    image_url: "https://cdn.imgedify.com/imgedify/images/1745881819979-lopiam7p21.jpeg",
    local_image: "assets/images/imgedify-luxury-wooden-door.jpeg",
    tags: ["product", "material", "macro", "photography"],
    prompt: "A close-up photograph of a luxurious wooden door with detailed paneling and rich grain texture. The door features a custom-shaped doorknob in the form of the [LOGO_NAME] logo, made of polished material (metal, brass, ceramic, etc.) to look realistic and tangible. The handle is mounted on an antique bronze base, with soft, ambient lighting emphasizing the reflections, shadows, and depth of both the knob and door."
  },
  {
    id: "imgedify-blueprint-schematic",
    title: "Retro-Futuristic Blueprint Schematic",
    category: "diagram",
    source: "ImgEdify/Awesome-GPT4o-Image-Prompts",
    author: "Amira Zairi",
    original_post_url: "https://x.com/azed_ai/status/1914258586588639270",
    license: "MIT",
    image_url: "https://cdn.imgedify.com/imgedify/images/1745248340542-hqkzuqp1bib.jpeg",
    local_image: "assets/images/imgedify-blueprint-schematic.jpeg",
    tags: ["diagram", "blueprint", "industrial", "vehicle"],
    prompt: "A blueprint schematic of a retro-futuristic motorcycle, drawn in the style of early 20th-century industrial patents. Rendered in crisp blue ink with white technical lines, featuring exploded views, angular labels, and stamped diagram codes."
  },
  {
    id: "imgedify-low-poly-camel",
    title: "Low Poly Desert Camel",
    category: "illustration",
    source: "ImgEdify/Awesome-GPT4o-Image-Prompts",
    author: "Amira Zairi",
    original_post_url: "https://x.com/azed_ai/status/1912084257918595342",
    license: "MIT",
    image_url: "https://cdn.imgedify.com/imgedify/images/1744757092419-xgwkh25sx4k.jpeg",
    local_image: "assets/images/imgedify-low-poly-camel.jpeg",
    tags: ["illustration", "low-poly", "3d", "environment"],
    prompt: "A low-poly 3D render of a camel, built from clean triangular facets with flat sandy beige and burnt orange surfaces. The environment is a stylized digital desert with minimal geometry and ambient occlusion."
  },
  {
    id: "imgedify-typographic-portrait",
    title: "Typographic Portrait",
    category: "portrait",
    source: "ImgEdify/Awesome-GPT4o-Image-Prompts",
    author: "firatbilal",
    original_post_url: "https://x.com/firatbilal/status/1911849629211050492",
    license: "MIT",
    image_url: "https://cdn.imgedify.com/media/image/2025/04/2f7a7cf9f5bc774d063f1f74e8bff249.png",
    local_image: "assets/images/imgedify-typographic-portrait.png",
    tags: ["portrait", "typography", "poster", "experimental"],
    prompt: "Recreate the attached image as Typography Portrait. Subject is happiness."
  },
  {
    id: "imgedify-fluffy-swan",
    title: "Fluffy Swan Object",
    category: "illustration",
    source: "ImgEdify/Awesome-GPT4o-Image-Prompts",
    author: "Gizem Akdag",
    original_post_url: "https://x.com/gizakdag/status/1911781605569347976",
    license: "MIT",
    image_url: "https://cdn.imgedify.com/imgedify/images/1744757090568-rtyh62sppd.jpeg",
    local_image: "assets/images/imgedify-fluffy-swan.jpeg",
    tags: ["illustration", "3d", "tactile", "object"],
    prompt: "Transform a simple flat vector illustration of a swan into a soft, 3D fluffy object. Use the exact colors. The shape is fully covered in fur, with hyperrealistic hair texture and soft shadows. The object is centered on a clean, light gray background and floats gently in space. The style is surreal, tactile, and modern, evoking a sense of comfort and playfulness. Studio lighting, high-resolution render."
  },
  {
    id: "imgedify-minimal-3d-icons",
    title: "Minimal 3D Icon Render",
    category: "ui",
    source: "ImgEdify/Awesome-GPT4o-Image-Prompts",
    author: "Amira Zairi",
    original_post_url: "https://x.com/azed_ai/status/1906285785961406891",
    license: "MIT",
    image_url: "https://cdn.imgedify.com/imgedify/images/1744757063151-fjktfhmchbo.jpeg",
    local_image: "assets/images/imgedify-minimal-3d-icons.jpeg",
    tags: ["ui", "icon", "3d", "minimal"],
    prompt: "minimalist 3D render, [Subject], soft matte finish, black and antique gold details, pristine white backdrop, isometric angle, ambient glow, feathered shadows, simple and elegant"
  }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeCase(item) {
  const dir = path.join("cases", "web-curated", item.id);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "prompt.md"), `# ${item.title}

## Source

- Repository: [${item.source}](https://github.com/${item.source})
- Author: ${item.author}
- Original post: ${item.original_post_url}
- License: ${item.license}

## Image

![${item.title}](../../../${item.local_image})

## Prompt

\`\`\`text
${item.prompt}
\`\`\`

## Why It Works

This case was selected because it is visually distinct, reusable as a prompt pattern, and has a clear source license in the upstream prompt collection.
`);
  fs.writeFileSync(path.join(dir, "metadata.json"), `${JSON.stringify({
    id: item.id,
    title: item.title,
    category: item.category,
    model: "gpt4o / GPT Image style prompt",
    source_repository: item.source,
    source_url: `https://github.com/${item.source}`,
    original_post_url: item.original_post_url,
    author: item.author,
    license: item.license,
    local_image: item.local_image,
    external_image_urls: [item.image_url],
    rights_notes: "Imported from a public MIT-licensed prompt collection. Attribution retained.",
    tags: item.tags
  }, null, 2)}\n`);
  fs.writeFileSync(path.join(dir, "notes.md"), `# Notes

Reusable pattern from ${item.source}.

## Variation Ideas

- Replace the subject while keeping the same composition and material language.
- Adjust the lighting, aspect ratio, or target use case.
- Remove brand references before using commercially unless you own the rights.
`);
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    path: dir.replaceAll("\\", "/"),
    local_image: item.local_image,
    source: item.source,
    license: item.license,
    tags: item.tags
  };
}

const indexPath = "cases/index.json";
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const seen = new Set(index.map((item) => item.id));

for (const item of imported) {
  const entry = writeCase(item);
  if (!seen.has(item.id)) index.push(entry);
}

index.sort((a, b) => {
  const c = String(a.category).localeCompare(String(b.category));
  return c || String(a.title).localeCompare(String(b.title));
});

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
fs.writeFileSync("assets/downloads.json", `${JSON.stringify(imported.map(({ id, image_url, local_image }) => ({ id, image_url, local_image })), null, 2)}\n`);
console.log(`Imported ${imported.length} ImgEdify cases. Index has ${index.length} cases.`);

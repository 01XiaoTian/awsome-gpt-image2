import fs from "node:fs";
import path from "node:path";

const cases = [
  {
    id: "modular-desk-setup",
    title: "Modular Desk Setup",
    category: "product",
    dir: "cases/product/modular-desk-setup",
    aspect: "16:9",
    style: "realistic workspace product photography",
    tags: ["product", "workspace", "minimal", "tech"],
    colors: ["#f4f1ea", "#21343f", "#8fb7a9", "#c88a5a"],
    prompt:
      "Create a premium product photograph of a modular home-office desk setup with a slim monitor, mechanical keyboard, wireless charger, ceramic pen cup, and stackable oak organizer trays. The desk is matte walnut with clean cable management and a soft linen wall behind it. Use eye-level composition, gentle morning window light from the left, realistic shadows, and subtle reflections on aluminum and glass. Leave negative space in the upper right for a product headline. The image should feel calm, precise, ergonomic, and suitable for a modern productivity brand.",
    negative:
      "Avoid messy cables, visible brand logos, warped keyboards, unreadable screen text, cluttered stationery, plastic-looking wood, and unrealistic reflections.",
    why:
      "It lists the product system, specifies negative space for copy, and balances material details with commercial lighting."
  },
  {
    id: "ceramic-tea-set-hero",
    title: "Ceramic Tea Set Hero",
    category: "product",
    dir: "cases/product/ceramic-tea-set-hero",
    aspect: "4:5",
    style: "editorial product still life",
    tags: ["product", "ceramic", "still-life", "editorial"],
    colors: ["#eee7d7", "#5d7b6f", "#c2a36b", "#2f3530"],
    prompt:
      "Create an editorial still-life photograph of a handmade ceramic tea set on a low stone table. Include a small teapot, two imperfect cups, loose tea leaves, a linen napkin, and a thin trail of steam. The ceramics have a speckled celadon glaze with tiny irregularities and hand-thrown edges. Use a muted beige background, soft side light, shallow depth of field, and quiet negative space. The image should feel artisanal, calm, tactile, and suitable for a boutique lifestyle catalog.",
    negative:
      "Avoid factory-perfect symmetry, glossy plastic texture, brand logos, excessive props, hard shadows, distorted cup rims, and over-saturated colors.",
    why:
      "It anchors the image in tactile craft details, which helps avoid generic lifestyle visuals."
  },
  {
    id: "holographic-perfume-campaign",
    title: "Holographic Perfume Campaign",
    category: "product",
    dir: "cases/product/holographic-perfume-campaign",
    aspect: "1:1",
    style: "luxury fragrance campaign",
    tags: ["product", "fragrance", "luxury", "campaign"],
    colors: ["#101116", "#d9ecff", "#b88cff", "#f6d6a8"],
    prompt:
      "Create a square luxury fragrance campaign image featuring a transparent glass perfume bottle with a fictional label reading 'AURORA VEIL'. The bottle stands on a glossy black acrylic surface with holographic light caustics, soft mist, and delicate refractions through the glass. Use high-contrast studio lighting, cool blue and violet rim lights, warm gold highlights on the cap, and a centered symmetrical composition. The result should feel premium, mysterious, futuristic, and ready for a beauty brand social post.",
    negative:
      "Avoid real brand names, misspelled label text, extra bottles, cloudy glass, uneven cap geometry, clutter, low-detail reflections, and cheap plastic shine.",
    why:
      "It controls typography, material, lighting color, and product count, all of which matter in beauty advertising."
  },
  {
    id: "botanical-packaging-flatlay",
    title: "Botanical Packaging Flatlay",
    category: "product",
    dir: "cases/product/botanical-packaging-flatlay",
    aspect: "3:2",
    style: "sustainable packaging flat lay",
    tags: ["product", "packaging", "sustainable", "flat-lay"],
    colors: ["#f6f0e4", "#738f5b", "#b7a27a", "#384331"],
    prompt:
      "Create a clean flat-lay product photograph of sustainable botanical packaging for a fictional herbal soap brand. Arrange two kraft paper boxes, one unwrapped green soap bar, eucalyptus leaves, cotton string, recycled paper tags, and a small ceramic dish on a warm off-white surface. Use top-down composition, soft diffused daylight, natural shadows, and a restrained green, kraft, ivory palette. The design should look eco-conscious, premium, and easy to adapt for ecommerce thumbnails.",
    negative:
      "Avoid real logos, messy labels, excessive leaves, plastic wrap, warped boxes, illegible small text, and overly rustic dirt or stains.",
    why:
      "Flat-lay constraints make the prompt reusable for many ecommerce packaging categories."
  },
  {
    id: "storybook-forest-guide",
    title: "Storybook Forest Guide",
    category: "character",
    dir: "cases/character/storybook-forest-guide",
    aspect: "2:3",
    style: "storybook character illustration",
    tags: ["character", "storybook", "fantasy", "illustration"],
    colors: ["#efe7cb", "#496b45", "#b77c4b", "#2d3a2f"],
    prompt:
      "Create a warm storybook character illustration of a young forest guide standing at the edge of an ancient mossy trail. The character wears a practical olive cloak, leather satchel, carved wooden compass, and patched boots. Their expression is curious and kind, with wind-tousled hair and a small lantern glowing at their side. The background includes fern silhouettes, old tree roots, firefly-like light dots, and a misty path disappearing into the woods. Use painterly gouache texture, soft golden-green lighting, and a gentle adventurous mood.",
    negative:
      "Avoid copyrighted character likenesses, modern city clothing, weapons, over-detailed background clutter, distorted hands, and overly dark horror atmosphere.",
    why:
      "It defines role, props, mood, and illustration medium, giving the character a usable narrative identity."
  },
  {
    id: "sci-fi-medic-character-sheet",
    title: "Sci-Fi Medic Character Sheet",
    category: "character",
    dir: "cases/character/sci-fi-medic-character-sheet",
    aspect: "16:9",
    style: "game character sheet",
    tags: ["character", "sci-fi", "game", "sheet"],
    colors: ["#f2f5f6", "#2f5565", "#e06b4f", "#8aa7ad"],
    prompt:
      "Create a professional sci-fi game character sheet for a battlefield medic from an original universe. Show one full-body front view, one three-quarter pose, and three close-up callouts for helmet visor, medical wrist scanner, and compact drone pack. The medic wears white and teal modular armor with orange emergency markings, fabric joints, utility pouches, and clean wear-and-tear. Use a light neutral background, precise concept-art linework, subtle shadows, and clear spacing between views. The sheet should feel production-ready for a game art team.",
    negative:
      "Avoid existing franchise armor, random logos, unreadable microtext, extra limbs, inconsistent outfit details between views, and overly busy UI frames.",
    why:
      "Multi-view and callout instructions make it useful for production-style character exploration."
  },
  {
    id: "editorial-chef-portrait",
    title: "Editorial Chef Portrait",
    category: "portrait",
    dir: "cases/portrait/editorial-chef-portrait",
    aspect: "4:5",
    style: "editorial portrait photography",
    tags: ["portrait", "editorial", "food", "photography"],
    colors: ["#1f2322", "#e8dcc6", "#b74834", "#6c7a5a"],
    prompt:
      "Create an editorial portrait photograph of an independent chef standing in a small open kitchen after service. The chef wears a clean cream apron over a dark shirt, with relaxed posture, natural expression, and lightly flour-dusted hands. In the background, show soft bokeh from copper pans, herbs, and a warm prep light, but keep the face sharply focused. Use a 50mm lens feeling, warm cinematic side light, natural skin texture, and muted earth colors. The image should feel honest, skilled, and magazine-ready.",
    negative:
      "Avoid celebrity likenesses, exaggerated glamour retouching, greasy skin, distorted hands, messy unsafe kitchen elements, brand logos, and fake-looking food props.",
    why:
      "The prompt frames a believable editorial scene rather than a generic studio portrait."
  },
  {
    id: "architectural-section-poster",
    title: "Architectural Section Poster",
    category: "poster",
    dir: "cases/poster/architectural-section-poster",
    aspect: "2:3",
    style: "architectural poster illustration",
    tags: ["poster", "architecture", "section", "editorial"],
    colors: ["#f3ead8", "#29394a", "#d36b4c", "#79a9b5"],
    prompt:
      "Create a vertical architectural poster showing a cutaway section of a compact urban library. The building is sliced open like a precise editorial illustration, revealing reading rooms, staircases, book stacks, a rooftop garden, a cafe corner, and tiny visitors moving through the space. Use clean ink lines, soft watercolor fills, warm cream paper texture, and small numbered callouts with simple labels. Add a bold title area at the top reading 'Neighborhood Library'. The poster should feel educational, charming, and suitable for an architecture magazine.",
    negative:
      "Avoid impossible stair geometry, overcrowded rooms, misspelled title text, real institution logos, harsh neon colors, and messy perspective.",
    why:
      "Cutaway posters work well when the prompt separates structure, rooms, people, labels, and paper style."
  },
  {
    id: "farmers-market-event-poster",
    title: "Farmers Market Event Poster",
    category: "poster",
    dir: "cases/poster/farmers-market-event-poster",
    aspect: "2:3",
    style: "risograph event poster",
    tags: ["poster", "event", "risograph", "food"],
    colors: ["#f7e8c8", "#2f7d61", "#e5533d", "#f4b942"],
    prompt:
      "Create a cheerful vertical risograph-style event poster for a fictional weekend farmers market. The central illustration shows a basket overflowing with tomatoes, peaches, leafy greens, flowers, and a small loaf of bread. Use bold flat shapes, slight print misregistration, grainy ink texture, and a palette of tomato red, leafy green, golden yellow, and cream. Leave clear typography zones for the title 'Saturday Market', date, location, and vendor list. The design should feel local, friendly, handmade, and print-ready.",
    negative:
      "Avoid real market names, illegible text blocks, too many tiny items, glossy 3D rendering, muddy colors, and cluttered background patterns.",
    why:
      "It asks for typography zones instead of relying on perfect generated event text."
  },
  {
    id: "museum-exhibition-key-visual",
    title: "Museum Exhibition Key Visual",
    category: "poster",
    dir: "cases/poster/museum-exhibition-key-visual",
    aspect: "3:4",
    style: "museum campaign key visual",
    tags: ["poster", "museum", "campaign", "minimal"],
    colors: ["#eee8dc", "#111111", "#b84d38", "#8b8f89"],
    prompt:
      "Create a refined museum exhibition key visual for a fictional show titled 'Fragments of Tomorrow'. The image features a single abstract ceramic shard floating in the center, lit like a precious artifact, with subtle cracks, matte glaze, and a faint red reflection beneath it. Use a quiet stone-gray background, large negative space, elegant editorial composition, and restrained black and red typography areas. The mood should be intellectual, minimal, and suitable for a contemporary art museum campaign.",
    negative:
      "Avoid real museum logos, crowded artifacts, fantasy glow, messy typography, broken perspective, and cheap poster effects.",
    why:
      "It is a strong example of object-led branding with negative space and controlled mood."
  },
  {
    id: "finance-dashboard-dark-mode",
    title: "Finance Dashboard Dark Mode",
    category: "ui",
    dir: "cases/ui/finance-dashboard-dark-mode",
    aspect: "16:9",
    style: "SaaS dashboard UI mockup",
    tags: ["ui", "dashboard", "finance", "saas"],
    colors: ["#11161c", "#1f2a33", "#4fb78f", "#e0b75b"],
    prompt:
      "Create a polished dark-mode SaaS finance dashboard UI for a small business owner. Show a left navigation rail, top filter bar, revenue KPI cards, cash-flow line chart, expense category bars, invoice status table, and a compact alerts panel. Use dense but readable spacing, crisp typography, subtle borders, muted charcoal surfaces, green positive indicators, amber warning accents, and no decorative marketing hero elements. The screen should feel practical, trustworthy, and ready for daily operational use.",
    negative:
      "Avoid fake unreadable microtext, overlapping panels, neon gamer styling, oversized cards, decorative blobs, empty hero sections, and unrealistic chart axes.",
    why:
      "The prompt describes functional dashboard regions and restraint, which keeps the UI work-focused."
  },
  {
    id: "travel-booking-mobile-flow",
    title: "Travel Booking Mobile Flow",
    category: "ui",
    dir: "cases/ui/travel-booking-mobile-flow",
    aspect: "16:9",
    style: "mobile app screen set",
    tags: ["ui", "mobile", "travel", "booking"],
    colors: ["#f4f5f0", "#23656b", "#f29f58", "#263239"],
    prompt:
      "Create a set of four mobile app screens for a modern train travel booking app. Include search, route results, seat selection, and ticket confirmation screens arranged side by side on a neutral background. Use a calm teal and warm orange palette, clear icons, compact cards, route timelines, station abbreviations, seat map grid, and a prominent confirmation QR area. The UI should feel efficient, accessible, and realistic for commuters, with consistent spacing and component styles across all screens.",
    negative:
      "Avoid illegible tiny text, inconsistent app chrome, floating decorative cards, unrealistic QR noise, overlapping buttons, and random airline imagery.",
    why:
      "Multiple named screens make the output more useful than a single generic app mockup."
  },
  {
    id: "editorial-dessert-photography",
    title: "Editorial Dessert Photography",
    category: "food",
    dir: "cases/food/editorial-dessert-photography",
    aspect: "4:5",
    style: "fine dining food photography",
    tags: ["food", "dessert", "photography", "editorial"],
    colors: ["#241c19", "#f4dfc7", "#b95f4a", "#d9a441"],
    prompt:
      "Create a fine-dining dessert photograph of a small plated citrus tart with torched meringue peaks, candied orange peel, a glossy sauce dot pattern, and a single edible flower. The plate is matte ivory ceramic on a dark walnut table. Use a low three-quarter camera angle, shallow depth of field, warm side light, realistic crumbs, and precise plating details. The image should feel intimate, refined, and suitable for a restaurant editorial feature.",
    negative:
      "Avoid oversized portions, messy sauce smears, plastic-looking food, fake flowers, harsh flash, warped plates, and visible brand marks.",
    why:
      "The prompt controls plating, camera, lighting, and food texture, which are essential for believable food images."
  },
  {
    id: "streetwear-lookbook-spread",
    title: "Streetwear Lookbook Spread",
    category: "fashion",
    dir: "cases/fashion/streetwear-lookbook-spread",
    aspect: "16:9",
    style: "fashion lookbook layout",
    tags: ["fashion", "lookbook", "streetwear", "editorial"],
    colors: ["#e7e0d2", "#1f2328", "#b5c7c9", "#d46045"],
    prompt:
      "Create a two-page fashion lookbook spread for an original streetwear capsule collection. Show three models in layered neutral outfits with oversized jackets, cropped utility vests, wide trousers, and textured sneakers. Use an urban concrete courtyard, overcast daylight, editorial poses, and a layout with one large hero photo, two smaller detail crops, fabric swatches, and minimal caption blocks. The design should feel contemporary, grounded, and ready for a brand PDF lookbook.",
    negative:
      "Avoid real brand logos, celebrity likenesses, oversexualized styling, distorted hands, inconsistent outfits, illegible captions, and chaotic collage layout.",
    why:
      "This prompt asks for a publication layout, not only a single fashion photo."
  },
  {
    id: "isometric-farm-game-scene",
    title: "Isometric Farm Game Scene",
    category: "game",
    dir: "cases/game/isometric-farm-game-scene",
    aspect: "1:1",
    style: "cozy isometric game art",
    tags: ["game", "isometric", "cozy", "environment"],
    colors: ["#dff0c2", "#6a9b58", "#d49b54", "#7fb6c7"],
    prompt:
      "Create a cozy isometric game environment tile showing a tiny spring farm. Include a small cottage, vegetable plots, fruit trees, a pond, stone paths, tool shed, chicken coop, and a few cute non-branded interface markers. Use soft stylized 3D shapes, rounded forms, clear readable silhouettes, warm sunlight, and a cheerful pastel palette. The scene should look like a polished farming simulation game asset, with every object separated enough to be understandable at small size.",
    negative:
      "Avoid copyrighted game styles, noisy over-detailing, unreadable tiny props, harsh realistic textures, gloomy lighting, and broken isometric perspective.",
    why:
      "It specifies gameplay readability and object separation, not just cozy vibes."
  },
  {
    id: "science-paper-figure",
    title: "Science Paper Figure",
    category: "diagram",
    dir: "cases/diagram/science-paper-figure",
    aspect: "16:9",
    style: "scientific figure diagram",
    tags: ["diagram", "science", "paper", "education"],
    colors: ["#ffffff", "#1f4e79", "#59a14f", "#e15759"],
    prompt:
      "Create a clean scientific paper figure explaining a three-step bio-sensing workflow. Panel A shows a sample droplet entering a microfluidic chip, Panel B shows molecules binding to sensor regions, and Panel C shows a simplified signal readout graph. Use crisp vector-like shapes, white background, blue and green accents, consistent arrows, panel labels A, B, C, and enough spacing for journal readability. The figure should be educational, precise, and suitable for a research presentation.",
    negative:
      "Avoid fake complex equations, cluttered lab equipment, unreadable labels, inconsistent arrow styles, decorative gradients, and medical claims.",
    why:
      "Panel-by-panel instructions make the output more controllable for educational and research visuals."
  },
  {
    id: "comic-page-silent-scene",
    title: "Comic Page Silent Scene",
    category: "illustration",
    dir: "cases/illustration/comic-page-silent-scene",
    aspect: "2:3",
    style: "silent comic page",
    tags: ["illustration", "comic", "storytelling", "sequential"],
    colors: ["#f0eadc", "#2b2b2b", "#6b8aa0", "#c87941"],
    prompt:
      "Create a one-page silent comic with six panels about a child discovering a tiny glowing door in the wall of an old apartment. No speech bubbles. Panel 1 shows the quiet room at night, Panel 2 shows the child noticing light under peeling wallpaper, Panel 3 shows a close-up of a small brass doorknob, Panel 4 shows the door opening to a starry miniature landscape, Panel 5 shows the child's amazed face, and Panel 6 shows a small warm light spilling into the room. Use ink lines, muted watercolor, clear panel gutters, and gentle magical realism.",
    negative:
      "Avoid text balloons, horror mood, copyrighted characters, inconsistent child design, confusing panel order, and overly busy backgrounds.",
    why:
      "Sequential prompts benefit from explicit panel beats and constraints against text balloons."
  }
];

function mkdirp(filePath) {
  fs.mkdirSync(filePath, { recursive: true });
}

function esc(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function svg(c) {
  const [bg, primary, accent, dark] = c.colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
  <title id="title">${esc(c.title)}</title>
  <desc id="desc">Stylized preview image for the ${esc(c.title)} prompt case.</desc>
  <rect width="1200" height="800" fill="${bg}"/>
  <rect x="58" y="58" width="1084" height="684" rx="28" fill="#ffffff" opacity=".45"/>
  <circle cx="940" cy="210" r="142" fill="${accent}" opacity=".32"/>
  <circle cx="244" cy="602" r="174" fill="${primary}" opacity=".18"/>
  <rect x="130" y="150" width="430" height="300" rx="28" fill="${primary}"/>
  <rect x="182" y="204" width="326" height="34" rx="17" fill="${bg}" opacity=".9"/>
  <rect x="182" y="272" width="250" height="26" rx="13" fill="${accent}" opacity=".9"/>
  <rect x="182" y="326" width="302" height="26" rx="13" fill="${accent}" opacity=".55"/>
  <path d="M668 520c60-168 152-252 276-252s196 84 216 252H668z" fill="${dark}" opacity=".92"/>
  <path d="M700 520c44-104 122-156 235-156 96 0 164 52 204 156H700z" fill="${accent}" opacity=".76"/>
  <path d="M155 560h520" stroke="${dark}" stroke-width="18" stroke-linecap="round" opacity=".2"/>
  <text x="130" y="625" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="${dark}">${esc(c.title)}</text>
  <text x="132" y="680" font-family="Arial, sans-serif" font-size="25" fill="${dark}" opacity=".72">${esc(c.category)} / ${esc(c.style)}</text>
</svg>
`;
}

function promptMd(c) {
  return `# ${c.title}

## Use Case

适合 \`${c.category}\` 场景，可作为可复用的 GPT Image 2 提示词模板。

## Preview

![${c.title}](preview.svg)

## Prompt

\`\`\`text
${c.prompt}
\`\`\`

## Negative Constraints

\`\`\`text
${c.negative}
\`\`\`

## Suggested Parameters

- Model: GPT Image 2
- Aspect ratio: ${c.aspect}
- Style: ${c.style}
- Output: png or webp

## Why It Works

${c.why}
`;
}

function metadata(c) {
  return `${JSON.stringify({
    id: c.id,
    title: c.title,
    category: c.category,
    model: "GPT Image 2",
    created_at: "2026-05-15",
    aspect_ratio: c.aspect,
    style: c.style,
    license: "CC BY 4.0",
    source: "original",
    tags: c.tags,
    image_files: ["preview.svg"]
  }, null, 2)}\n`;
}

function notesMd(c) {
  return `# Notes

${c.why}

## Variation Ideas

- Keep the composition but change the subject, material, or season.
- Swap the color palette while preserving the lighting setup.
- Convert the prompt into a campaign set by asking for three variations with the same layout.
`;
}

const indexPath = "cases/index.json";
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const existing = new Set(index.map((item) => item.id));

for (const c of cases) {
  mkdirp(c.dir);
  fs.writeFileSync(path.join(c.dir, "prompt.md"), promptMd(c));
  fs.writeFileSync(path.join(c.dir, "metadata.json"), metadata(c));
  fs.writeFileSync(path.join(c.dir, "notes.md"), notesMd(c));
  fs.writeFileSync(path.join(c.dir, "preview.svg"), svg(c));
  if (!existing.has(c.id)) {
    index.push({
      id: c.id,
      title: c.title,
      category: c.category,
      path: c.dir,
      preview: `${c.dir}/preview.svg`,
      source: "original",
      license: "CC BY 4.0",
      tags: c.tags
    });
  }
}

index.sort((a, b) => {
  const category = String(a.category).localeCompare(String(b.category));
  if (category !== 0) return category;
  return String(a.title).localeCompare(String(b.title));
});

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Generated ${cases.length} original cases. Index now has ${index.length} cases.`);

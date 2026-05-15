# Awesome GPT Image 2 Prompts

一个开源的 GPT Image 2 提示词与图片案例库。这里收集可复用的图像生成提示词、图片案例、参数建议、负向约束和复盘笔记。

> 当前已收录 **28 个案例**，覆盖产品广告、海报、角色、UI、室内、食物、时尚、游戏、图解和插画等场景。

## Browse

- [完整画廊：按分类直接看图片和提示词摘要](GALLERY.md)
- [案例索引 JSON](cases/index.json)
- [提示词写作指南](docs/prompt-writing.md)
- [分类规范](docs/taxonomy.md)
- [外部来源与许可证](docs/sources.md)

## Categories

| Category | Count | Examples |
| --- | ---: | --- |
| Product | 7 | sneaker ad, perfume campaign, tea set, desk setup, packaging |
| Poster | 7 | city poster, jazz poster, museum key visual, market poster |
| Character | 4 | cyberpunk courier, sci-fi medic sheet, storybook guide |
| UI | 3 | finance dashboard, travel booking flow, design system |
| Portrait | 1 | editorial chef portrait |
| Interior | 1 | warm reading nook |
| Food | 1 | fine-dining dessert photo |
| Fashion | 1 | streetwear lookbook spread |
| Game | 1 | isometric farm scene |
| Diagram | 1 | scientific paper figure |
| Illustration | 1 | silent comic page |

## Featured Prompt Cards

### Holographic Perfume Campaign

![Holographic Perfume Campaign](cases/product/holographic-perfume-campaign/preview.svg)

```text
Create a square luxury fragrance campaign image featuring a transparent glass perfume bottle with a fictional label reading 'AURORA VEIL'. The bottle stands on a glossy black acrylic surface with holographic light caustics, soft mist, and delicate refractions through the glass...
```

[Full case](cases/product/holographic-perfume-campaign/prompt.md)

### Finance Dashboard Dark Mode

![Finance Dashboard Dark Mode](cases/ui/finance-dashboard-dark-mode/preview.svg)

```text
Create a polished dark-mode SaaS finance dashboard UI for a small business owner. Show a left navigation rail, top filter bar, revenue KPI cards, cash-flow line chart, expense category bars, invoice status table, and a compact alerts panel...
```

[Full case](cases/ui/finance-dashboard-dark-mode/prompt.md)

### Sci-Fi Medic Character Sheet

![Sci-Fi Medic Character Sheet](cases/character/sci-fi-medic-character-sheet/preview.svg)

```text
Create a professional sci-fi game character sheet for a battlefield medic from an original universe. Show one full-body front view, one three-quarter pose, and three close-up callouts for helmet visor, medical wrist scanner, and compact drone pack...
```

[Full case](cases/character/sci-fi-medic-character-sheet/prompt.md)

### Illustrated City Food Map

![Illustrated City Food Map](https://cms-assets.youmind.com/media/1776662673014_nf0taw_HGRMNDybsAAGG88.jpg)

```text
{
  "type": "illustrated map infographic",
  "style": "{argument name=\"art style\" default=\"watercolor and ink hand-drawn illustration on vintage parchment\"}",
  "title_section": ...
}
```

[Full case](cases/web-curated/illustrated-city-food-map/prompt.md)

## Repository Structure

```text
cases/
  index.json
  product/<case-name>/
  poster/<case-name>/
  character/<case-name>/
  web-curated/<case-name>/
docs/
  prompt-writing.md
  sources.md
  taxonomy.md
prompts/templates/
  case-template.md
scripts/
  generate-original-cases.mjs
  build-gallery.mjs
GALLERY.md
```

## Case Format

每个案例尽量包含：

- `prompt.md`：完整提示词、负向约束、参数建议和案例说明
- `metadata.json`：分类、标签、来源、许可证、图片文件或外部图片链接
- `notes.md`：复盘、变化方向和复用建议
- `preview.svg` / image URL：图片案例或预览

## Source Policy

- 原创案例使用本地 SVG 预览，方便仓库轻量展示。
- 外部精选案例优先选择公开仓库和明确许可证来源。
- 不确定可再分发的图片只保留外部链接和来源信息。
- 所有外部案例必须保留 `source_url`、`author`、`license` 和 `external_image_urls`。

## Contributing

欢迎提交新的 GPT Image 2 提示词案例。请参考 [CONTRIBUTING.md](CONTRIBUTING.md)，并尽量提供：

- 完整正向提示词
- 负向约束
- 图片案例
- 参数建议
- 来源和许可证
- 为什么这个提示词有效

## License

内容默认采用 [CC BY 4.0](LICENSE)。单个案例如在 `metadata.json` 中声明了不同许可证，则以该案例声明为准。

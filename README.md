# Awesome GPT Image 2 Prompts

一个开源的 GPT Image 2 提示词与图片案例库，收集可复用的图像生成提示词、图片案例、参数建议、负向约束和复盘笔记。

> 当前画廊整理了 **28 个 Prompt Cards**，覆盖产品广告、海报、角色、UI、室内、食物、时尚、游戏、图解和插画等场景。

## Browse

- [完整画廊：按分类直接看提示词摘要](GALLERY.md)
- [结构化案例目录](cases/)
- [案例索引 JSON](cases/index.json)
- [提示词写作指南](docs/prompt-writing.md)
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

```text
Create a square luxury fragrance campaign image featuring a transparent glass perfume bottle with a fictional label reading 'AURORA VEIL'. The bottle stands on a glossy black acrylic surface with holographic light caustics, soft mist, and delicate refractions through the glass...
```

### Finance Dashboard Dark Mode

```text
Create a polished dark-mode SaaS finance dashboard UI for a small business owner. Show a left navigation rail, top filter bar, revenue KPI cards, cash-flow line chart, expense category bars, invoice status table, and a compact alerts panel...
```

### Sci-Fi Medic Character Sheet

```text
Create a professional sci-fi game character sheet for a battlefield medic from an original universe. Show one full-body front view, one three-quarter pose, and three close-up callouts for helmet visor, medical wrist scanner, and compact drone pack...
```

### Illustrated City Food Map

```text
{
  "type": "illustrated map infographic",
  "style": "watercolor and ink hand-drawn illustration on vintage parchment",
  "title_section": "city food map with mascot, landmarks, food spots, legend"
}
```

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
GALLERY.md
```

## Case Format

每个结构化案例尽量包含：

- `prompt.md`：完整提示词、负向约束、参数建议和案例说明
- `metadata.json`：分类、标签、来源、许可证、图片文件或外部图片链接
- `notes.md`：复盘、变化方向和复用建议
- `preview.svg` / image URL：图片案例或预览

## Source Policy

- 原创案例使用轻量预览和完整提示词说明。
- 外部精选案例优先选择公开仓库和明确许可证来源。
- 不确定可再分发的图片只保留外部链接和来源信息。
- 所有外部案例必须保留 `source_url`、`author`、`license` 和 `external_image_urls`。

## Contributing

欢迎提交新的 GPT Image 2 提示词案例。请参考 [CONTRIBUTING.md](CONTRIBUTING.md)，并尽量提供完整正向提示词、负向约束、图片案例、参数建议、来源和许可证。

## License

内容默认采用 [CC BY 4.0](LICENSE)。单个案例如在 `metadata.json` 中声明了不同许可证，则以该案例声明为准。

# GPT Image 2 Prompt Gallery

一个开源的 GPT Image 2 提示词与图片案例库，用来沉淀可复用的图像生成提示词、参数配置、成品图和复盘笔记。

> 说明：仓库中的示例图片用于展示案例组织方式。提交真实案例时，请确认图片版权、模型来源和使用许可。

## 仓库内容

- `cases/`：按场景分类的提示词与图片案例
- `prompts/templates/`：可复用提示词模板
- `docs/`：分类规范、写作建议和版权说明
- `CONTRIBUTING.md`：贡献案例的格式与流程

## 案例画廊

| 分类 | 案例 | 预览 | 适合用途 |
| --- | --- | --- | --- |
| Product | Minimal Sneaker Ad | ![Minimal sneaker ad](cases/product/minimal-sneaker-ad/preview.svg) | 电商主图、广告概念图 |
| Character | Cyberpunk Delivery Girl | ![Cyberpunk delivery girl](cases/character/cyberpunk-delivery-girl/preview.svg) | 角色设定、游戏概念 |
| Interior | Warm Reading Nook | ![Warm reading nook](cases/interior/warm-reading-nook/preview.svg) | 室内设计、生活方式视觉 |
| Poster | Jazz Night Poster | ![Jazz night poster](cases/poster/jazz-night-poster/preview.svg) | 活动海报、品牌视觉 |

## 单个案例结构

```text
cases/<category>/<case-name>/
  prompt.md       # 正向提示词、负向约束、改写建议
  metadata.json   # 模型、比例、种子、风格标签等结构化信息
  preview.svg     # 图片案例预览，可替换为 png/jpg/webp
  notes.md        # 复盘：哪里有效、哪里可改进
```

## 快速开始

1. 复制 `prompts/templates/case-template.md`。
2. 在 `cases/<category>/<case-name>/` 下创建新案例。
3. 填写提示词、参数、图片和复盘说明。
4. 在 `cases/index.json` 中登记案例。
5. 提交 PR。

## 推荐案例分类

- `product`：产品摄影、广告图、电商图
- `character`：人物、角色设定、头像
- `interior`：室内、建筑、空间设计
- `poster`：海报、封面、品牌视觉
- `illustration`：插画、绘本、编辑视觉
- `ui`：应用界面、网页视觉、图标
- `food`：食物摄影、菜单图
- `fashion`：服装、穿搭、Lookbook

## 贡献原则

- 必须包含完整提示词和至少一张图片案例。
- 不提交侵犯版权、商标或个人肖像权的内容。
- 不把未授权的第三方图片作为生成参考或结果图提交。
- 如果图片来自 GPT Image 2 或其他模型，请在 `metadata.json` 中标注。

## License

内容默认采用 [CC BY 4.0](LICENSE)，代码和结构模板可按 MIT 使用。提交者可以在单个案例中声明更严格的许可。

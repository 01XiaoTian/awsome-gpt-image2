# Contributing

欢迎提交新的 GPT Image 2 提示词与图片案例。请尽量让案例既好看，也可复现。

## 提交流程

1. 在 `cases/<category>/<case-name>/` 新建目录。
2. 添加 `prompt.md`、`metadata.json`、`preview` 图片和 `notes.md`。
3. 把案例登记到 `cases/index.json`。
4. 确认图片、参考素材、品牌名和人物肖像都具备合法使用权。
5. 发起 Pull Request。

## 必填信息

- 标题和一句话用途说明
- 完整正向提示词
- 关键约束，比如比例、风格、镜头、光线、颜色、构图
- 图片结果
- 模型名称和生成日期
- 许可协议

## 图片要求

- 推荐格式：`webp`、`png`、`jpg` 或 `svg`
- 推荐宽度：至少 1200px
- 避免上传过大的原图，单张图片建议小于 3MB
- 如使用 AI 生成，请标注模型和后处理工具

## 命名规范

- 目录名使用小写 kebab-case，例如 `minimal-sneaker-ad`
- 分类名保持单数或通用场景名，例如 `product`、`poster`
- 图片命名推荐 `preview.webp`、`variation-01.webp`

## 案例质量建议

- 提示词要说明主体、环境、镜头、光线、材质、颜色和画面目标。
- 不只写风格词，尽量描述图像应该解决什么问题。
- 在 `notes.md` 记录失败版本、调参过程或可改写方向。

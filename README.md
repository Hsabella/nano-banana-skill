# 🍌 Nano Banana Skill

**Secure AI Image Generation for AI Coding Assistants**

A skill that enables AI image generation using Google Gemini 3.1 Flash/Pro API. Works with Claude Code, OpenAI Codex, Qwen, and other AI coding assistants.

## ✨ Why This Skill?

### 🔒 Security First

Unlike other image generation skills that require cloning unverified third-party repositories:

| This Skill | Others |
|------------|--------|
| ✅ Uses official `@google/genai` SDK | ❌ Clone and run unknown code |
| ✅ Reference code you can audit | ❌ Black-box CLI tools |
| ✅ Environment variable for API key | ❌ Store keys in config files |
| ✅ No external dependencies (FFmpeg, etc.) | ❌ Requires system installs |

### 🎯 Features

- **Multi-resolution**: 512px to 4K
- **14 aspect ratios**: 1:1, 16:9, 9:16, etc.
- **Style transfer**: Edit existing images
- **Cost tracking**: Monitor your spending
- **Reference code**: TypeScript/JavaScript examples

## 📦 Installation

### Claude Code

Add to your `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "nano-banana": {
      "source": {
        "source": "github",
        "repo": "Hsabella/nano-banana-skill"
      }
    }
  },
  "enabledPlugins": {
    "nano-banana@nano-banana": true
  }
}
```

Then run:
```bash
/reload-plugins
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/Hsabella/nano-banana-skill.git ~/.claude/plugins/nano-banana-skill

# Add to settings.json (see above)
```

## 🚀 Quick Start

### 1. Get API Key

Visit [Google AI Studio](https://aistudio.google.com/apikey) to get your free API key.

### 2. Set Environment Variable

```bash
export GEMINI_API_KEY="your-api-key"

# Add to ~/.zshrc or ~/.bashrc for persistence
echo 'export GEMINI_API_KEY="your-api-key"' >> ~/.zshrc
```

### 3. Install Dependency

```bash
npm install @google/genai
```

### 4. Generate Images

Ask your AI assistant:
```
Generate an image of a cute puppy blowing bubbles
```

## 💡 Usage Examples

### Basic Generation

```typescript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: "a cute puppy blowing bubbles, kawaii style",
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: {
      aspectRatio: "1:1",
      imageSize: "1K",
    },
  },
});

// Save the image
for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("output.png", buffer);
  }
}
```

### Style Transfer

```typescript
import { readFile } from "fs/promises";

const buffer = await readFile("reference.png");
const base64Data = buffer.toString("base64");

const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: [
    { text: "change the style to watercolor painting" },
    { inlineData: { mimeType: "image/png", data: base64Data } },
  ],
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: { imageSize: "1K" },
  },
});
```

## 📊 Pricing

| Resolution | Flash Cost | Pro Cost |
|------------|-----------|----------|
| 512px | ~$0.045 | N/A |
| 1K | ~$0.067 | ~$0.134 |
| 2K | ~$0.101 | ~$0.201 |
| 4K | ~$0.151 | ~$0.302 |

*Pricing based on Gemini API rates as of 2026*

## 🛠️ Configuration Options

| Option | Values | Default |
|--------|--------|---------|
| `model` | `flash`, `pro`, or model ID | `flash` |
| `imageSize` | `512`, `1K`, `2K`, `4K` | `1K` |
| `aspectRatio` | 14 options (see below) | model default |

**Supported Aspect Ratios**: `1:1`, `1:4`, `1:8`, `2:3`, `3:2`, `3:4`, `4:1`, `4:3`, `4:5`, `5:4`, `8:1`, `9:16`, `16:9`, `21:9`

## ❓ FAQ

### Why is my quota 0?

Gemini 3.1 Flash Image Preview may have restricted free tier access. Enable billing in [Google AI Studio](https://aistudio.google.com) to unlock full access. New accounts often have free credits.

### Is my API key safe?

Yes. This skill only reads from the `GEMINI_API_KEY` environment variable. Your key is never stored in files or logged.

### Can I use this with other AI assistants?

Yes! The skill provides reference code that works with any AI coding assistant. The skill format is compatible with Claude Code's plugin system.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by [nano-banana-2-skill](https://github.com/kingbootoshi/nano-banana-2-skill) but rebuilt with security as the priority
- Uses the official [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)

---

Made with ❤️ by [Hsabella](https://github.com/Hsabella)

---

# 📖 中文说明

**安全的 AI 图像生成 Skill，适用于各类 AI 编程助手**

一个使用 Google Gemini 3.1 Flash/Pro API 进行 AI 图像生成的 skill。支持 Claude Code、OpenAI Codex、通义千问等 AI 编程助手。

## ✨ 为什么选择这个 Skill？

### 🔒 安全优先

与其他需要克隆未验证第三方仓库的图像生成 skill 不同：

| 本 Skill | 其他 Skill |
|----------|-----------|
| ✅ 使用官方 `@google/genai` SDK | ❌ 克隆并运行未知代码 |
| ✅ 提供可审计的参考代码 | ❌ 黑盒 CLI 工具 |
| ✅ 通过环境变量管理 API Key | ❌ 将密钥存储在配置文件中 |
| ✅ 无外部依赖（FFmpeg 等） | ❌ 需要安装系统工具 |

### 🎯 功能特性

- **多分辨率**：512px 到 4K
- **14 种宽高比**：1:1、16:9、9:16 等
- **风格迁移**：编辑现有图片
- **成本追踪**：监控你的花费
- **参考代码**：TypeScript/JavaScript 示例

## 📦 安装方法

### Claude Code

在 `~/.claude/settings.json` 中添加：

```json
{
  "extraKnownMarketplaces": {
    "nano-banana": {
      "source": {
        "source": "github",
        "repo": "Hsabella/nano-banana-skill"
      }
    }
  },
  "enabledPlugins": {
    "nano-banana@nano-banana": true
  }
}
```

然后运行：
```bash
/reload-plugins
```

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/Hsabella/nano-banana-skill.git ~/.claude/plugins/nano-banana-skill

# 按上述方法添加到 settings.json
```

## 🚀 快速开始

### 1. 获取 API Key

访问 [Google AI Studio](https://aistudio.google.com/apikey) 获取免费 API Key。

### 2. 设置环境变量

```bash
export GEMINI_API_KEY="your-api-key"

# 添加到 ~/.zshrc 或 ~/.bashrc 以持久化
echo 'export GEMINI_API_KEY="your-api-key"' >> ~/.zshrc
```

### 3. 安装依赖

```bash
npm install @google/genai
```

### 4. 生成图片

向你的 AI 助手提问：
```
生成一张可爱的小奶狗吹泡泡的图片
```

## 💡 使用示例

### 基础生成

```typescript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: "可爱的小奶狗吹泡泡，卡哇伊风格",
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: {
      aspectRatio: "1:1",
      imageSize: "1K",
    },
  },
});

// 保存图片
for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("output.png", buffer);
  }
}
```

### 风格迁移

```typescript
import { readFile } from "fs/promises";

const buffer = await readFile("reference.png");
const base64Data = buffer.toString("base64");

const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: [
    { text: "把这张图片改成水彩画风格" },
    { inlineData: { mimeType: "image/png", data: base64Data } },
  ],
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: { imageSize: "1K" },
  },
});
```

## 📊 价格参考

| 分辨率 | Flash 价格 | Pro 价格 |
|--------|-----------|----------|
| 512px | ~$0.045 | 不支持 |
| 1K | ~$0.067 | ~$0.134 |
| 2K | ~$0.101 | ~$0.201 |
| 4K | ~$0.151 | ~$0.302 |

*价格基于 2026 年 Gemini API 费率*

## 🛠️ 配置选项

| 选项 | 可选值 | 默认值 |
|------|--------|--------|
| `model` | `flash`、`pro` 或模型 ID | `flash` |
| `imageSize` | `512`、`1K`、`2K`、`4K` | `1K` |
| `aspectRatio` | 14 种选项（见下文） | 模型默认 |

**支持的宽高比**：`1:1`、`1:4`、`1:8`、`2:3`、`3:2`、`3:4`、`4:1`、`4:3`、`4:5`、`5:4`、`8:1`、`9:16`、`16:9`、`21:9`

## ❓ 常见问题

### 为什么我的配额是 0？

Gemini 3.1 Flash Image Preview 免费层可能有访问限制。在 [Google AI Studio](https://aistudio.google.com) 启用计费可解锁完整访问权限。新账户通常有免费额度。

### 我的 API Key 安全吗？

安全。本 skill 仅从 `GEMINI_API_KEY` 环境变量读取密钥，不会将密钥存储到文件或日志中。

### 可以在其他 AI 助手中使用吗？

可以！本 skill 提供的参考代码适用于任何 AI 编程助手，skill 格式兼容 Claude Code 的插件系统。

## 🤝 参与贡献

欢迎提交 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)。

## 🙏 致谢

- 灵感来源于 [nano-banana-2-skill](https://github.com/kingbootoshi/nano-banana-2-skill)，但以安全为优先重新构建
- 使用官方 [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
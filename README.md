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
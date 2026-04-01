---
name: nano-banana
description: Use when generating AI images with Gemini 3.1 Flash/Pro, need UI mockups, product visuals, style transfer, or reference image editing. Provides secure implementation using official SDK without cloning third-party code.
---

# nano-banana

Secure AI image generation using Gemini 3.1 Flash/Pro Image API. No third-party code cloning required.

## Why This Skill?

**Security First**: Unlike other image generation skills that require cloning unverified third-party repositories, this skill:

- Uses only the official `@google/genai` SDK from Google
- Provides reference code you can audit before running
- Never asks you to execute untrusted code
- API key managed via environment variable only (no file storage)

## Quick Reference

| Parameter | Values |
|-----------|--------|
| **Models** | `gemini-3.1-flash-image-preview` (default, fast), `gemini-3-pro-image-preview` (quality) |
| **imageSize** | `512`, `1K`, `2K`, `4K` |
| **aspectRatio** | `1:1`, `1:4`, `1:8`, `2:3`, `3:2`, `3:4`, `4:1`, `4:3`, `4:5`, `5:4`, `8:1`, `9:16`, `16:9`, `21:9` |
| **responseModalities** | `["TEXT", "IMAGE"]` (required) |

## Cost Reference

| imageSize | Flash (~$0.067/1K) | Pro (~$0.134/1K) |
|-----------|-------------------|------------------|
| 512 | ~$0.045 | N/A (Flash only) |
| 1K | ~$0.067 | ~$0.134 |
| 2K | ~$0.101 | ~$0.201 |
| 4K | ~$0.151 | ~$0.302 |

## API Key Setup

```bash
# Get your key at: https://aistudio.google.com/apikey
export GEMINI_API_KEY="your-api-key"
```

**Security**: Never store API key in files. Use environment variable only.

## Implementation

### Basic Generation

```typescript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({}); // Auto-reads from GEMINI_API_KEY

const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: "minimal dashboard UI with dark theme",
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: {
      aspectRatio: "1:1",
      imageSize: "1K",
    },
  },
});

// Save generated image
for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("output.png", buffer);
  }
}
```

### Reference Image (Style Transfer / Edit)

```typescript
import { readFile } from "fs/promises";

const buffer = await readFile("reference.png");
const base64Data = buffer.toString("base64");

const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: [
    { text: "change background to white" },
    { inlineData: { mimeType: "image/png", data: base64Data } },
  ],
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: { imageSize: "1K" },
  },
});
```

### Cost Tracking

```typescript
// Get token usage from response
const usage = response.usageMetadata;
const promptTokens = usage.promptTokenCount || 0;
const outputTokens = usage.candidatesTokenCount || 0;

// Calculate cost (per 1M tokens)
// Flash: $0.25 input + $60 image output
const cost = (promptTokens / 1_000_000) * 0.25
           + (outputTokens / 1_000_000) * 60;

console.log(`Cost: ~$${cost.toFixed(4)}`);
```

## Common Use Cases

- **UI mockups**: `contents: "SaaS dashboard with analytics charts"`
- **Widescreen**: `aspectRatio: "16:9"` + `imageSize: "2K"`
- **Portrait**: `aspectRatio: "9:16"` for mobile screens
- **Style transfer**: Pass reference image + text prompt
- **Product visuals**: Use Pro model for highest quality

## Common Issues

| Issue | Solution |
|-------|----------|
| "API key not found" | Set `GEMINI_API_KEY` environment variable |
| "Invalid aspectRatio" | Use one of 14 supported values above |
| "Quota exceeded" | Enable billing in Google AI Studio |
| 512 + Pro model | 512 only works with Flash, auto-upgrades to 1K |

## Dependency

```bash
npm install @google/genai
```

No FFmpeg, ImageMagick, or third-party CLI required.
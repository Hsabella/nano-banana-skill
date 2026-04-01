/**
 * Nano Banana - Style Transfer Example
 *
 * This example demonstrates how to use reference images for style transfer or editing.
 *
 * Prerequisites:
 * 1. npm install @google/genai
 * 2. export GEMINI_API_KEY="your-api-key"
 * 3. Have a reference image ready (e.g., reference.png)
 *
 * Usage:
 *   node style-transfer.mjs reference.png "make it look like a watercolor painting"
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import { readFile } from "fs/promises";
import { extname } from "path";

const ai = new GoogleGenAI({}); // Auto-reads from GEMINI_API_KEY

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/png";
}

async function styleTransfer(referenceImagePath, prompt, options = {}) {
  const {
    model = "gemini-3.1-flash-image-preview",
    imageSize = "1K",
    outputFilename = "style-transfer-output.png",
  } = options;

  console.log(`🎨 Processing image...`);
  console.log(`   Reference: ${referenceImagePath}`);
  console.log(`   Prompt: ${prompt}`);

  // Load and encode reference image
  const buffer = await readFile(referenceImagePath);
  const base64Data = buffer.toString("base64");
  const mimeType = getMimeType(referenceImagePath);

  console.log(`   Encoding: ${mimeType}`);

  const response = await ai.models.generateContent({
    model,
    contents: [
      { text: prompt },
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
    ],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        imageSize,
      },
    },
  });

  // Process response
  let saved = false;
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(`\n📝 ${part.text}`);
    } else if (part.inlineData) {
      const outputBuffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(outputFilename, outputBuffer);
      console.log(`\n✅ Image saved: ${outputFilename}`);
      saved = true;
    }
  }

  // Show cost
  const usage = response.usageMetadata;
  if (usage) {
    const promptTokens = usage.promptTokenCount || 0;
    const outputTokens = usage.candidatesTokenCount || 0;
    const cost = (promptTokens / 1_000_000) * 0.25 + (outputTokens / 1_000_000) * 60;
    console.log(`\n💰 Cost: ~$${cost.toFixed(4)}`);
  }

  return saved;
}

// Example usage
const referencePath = process.argv[2];
const prompt = process.argv[3] || "change the style to watercolor painting";

if (!referencePath) {
  console.error("Usage: node style-transfer.mjs <reference-image> [prompt]");
  console.error("Example: node style-transfer.mjs photo.png 'make it anime style'");
  process.exit(1);
}

styleTransfer(referencePath, prompt, {
  imageSize: "1K",
  outputFilename: "style-transfer-output.png",
}).catch(console.error);
/**
 * Nano Banana - Basic Image Generation Example
 *
 * This example demonstrates how to generate an image using Gemini 3.1 Flash.
 *
 * Prerequisites:
 * 1. npm install @google/genai
 * 2. export GEMINI_API_KEY="your-api-key"
 *
 * Usage:
 *   node basic-generation.mjs
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({}); // Auto-reads from GEMINI_API_KEY

async function generateImage(prompt, options = {}) {
  const {
    model = "gemini-3.1-flash-image-preview",
    imageSize = "1K",
    aspectRatio = "1:1",
    outputFilename = "output.png",
  } = options;

  console.log(`🎨 Generating image...`);
  console.log(`   Prompt: ${prompt}`);
  console.log(`   Model: ${model}`);
  console.log(`   Size: ${imageSize} | Aspect: ${aspectRatio}`);

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio,
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
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(outputFilename, buffer);
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
const prompt = process.argv[2] || "a cute puppy blowing bubbles, kawaii style";
generateImage(prompt, {
  imageSize: "1K",
  aspectRatio: "1:1",
  outputFilename: "generated-image.png",
}).catch(console.error);
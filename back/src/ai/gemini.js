import { GoogleGenerativeAI } from "@google/generative-ai";
import GeminiResponseSchemas from "./schemas.js";
import { readPrompts } from "./config.js";

let prompts = readPrompts();

const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const askGemini = async (msg) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: prompts.default,
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: GeminiResponseSchemas.default
    }

  });
  const result = await model.generateContent(msg);
  return JSON.parse(result.response.text());
};

export const productsSelected = (userMsg) => {
  const generationConfig = {
    temperature: 0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: GeminiResponseSchemas.productList,
  };
};

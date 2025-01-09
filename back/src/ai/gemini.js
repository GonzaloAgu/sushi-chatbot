import { GoogleGenerativeAI } from "@google/generative-ai";
import GeminiResponseSchemas from "./schemas.js";
import { readPrompts } from "./config.js";

let prompts = readPrompts();

const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const getModel = schema => {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: prompts.default,
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: schema
    }

  })
}

export const askGemini = async (msg) => {
  const model = getModel(GeminiResponseSchemas.default)
  const result = await model.generateContent(msg);
  return JSON.parse(result.response.text());
};

export const productsSelected = (msg) => {
  const model = getModel(GeminiResponseSchemas.productList)
};

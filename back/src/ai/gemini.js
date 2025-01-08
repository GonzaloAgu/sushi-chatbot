import { GoogleGenerativeAI } from "@google/generative-ai";
import GeminiResponseSchemas from "./schemas.js";
import { readPrompts } from "./config.js";

let prompts = readPrompts();

const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const sendMessage = async (msg) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: prompts.default,
  });
  const result = await model.generateContent(msg);
  return result.response.text();
};

export const newDefaultChat = async () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: prompts.default,
  });

  const generationConfig = {
    temperature: 0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: GeminiResponseSchemas.default,
  };

  return model.startChat({
    generationConfig,
    history,
  });
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

import { GoogleGenerativeAI } from "@google/generative-ai";
import GeminiResponseSchemas from "./schemas.js";
import { readPrompts } from "./config.js";

const prompts = readPrompts();
const TEMPERATURE = 0.1;

const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const getModel = schema => {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: JSON.stringify({ mainPrompt: prompts.default, faq: prompts.faq}),
    generationConfig: {
      temperature: TEMPERATURE,
      responseMimeType: "application/json",
      responseSchema: schema
    }
  })
}

export const askGemini = async msg => {
  console.log("Consultando a LLM: ", msg)
  const model = getModel(GeminiResponseSchemas.default)
  const result = await model.generateContent(msg);
  return JSON.parse(result.response.text());
};

export const getProductsSelectedByUser = async (msg, productos) => {
  const model = getModel(GeminiResponseSchemas.productList)
  const query = {
    userMsg: msg,
    productos
  }
  const response = await model.generateContent(JSON.stringify(query))
  try {
    return JSON.parse(response.response.text())
  } catch (e) {
    throw new Error("El LLM devolvió un JSON no parseable: ", response.response.text())
  }
};

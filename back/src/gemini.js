import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Escribe una oracion corta en relacion al sushi";

export const geminiTest = async () => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

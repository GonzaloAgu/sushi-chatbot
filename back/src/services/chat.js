import { askGemini } from "../ai/gemini.js";
import { getMenu } from "./menu.js";

export const sendChat = async (message) => {
  const response = await askGemini(message);
  if (response.tipo === "menu") {
    const menuItems = await getMenu();
    response.orden = menuItems;
  }
  return response;
};

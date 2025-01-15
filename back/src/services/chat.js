import { askGemini, getProductsSelectedByUser } from "../ai/gemini.js";
import { getMenu, hacerPedido } from "./menu.js";

const handleMenuRequest = async (response) => {
    const menuItems = await getMenu();
    response.menu = menuItems;
    response.mensaje = "¡Este es nuestro menú disponible! Para hacer un pedido por delivery, decinos tu dirección y un listado de productos que desee ordenar. Opcionalmente, puedes indicar la cantidad de unidades que deseas de cada uno."
    return response;
}

const handleOrderRequest = async (message, response, contents) => {
  const menuItems = await getMenu();
  
  const productos = await getProductsSelectedByUser(message, menuItems, contents);
  if(productos?.length === 0){
    response.mensaje = "No se encontraron los productos que solicitaste. Intenta pedir con mayor precisión."
  } 
  
  response.direccion = productos.direccion;
  
  if(response.direccion === null){
    response.mensaje = "Por favor indique su dirección para enviar su pedido."
    return response;
  }
  
  response.orden = productos.orden;
  if(response.orden.length > 0)
    response.mensaje = "Esto sería lo que estás apunto de pedir. Confirme su pedido haciendo click en el botón de confirmar."
  else
    response.mensaje = "No encontré en nuestro menú lo que nos solicitaste. Revisa nuestro menú e intentalo nuevamente."

  return response;
}

export const sendChat = async (message, contents) => {
  let response = await askGemini(message, contents);
  if (response.tipo === "menu") {
    response = await handleMenuRequest(response);
  } else if (response.tipo === "orden") {
    response = await handleOrderRequest(message, response, contents)
  }
  return response;
};

import { askGemini, productsSelected } from "../ai/gemini.js";
import { getMenu, hacerPedido } from "./menu.js";



export const sendChat = async (message) => {
  const response = await askGemini(message);
  let menuItems;
  if (response.tipo === "menu") {
    menuItems = await getMenu();
    response.mensaje = "¡Este es nuestro menú disponible! Para hacer un pedido por delivery, decinos tu dirección y un listado de productos que desee ordenar. Opcionalmente, puedes indicar la cantidad de unidades que deseas de cada uno."
    response.menu = menuItems;
  } else if (response.tipo === "orden") {

    if(response.direccion === null){
      response.mensaje = "Por favor indique su dirección para enviar su pedido."
    }

    menuItems = await getMenu();
    
    const productos = await productsSelected(message, menuItems);
    if(productos?.length === 0){
      response.mensaje = "No se encontraron los productos que solicitaste. Intenta pedir con mayor precisión."
    } 

    response.orden = productos.orden;
    response.direccion = productos.direccion;
    response.mensaje = "Esto sería lo que estás apunto de pedir. Confirme su pedido haciendo click en el botón de confirmar."
  }
  return response;
};

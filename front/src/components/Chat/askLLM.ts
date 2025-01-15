import { IGeminiMessage, IMessage } from "../../types";
import { IProducto,IProductoSolicitado } from "../../types";
const API_URL: string  = import.meta.env.VITE_BACKEND_URL;

if(!API_URL){
  throw new Error("No se ingresó correctamente la URL base del backend en la variable de entorno VITE_BACKEND_URL")
}
const handleMenuMessage = (initialText: string, menu: Array<IProducto>): string => {
  let newText = initialText;
  newText += "\n\n"
  menu.forEach((producto: IProducto) => {
    newText += `${producto.nombre} -> $${producto.precio}\n`
  });
  return newText;
}

const handleOrdenMessage = (initialText: string, orden: Array<IProductoSolicitado>, direccion: string): string => {
  let newText: string = initialText + "\n\n";
  let total: number = 0;
  orden.forEach((producto: IProductoSolicitado) => {
    newText += `${producto.nombre} x${producto.cantidad} - $${producto.precio} c/u\n`
    total += producto.precio * producto.cantidad;
  })

  newText += "\nTotal: $" + total;
  newText += "\nDirección: " + direccion;
  return newText;
}

function parseHistoryMessagesToGemini (history: IMessage[]): IGeminiMessage[] {
  const parsedHistory: IGeminiMessage[] = [];
  history.forEach(msg => {
    parsedHistory.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text }]
    })
  })
  return parsedHistory;
}

export default async function askLLM(userMsg: string, history: IMessage[] = [], onResponse: (response: IMessage) => void) {
  
    const parsedHistory = parseHistoryMessagesToGemini(history)

    const response = await fetch(API_URL + "/sendchat" , {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "message": userMsg,
        "contents": parsedHistory
      })
    })

    const parsedMessage = await response.json();
    
    const msg: IMessage = {
      text: parsedMessage.mensaje,
      role: "assistant",
      type: parsedMessage.tipo
    };

    if(parsedMessage.tipo === "menu") {
      msg.text = handleMenuMessage(msg.text, parsedMessage.menu)
    }

  
    if(parsedMessage.tipo === "orden"){
      if(parsedMessage.direccion !== null && parsedMessage.orden?.length > 0) {
        msg.text = handleOrdenMessage(msg.text, parsedMessage.orden, parsedMessage.direccion)
        msg.orden = {
          listaProductos: parsedMessage.orden,
          direccion: parsedMessage.direccion
        } ;
        
      } else {
        msg.type = "otro"; // para evitar mostrar el boton confirmar orden si falta información
      }

    }

    onResponse(msg);

}
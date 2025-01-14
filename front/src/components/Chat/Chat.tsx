import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";
import { IProductoSolicitado } from "./askLLM";
import useChat from "./useChat";
import { createContext } from "react";

export interface IOrden {
  listaProductos: IProductoSolicitado[],
  direccion: string
}

export const OrdenContext = createContext<IOrden>({direccion: "", listaProductos: []})

function Chat() {
  const {messages, sendMessage, waiting, orden} = useChat();

  return (
    <>
    <OrdenContext.Provider value={orden}>
      <ChatHistory messages={messages} waiting={waiting}/>
      <ChatInput handleMessage={sendMessage}/>
    </OrdenContext.Provider>
    </>
  );
}

export default Chat;

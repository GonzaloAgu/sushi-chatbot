import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";
import { IOrden} from "../../types";
import useChat from "./useChat";
import { createContext } from "react";



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

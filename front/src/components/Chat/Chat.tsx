import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";
import { IOrden, } from "../../types";
import useChat from "./useChat";
import { createContext } from "react";
import { IMessage } from "../../types";

export const OrdenContext = createContext<IOrden>({
  direccion: "",
  listaProductos: [],
});

export const ChatContext = createContext<((message: IMessage) => void ) | undefined>(undefined);


function Chat() {
  const { messages, sendMessage, waiting, orden, addMessage } = useChat();

  return (
    <>
      <OrdenContext.Provider value={orden}>
        <ChatContext.Provider value={addMessage}>
          <ChatHistory messages={messages} waiting={waiting} />
        </ChatContext.Provider>
        <ChatInput handleMessage={sendMessage} />
      </OrdenContext.Provider>
    </>
  );
}

export default Chat;

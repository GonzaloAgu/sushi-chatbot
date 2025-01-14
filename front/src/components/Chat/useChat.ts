import { useState } from "react"
import { IMessage } from "../ChatMessage/ChatMessage"
import askLLM from "./askLLM"
import { IOrden } from "../Chat/Chat"

export default function useChat() {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [waiting, setWaiting] = useState<boolean>(false)
    const [orden, setOrden] = useState<IOrden>({direccion:"", listaProductos: []})

    const addMessage = (message: IMessage) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
    }

    const sendMessage = (userMsg: string) => {
        try {
            if(userMsg.trim()) {
                const msg: IMessage = {
                    text: userMsg,
                    role: "user"
                }
    
                addMessage(msg);
                setWaiting(true);
    
                askLLM(userMsg, (response) => {
                    addMessage(response);
                    setWaiting(false);
                    if(response.type === "orden" && response.orden?.listaProductos.length){
                        setOrden({listaProductos: response.orden.listaProductos, direccion: response.orden.direccion}) 
                    }
                })
            } 

        } catch (e: any) {
            console.error(e)
            addMessage({
                text: "Se produjo un error al consultar",
                role: "assistant"
            })
        }

    }

    return {messages, sendMessage, waiting, orden}
  
}
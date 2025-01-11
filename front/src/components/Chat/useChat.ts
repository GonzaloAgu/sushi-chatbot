import { useState } from "react"
import { IMessage } from "../ChatMessage/ChatMessage"
import askLLM from "./askLLM"

export default function useChat() {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [waiting, setWaiting] = useState<boolean>(false)

    const addMessage = (message: IMessage) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
    }

    const sendMessage = (userMsg: string) => {
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
            })
        }

    }

    return {messages, sendMessage, waiting}
  
}
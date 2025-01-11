import { useState } from "react"
import { IMessage } from "../ChatMessage/ChatMessage"

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
            setWaiting(true)
        }

        setTimeout(() => {
            const msg: IMessage = {
                text: "Dale, ahi te digo",
                role: "assistant"
            }
            setWaiting(false)
            addMessage(msg)
        }, 1000)
    }

    return {messages, sendMessage, waiting}
  
}
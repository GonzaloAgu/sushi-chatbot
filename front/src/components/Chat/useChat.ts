import { useState } from "react"
import { Message } from "../ChatMessage/ChatMessage"

export default function useChat() {
    const [messages, setMessages] = useState<Message[]>([])

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
    }

    const sendMessage = (userMsg: string) => {
        if(userMsg.trim()) {
            const msg: Message = {
                text: userMsg,
                role: "user"
            }

            addMessage(msg);
        }

        setTimeout(() => {
            const msg: Message = {
                text: "Dale, ahi te digo",
                role: "assistant"
            }
            addMessage(msg)
        }, 1000)
    }

    return {messages, sendMessage}
  
}
import { IMessage } from "../ChatMessage/ChatMessage";

export default async function askLLM(userMsg: string, onResponse: (response: IMessage) => void) {
    setTimeout(() => {
        const msg: IMessage = {
          text: "Me dijiste: " + userMsg,
          role: "assistant",
        };
        onResponse(msg);
      }, 1000);
}
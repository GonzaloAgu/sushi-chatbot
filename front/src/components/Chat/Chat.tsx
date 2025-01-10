import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";
import useChat from "./useChat";

function Chat() {
  const {messages, sendMessage} = useChat();

  return (
    <>
      <ChatHistory messages={messages}/>
      <ChatInput handleMessage={sendMessage}/>
    </>
  );
}

export default Chat;

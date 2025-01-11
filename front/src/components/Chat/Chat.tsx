import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";
import useChat from "./useChat";

function Chat() {
  const {messages, sendMessage, waiting} = useChat();

  return (
    <>
      <ChatHistory messages={messages} waiting={waiting}/>
      <ChatInput handleMessage={sendMessage}/>
    </>
  );
}

export default Chat;

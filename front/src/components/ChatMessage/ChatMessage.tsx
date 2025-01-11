import './ChatMessage.css'

export interface IMessage {
    text: string,
    role: "user" | "assistant"
}

function ChatMessage(message: IMessage) {
    return (
    <div className={`chat-message role-${message.role}`}>
        {message.text}
    </div>
);
}

export default ChatMessage;
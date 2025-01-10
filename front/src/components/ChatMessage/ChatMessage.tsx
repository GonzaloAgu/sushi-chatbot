import './ChatMessage.css'

export interface Message {
    text: string,
    role: "user" | "assistant"
}

function ChatMessage(message: Message) {
    return (
    <div className={`chat-message role-${message.role}`}>
        {message.text}
    </div>
);
}

export default ChatMessage;
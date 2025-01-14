import './ChatMessage.css'
import ConfirmBtn from './ConfirmBtn/ConfirmBtn';

export interface IMessage {
    text: string,
    role: "user" | "assistant",
    type?: "otro" | "orden" | "menu"
}

function ChatMessage({message}: {message: IMessage}) {
    return (
    <div className={`chat-message role-${message.role}`}>
        <div>{message.text}</div>
        {message.type === "orden" && <div className='confirm-div'><ConfirmBtn/></div>}
    </div>
);
}

export default ChatMessage;
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatHistory.css'
import { Message } from '../ChatMessage/ChatMessage';

function ChatHistory({messages}: { messages: Message[]}) {
    return (
    <div className='main-chat-history'>
        {
        messages.map(
            (msg: Message) => <ChatMessage text={msg.text} role={msg.role}/>)
        }
        
    </div> 
    );
}

export default ChatHistory;
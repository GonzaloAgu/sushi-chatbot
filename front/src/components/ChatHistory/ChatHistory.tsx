import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatHistory.css'
import { Message } from '../ChatMessage/ChatMessage';
import { Discuss } from 'react-loader-spinner';

function ChatHistory({messages, waiting}: { messages: Message[], waiting: boolean}) {
    return (
    <div className='main-chat-history'>
        {
        messages.map(
            (msg: Message) => <ChatMessage text={msg.text} role={msg.role}/>)
        }
        {waiting &&
            <div className='spinner-wrapper'>
                <Discuss colors={["#3c3475", "#3c3475"]} height={"3rem"}/>
            </div>
        }
    </div> 
    );
}

export default ChatHistory;
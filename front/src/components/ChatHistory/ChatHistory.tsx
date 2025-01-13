import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatHistory.css'
import { IMessage } from '../ChatMessage/ChatMessage';
import { Discuss } from 'react-loader-spinner';

function ChatHistory({messages, waiting}: { messages: IMessage[], waiting: boolean}) {
    return (
    <div className='main-chat-history'>
        {
        messages.map(
            (msg: IMessage, idx: any) => <ChatMessage key={idx} text={msg.text} role={msg.role}/>)
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
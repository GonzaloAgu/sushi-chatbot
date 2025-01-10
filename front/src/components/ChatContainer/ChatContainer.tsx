import Chat from '../Chat/Chat';
import './ChatContainer.css'

function ChatContainer() {
    return ( 
        <div className="main-chat">
            <div className='chat-header'>
                Asistente Saka
            </div>
            <Chat/>
        </div>
    );
}

export default ChatContainer;
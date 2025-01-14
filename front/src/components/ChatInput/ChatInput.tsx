import './ChatInput.css'
import { useState } from 'react';

function ChatInput( {handleMessage}: {handleMessage: (msg: string) => void} ) {

    const [input, setInput] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(input.trim()) {
            handleMessage(input);
            setInput("");
        }
    }

    return ( 
        <form className='chat-input' onSubmit={handleSubmit}>
            <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Pedí el menú, encargá un pedido, o preguntá lo que quieras!'
            />
            <button type="submit">Enviar</button>
        </form>
     );
}

export default ChatInput;
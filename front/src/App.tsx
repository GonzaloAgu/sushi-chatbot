import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer/ChatContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>El infierno del Sushi</h1>
      <ChatContainer></ChatContainer>
    </>
  )
}

export default App

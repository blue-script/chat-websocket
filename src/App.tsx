import React, {useEffect, useState} from 'react'
import './App.css'
import {io} from 'socket.io-client'

const socket = io('http://localhost:3009', {withCredentials: true})

  type Message =   {id: string, message: string, user: {id: string, name: string}}

function App() {
  const [messages, setMessages] = useState<Message[]>([

  ])

  useEffect(()=>{
    socket.on('init-messages-published', (messages: Message[])=>{
    setMessages(messages)
    })

    socket.on('new-message-sent', (message: Message)=>{
      setMessages((messages)=> [...messages, message])
    })
  }, [])

  const [message, setMessage] = useState('hello')

  return (
    <div className="App">
      <div style={{
        border: '1px solid black',
        padding: '10px',
        height: '300px',
        width: '300px',
        overflowY: 'scroll',
        margin: '0 auto'
      }}>
        {messages.map(m => {
          return <div key={m.id}>
            <b>{m.user.name}</b>: {m.message}
            <hr/>
          </div>
        })}
      </div>
      <textarea value={message} onChange={e => setMessage(e.currentTarget.value)}></textarea>
      <button onClick={() => {
        socket.emit('client-message-sent', message)
        setMessage('')
      }}>Send
      </button>

    </div>
  )
}

export default App

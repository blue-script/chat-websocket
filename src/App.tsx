import React, {useEffect, useState} from 'react'
import './App.css'
import {io} from 'socket.io-client'

function App() {
  useEffect(() => {
    const socket = io('http://localhost:3009', {withCredentials: true})
  }, [])

  const [messages, setMessages] = useState([
    {id: '2342', message: 'hello, Serg', user: {id: 'asdfdfsd', name: 'Aleks'}},
    {id: '2123', message: 'hello, Aleks', user: {id: 'asdfsdf', name: 'Serg'}}
  ])

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
      <textarea></textarea>
      <button>Send</button>

    </div>
  )
}

export default App

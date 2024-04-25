import React, {useEffect, useRef, useState} from 'react'
import './App.css'
import {
  createConnection,
  destroyConnection,
  selectMessages, selectTypingUsers,
  sendMessage,
  setClientName,
  typeMessage
} from './chat-slice'
import {useDispatch, useSelector} from 'react-redux'
import {store} from './store'


function App() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const messages = useSelector(selectMessages)
  const typingUsers = useSelector(selectTypingUsers)

  const [name, setName] = useState<string>('Name')
  const [isAutoScrollActive, setIsAutoScrollActive] = useState<boolean>(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    dispatch(createConnection())

    return () => {
      dispatch(destroyConnection())
    }
  }, [])

  const [message, setMessage] = useState('hello')

  useEffect(() => {
    if (isAutoScrollActive) {
      messagesAnchorkRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  const messagesAnchorkRef = useRef<HTMLDivElement>(null)

  return (

    <div className="App">

      <div>
        <div style={{
          border: '1px solid black',
          padding: '10px',
          height: '300px',
          width: '300px',
          overflowY: 'scroll',
        }}
             onScroll={(e) => {
               const element = e.currentTarget

               const maxScrollPosition = element.scrollHeight - element.clientHeight

               if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {

                 setIsAutoScrollActive(true)
               } else {
                 setIsAutoScrollActive(false)
               }
               console.log(element.scrollTop)
               setLastScrollTop(element.scrollTop)
             }}
        >
          {messages.map(m => {
            return <div key={m.id}>
              <b>{m.user.name}</b>: {m.message}
              <hr/>
            </div>
          })}
          {typingUsers.map(u => {
            return <div key={u.id}>
              <b>{u.name}</b>: ...
              <hr/>
            </div>
          })}
          <div ref={messagesAnchorkRef}></div>
        </div>

        <div>
          <input value={name} onChange={e => {
            setName(e.currentTarget.value)
          }}/>
          <button onClick={() => dispatch(setClientName(name))}>Send name</button>

          <div>
            <textarea value={message}
                      onKeyDown={()=> dispatch(typeMessage())}
                      onChange={e => setMessage(e.currentTarget.value)}></textarea>
            <button onClick={() => {
              dispatch(sendMessage(message))
              setMessage('')
            }}>Send
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App

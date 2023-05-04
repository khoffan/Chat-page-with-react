import { useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import Chat from './components/Chat.jsx'

const socket = io.connect('http://localhost:4000')


function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const Joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <>
    {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Chat page</h3>
        <input type="text" placeholder='username' onChange={(event) => setUsername(event.target.value)} />
        <input type="text" placeholder='room' onChange={(event) => setRoom(event.target.value)} />
        <button onClick={Joinroom}>Join room</button>
      </div> ):(
      <Chat socket={socket} username={username} room={room} />
      )}
    </>
  )
}

export default App

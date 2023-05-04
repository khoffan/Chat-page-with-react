import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, username, room }) {
  const [currmessage, setCurrmessage] = useState("");
  const [messageList, setMessageList] = useState([])
  const sendmessage = async () => {
    if (currmessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currmessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", messageData)
      setMessageList((list) => [...list, messageData])
      setCurrmessage("")
    }
  }

  useEffect(() => {
    socket.on("recives_message", (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <h3>Live chat</h3>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type="text"
          value={currmessage}
          placeholder='message'
          onChange={(event) => setCurrmessage(event.target.value)}
          // onKeyUpCapture={(event) => { event.key === 'enter' && sendmessage() }}
        />
        <button onClick={sendmessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
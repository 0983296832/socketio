import './App.css';
import { useState, useEffect } from "react"
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null)
  const [msg, setMsg] = useState("")
  const [room, setRoom] = useState("")
  const [msgList, setMsgList] = useState([])

  useEffect(() => {
    setSocket(io("http://localhost:5000"))
  }, [])

  useEffect(() => {
    socket?.on("getMessage", (mess) => setMsgList(prev => [...prev, mess]))
    socket?.on("getGlobalMess", (mess) => setMsgList(prev => [...prev, mess]))

  }, [socket])


  const sendMessage = (e) => {
    e.preventDefault();
    room === "" ? socket?.emit("sendGlobalMess", msg) : socket?.emit("sendMessage", { room, msg });
    setMsg("");
  }

  const joinRoom = () => {
    room !== "" && socket?.emit("joinRoom", room);
  }


  return (
    <div className="App">
      <h1 style={{ marginTop: 20 }}>Room:</h1>
      <input type="text" placeholder='enter your room' value={room} onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <h1 style={{ marginTop: 30 }}>Message</h1>
      <form>
        <input type="text" placeholder='enter your message' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={(e) => sendMessage(e)} type="submit">Send Message</button>
      </form>
      <h1 style={{ marginTop: 30 }}>Message List:</h1>
      {msgList.map((msg, index) => <div key={index}>{msg}</div>)}
    </div>
  );
}

export default App;

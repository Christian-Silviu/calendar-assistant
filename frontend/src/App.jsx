import {useState, useEffect} from "react";
import InputBar from "./InputBar";
import { sendMessage } from "./api";
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [parsedEvent, setParsedEvent] = useState([])

  async function handleSend(text) {
    const response = await sendMessage(text)
    setParsedEvent([...parsedEvent, response.data])
  }

  const latestEvent = parsedEvent.at(-1)
  const summary = latestEvent
    ? `Schedule ${latestEvent.title} on ${new Date(latestEvent.start_time).toLocaleString()}? ${latestEvent.description}`
    : ""
  return (
    <div className="inside">
      <h1>Calendar Assistant</h1>
      <p>{summary}</p>
      <InputBar value={message} onChange={setMessage} onSend={handleSend}/>
    </div>
  )
}

export default App
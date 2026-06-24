import {useState, useEffect} from "react";
import InputBar from "./InputBar";
import { sendMessage, createEvent } from "./api";
import ConfirmEvent from "./ConfirmEvent";
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [parsedEvent, setParsedEvent] = useState([])

  async function handleSend(text) {
    const response = await sendMessage(text)
    setParsedEvent([...parsedEvent, response.data])
  }

  async function handleConfirm() {
    await createEvent(latestEvent)
    setParsedEvent([])
  }

  function handleReject() {
    setParsedEvent([])
  }

  const latestEvent = parsedEvent.at(-1)
  const summary = latestEvent
    ? `Schedule ${latestEvent.title} on ${new Date(latestEvent.start_time).toLocaleString()}? ${latestEvent.description}`
    : ""
  return (
    <div className="inside">
      <h1 className="masked-text">Calendula</h1>
      <InputBar value={message} onChange={setMessage} onSend={handleSend}/>
      <p>{summary}</p>
      {summary != "" && <ConfirmEvent event={latestEvent} onConfirm={handleConfirm} onReject={handleReject} />}
    </div>
  )
}

export default App
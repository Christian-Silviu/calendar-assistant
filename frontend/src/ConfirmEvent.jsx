import { useState } from "react";
import './ConfirmEvent.css'

export default function ConfirmEvent({event, onConfirm, onReject}) {
    const conflict = event.conflict
    const conflict_message = event.conflicting_event
    return (
        <div>
            {conflict && (<p>⚠️ Conflict with: {conflict_message.split(", ").map(c => {
                const [name, times] = c.split(": (")
                const [start, end] = times.replace(")", "").split("–")
                return `${name} (${new Date(start).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})} – ${new Date(end).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})})`
            }).join(", ")}</p>
            )}
            <div className="buttonClass">
                <button className="button" onClick={onConfirm}>
                    <span className="button-content">Yes </span>
                </button>
                <button className="button" onClick={onReject}>
                    <span className="button-content">No </span>
                </button>
            </div>
        </div>
    )
}
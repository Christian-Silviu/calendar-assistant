import { useState } from "react";
import './ConfirmEvent.css'

export default function ConfirmEvent({event, onConfirm, onReject}) {
    const conflict = event.conflict
    const conflict_message = event.conflicting_event
    return (
        <div>
            {conflict && <p>{conflict_message}</p>}
            <div className="buttonClass">
                <button onClick={onConfirm}>
                    <span className="transition"></span>
                    <span className="gradient"></span>
                    <span className="label">Yes</span>
                </button>
                <button onClick={onReject}>
                    <span className="transition"></span>
                    <span className="gradient"></span>
                    <span className="label">No</span>
                </button>
            </div>
        </div>
    )

}
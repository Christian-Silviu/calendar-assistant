import { useState } from "react";

export default function ConfirmEvent({event, onConfirm, onReject}) {
    return (
        <div>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onReject}>No</button>
        </div>
    )

}
import { useState } from "react";
import './InputBar.css'

export default function InputBar({value, onChange, onSend}) {

    function handleKeyDown(e) {
        if (e.key == "Enter" && value.length > 0) {
            onSend(value)
            onChange("")
        }
    }

    return (
        <div className="input-container">
            <input
                placeholder=""
                className="styled_input_bar"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <label className="input-label" for="styled_input_bar">Schedule something.</label>
        </div>
    )
}
import axios from "axios"

const API_URL = "http://localhost:8000"

export function sendMessage(message) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return axios.post(`${API_URL}/chat`, { message, timezone })
}

export function createEvent(eventData) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return axios.post(`${API_URL}/create-event`, { ...eventData, timezone })
}

export function getEvents() {
    return axios.get(`${API_URL}/events`)
}
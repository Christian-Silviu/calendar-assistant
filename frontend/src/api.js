import axios from "axios"

const API_URL = "http://localhost:8000"

export function sendMessage(message) {
    return axios.post(`${API_URL}/chat`, { message })
}

export function createEvent(eventData) {
    return axios.post(`${API_URL}/create-event`, eventData)
}

export function getEvents() {
    return axios.get(`${API_URL}/events`)
}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.ai import parse_user_message
from backend.calendar import create_event, get_upcoming_events

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserMessage(BaseModel):
    message: str

class EventResponse(BaseModel):
    title: str
    start_time: str
    end_time: str
    description: str

@app.get("/events")
def events():
    return get_upcoming_events()

@app.post("/chat", response_model=EventResponse)
def chat(body: UserMessage):
    parsed = parse_user_message(body.message)
    return parsed

@app.post("/create-event")
def create(body: dict):
    result = create_event(body)
    return result
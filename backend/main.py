from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.ai import parse_user_message
from backend.calendar import create_event, get_upcoming_events
from datetime import datetime
from zoneinfo import ZoneInfo

def get_conflicting_events (c_start, c_end, existing_events):
    all_conflicts = []
    for event in existing_events:
        e_start = datetime.fromisoformat(event["start"]["dateTime"])
        e_end = datetime.fromisoformat(event["end"]["dateTime"])
        overlap = (c_start < e_end) and (c_end > e_start)
        if overlap:
            all_conflicts.append(f"{event['summary']}: ({event['start']['dateTime']}–{event['end']['dateTime']})")
    return all_conflicts



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
    conflict: bool
    conflicting_event: str | None = None

@app.get("/events")
def events():
    return get_upcoming_events()

@app.post("/chat", response_model=EventResponse)
def chat(body: UserMessage):
    parsed = parse_user_message(body.message)
    temp_start = datetime.fromisoformat(parsed["start_time"])
    zone_start = temp_start.replace(tzinfo=ZoneInfo("America/New_York"))
    temp_end = datetime.fromisoformat(parsed["end_time"])
    zone_end = temp_end.replace(tzinfo=ZoneInfo("America/New_York"))
    recent = get_upcoming_events()
    conflicts = get_conflicting_events(zone_start, zone_end, recent)
    conflict_bool = len(conflicts) > 0
    conflict_string = ", ".join(conflicts)
    parsed["conflict"] = conflict_bool
    parsed["conflicting_event"] = conflict_string if conflict_string != "" else None
    return parsed

@app.post("/create-event")
def create(body: dict):
    result = create_event(body)
    return result

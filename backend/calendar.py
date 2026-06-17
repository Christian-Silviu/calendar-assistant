from googleapiclient.discovery import build
from backend.auth import get_credentials
from datetime import datetime, timezone

def get_calendar_service():
    creds = get_credentials()
    service = build("calendar", "v3", credentials=creds)
    return service

def create_event(event_data: dict):
    service = get_calendar_service()

    event = {
        "summary": event_data["title"],
        "start": {
            "dateTime": event_data["start_time"],
            "timeZone": "America/New_York",
        },
        "end": {
            "dateTime": event_data["end_time"],
            "timeZone": "America/New_York",
        },
    }

    if event_data.get("description"):
        event["description"] = event_data["description"]

    if event_data.get("location"):
        event["location"] = event_data["location"]

    created = service.events().insert(calendarId="primary", body=event).execute()
    return created

def get_upcoming_events(max_results=10):
    service = get_calendar_service()

    now = datetime.now(timezone.utc).isoformat()

    events_result = service.events().list(
        calendarId="primary",
        timeMin=now,
        maxResults=max_results,
        singleEvents=True,
        orderBy="startTime"
    ).execute()

    return events_result.get("items", [])
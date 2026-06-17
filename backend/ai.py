from anthropic import Anthropic
from dotenv import load_dotenv
from datetime import date
import json

load_dotenv()
client = Anthropic()

def parse_user_message(user_input):
    today = date.today().strftime("%Y-%m-%d")
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1000,
        system=f"""You are a calendar assistant. Extract event details from the user's message and return ONLY a JSON object with these fields:
        - title: string
        - start_time: as full ISO 8601 datetime strings (e.g. 2026-06-15T15:00:00)
        - end_time: as full ISO 8601 datetime strings (e.g. 2026-06-15T15:00:00) assume 1 hour from start_time if no duration is specified
        - description: string (empty string if none)
        
        Today's date is {today}.
        If any required information is missing or ambiguous, set that field to null.
        Return ONLY the JSON object, no other text.""",
        messages=[
            {"role":"user", "content": user_input}
        ]
    )
    raw = response.content[0].text
    raw = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    return json.loads(raw)

# Calendula 🌼

An AI-powered full-stack calendar assistant that schedules Google Calendar events from natural language.

> **WIP** — actively being developed.

## What it does

- Type a natural language request like *"schedule a dentist appointment Friday at 3pm"*
- Claude (Haiku) parses the request into structured event data
- Conflict detection warns you if the time slot overlaps with an existing event
- Confirm or reject before anything gets added to your calendar

## Tech Stack

**Backend:** Python, FastAPI, Pydantic, Anthropic API (Claude Haiku), Google Calendar API, OAuth2

**Frontend:** React, Vite, JavaScript, Axios

## Setup

1. Clone the repo
2. Create a `.env` file in the root with your API keys (see `.env.example`)
3. Add your `credentials.json` from Google Cloud Console
4. Install backend dependencies:
    ```
    pip install -r requirements.txt
    ```
5. Install frontend dependencies:
    ```
    cd frontend && npm install
    ```
6. Run the backend:
    ```
    uvicorn backend.main:app --reload
    ```
7. Run the frontend:
    ```
    cd frontend && npm run dev
    ```

## Status

- [x] Natural language event parsing
- [x] Google Calendar OAuth2 integration
- [x] Conflict detection
- [x] Dynamic timezone detection
- [x] React chat-style frontend
- [ ] Multi-turn conversation
- [ ] CSS polish
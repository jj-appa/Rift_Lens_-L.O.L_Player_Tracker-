# L.O.L-Player-Tracker

League of Legends player tracker

## Project Structure

- `frontend/` — React + TypeScript app scaffolded with Vite.
- `backend/python/` — FastAPI backend starter with Python requirements.

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Python backend

Create or activate a Python virtual environment, then install dependencies:

```bash
cd backend/python
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Next Steps

- Add Riot Games API integration in `backend/python/app/main.py`.
- Connect the React frontend to the backend with `fetch` or a data library.
- Replace sample routes with actual player lookup and match data endpoints.

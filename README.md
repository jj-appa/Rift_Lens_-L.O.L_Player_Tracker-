# Rift Lens

League of Legends player tracker

## Project Structure

- `frontend/` — React + TypeScript app scaffolded with Vite.
- `backend/python/` — FastAPI backend starter with Python requirements.

## Setup

### Frontend

```bash
cd frontend
npm run dev
```

### Python backend

Create or activate a Python virtual environment, then install dependencies:

- to install dependencies pip install -r requirements.txt

```bash
cd backend
python -m venv venv | do this once
venv\Scripts\activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Next Steps

- Connect the React frontend to the backend with `fetch` or a data library.
- Replace sample routes with actual player lookup and match data endpoints.
- Create Docker and containerize project
- Set Up a basic CI/CD

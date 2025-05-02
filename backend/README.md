# Number Guessing Game Backend

This is the backend service for the Number Guessing Game, built with FastAPI.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Main FastAPI application
│   ├── models/
│   │   └── game.py         # Pydantic models
│   ├── routes/
│   │   └── game.py         # API routes
│   └── services/
│       └── game_service.py  # Game logic
└── requirements.txt
```

## Setup and Running

1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## API Endpoints

### Game Routes

- `POST /game/start`
  - Start a new game with a range of numbers
  - Request body: `{ "min_number": int, "max_number": int }`

- `POST /game/guess`
  - Make a guess in the current game
  - Request body: `{ "guess": int }`
  - Returns: `{ "result": str, "message": str }` 
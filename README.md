# Number Guessing Game

A simple number guessing game built with React (frontend) and FastAPI (backend).

## Project Structure

```
.
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py        # Main FastAPI application
│   │   ├── models/        # Pydantic models
│   │   ├── routes/        # API routes
│   │   └── services/      # Business logic
│   └── requirements.txt
└── gamefrontend/              # React frontend
    ├── src/
    │   ├── App.js         # Main React component
    │   └── App.css        # Styles
    └── package.json
```

## Setup and Running

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   # Windows
   python -m venv venv                     # Recreate venv
   .\venv\Scripts\Activate                 # Activate


3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   # Method 1 (preferred)
   python -m uvicorn app.main:app --reload

   # Method 2 (alternative)
   uvicorn app.main:app --reload
   ```

   The backend will be available at `http://localhost:8000`

#### Troubleshooting Backend

1. If you see "uvicorn not recognized":
   - Make sure you've activated the virtual environment
   - Use `python -m uvicorn` instead of just `uvicorn`
   - Try reinstalling with `pip install uvicorn fastapi`

2. If you see import errors:
   - Ensure you're in the correct directory (backend/)
   - Check that all files are in their correct locations
   - Verify the virtual environment is activated

3. If you see "Module not found" errors:
   - Make sure you're running the server from the backend/ directory
   - Verify the directory structure matches the project structure above

### Frontend (React)

1. Navigate to the frontend directory created on vite:
   ```bash
   cd gamefrontend
   ```

2. Install dependencies:
   ```bash
   npm install or npm i
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

#### Troubleshooting Frontend

1. If npm install fails:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Try installing again: `npm install`

2. If you see CORS errors:
   - Verify the backend is running
   - Check that the backend URL in App.js matches your backend server
   - Verify CORS middleware is enabled in the backend

## How to Play

1. Enter a minimum and maximum number to set the range
2. Click "Start Game" to begin
3. Make your guess by entering a number
4. You'll receive hints whether your guess is higher or lower than the target number
5. Keep guessing until you find the correct number!

## API Documentation

Once the backend is running, you can access:
- Interactive API documentation (Swagger UI): `http://localhost:8000/docs`
- Alternative API documentation (ReDoc): `http://localhost:8000/redoc`

### API Endpoints

#### Game Routes

- `POST /game/start`
  - Start a new game with a range of numbers
  - Request body: `{ "min_number": int, "max_number": int }`
  - Response: `{ "message": "Game started successfully" }`

- `POST /game/guess`
  - Make a guess in the current game
  - Request body: `{ "guess": int }`
  - Response: `{ "result": "higher|lower|correct", "message": str }`

## Features

- Input validation for numbers
- Smooth animations and transitions
- Responsive design
- Error handling
- Real-time feedback
- Clean and modular code structure
- Type-safe API with Pydantic models
- Interactive API documentation

## Development Notes

- Backend uses FastAPI's dependency injection
- Frontend uses React hooks for state management
- Animations implemented with Framer Motion
- CORS enabled for local development
- Type validation with Pydantic
- Error handling on both frontend and backend 
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
│   │   │   └── game.py    # Game models and schemas
│   │   ├── services/      # Business logic
│   │   │   └── game_service.py  # Game service implementation
│   │   └── controllers/   # API routes
│   │       └── game_controller.py  # Game API endpoints
│   ├── requirements.txt
│   └── Dockerfile
├── gamefrontend/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── GameForm.jsx      # Form component
│   │   │   ├── GameInput.jsx     # Input component
│   │   │   ├── GameMessage.jsx   # Message component
│   │   │   └── Celebration.jsx   # Celebration component
│   │   ├── services/      # API services
│   │   │   └── api.js     # API communication
│   │   ├── hooks/         # Custom React hooks
│   │   │   └── useGame.js # Game logic hook
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml     # Docker Compose configuration
└── README.md             # Project documentation
```

## Setup and Running

### Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system.

2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001`

4. For development with hot reloading:
   - Any changes to backend files will automatically trigger a reload
   - Any changes to frontend files will automatically trigger a rebuild
   - No need to restart containers for code changes

5. To stop the containers:
   ```bash
   docker-compose down
   ```

6. To view logs:
   ```bash
   docker-compose logs -f
   ```

### Manual Setup (Alternative)

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

#### Backend Structure
- `models/`: Contains Pydantic models and data schemas
- `services/`: Contains business logic and game state management
- `controllers/`: Contains API routes and request handling
- `main.py`: Application configuration and setup

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd gamefrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

#### Frontend Structure
- `components/`: Reusable UI components
  - `GameForm.jsx`: Form component for game inputs
  - `GameInput.jsx`: Input field component
  - `GameMessage.jsx`: Message display component
  - `Celebration.jsx`: Victory celebration component
- `services/`: API communication
  - `api.js`: Axios instance and API calls
- `hooks/`: Custom React hooks
  - `useGame.js`: Game state and logic management
- `App.jsx`: Main application component

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
- Hot reloading for development
- Docker support for easy deployment

## Development Notes

- Backend uses FastAPI's dependency injection
- Frontend uses React hooks for state management
- Animations implemented with Framer Motion
- CORS enabled for local development
- Type validation with Pydantic
- Error handling on both frontend and backend
- Component-based architecture
- Custom hooks for game logic
- Centralized API service 
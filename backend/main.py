from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RangeInput(BaseModel):
    min_number: int
    max_number: int

class GuessInput(BaseModel):
    guess: int

# Store game state
game_state = {
    "target_number": None,
    "min_range": None,
    "max_range": None
}

@app.post("/start-game")
async def start_game(range_input: RangeInput):
    try:
        if range_input.min_number >= range_input.max_number:
            raise HTTPException(status_code=400, detail="Minimum number must be less than maximum number")
        
        game_state["min_range"] = range_input.min_number
        game_state["max_range"] = range_input.max_number
        game_state["target_number"] = random.randint(range_input.min_number, range_input.max_number)
        
        return {"message": "Game started successfully" }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/guess")
async def make_guess(guess_input: GuessInput):
    if game_state["target_number"] is None:
        raise HTTPException(status_code=400, detail="Game not started. Please start a new game first.")
    
    if guess_input.guess < game_state["min_range"] or guess_input.guess > game_state["max_range"]:
        raise HTTPException(status_code=400, detail=f"Guess must be between {game_state['min_range']} and {game_state['max_range']}")
    
    if guess_input.guess == game_state["target_number"]:
        return {"result": "correct", "message": "Congratulations! You guessed the correct number!"}
    elif guess_input.guess < game_state["target_number"]:
        return {"result": "higher", "message": "Try a higher number!"}
    else:
        return {"result": "lower", "message": "Try a lower number!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
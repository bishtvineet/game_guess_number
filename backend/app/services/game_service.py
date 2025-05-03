import random
from fastapi import HTTPException
from ..models.game import GameState

class GameService:
    def __init__(self):
        self.game_state = GameState()

    def start_game(self, min_number: int, max_number: int) -> dict:
        if min_number >= max_number:
            raise HTTPException(status_code=400, detail="Minimum number must be less than maximum number")
        
        self.game_state.min_range = min_number
        self.game_state.max_range = max_number
        self.game_state.target_number = random.randint(min_number, max_number)
        
        return {"message": "Game started successfully"}

    def make_guess(self, guess: int) -> dict:
        if self.game_state.target_number is None:
            raise HTTPException(status_code=400, detail="Game not started. Please start a new game first.")
        
        if guess < self.game_state.min_range or guess > self.game_state.max_range:
            raise HTTPException(
                status_code=400, 
                detail=f"Guess must be between {self.game_state.min_range} and {self.game_state.max_range}"
            )
        
        if guess == self.game_state.target_number:
            return {"result": "correct", "message": "Congratulations! You guessed the correct number!"}
        elif guess < self.game_state.target_number:
            return {"result": "higher", "message": "Try a higher number!"}
        else:
            return {"result": "lower", "message": "Try a lower number!"}

    def reset_game(self):
        self.game_state.reset()

# Create a singleton instance
game_service = GameService() 
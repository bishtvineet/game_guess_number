import random
from typing import Dict, Optional, Tuple

class GameService:
    def __init__(self):
        self.game_state: Dict[str, Optional[int]] = {
            "target_number": None,
            "min_range": None,
            "max_range": None
        }

    def start_game(self, min_number: int, max_number: int) -> str:
        if min_number >= max_number:
            raise ValueError("Minimum number must be less than maximum number")
        
        self.game_state["min_range"] = min_number
        self.game_state["max_range"] = max_number
        self.game_state["target_number"] = random.randint(min_number, max_number)
        
        return "Game started successfully"

    def make_guess(self, guess: int) -> Tuple[str, str]:
        if self.game_state["target_number"] is None:
            raise ValueError("Game not started. Please start a new game first.")
        
        if guess < self.game_state["min_range"] or guess > self.game_state["max_range"]:
            raise ValueError(f"Guess must be between {self.game_state['min_range']} and {self.game_state['max_range']}")
        
        if guess == self.game_state["target_number"]:
            return "correct", "Congratulations! You guessed the correct number!"
        elif guess < self.game_state["target_number"]:
            return "higher", "Try a higher number!"
        else:
            return "lower", "Try a lower number!"

# Create a singleton instance
game_service = GameService() 
from pydantic import BaseModel

class RangeInput(BaseModel):
    min_number: int
    max_number: int

class GuessInput(BaseModel):
    guess: int

class GameState:
    def __init__(self):
        self.target_number = None
        self.min_range = None
        self.max_range = None

    def reset(self):
        self.target_number = None
        self.min_range = None
        self.max_range = None

class GameResponse(BaseModel):
    result: str
    message: str 
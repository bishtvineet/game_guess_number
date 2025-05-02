from pydantic import BaseModel

class RangeInput(BaseModel):
    min_number: int
    max_number: int

class GuessInput(BaseModel):
    guess: int

class GameResponse(BaseModel):
    result: str
    message: str 
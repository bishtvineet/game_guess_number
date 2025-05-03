from fastapi import APIRouter, Depends
from ..models.game import RangeInput, GuessInput
from ..services.game_service import GameService

router = APIRouter(prefix="/game", tags=["game"])

def get_game_service() -> GameService:
    return GameService()

@router.post("/start")
async def start_game(
    range_input: RangeInput,
    game_service: GameService = Depends(get_game_service)
):
    return game_service.start_game(range_input.min_number, range_input.max_number)

@router.post("/guess")
async def make_guess(
    guess_input: GuessInput,
    game_service: GameService = Depends(get_game_service)
):
    return game_service.make_guess(guess_input.guess) 
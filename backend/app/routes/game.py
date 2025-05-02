from fastapi import APIRouter, HTTPException
from app.models.game import RangeInput, GuessInput, GameResponse
from app.services.game_service import game_service

router = APIRouter(prefix="/game", tags=["game"])

@router.post("/start", response_model=dict)
async def start_game(range_input: RangeInput):
    try:
        message = game_service.start_game(range_input.min_number, range_input.max_number)
        return {"message": message}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/guess", response_model=GameResponse)
async def make_guess(guess_input: GuessInput):
    try:
        result, message = game_service.make_guess(guess_input.guess)
        return {"result": result, "message": message}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
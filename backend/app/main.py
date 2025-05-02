from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.game import router as game_router

app = FastAPI(
    title="Number Guessing Game API",
    description="API for the number guessing game",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(game_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Number Guessing Game API"} 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers import game_controller

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
app.include_router(game_controller.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Number Guessing Game API"} 
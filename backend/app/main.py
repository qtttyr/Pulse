import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Import routers from the api package
from app.api.analyze import router as analyze_router
from app.api.health import router as health_router

load_dotenv()

app = FastAPI(
    title="Pulse AI API",
    description="Backend engine for interactive code architecture mapping and auditing.",
    version="1.0.0"
)

# CORS configuration
env_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
] + [o.strip() for o in env_origins if o.strip() and o.strip() not in ("", "*")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(analyze_router, tags=["Audit"])
app.include_router(health_router, tags=["Internal"])

@app.get("/")
async def root():
    return {
        "message": "PULSE Engine Online",
        "docs": "/docs"
    }

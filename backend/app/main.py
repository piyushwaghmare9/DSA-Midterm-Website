from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.db import db_manager
from app.data.seed_data import load_seed_data

# Import API Routers
from app.api.endpoints.auth import router as auth_router
from app.api.endpoints.questions import router as questions_router
from app.api.endpoints.topics import router as topics_router
from app.api.endpoints.progress import router as progress_router
from app.api.endpoints.bookmarks import router as bookmarks_router
from app.api.endpoints.dashboard import router as dashboard_router
from app.api.endpoints.visualizations import router as visualizations_router
from app.api.endpoints.admin import router as admin_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to DB & Load Seed Data
    await db_manager.connect()
    load_seed_data(db_manager)
    print(f"AlgoVision Backend ready with {len(db_manager.questions)} questions loaded.")
    yield
    # Shutdown
    await db_manager.disconnect()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    description="AlgoVision - Interactive DSA Learning & Visualization Platform API"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Endpoints under /api
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(questions_router, prefix=settings.API_V1_STR)
app.include_router(topics_router, prefix=settings.API_V1_STR)
app.include_router(progress_router, prefix=settings.API_V1_STR)
app.include_router(bookmarks_router, prefix=settings.API_V1_STR)
app.include_router(dashboard_router, prefix=settings.API_V1_STR)
app.include_router(visualizations_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "app": "AlgoVision API",
        "tagline": "See the Logic. Master the Algorithm.",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "Atlas" if db_manager.is_connected_to_mongo else "Resilient In-Memory",
        "questions_count": len(db_manager.questions)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import init_db
from .routes.health import router as health_router
from .routes.auth import router as auth_router
from .routes.analyses import router as analyses_router
from .routes.reflections import router as reflections_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables safely
    try:
        init_db()
    except Exception as e:
        print(f"Warning: Database auto-init error: {e}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. API router with /api prefix (for standard frontend and direct calls)
api_router = APIRouter(prefix="/api")
api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(analyses_router)
api_router.include_router(reflections_router)
app.include_router(api_router)

# 2. Also include routers without prefix (for Vercel rewrites that strip /api)
direct_router = APIRouter()
direct_router.include_router(health_router)
direct_router.include_router(auth_router)
direct_router.include_router(analyses_router)
direct_router.include_router(reflections_router)
app.include_router(direct_router)

@app.get("/")
def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "documentation": "/api/docs",
        "health": "/api/health"
    }

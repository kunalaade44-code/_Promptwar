"""
GuruDev (The Blind Spot) FastAPI Application Entry Point
High-performance REST API with compression, caching headers, performance profiling,
and structured exception handling.
"""

import time
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from .config import settings
from .database import init_db
from .routes.health import router as health_router
from .routes.auth import router as auth_router
from .routes.analyses import router as analyses_router
from .routes.reflections import router as reflections_router

# Configure Structured Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("gurudev")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager ensuring robust database schema initialization"""
    try:
        init_db()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.warning(f"Database auto-init warning: {e}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Cognitive Audit Platform and AI-Powered Critical Thinking Companion",
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

# 1. Performance Middleware: Response Compression for payloads > 1KB
app.add_middleware(GZipMiddleware, minimum_size=1000)

# 2. Performance Profiling Middleware: Adds X-Process-Time header
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}s"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response

# 3. Security & CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Standardized Global Exception Handlers
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.status_code,
                "message": exc.detail
            }
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": 422,
                "message": "Validation error in request payload",
                "details": exc.errors()
            }
        }
    )

# 5. API Routing with /api prefix
api_router = APIRouter(prefix="/api")
api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(analyses_router)
api_router.include_router(reflections_router)
app.include_router(api_router)

# 6. Direct Routing without prefix (for Vercel rewrites)
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
        "status": "online",
        "documentation": "/api/docs",
        "health": "/api/health"
    }

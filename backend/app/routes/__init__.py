from .health import router as health_router
from .auth import router as auth_router
from .analyses import router as analyses_router
from .reflections import router as reflections_router

__all__ = [
    "health_router",
    "auth_router",
    "analyses_router",
    "reflections_router",
]

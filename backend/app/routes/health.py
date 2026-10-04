from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..database import get_db
from ..config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    db_status = "connected"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_status,
        "database_type": "postgresql" if "postgresql" in settings.get_normalized_database_url() else "sqlite",
        "gemini_configured": bool(settings.GEMINI_API_KEY),
        "version": settings.VERSION,
        "project": settings.PROJECT_NAME
    }

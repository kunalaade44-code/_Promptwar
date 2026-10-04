import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GuruDev (The Blind Spot) API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Database (Default: Embedded Local SQLite database)
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")
    
    # JWT Authentication
    JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-jwt-key-for-gurudev-hackathon-2026")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Google Gemini AI
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    def get_normalized_database_url(self) -> str:
        url = self.DATABASE_URL
        if not url:
            if os.getenv("VERCEL") or os.getenv("AWS_LAMBDA_FUNCTION_NAME"):
                return "sqlite:////tmp/the_blind_spot.db"
            return "sqlite:///./the_blind_spot.db"

        # Neon / Heroku / Supabase connection strings often start with postgres://
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()


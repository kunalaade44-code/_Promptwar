from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from .config import settings

db_url = settings.get_normalized_database_url()

connect_args = {}
if "sqlite" in db_url:
    connect_args["check_same_thread"] = False
else:
    # Ensure SSL for remote PostgreSQL / Neon if not already specified in connection string
    if "sslmode" not in db_url and "localhost" not in db_url and "127.0.0.1" not in db_url:
        connect_args["sslmode"] = "require"

engine = create_engine(
    db_url,
    connect_args=connect_args,
    pool_pre_ping=True,  # Crucial for Neon & serverless reconnects
    pool_recycle=300,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

_initialized = False

def init_db():
    """Safe table initialization for local development and initial Neon setup"""
    global _initialized
    if _initialized:
        return
    # Import all models so metadata knows about them
    from .models.user import User  # noqa: F401
    from .models.analysis import DecisionAnalysis  # noqa: F401
    from .models.reflection import ReflectionMessage  # noqa: F401
    Base.metadata.create_all(bind=engine)
    _initialized = True

def get_db():
    """FastAPI database session dependency with auto-init guarantee"""
    init_db()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

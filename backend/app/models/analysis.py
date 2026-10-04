import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class DecisionAnalysis(Base):
    __tablename__ = "decision_analyses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    title = Column(String(255), nullable=False)
    decision_text = Column(Text, nullable=False)
    background = Column(Text, nullable=True)
    options = Column(JSON, nullable=True)
    rationale = Column(Text, nullable=True)
    criteria = Column(JSON, nullable=True)
    concerns = Column(Text, nullable=True)
    analysis_result = Column(JSON, nullable=False)
    status = Column(String(50), default="completed")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="analyses")
    reflections = relationship("ReflectionMessage", back_populates="analysis", cascade="all, delete-orphan")

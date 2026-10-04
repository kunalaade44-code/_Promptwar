from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel, Field

class AnalysisCreate(BaseModel):
    headline: str = Field(..., min_length=3, max_length=300)
    background: Optional[str] = None
    options: Optional[List[str]] = []
    rationale: Optional[str] = None
    selectedCriteria: Optional[List[str]] = []
    concerns: Optional[str] = None

class AnalysisUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None

class AnalysisResponse(BaseModel):
    id: str
    user_id: Optional[str] = None
    title: str
    decision_text: str
    background: Optional[str] = None
    options: Optional[Any] = None
    rationale: Optional[str] = None
    criteria: Optional[Any] = None
    concerns: Optional[str] = None
    analysis_result: Any
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AnalysisListItem(BaseModel):
    id: str
    title: str
    status: str
    created_at: datetime
    blind_spots_count: int = 0
    balance_score: int = 50

    class Config:
        from_attributes = True

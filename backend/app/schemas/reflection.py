from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class ReflectionCreate(BaseModel):
    message: str = Field(..., min_length=1)
    role: Optional[str] = "user"

class ReflectionResponse(BaseModel):
    id: str
    analysis_id: str
    user_id: Optional[str] = None
    role: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

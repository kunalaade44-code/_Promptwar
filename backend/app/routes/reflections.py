from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.analysis import DecisionAnalysis
from ..models.reflection import ReflectionMessage
from ..models.user import User
from ..schemas.reflection import ReflectionCreate, ReflectionResponse
from ..services.auth_service import get_optional_current_user
from ..services.ai_service import generate_socratic_reply

router = APIRouter(prefix="/analyses/{id}/reflection", tags=["Reflections"])

@router.get("", response_model=List[ReflectionResponse])
def get_reflections(id: str, db: Session = Depends(get_db)):
    """Retrieve dialogue and reflections for an analysis"""
    analysis = db.query(DecisionAnalysis).filter(DecisionAnalysis.id == id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis '{id}' not found."
        )

    reflections = (
        db.query(ReflectionMessage)
        .filter(ReflectionMessage.analysis_id == id)
        .order_by(ReflectionMessage.created_at.asc())
        .all()
    )
    return reflections

@router.post("", response_model=ReflectionResponse, status_code=status.HTTP_201_CREATED)
def add_reflection(
    id: str,
    payload: ReflectionCreate,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """Save user reflection and generate Socratic inquiry follow-up"""
    analysis = db.query(DecisionAnalysis).filter(DecisionAnalysis.id == id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis '{id}' not found."
        )

    user_msg = ReflectionMessage(
        analysis_id=id,
        user_id=current_user.id if current_user else None,
        role=payload.role or "user",
        message=payload.message
    )
    db.add(user_msg)
    db.commit()
    db.refresh(user_msg)

    # If it was a user message, generate an AI Socratic follow-up inquiry
    if payload.role != "assistant":
        socratic_followup = generate_socratic_reply(
            question_context=analysis.title,
            user_answer=payload.message
        )
        ai_msg = ReflectionMessage(
            analysis_id=id,
            user_id=None,
            role="assistant",
            message=socratic_followup
        )
        db.add(ai_msg)
        db.commit()

    return user_msg

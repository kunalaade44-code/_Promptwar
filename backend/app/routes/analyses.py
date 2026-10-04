from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.analysis import DecisionAnalysis
from ..models.user import User
from ..schemas.analysis import AnalysisCreate, AnalysisResponse, AnalysisUpdate, AnalysisListItem
from ..services.auth_service import get_optional_current_user, get_current_user
from ..services.ai_service import analyze_decision

router = APIRouter(prefix="/analyses", tags=["Analyses"])

@router.post("", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
def create_analysis(
    payload: AnalysisCreate,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """
    Run cognitive blind-spot audit with Google Gemini AI and save to database.
    Can be called by authenticated users or guest demo visitors.
    """
    ai_result = analyze_decision(
        headline=payload.headline,
        background=payload.background,
        options=payload.options,
        rationale=payload.rationale,
        criteria=payload.selectedCriteria,
        concerns=payload.concerns
    )

    analysis = DecisionAnalysis(
        user_id=current_user.id if current_user else None,
        title=payload.headline,
        decision_text=payload.headline,
        background=payload.background,
        options=payload.options,
        rationale=payload.rationale,
        criteria=payload.selectedCriteria,
        concerns=payload.concerns,
        analysis_result=ai_result,
        status="completed"
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis

@router.get("", response_model=List[AnalysisListItem])
def list_analyses(
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """List decision analyses for the authenticated user or recent demo analyses"""
    query = db.query(DecisionAnalysis)
    if current_user:
        query = query.filter(
            (DecisionAnalysis.user_id == current_user.id) | (DecisionAnalysis.user_id == None)
        )
    
    analyses = query.order_by(DecisionAnalysis.created_at.desc()).limit(50).all()
    
    results = []
    for a in analyses:
        blind_spots_count = 0
        balance_score = 50
        if isinstance(a.analysis_result, dict):
            blind_spots_count = len(a.analysis_result.get("blind_spots", []))
            balance_score = a.analysis_result.get("balance_score", 50)
            
        results.append(
            AnalysisListItem(
                id=a.id,
                title=a.title,
                status=a.status,
                created_at=a.created_at,
                blind_spots_count=blind_spots_count,
                balance_score=balance_score
            )
        )
    return results

@router.get("/{id}", response_model=AnalysisResponse)
def get_analysis(
    id: str,
    db: Session = Depends(get_db)
):
    """Get single detailed analysis by ID"""
    analysis = db.query(DecisionAnalysis).filter(DecisionAnalysis.id == id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis with ID '{id}' not found."
        )
    return analysis

@router.patch("/{id}", response_model=AnalysisResponse)
def update_analysis(
    id: str,
    payload: AnalysisUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update title or status of analysis (must be owner)"""
    analysis = db.query(DecisionAnalysis).filter(DecisionAnalysis.id == id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis with ID '{id}' not found."
        )
    
    if analysis.user_id and analysis.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to modify this analysis."
        )

    if payload.title is not None:
        analysis.title = payload.title
    if payload.status is not None:
        analysis.status = payload.status

    db.commit()
    db.refresh(analysis)
    return analysis

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_analysis(
    id: str,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """Delete an analysis"""
    analysis = db.query(DecisionAnalysis).filter(DecisionAnalysis.id == id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis with ID '{id}' not found."
        )
    
    if analysis.user_id and current_user and analysis.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to delete this analysis."
        )

    db.delete(analysis)
    db.commit()
    return None

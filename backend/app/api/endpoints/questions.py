from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.core.db import db_manager

router = APIRouter(prefix="/questions", tags=["Questions"])

@router.get("")
async def get_questions(
    search: Optional[str] = None,
    topic: Optional[str] = None,
    difficulty: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100)
):
    # Retrieve all unique questions by ID
    unique_questions = {}
    for q in db_manager.questions.values():
        unique_questions[q["id"]] = q
        
    results = list(unique_questions.values())
    
    # Filter by search
    if search:
        s = search.lower()
        results = [
            q for q in results
            if s in q["title"].lower() or s in q["id"] or s in q["topic"].lower()
            or any(s in t.lower() for t in q.get("tags", []))
        ]
        
    # Filter by topic
    if topic and topic != "All":
        results = [q for q in results if q["topic"].lower() == topic.lower()]
        
    # Filter by difficulty
    if difficulty and difficulty != "All":
        results = [q for q in results if q["difficulty"].lower() == difficulty.lower()]
        
    # Sort by ID numeric
    try:
        results.sort(key=lambda x: int(x["id"]))
    except Exception:
        pass
        
    total = len(results)
    start = (page - 1) * limit
    paginated = results[start:start + limit]
    
    return {
        "items": paginated,
        "total": total,
        "page": page,
        "limit": limit
    }

@router.get("/{slug}")
async def get_question_by_slug(slug: str):
    if slug in db_manager.questions:
        return db_manager.questions[slug]
    for q in db_manager.questions.values():
        if q.get("slug") == slug or q.get("id") == slug:
            return q
    raise HTTPException(status_code=404, detail=f"Question '{slug}' not found.")

@router.get("/{slug}/related")
async def get_related_questions(slug: str):
    question = None
    for q in db_manager.questions.values():
        if q.get("slug") == slug or q.get("id") == slug:
            question = q
            break
            
    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")
        
    related_slugs = question.get("relatedQuestions", [])
    related_list = []
    for s in related_slugs:
        if s in db_manager.questions:
            related_list.append(db_manager.questions[s])
            
    # If empty, return questions from same topic
    if not related_list:
        for q in db_manager.questions.values():
            if q.get("topic") == question.get("topic") and q.get("id") != question.get("id"):
                related_list.append(q)
                if len(related_list) >= 3:
                    break
                    
    return related_list

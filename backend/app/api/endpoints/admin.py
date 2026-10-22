from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.schemas import QuestionCreateSchema
from app.core.db import db_manager

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/questions")
async def create_question(payload: QuestionCreateSchema):
    new_id = str(len(db_manager.questions) + 1)
    slug = payload.slug or payload.title.lower().replace(" ", "-")
    
    question_doc = {
        "id": new_id,
        "slug": slug,
        "title": payload.title,
        "difficulty": payload.difficulty,
        "topic": payload.topic,
        "tags": payload.tags or [payload.topic],
        "description": payload.description,
        "inputDescription": payload.inputDescription or "",
        "outputDescription": payload.outputDescription or "",
        "constraints": payload.constraints or [],
        "examples": [{"input": "nums = [1, 2, 3]", "output": "true", "explanation": "Admin sample"}],
        "hints": payload.hints or [],
        "optimizedApproach": {
            "title": "Optimized Approach",
            "description": "Standard optimal algorithm.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)"
        },
        "solutions": {
            "cpp": {"language": "cpp", "code": "// C++", "explanation": "C++ code", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "c": {"language": "c", "code": "// C", "explanation": "C code", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "python": {"language": "python", "code": "# Python", "explanation": "Python code", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "java": {"language": "java", "code": "// Java", "explanation": "Java code", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"}
        },
        "visualizationType": payload.visualizationType or "array-sort",
        "supportedVisualizer": True,
        "defaultInput": {"array": [1, 2, 3]}
    }
    
    db_manager.questions[new_id] = question_doc
    db_manager.questions[slug] = question_doc
    return {"message": "Question created successfully", "question": question_doc}

@router.delete("/questions/{id}")
async def delete_question(id: str):
    if id in db_manager.questions:
        q = db_manager.questions[id]
        slug = q.get("slug")
        del db_manager.questions[id]
        if slug and slug in db_manager.questions:
            del db_manager.questions[slug]
        return {"message": f"Question #{id} deleted successfully."}
    raise HTTPException(status_code=404, detail="Question not found.")

@router.get("/stats")
async def get_platform_stats():
    unique_q = {q["id"]: q for q in db_manager.questions.values()}
    return {
        "totalQuestions": len(unique_q),
        "totalTopics": len(db_manager.topics),
        "totalUsers": len(db_manager.users) or 1,
        "databaseType": "MongoDB Atlas" if db_manager.is_connected_to_mongo else "Resilient In-Memory"
    }

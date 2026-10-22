from fastapi import APIRouter
from typing import Dict, Any, List
from app.core.db import db_manager

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
async def get_dashboard_summary(userId: str = "usr_demo_101") -> Dict[str, Any]:
    unique_questions = {q["id"]: q for q in db_manager.questions.values()}
    total = len(unique_questions)
    
    user_solved = [
        p["questionId"] for p in db_manager.progress.values()
        if p.get("userId") == userId and p.get("status") == "solved"
    ]
    user_attempted = [
        p["questionId"] for p in db_manager.progress.values()
        if p.get("userId") == userId and p.get("status") == "attempted"
    ]
    
    solved_count = len(user_solved) or 4
    attempted_count = len(user_attempted) or 4
    
    completion_percent = Math_round = round((solved_count / max(total, 1)) * 100)
    
    return {
        "totalQuestions": total,
        "solvedCount": solved_count,
        "attemptedCount": attempted_count,
        "completionPercent": completion_percent,
        "streak": 12,
        "difficultyBreakdown": {
            "easy": 4,
            "medium": 0,
            "hard": 0
        },
        "topicMastery": [
            {"topic": "Arrays", "percent": 60},
            {"topic": "Two Pointers", "percent": 50},
            {"topic": "Searching", "percent": 30},
            {"topic": "Linked Lists", "percent": 25},
            {"topic": "Trees", "percent": 15}
        ]
    }

@router.get("/activity")
async def get_dashboard_activity(userId: str = "usr_demo_101") -> List[Dict[str, Any]]:
    return [
        {"day": "Mon", "problems": 2},
        {"day": "Tue", "problems": 3},
        {"day": "Wed", "problems": 1},
        {"day": "Thu", "problems": 4},
        {"day": "Fri", "problems": 2},
        {"day": "Sat", "problems": 5},
        {"day": "Sun", "problems": 3}
    ]

@router.get("/recommendations")
async def get_recommendations(userId: str = "usr_demo_101"):
    # Return 3 unsolved problems
    unique_questions = {q["id"]: q for q in db_manager.questions.values()}
    return list(unique_questions.values())[:3]

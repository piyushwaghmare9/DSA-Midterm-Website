from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from app.models.schemas import ProgressUpdateSchema, ProgressResponseSchema
from app.core.db import db_manager

router = APIRouter(prefix="/progress", tags=["Progress"])

@router.get("")
async def get_all_user_progress(userId: str = "usr_demo_101"):
    user_records = [
        p for p in db_manager.progress.values()
        if p.get("userId") == userId
    ]
    return user_records

@router.post("", response_model=ProgressResponseSchema)
async def update_progress(data: ProgressUpdateSchema, userId: str = "usr_demo_101"):
    key = f"{userId}_{data.questionId}"
    now_str = datetime.now(timezone.utc).isoformat()
    
    record = {
        "userId": userId,
        "questionId": data.questionId,
        "status": data.status,
        "notes": data.notes,
        "updatedAt": now_str
    }
    
    db_manager.progress[key] = record
    return record

@router.patch("/{questionId}")
async def patch_question_status(questionId: str, status: str, userId: str = "usr_demo_101"):
    key = f"{userId}_{questionId}"
    now_str = datetime.now(timezone.utc).isoformat()
    
    if key in db_manager.progress:
        db_manager.progress[key]["status"] = status
        db_manager.progress[key]["updatedAt"] = now_str
    else:
        db_manager.progress[key] = {
            "userId": userId,
            "questionId": questionId,
            "status": status,
            "notes": None,
            "updatedAt": now_str
        }
        
    return db_manager.progress[key]

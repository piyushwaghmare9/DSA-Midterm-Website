from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from typing import List
from app.core.db import db_manager

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])

@router.get("")
async def get_bookmarks(userId: str = "usr_demo_101") -> List[str]:
    # Return list of question IDs bookmarked by user
    return [
        b["questionId"]
        for b in db_manager.bookmarks.values()
        if b.get("userId") == userId
    ]

@router.post("/{questionId}")
async def add_bookmark(questionId: str, userId: str = "usr_demo_101"):
    key = f"{userId}_{questionId}"
    now_str = datetime.now(timezone.utc).isoformat()
    db_manager.bookmarks[key] = {
        "userId": userId,
        "questionId": questionId,
        "createdAt": now_str
    }
    return {"message": "Bookmarked successfully", "questionId": questionId}

@router.delete("/{questionId}")
async def remove_bookmark(questionId: str, userId: str = "usr_demo_101"):
    key = f"{userId}_{questionId}"
    if key in db_manager.bookmarks:
        del db_manager.bookmarks[key]
    return {"message": "Bookmark removed", "questionId": questionId}

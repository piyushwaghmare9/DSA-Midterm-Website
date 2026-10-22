from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.core.db import db_manager

router = APIRouter(prefix="/topics", tags=["Topics"])

@router.get("")
async def get_topics(category: Optional[str] = None):
    results = list(db_manager.topics.values())
    if category and category != "All":
        results = [t for t in results if t.get("category", "").lower() == category.lower()]
    return results

@router.get("/{slug}")
async def get_topic_by_slug(slug: str):
    if slug in db_manager.topics:
        return db_manager.topics[slug]
    for t in db_manager.topics.values():
        if t.get("slug") == slug or t.get("id") == slug:
            return t
    raise HTTPException(status_code=404, detail=f"Topic '{slug}' not found.")

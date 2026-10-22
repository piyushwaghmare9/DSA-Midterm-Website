import os
import json
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from app.core.config import settings

# Global in-memory storage (with seed data fallback)
class DatabaseManager:
    def __init__(self):
        self.is_connected_to_mongo = False
        self.mongo_client = None
        self.db = None
        
        # In-memory stores
        self.users: Dict[str, Dict[str, Any]] = {}
        self.questions: Dict[str, Dict[str, Any]] = {}
        self.topics: Dict[str, Dict[str, Any]] = {}
        self.progress: Dict[str, Dict[str, Any]] = {}  # key: f"{userId}_{questionId}"
        self.bookmarks: Dict[str, Dict[str, Any]] = {}  # key: f"{userId}_{questionId}"

    async def connect(self):
        if settings.MONGODB_URI and settings.MONGODB_URI.strip():
            try:
                from motor.motor_asyncio import AsyncIOMotorClient
                self.mongo_client = AsyncIOMotorClient(settings.MONGODB_URI, serverSelectionTimeoutMS=3000)
                self.db = self.mongo_client[settings.DATABASE_NAME]
                # Ping to check
                await self.db.command('ping')
                self.is_connected_to_mongo = True
                print("Successfully connected to MongoDB Atlas!")
            except Exception as e:
                print(f"MongoDB connection failed: {e}. Running in local resilient mode.")
                self.is_connected_to_mongo = False
        else:
            print("No MONGODB_URI provided. Initialized in resilient in-memory local mode.")

    async def disconnect(self):
        if self.mongo_client:
            self.mongo_client.close()

db_manager = DatabaseManager()

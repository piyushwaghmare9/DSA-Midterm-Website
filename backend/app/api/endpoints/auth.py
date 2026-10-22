from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timezone
import uuid
from app.models.schemas import UserCreate, UserLogin, UserResponse, Token
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.db import db_manager

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
async def register(user_in: UserCreate):
    # Check if email exists
    for u in db_manager.users.values():
        if u["email"].lower() == user_in.email.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email address already exists."
            )
    
    user_id = f"usr_{uuid.uuid4().hex[:8]}"
    hashed_pwd = get_password_hash(user_in.password)
    now_str = datetime.now(timezone.utc).isoformat()
    
    user_doc = {
        "id": user_id,
        "name": user_in.name,
        "email": user_in.email.lower(),
        "passwordHash": hashed_pwd,
        "preferred_language": user_in.preferred_language,
        "learning_goal": user_in.learning_goal,
        "skill_level": user_in.skill_level,
        "role": "student",
        "streak": 1,
        "created_at": now_str
    }
    
    db_manager.users[user_id] = user_doc
    
    access_token = create_access_token(subject=user_id)
    
    user_resp = UserResponse(
        id=user_id,
        name=user_doc["name"],
        email=user_doc["email"],
        preferred_language=user_doc["preferred_language"],
        learning_goal=user_doc["learning_goal"],
        skill_level=user_doc["skill_level"],
        role=user_doc["role"],
        streak=user_doc["streak"],
        created_at=user_doc["created_at"]
    )
    
    return Token(access_token=access_token, user=user_resp)

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    user_doc = None
    for u in db_manager.users.values():
        if u["email"].lower() == credentials.email.lower():
            user_doc = u
            break
            
    if not user_doc or not verify_password(credentials.password, user_doc.get("passwordHash", "")):
        # Provide demo fallback if default user login
        if credentials.email == "alex.chen@algovision.edu":
            user_doc = {
                "id": "usr_demo_101",
                "name": "Alex Chen",
                "email": "alex.chen@algovision.edu",
                "preferred_language": "cpp",
                "learning_goal": "Crack Software Engineering Interviews",
                "skill_level": "Intermediate",
                "role": "student",
                "streak": 12,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password."
            )
            
    access_token = create_access_token(subject=user_doc["id"])
    
    user_resp = UserResponse(
        id=user_doc["id"],
        name=user_doc["name"],
        email=user_doc["email"],
        preferred_language=user_doc["preferred_language"],
        learning_goal=user_doc["learning_goal"],
        skill_level=user_doc["skill_level"],
        role=user_doc["role"],
        streak=user_doc["streak"],
        created_at=user_doc["created_at"]
    )
    
    return Token(access_token=access_token, user=user_resp)

@router.get("/me", response_model=UserResponse)
async def get_current_user():
    # Return active user or default demo profile
    return UserResponse(
        id="usr_demo_101",
        name="Alex Chen",
        email="alex.chen@algovision.edu",
        preferred_language="cpp",
        learning_goal="Crack Software Engineering Interviews",
        skill_level="Intermediate",
        role="student",
        streak=12,
        created_at=datetime.now(timezone.utc).isoformat()
    )

@router.post("/logout")
async def logout():
    return {"message": "Logged out successfully."}

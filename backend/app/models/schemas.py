from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any

# Authentication & User Schemas
class UserBase(BaseModel):
    email: str
    name: str
    preferred_language: str = "cpp"
    learning_goal: str = "Master Technical Interviews"
    skill_level: str = "Intermediate"

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: str
    role: str = "student"
    streak: int = 12
    created_at: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Question Schemas
class CodeSolutionSchema(BaseModel):
    language: str
    code: str
    explanation: str
    timeComplexity: str
    spaceComplexity: str
    keyVariables: Optional[List[Dict[str, str]]] = None

class ExampleTestCaseSchema(BaseModel):
    input: str
    output: str
    explanation: str

class ApproachSchema(BaseModel):
    title: str
    description: str
    intuition: Optional[str] = None
    algorithmSteps: Optional[List[str]] = None
    timeComplexity: str
    spaceComplexity: str

class QuestionSchema(BaseModel):
    id: str
    slug: str
    title: str
    difficulty: str
    topic: str
    secondaryTopics: Optional[List[str]] = None
    tags: List[str]
    description: str
    inputDescription: str
    outputDescription: str
    constraints: List[str]
    examples: List[ExampleTestCaseSchema]
    hints: List[str]
    bruteForceApproach: Optional[ApproachSchema] = None
    optimizedApproach: ApproachSchema
    solutions: Dict[str, CodeSolutionSchema]
    pseudocode: Optional[List[str]] = None
    visualizationType: Optional[str] = "array-sort"
    supportedVisualizer: bool = True
    defaultInput: Optional[Dict[str, Any]] = None
    relatedQuestions: Optional[List[str]] = None

class QuestionCreateSchema(BaseModel):
    title: str
    slug: Optional[str] = None
    difficulty: str
    topic: str
    description: str
    tags: Optional[List[str]] = None
    inputDescription: Optional[str] = ""
    outputDescription: Optional[str] = ""
    constraints: Optional[List[str]] = []
    hints: Optional[List[str]] = []
    visualizationType: Optional[str] = "array-sort"

# Topic Schemas
class TopicSchema(BaseModel):
    id: str
    name: str
    slug: str
    category: str
    description: str
    prerequisites: List[str]
    keyPatterns: List[str]
    commonMistakes: List[str]
    complexityRef: Dict[str, str]
    recommendedQuestions: List[str]
    iconName: str

# Progress & Bookmark Schemas
class ProgressUpdateSchema(BaseModel):
    questionId: str
    status: str  # unsolved | attempted | solved
    notes: Optional[str] = None

class ProgressResponseSchema(BaseModel):
    userId: str
    questionId: str
    status: str
    notes: Optional[str] = None
    updatedAt: str

class BookmarkSchema(BaseModel):
    userId: str
    questionId: str
    createdAt: str

# Dashboard Summary Schema
class DashboardSummaryResponse(BaseModel):
    totalQuestions: int
    solvedCount: int
    attemptedCount: int
    completionPercent: int
    streak: int
    difficultyBreakdown: Dict[str, int]
    topicMastery: List[Dict[str, Any]]

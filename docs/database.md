# AlgoVision — Database Design & Schema Specification

## 1. Database Overview

AlgoVision uses **MongoDB Atlas** as its document database. It implements a resilient hybrid approach:
- If `MONGODB_URI` is provided in environment variables, the backend connects asynchronously via `motor.motor_asyncio`.
- If no connection string is supplied, the application automatically boots in resilient local in-memory mode, populated with the full 41+ seed questions and syllabus topics.

---

## 2. Collections and Document Schemas

### `users`
Stores user profile information, authentication credentials, and preferences.

```json
{
  "_id": "ObjectId('...')",
  "name": "Alex Chen",
  "email": "alex.chen@algovision.edu",
  "passwordHash": "$2b$12$...",
  "avatar": "https://...",
  "preferredLanguage": "cpp",
  "learningGoal": "Crack Software Engineering Interviews",
  "skillLevel": "Intermediate",
  "role": "student",
  "streak": 12,
  "createdAt": "2026-10-22T00:00:00Z",
  "updatedAt": "2026-10-22T10:00:00Z"
}
```

**Indexes:**
- `email`: Unique index for fast login lookups and enforcing single account per email.

---

### `questions`
Contains educational metadata, multi-language solutions, approach breakdowns, and visualization configurations.

```json
{
  "_id": "ObjectId('...')",
  "id": "1",
  "slug": "two-sum",
  "title": "Two Sum",
  "difficulty": "Easy",
  "topic": "Arrays",
  "secondaryTopics": ["Hashing", "Two Pointers"],
  "tags": ["Array", "Hash Table", "Two Pointers"],
  "description": "Given an array of integers nums and an integer target...",
  "inputDescription": "Array of integers and target.",
  "outputDescription": "Array of two indices.",
  "constraints": ["2 <= nums.length <= 10^4"],
  "examples": [
    {
      "input": "nums = [2, 7, 11, 15], target = 9",
      "output": "[0, 1]",
      "explanation": "2 + 7 = 9"
    }
  ],
  "hints": ["Use a hash map to store complements."],
  "bruteForceApproach": {
    "title": "Nested Loops",
    "description": "Check every pair (i, j).",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)"
  },
  "optimizedApproach": {
    "title": "One-Pass Hash Map Lookup",
    "description": "Store each element's index and check target - num.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)"
  },
  "solutions": {
    "cpp": { "language": "cpp", "code": "...", "timeComplexity": "O(n)", "spaceComplexity": "O(n)" },
    "c": { "language": "c", "code": "...", "timeComplexity": "O(n^2)", "spaceComplexity": "O(1)" },
    "python": { "language": "python", "code": "...", "timeComplexity": "O(n)", "spaceComplexity": "O(n)" },
    "java": { "language": "java", "code": "...", "timeComplexity": "O(n)", "spaceComplexity": "O(n)" }
  },
  "visualizationType": "two-pointers",
  "supportedVisualizer": true,
  "defaultInput": { "array": [2, 7, 11, 15], "target": 9 }
}
```

**Indexes:**
- `id`: Unique index.
- `slug`: Unique index.
- `topic`: Compound index with `difficulty` for fast filtering.

---

### `topics`
Organizes the complete curriculum into Foundations, Core Data Structures, and Algorithms.

```json
{
  "_id": "ObjectId('...')",
  "id": "arrays",
  "name": "Arrays",
  "slug": "arrays",
  "category": "Core Data Structures",
  "description": "Contiguous memory layout, cache locality, and prefix sums.",
  "prerequisites": ["Basic Loops", "Memory Model"],
  "keyPatterns": ["Two Pointers", "Prefix Sums", "Kadane's Algorithm"],
  "commonMistakes": ["Off-by-one boundary index errors"],
  "complexityRef": { "time": "Access O(1), Insert/Delete O(n)", "space": "O(n)" },
  "recommendedQuestions": ["two-sum", "best-time-to-buy-and-sell-stock"],
  "iconName": "SquareStack"
}
```

---

### `user_progress`
Stores progress state per user and question.

```json
{
  "_id": "ObjectId('...')",
  "userId": "usr_demo_101",
  "questionId": "1",
  "status": "solved",
  "notes": "Remember complement = target - nums[i]",
  "attemptCount": 2,
  "lastAttemptAt": "2026-10-22T08:00:00Z",
  "solvedAt": "2026-10-22T08:15:00Z"
}
```

**Indexes:**
- Compound unique index: `{ "userId": 1, "questionId": 1 }`.

---

### `bookmarks`
Enables users to star problems for later review.

```json
{
  "_id": "ObjectId('...')",
  "userId": "usr_demo_101",
  "questionId": "1",
  "createdAt": "2026-10-22T07:30:00Z"
}
```

**Indexes:**
- Compound unique index: `{ "userId": 1, "questionId": 1 }`.

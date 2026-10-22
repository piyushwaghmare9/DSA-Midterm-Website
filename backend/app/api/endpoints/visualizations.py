from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

router = APIRouter(prefix="/visualizations", tags=["Visualizations"])

class TraceRequest(BaseModel):
    algorithmType: str = "bubble-sort"
    array: Optional[List[int]] = None
    target: Optional[int] = None
    k: Optional[int] = None
    n: Optional[int] = None

@router.get("/{questionId}")
async def get_visualization_by_question_id(questionId: str):
    # Returns default trace config for this question
    return {
        "questionId": questionId,
        "supportedVisualizer": True,
        "visualizationType": "array-sort",
        "defaultInput": {"array": [64, 34, 25, 12, 22, 11, 90]}
    }

@router.post("/generate")
async def generate_trace(payload: TraceRequest):
    arr = payload.array or [64, 34, 25, 12, 22, 11, 90]
    algo = payload.algorithmType
    
    events = []
    step = 0
    
    # Python-side Bubble Sort trace generator
    if algo in ["bubble-sort", "array-sort"]:
        a = list(arr)
        n = len(a)
        step += 1
        events.append({
            "step": step,
            "type": "initialize",
            "description": f"Initialized array with {n} elements: {a}",
            "state": {"array": list(a), "sortedIndices": []},
            "variables": {"n": n},
            "codeLine": 1
        })
        
        sorted_indices = []
        for i in range(n - 1):
            swapped = False
            for j in range(n - i - 1):
                step += 1
                events.append({
                    "step": step,
                    "type": "compare",
                    "description": f"Comparing index {j} ({a[j]}) and index {j+1} ({a[j+1]}).",
                    "state": {"array": list(a), "indices": [j, j + 1], "sortedIndices": list(sorted_indices)},
                    "activeIndices": [j, j + 1],
                    "variables": {"i": i, "j": j, "arr[j]": a[j], "arr[j+1]": a[j+1]},
                    "codeLine": 3
                })
                if a[j] > a[j + 1]:
                    temp = a[j]
                    a[j] = a[j + 1]
                    a[j + 1] = temp
                    swapped = True
                    step += 1
                    events.append({
                        "step": step,
                        "type": "swap",
                        "description": f"Swapped elements {a[j]} and {temp}.",
                        "state": {"array": list(a), "indices": [j, j + 1], "sortedIndices": list(sorted_indices)},
                        "activeIndices": [j, j + 1],
                        "variables": {"i": i, "j": j, "swapped": True},
                        "codeLine": 4
                    })
            sorted_indices.append(n - i - 1)
            if not swapped:
                break
                
        step += 1
        events.append({
            "step": step,
            "type": "complete",
            "description": f"Bubble sort complete: {a}.",
            "state": {"array": list(a), "sortedIndices": list(range(n))},
            "variables": {"status": "Complete"},
            "codeLine": 6
        })
        
    return {"events": events, "totalSteps": len(events)}

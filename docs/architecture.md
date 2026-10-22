# AlgoVision — Architecture & Design Specification

## 1. System Overview

**AlgoVision** is an interactive Data Structures & Algorithms (DSA) learning and visualization platform. Unlike conventional platforms that focus primarily on automated test case evaluation, AlgoVision emphasizes **algorithmic intuition, step-by-step state traces, and multi-language comprehension**.

```
+-------------------------------------------------------------------------+
|                              FRONTEND                                   |
|   React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion           |
|                                                                         |
|  [ Navigation ]    [ Problem Workspace ]    [ Visualizer Lab ]          |
|  - Global Search    - Left: Details/Tabs     - Algorithm Category       |
|  - Hotkeys (Ctrl+K) - Center: Visual Player  - Dataset Randomizer       |
|  - Streak Counter   - Right: Multi-Lang Code - Timeline Scrubbing       |
|                                                                         |
|  [ Decoupled Visualization Engine ]                                     |
|  Algorithm Implementation ---> AlgorithmEvent[] ---> Player & Renderers  |
|                                                                         |
|  [ Persistent State (LocalStorage + REST API Sync) ]                   |
+-------------------------------------------------------------------------+
                                    |
                                    | REST API (JSON / JWT)
                                    v
+-------------------------------------------------------------------------+
|                              BACKEND                                    |
|   Python 3.12 + FastAPI + Pydantic v2 + Uvicorn                         |
|                                                                         |
|  [ Endpoints ]                                                          |
|  - /api/auth             - /api/questions         - /api/topics         |
|  - /api/progress         - /api/bookmarks         - /api/dashboard      |
|  - /api/visualizations   - /api/admin                                   |
|                                                                         |
|  [ Database Layer ]                                                     |
|  - Resilient In-Memory Store (immediate zero-config boot)              |
|  - MongoDB Atlas Client (async Motor driver when URI configured)        |
+-------------------------------------------------------------------------+
```

---

## 2. Decoupled Visualization Engine

The signature architectural pattern in AlgoVision is the **separation of algorithm execution from visual rendering**.

Algorithms do not manipulate DOM elements directly or trigger arbitrary ad-hoc CSS transitions. Instead:

1. **Algorithm Event Generation**: Pure functional functions consume an input dataset and produce a strictly typed array of `AlgorithmEvent` records:

```typescript
type AlgorithmEvent = {
  step: number;
  type: 'initialize' | 'compare' | 'swap' | 'visit' | 'insert' | 'delete' | 'update' | 'found' | 'not-found' | 'complete' | 'window-slide' | 'pointer-move';
  description: string;
  state: {
    array?: number[];
    indices?: number[];
    secondaryIndices?: number[];
    sortedIndices?: number[];
    pointers?: Record<string, number>;
    stack?: (number | string)[];
    queue?: (number | string)[];
    linkedList?: Array<{ value: number | string; next?: number; isHead?: boolean }>;
    dpTable?: Array<{ rowLabel?: string; values: (number | string)[]; activeCol?: number }>;
    treeNodes?: Array<{ val: number }>;
  };
  activeIndices?: number[];
  variables?: Record<string, string | number | boolean>;
  codeLine?: number;
};
```

2. **Deterministic Replay**: Because the entire trace is a deterministic list of snapshots:
   - Scrubbing backwards and forwards is `O(1)` state lookups without mutation bugs.
   - Playback speed (0.5x, 1x, 1.5x, 2x) can be changed dynamically on the fly.
   - Stepping does not drift or desynchronize from pseudocode.

3. **Specialized Renderers**:
   - `ArrayBars`: Bar chart heights, pointer markers (`L`, `R`, `mid`, `i`, `j`), comparison glows, sorted highlights.
   - `LinkedListVisualizer`: Node boxes linked with pointer arrows (`->`), null terminators, and head/curr/prev tags.
   - `StackQueueVisualizer`: Vertical LIFO container and horizontal FIFO pipeline with push/pop and enqueue/dequeue transitions.
   - `DPTableVisualizer`: 1D and 2D tabulation grid with formula tracking and active cell updates.
   - `BinaryTreeVisualizer`: SVG-connected hierarchical binary tree with node highlight glows.

---

## 3. Multi-Language Solution Matrix

All 40+ questions provide logically equivalent, idiomatic solutions across 4 languages:
- **C++ (Default)**: Modern STL algorithms, `std::vector`, `unordered_map`, references, and memory discipline.
- **C**: Raw pointer manipulation, fixed array bounds, dynamic allocation (`malloc`/`free`).
- **Python 3**: Idiomatic list operations, dictionary lookups, `collections.Counter`, and slicing.
- **Java**: OOP structures, Collections framework (`ArrayList`, `HashMap`, `ArrayDeque`).

Every solution includes:
1. Syntax highlighted reference source code.
2. Formatted line numbers.
3. One-click code copy with feedback.
4. Active line synchronization during dry runs.
5. Time complexity & auxiliary space complexity breakdown.
6. Key variables catalog.

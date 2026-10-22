# AlgoVision — Interactive DSA Learning & Visualization Platform

> **See the Logic. Master the Algorithm.**

AlgoVision is a modern educational technology web application designed to help college students, competitive programmers, and technical interview candidates truly understand Data Structures and Algorithms.

Instead of only running test cases against submitted code, AlgoVision provides:
- **Interactive Step-by-Step Algorithm Traces**: Scrub forwards and backwards through deterministic snapshots with variable tracking and synchronized line highlighting.
- **41+ Curated DSA Questions**: Comprehensive coverage across Arrays, Strings, Searching, Sorting, Two Pointers, Sliding Window, Linked Lists, Stacks & Queues, Trees, Graphs, and Dynamic Programming.
- **Multi-Language Reference Solutions**: High-performance C++ by default, accompanied by matching idiomatic solutions in C, Python 3, and Java.
- **Standalone Visualizer Laboratory**: Test custom datasets or randomize arrays on Bubble Sort, Selection Sort, Insertion Sort, Binary Search, Two Pointers, Sliding Window, Stacks, Queues, Linked Lists, and DP Tabulation tables.
- **Personalized Student Dashboard**: Visual activity graphs (Recharts), learning streaks, topic mastery benchmarks, daily challenge problems, and saved bookmarks.
- **Global Command Palette**: Instant fuzzy search across problems and topics accessible from anywhere via `Ctrl + K` / `Cmd + K`.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ (tested on v24.15.0)
- **Python**: v3.10+ (tested on v3.12.10)

---

### 1. Running the Frontend

```bash
cd frontend

# Install dependencies (already prepared)
npm install

# Start the Vite development server
npm run dev
```

The frontend will start at `http://localhost:5173`.

---

### 2. Running the Backend API

```bash
cd backend

# Install Python requirements
python -m pip install -r requirements.txt

# Start the FastAPI server with Uvicorn
python -m uvicorn app.main:app --port 8000 --reload
```

The backend API will start at `http://localhost:8000`.
- Interactive Swagger API Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

---

## 🏗️ Project Structure

```text
algovision/
├── frontend/
│   ├── src/
│   │   ├── algorithms/          # Deterministic trace generators (Bubble, Selection, Binary Search, DP...)
│   │   ├── components/
│   │   │   ├── code/            # Multi-language CodePanel (C++, C, Python, Java)
│   │   │   ├── layout/          # Navbar, Footer, CommandPalette (Ctrl+K)
│   │   │   └── visualizer/      # AlgorithmPlayer, ArrayBars, LinkedList, StackQueue, Tree, DPTable
│   │   ├── context/             # AppContext (LocalStorage sync, progress, bookmarks, notes, confetti)
│   │   ├── data/                # 41+ Curated questions, 16 syllabus topics, 8 learning paths
│   │   ├── pages/               # All 10 required product pages
│   │   ├── types/               # Strong TypeScript interfaces for Question, Topic, AlgorithmEvent
│   │   ├── App.tsx              # React Router v7 routes
│   │   └── index.css            # Dark charcoal design system with glassmorphic accents
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.app.json
├── backend/
│   ├── app/
│   │   ├── api/endpoints/       # Auth, Questions, Topics, Progress, Bookmarks, Dashboard, Admin
│   │   ├── core/                # Config, DB manager (resilient fallback + MongoDB Atlas), Security (bcrypt, JWT)
│   │   ├── data/                # Seed topics and questions loader
│   │   ├── models/              # Pydantic v2 schemas
│   │   └── main.py              # FastAPI application entry point with CORS
│   ├── requirements.txt
│   └── .env.example
├── docs/
│   ├── architecture.md          # Visualization engine & decoupled event design
│   └── database.md              # MongoDB Atlas collections, schemas, and indexing
└── README.md
```

---

## 🎨 Design System & Aesthetics

- **Dark Charcoal & Navy Workspace**: `#0a0e17` background with `#0f172a` glassmorphic cards and crisp `#334155` borders.
- **Accents**: Electric Indigo (`#6366f1`), Cyan (`#38bdf8`), and Violet (`#a855f7`).
- **Semantic Color Coding**:
  - 🟢 Green (`#10b981`): Solved states, matched elements, sorted positions.
  - 🟡 Amber (`#f59e0b`): Comparisons, warnings, active pointers, streaks.
  - 🔴 Red (`#ef4444`): Swaps, errors, reset alerts.
- **Typography**: Inter for UI readability and JetBrains Mono for clean code and variable inspection.

---

## 🛡️ License

Built for educational purposes for university DSAL coursework, technical interview prep, and algorithmic study.

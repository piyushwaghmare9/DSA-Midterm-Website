export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'cpp' | 'c' | 'python' | 'java';

export type AlgorithmCategory =
  | 'Arrays'
  | 'Strings'
  | 'Searching'
  | 'Sorting'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Linked Lists'
  | 'Stacks & Queues'
  | 'Trees & BST'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Greedy';

export interface CodeSolution {
  language: Language;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyVariables?: { name: string; description: string }[];
}

export interface ExampleTestCase {
  input: string;
  output: string;
  explanation: string;
}

export interface Question {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  secondaryTopics?: string[];
  tags: string[];
  description: string;
  inputDescription: string;
  outputDescription: string;
  constraints: string[];
  examples: ExampleTestCase[];
  hints: string[];
  bruteForceApproach?: {
    title: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    code?: string;
  };
  optimizedApproach: {
    title: string;
    description: string;
    intuition: string;
    algorithmSteps: string[];
    correctnessProof?: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  solutions: Record<Language, CodeSolution>;
  pseudocode?: string[];
  visualizationType?:
    | 'array-sort'
    | 'array-search'
    | 'two-pointers'
    | 'sliding-window'
    | 'linked-list'
    | 'stack'
    | 'queue'
    | 'binary-tree'
    | 'bst'
    | 'graph'
    | 'dp-table'
    | 'rotate-list';
  supportedVisualizer?: boolean;
  defaultInput?: Record<string, unknown>;
  relatedQuestions?: string[];
}

export type AlgorithmEventType =
  | 'initialize'
  | 'compare'
  | 'swap'
  | 'visit'
  | 'insert'
  | 'delete'
  | 'update'
  | 'found'
  | 'not-found'
  | 'complete'
  | 'pivot'
  | 'merge'
  | 'push'
  | 'pop'
  | 'window-slide'
  | 'pointer-move';

export interface AlgorithmEvent {
  step: number;
  type: AlgorithmEventType;
  description: string;
  state: {
    array?: number[];
    indices?: number[]; // active indices for comparison or highlight
    secondaryIndices?: number[]; // auxiliary indices e.g. pivot or target
    sortedIndices?: number[];
    pointers?: Record<string, number>; // e.g. { left: 0, right: 4, mid: 2 }
    stack?: (number | string)[];
    queue?: (number | string)[];
    linkedList?: Array<{ value: number | string; next?: number; isHead?: boolean; isNull?: boolean }>;
    treeNodes?: Array<{ id: string; val: number; left?: string; right?: string; active?: boolean; visited?: boolean }>;
    dpTable?: Array<{ rowLabel?: string; values: (number | string)[]; activeCol?: number }>;
    window?: { start: number; end: number };
    custom?: Record<string, unknown>;
  };
  activeIndices?: number[];
  activeNodes?: string[];
  variables?: Record<string, string | number | boolean>;
  codeLine?: number;
}

export interface TopicInfo {
  id: string;
  name: string;
  slug: string;
  category: 'Foundations' | 'Core Data Structures' | 'Algorithms';
  description: string;
  prerequisites: string[];
  keyPatterns: string[];
  commonMistakes: string[];
  complexityRef: { time: string; space: string };
  recommendedQuestions: string[];
  iconName: string;
}

export interface LearningPathModule {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  questionIds: string[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  suggestedDuration: string;
  badge: string;
  modules: LearningPathModule[];
}

export interface UserProgress {
  userId: string;
  questionId: string;
  status: 'unsolved' | 'attempted' | 'solved';
  notes?: string;
  lastAttemptAt?: string;
  solvedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferredLanguage: Language;
  learningGoal: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  role: 'student' | 'admin';
  streak: number;
  lastActiveDate: string;
}

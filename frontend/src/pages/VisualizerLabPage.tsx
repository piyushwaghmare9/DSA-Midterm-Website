import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Terminal,
  Zap,
  Info,
} from 'lucide-react';
import { getAlgorithmTrace } from '../algorithms/traces';
import { AlgorithmPlayer } from '../components/visualizer/AlgorithmPlayer';

type SupportedAlgo =
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'binary-search'
  | 'two-pointers'
  | 'sliding-window'
  | 'stack'
  | 'queue'
  | 'linked-list'
  | 'rotate-list'
  | 'dp-table';

export const VisualizerLabPage: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<SupportedAlgo>('bubble-sort');
  const [customArrayStr, setCustomArrayStr] = useState<string>('64, 34, 25, 12, 22, 11, 90');
  const [targetVal, setTargetVal] = useState<number>(22);
  const [windowK, setWindowK] = useState<number>(3);
  const [fibN, setFibN] = useState<number>(6);

  // Parse input array safely
  const parsedArray = React.useMemo(() => {
    return customArrayStr
      .split(',')
      .map((x) => parseInt(x.trim(), 10))
      .filter((n) => !isNaN(n));
  }, [customArrayStr]);

  const handleRandomize = () => {
    const size = Math.floor(Math.random() * 4) + 6; // 6-9 elements
    const randoms = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setCustomArrayStr(randoms.join(', '));
    const randomTarget = randoms[Math.floor(Math.random() * randoms.length)];
    setTargetVal(randomTarget);
  };

  // Generate trace based on selected algorithm and active inputs
  const trace = React.useMemo(() => {
    return getAlgorithmTrace(selectedAlgo, {
      array: parsedArray.length > 0 ? parsedArray : [64, 34, 25, 12, 22, 11, 90],
      target: targetVal,
      k: windowK,
      n: fibN,
    });
  }, [selectedAlgo, parsedArray, targetVal, windowK, fibN]);

  // Algorithm pseudocode mapping
  const algoPseudocode: Record<SupportedAlgo, string[]> = {
    'bubble-sort': [
      'for i from 0 to n - 1:',
      '  for j from 0 to n - i - 1:',
      '    if arr[j] > arr[j + 1]:',
      '      swap(arr[j], arr[j + 1])',
      'return sorted array',
    ],
    'selection-sort': [
      'for i from 0 to n - 1:',
      '  minIdx = i',
      '  for j from i + 1 to n:',
      '    if arr[j] < arr[minIdx]: minIdx = j',
      '  swap(arr[i], arr[minIdx])',
      'return sorted array',
    ],
    'insertion-sort': [
      'for i from 1 to n:',
      '  key = arr[i], j = i - 1',
      '  while j >= 0 and arr[j] > key:',
      '    arr[j + 1] = arr[j]; j--',
      '  arr[j + 1] = key',
      'return sorted array',
    ],
    'binary-search': [
      'left = 0, right = n - 1',
      'while left <= right:',
      '  mid = (left + right) / 2',
      '  if arr[mid] == target: return mid',
      '  else if arr[mid] < target: left = mid + 1',
      '  else: right = mid - 1',
      'return -1',
    ],
    'two-pointers': [
      'left = 0, right = n - 1',
      'while left < right:',
      '  sum = arr[left] + arr[right]',
      '  if sum == target: return [left, right]',
      '  else if sum < target: left++',
      '  else: right--',
      'return not found',
    ],
    'sliding-window': [
      'calculate sum of first k elements',
      'for i from k to n - 1:',
      '  windowSum = windowSum - arr[i - k] + arr[i]',
      '  update maximum window sum',
      'return max sum',
    ],
    'stack': [
      'st = empty stack',
      'push(x): append x to top of stack',
      'pop(): remove top item',
      'peek(): inspect top item without removal',
    ],
    'queue': [
      'q = empty queue',
      'enqueue(x): append x to rear of queue',
      'dequeue(): remove front item',
      'peek(): inspect front item',
    ],
    'linked-list': [
      'prev = null, curr = head',
      'while curr is not null:',
      '  nextTemp = curr.next',
      '  curr.next = prev',
      '  prev = curr; curr = nextTemp',
      'return prev (new head)',
    ],
    'rotate-list': [
      'connect tail.next = head (close circular ring)',
      'stepsToNewTail = length - (k % length)',
      'walk stepsToNewTail from tail to find newTail',
      'newHead = newTail.next',
      'newTail.next = null (break cycle)',
      'return newHead',
    ],
    'dp-table': [
      'dp = array of size n + 1',
      'dp[0] = 0',
      'dp[1] = 1',
      'for i from 2 to n: dp[i] = dp[i-1] + dp[i-2]',
      'return dp[n]',
    ],
  };

  const algoLabels: Record<SupportedAlgo, { title: string; category: string; complexity: string }> = {
    'bubble-sort': { title: 'Bubble Sort', category: 'Sorting', complexity: 'O(n²)' },
    'selection-sort': { title: 'Selection Sort', category: 'Sorting', complexity: 'O(n²)' },
    'insertion-sort': { title: 'Insertion Sort', category: 'Sorting', complexity: 'O(n²)' },
    'binary-search': { title: 'Binary Search', category: 'Searching', complexity: 'O(log n)' },
    'two-pointers': { title: 'Two Pointers Pair Sum', category: 'Two Pointers', complexity: 'O(n)' },
    'sliding-window': { title: 'Max Sum Subarray (Size k)', category: 'Sliding Window', complexity: 'O(n)' },
    'stack': { title: 'Stack Push & Pop (LIFO)', category: 'Linear Structures', complexity: 'O(1)' },
    'queue': { title: 'Queue Enqueue & Dequeue (FIFO)', category: 'Linear Structures', complexity: 'O(1)' },
    'linked-list': { title: 'Singly Linked List Reversal', category: 'Linked Lists', complexity: 'O(n)' },
    'rotate-list': { title: 'Rotate Linked List (LeetCode 61)', category: 'Linked Lists', complexity: 'O(n)' },
    'dp-table': { title: 'Fibonacci Tabulation DP', category: 'Dynamic Programming', complexity: 'O(n)' },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Laboratory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Visualizer Laboratory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test and visualize algorithm execution on custom datasets with step-by-step state inspection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-400 font-semibold">
            {algoLabels[selectedAlgo].complexity} Time Complexity
          </span>
        </div>
      </div>

      {/* Control Panel: Algorithm Selection & Custom Dataset Inputs */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Simulation Configuration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Select Algorithm */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              Select Algorithm
            </label>
            <select
              value={selectedAlgo}
              onChange={(e) => setSelectedAlgo(e.target.value as SupportedAlgo)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <optgroup label="Sorting">
                <option value="bubble-sort">Bubble Sort</option>
                <option value="selection-sort">Selection Sort</option>
                <option value="insertion-sort">Insertion Sort</option>
              </optgroup>
              <optgroup label="Searching">
                <option value="binary-search">Binary Search</option>
              </optgroup>
              <optgroup label="Two Pointers & Sliding Window">
                <option value="two-pointers">Two Pointers (Pair Sum)</option>
                <option value="sliding-window">Sliding Window (Max Subarray k)</option>
              </optgroup>
              <optgroup label="Linear Data Structures">
                <option value="stack">Stack Operations (Push/Pop)</option>
                <option value="queue">Queue Operations (FIFO)</option>
                <option value="linked-list">Linked List Reversal</option>
                <option value="rotate-list">Rotate Linked List (LC 61)</option>
              </optgroup>
              <optgroup label="Dynamic Programming">
                <option value="dp-table">Fibonacci Tabulation Grid</option>
              </optgroup>
            </select>
          </div>

          {/* Dataset Input */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">
                Custom Dataset (comma separated)
              </label>
              <button
                onClick={handleRandomize}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Randomize</span>
              </button>
            </div>
            <input
              type="text"
              value={customArrayStr}
              onChange={(e) => setCustomArrayStr(e.target.value)}
              placeholder="e.g. 64, 34, 25, 12, 22, 11, 90"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Algorithm-Specific Parameter Tuning */}
        {(selectedAlgo === 'binary-search' || selectedAlgo === 'two-pointers') && (
          <div className="pt-2 border-t border-slate-800 flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-300">Target Value:</span>
            <input
              type="number"
              value={targetVal}
              onChange={(e) => setTargetVal(Number(e.target.value))}
              className="w-24 px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none"
            />
            <span className="text-slate-400 text-[11px] font-sans">
              (For binary search, array will automatically be sorted before search).
            </span>
          </div>
        )}

        {selectedAlgo === 'sliding-window' && (
          <div className="pt-2 border-t border-slate-800 flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-300">Window Size (k):</span>
            <input
              type="number"
              min={1}
              max={parsedArray.length || 7}
              value={windowK}
              onChange={(e) => setWindowK(Number(e.target.value))}
              className="w-20 px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none"
            />
            <span className="text-slate-400 text-[11px] font-sans">
              Fixed window of k elements slides through array to find maximum sum.
            </span>
          </div>
        )}

        {selectedAlgo === 'dp-table' && (
          <div className="pt-2 border-t border-slate-800 flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-300">Target N:</span>
            <input
              type="number"
              min={1}
              max={15}
              value={fibN}
              onChange={(e) => setFibN(Number(e.target.value))}
              className="w-20 px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none"
            />
            <span className="text-slate-400 text-[11px] font-sans">
              Computes Fibonacci(N) state table up to index N.
            </span>
          </div>
        )}
      </div>

      {/* Standalone Player Canvas */}
      <div className="w-full">
        <AlgorithmPlayer
          events={trace}
          pseudocode={algoPseudocode[selectedAlgo]}
          title={`${algoLabels[selectedAlgo].title} — Laboratory Simulation`}
        />
      </div>
    </div>
  );
};

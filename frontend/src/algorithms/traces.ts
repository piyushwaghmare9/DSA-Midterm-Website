import { AlgorithmEvent } from '../types';

/**
 * Bubble Sort Event Generator
 */
export function generateBubbleSortTrace(initialArray: number[]): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let step = 0;
  const sortedIndices: number[] = [];

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Initialized array with ${n} elements: [${arr.join(', ')}].`,
    state: { array: [...arr], sortedIndices: [] },
    variables: { n, comparisons: 0, swaps: 0 },
    codeLine: 1,
  });

  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      events.push({
        step: ++step,
        type: 'compare',
        description: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
        state: { array: [...arr], indices: [j, j + 1], sortedIndices: [...sortedIndices] },
        activeIndices: [j, j + 1],
        variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1], comparisons, swaps },
        codeLine: 3,
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        events.push({
          step: ++step,
          type: 'swap',
          description: `Since ${temp} > ${arr[j]}, swapped elements at index ${j} and ${j + 1}. Array is now [${arr.join(', ')}].`,
          state: { array: [...arr], indices: [j, j + 1], sortedIndices: [...sortedIndices] },
          activeIndices: [j, j + 1],
          variables: { i, j, 'swapped?': true, comparisons, swaps },
          codeLine: 4,
        });
      }
    }
    sortedIndices.push(n - i - 1);
    events.push({
      step: ++step,
      type: 'update',
      description: `Pass ${i + 1} complete. Element ${arr[n - i - 1]} at index ${n - i - 1} is in its final sorted position.`,
      state: { array: [...arr], sortedIndices: [...sortedIndices] },
      variables: { i, sortedCount: sortedIndices.length, comparisons, swaps },
      codeLine: 2,
    });
    if (!swapped) break;
  }

  // mark all as sorted
  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  events.push({
    step: ++step,
    type: 'complete',
    description: `Bubble Sort finished! The array is fully sorted in non-decreasing order with ${comparisons} comparisons and ${swaps} swaps.`,
    state: { array: [...arr], sortedIndices: allSorted },
    variables: { status: 'Complete', comparisons, swaps },
    codeLine: 6,
  });

  return events;
}

/**
 * Selection Sort Event Generator
 */
export function generateSelectionSortTrace(initialArray: number[]): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let step = 0;
  const sortedIndices: number[] = [];

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Starting Selection Sort on [${arr.join(', ')}].`,
    state: { array: [...arr], sortedIndices: [] },
    variables: { n, comparisons: 0 },
    codeLine: 1,
  });

  let comparisons = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    events.push({
      step: ++step,
      type: 'visit',
      description: `Outer loop: assuming minimum element for position ${i} is arr[${i}] = ${arr[i]}.`,
      state: { array: [...arr], indices: [i], sortedIndices: [...sortedIndices] },
      activeIndices: [i],
      variables: { i, minIdx, currentMin: arr[minIdx] },
      codeLine: 2,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      events.push({
        step: ++step,
        type: 'compare',
        description: `Comparing candidate arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`,
        state: { array: [...arr], indices: [j], secondaryIndices: [minIdx], sortedIndices: [...sortedIndices] },
        activeIndices: [j, minIdx],
        variables: { i, j, minIdx, 'arr[j]': arr[j], 'arr[minIdx]': arr[minIdx] },
        codeLine: 4,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        events.push({
          step: ++step,
          type: 'update',
          description: `Found new smaller element ${arr[minIdx]} at index ${minIdx}. Updated minIdx = ${minIdx}.`,
          state: { array: [...arr], indices: [minIdx], sortedIndices: [...sortedIndices] },
          activeIndices: [minIdx],
          variables: { i, minIdx, newMin: arr[minIdx] },
          codeLine: 5,
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      events.push({
        step: ++step,
        type: 'swap',
        description: `Swapped minimum element ${arr[i]} into index ${i} with ${temp}.`,
        state: { array: [...arr], indices: [i, minIdx], sortedIndices: [...sortedIndices] },
        activeIndices: [i, minIdx],
        variables: { i, minIdx, swapped: true },
        codeLine: 6,
      });
    }

    sortedIndices.push(i);
  }

  sortedIndices.push(n - 1);
  events.push({
    step: ++step,
    type: 'complete',
    description: `Selection Sort complete! Array is sorted: [${arr.join(', ')}].`,
    state: { array: [...arr], sortedIndices },
    variables: { comparisons, status: 'Complete' },
    codeLine: 8,
  });

  return events;
}

/**
 * Insertion Sort Event Generator
 */
export function generateInsertionSortTrace(initialArray: number[]): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let step = 0;
  const sortedIndices = [0];

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Insertion Sort initialized. Single element arr[0] = ${arr[0]} is trivially sorted.`,
    state: { array: [...arr], sortedIndices: [0] },
    variables: { n },
    codeLine: 1,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    events.push({
      step: ++step,
      type: 'visit',
      description: `Picking key = arr[${i}] (${key}) to insert into sorted prefix arr[0..${i - 1}].`,
      state: { array: [...arr], indices: [i], sortedIndices: [...sortedIndices] },
      activeIndices: [i],
      variables: { i, key, j },
      codeLine: 2,
    });

    while (j >= 0 && arr[j] > key) {
      events.push({
        step: ++step,
        type: 'compare',
        description: `Comparing key ${key} with arr[${j}] (${arr[j]}). Since ${arr[j]} > ${key}, shifting ${arr[j]} right to index ${j + 1}.`,
        state: { array: [...arr], indices: [j, j + 1], sortedIndices: [...sortedIndices] },
        activeIndices: [j, j + 1],
        variables: { key, j, 'arr[j]': arr[j] },
        codeLine: 4,
      });

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
    sortedIndices.push(i);
    events.push({
      step: ++step,
      type: 'insert',
      description: `Inserted key ${key} into position ${j + 1}. Sorted prefix is now [${arr.slice(0, i + 1).join(', ')}].`,
      state: { array: [...arr], indices: [j + 1], sortedIndices: [...sortedIndices] },
      activeIndices: [j + 1],
      variables: { key, insertedAt: j + 1 },
      codeLine: 6,
    });
  }

  events.push({
    step: ++step,
    type: 'complete',
    description: `Insertion sort complete! Result: [${arr.join(', ')}].`,
    state: { array: [...arr], sortedIndices: Array.from({ length: n }, (_, i) => i) },
    variables: { status: 'Complete' },
    codeLine: 8,
  });

  return events;
}

/**
 * Binary Search Event Generator
 */
export function generateBinarySearchTrace(initialArray: number[], target: number): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  // Ensure array is sorted for binary search
  const arr = [...initialArray].sort((a, b) => a - b);
  let step = 0;
  let left = 0;
  let right = arr.length - 1;

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Initialized Binary Search for target = ${target} on sorted array [${arr.join(', ')}].`,
    state: { array: [...arr], pointers: { left, right } },
    variables: { target, left, right },
    codeLine: 1,
  });

  let found = false;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    events.push({
      step: ++step,
      type: 'visit',
      description: `Calculated middle index mid = floor((${left} + ${right}) / 2) = ${mid}. Middle element is arr[${mid}] = ${arr[mid]}.`,
      state: { array: [...arr], indices: [mid], pointers: { left, right, mid } },
      activeIndices: [mid],
      variables: { left, right, mid, 'arr[mid]': arr[mid], target },
      codeLine: 3,
    });

    events.push({
      step: ++step,
      type: 'compare',
      description: `Comparing middle value arr[${mid}] (${arr[mid]}) with target ${target}.`,
      state: { array: [...arr], indices: [mid], pointers: { left, right, mid } },
      activeIndices: [mid],
      variables: { 'arr[mid]': arr[mid], target, comparison: arr[mid] === target ? 'EQUAL' : arr[mid] < target ? 'LESS' : 'GREATER' },
      codeLine: 4,
    });

    if (arr[mid] === target) {
      found = true;
      events.push({
        step: ++step,
        type: 'found',
        description: `Target ${target} found at index ${mid}!`,
        state: { array: [...arr], indices: [mid], pointers: { left, right, mid } },
        activeIndices: [mid],
        variables: { resultIndex: mid, status: 'Found' },
        codeLine: 5,
      });
      break;
    } else if (arr[mid] < target) {
      const oldLeft = left;
      left = mid + 1;
      events.push({
        step: ++step,
        type: 'pointer-move',
        description: `Since arr[mid] (${arr[mid]}) < target (${target}), search the right half. Move left pointer from ${oldLeft} to ${left}.`,
        state: { array: [...arr], pointers: { left, right } },
        variables: { left, right, discardedRange: `[${oldLeft}..${mid}]` },
        codeLine: 7,
      });
    } else {
      const oldRight = right;
      right = mid - 1;
      events.push({
        step: ++step,
        type: 'pointer-move',
        description: `Since arr[mid] (${arr[mid]}) > target (${target}), search the left half. Move right pointer from ${oldRight} to ${right}.`,
        state: { array: [...arr], pointers: { left, right } },
        variables: { left, right, discardedRange: `[${mid}..${oldRight}]` },
        codeLine: 9,
      });
    }
  }

  if (!found) {
    events.push({
      step: ++step,
      type: 'not-found',
      description: `Search space exhausted (left > right). Target ${target} does not exist in the array. Returning -1.`,
      state: { array: [...arr], pointers: { left, right } },
      variables: { left, right, status: 'Not Found', result: -1 },
      codeLine: 11,
    });
  }

  return events;
}

/**
 * Two Pointers Event Generator (e.g., Two Sum on sorted array or Pair with Target)
 */
export function generateTwoPointersTrace(initialArray: number[], target: number): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const arr = [...initialArray].sort((a, b) => a - b);
  let step = 0;
  let left = 0;
  let right = arr.length - 1;

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Initialized Two Pointers on sorted array: left = 0 (val = ${arr[0]}), right = ${right} (val = ${arr[right]}). Target sum = ${target}.`,
    state: { array: [...arr], pointers: { left, right } },
    variables: { left, right, target },
    codeLine: 1,
  });

  let found = false;

  while (left < right) {
    const currentSum = arr[left] + arr[right];

    events.push({
      step: ++step,
      type: 'compare',
      description: `Checking sum: arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${currentSum}. Target is ${target}.`,
      state: { array: [...arr], indices: [left, right], pointers: { left, right } },
      activeIndices: [left, right],
      variables: { left, right, 'arr[left]': arr[left], 'arr[right]': arr[right], currentSum, target },
      codeLine: 3,
    });

    if (currentSum === target) {
      found = true;
      events.push({
        step: ++step,
        type: 'found',
        description: `Match found! Indices [${left}, ${right}] with values ${arr[left]} + ${arr[right]} = ${target}.`,
        state: { array: [...arr], indices: [left, right], pointers: { left, right } },
        activeIndices: [left, right],
        variables: { resultIndices: `[${left}, ${right}]`, sum: currentSum },
        codeLine: 4,
      });
      break;
    } else if (currentSum < target) {
      const oldLeft = left;
      left++;
      events.push({
        step: ++step,
        type: 'pointer-move',
        description: `Sum ${currentSum} < ${target}. To increase sum, increment left pointer from ${oldLeft} to ${left} (now val = ${arr[left]}).`,
        state: { array: [...arr], pointers: { left, right } },
        variables: { left, right, currentSum },
        codeLine: 6,
      });
    } else {
      const oldRight = right;
      right--;
      events.push({
        step: ++step,
        type: 'pointer-move',
        description: `Sum ${currentSum} > ${target}. To decrease sum, decrement right pointer from ${oldRight} to ${right} (now val = ${arr[right]}).`,
        state: { array: [...arr], pointers: { left, right } },
        variables: { left, right, currentSum },
        codeLine: 8,
      });
    }
  }

  if (!found) {
    events.push({
      step: ++step,
      type: 'not-found',
      description: `No two elements sum up to target ${target}.`,
      state: { array: [...arr], pointers: { left, right } },
      variables: { status: 'Not Found' },
      codeLine: 10,
    });
  }

  return events;
}

/**
 * Sliding Window Event Generator (Maximum Sum Subarray of size k)
 */
export function generateSlidingWindowTrace(initialArray: number[], k: number): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let step = 0;

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Sliding Window initialized to find max sum subarray of fixed size k = ${k}. Array: [${arr.join(', ')}].`,
    state: { array: [...arr] },
    variables: { k, n },
    codeLine: 1,
  });

  if (n < k) {
    events.push({
      step: ++step,
      type: 'complete',
      description: `Array length (${n}) is smaller than window size k (${k}).`,
      state: { array: [...arr] },
      variables: { error: 'Invalid size' },
      codeLine: 2,
    });
    return events;
  }

  // Compute first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  let maxSum = windowSum;
  let bestWindow = { start: 0, end: k - 1 };

  events.push({
    step: ++step,
    type: 'window-slide',
    description: `Initial window [0..${k - 1}] elements: [${arr.slice(0, k).join(', ')}]. Window sum = ${windowSum}.`,
    state: {
      array: [...arr],
      indices: Array.from({ length: k }, (_, idx) => idx),
      window: { start: 0, end: k - 1 },
    },
    activeIndices: Array.from({ length: k }, (_, idx) => idx),
    variables: { windowStart: 0, windowEnd: k - 1, windowSum, maxSum },
    codeLine: 3,
  });

  for (let i = k; i < n; i++) {
    const outgoing = arr[i - k];
    const incoming = arr[i];
    windowSum = windowSum - outgoing + incoming;

    const currentWindowIndices = Array.from({ length: k }, (_, idx) => i - k + 1 + idx);
    const isNewMax = windowSum > maxSum;
    if (isNewMax) {
      maxSum = windowSum;
      bestWindow = { start: i - k + 1, end: i };
    }

    events.push({
      step: ++step,
      type: 'window-slide',
      description: `Slide window right: subtract outgoing arr[${i - k}] (${outgoing}), add incoming arr[${i}] (${incoming}). New window sum = ${windowSum}.${isNewMax ? ' New maximum found!' : ''}`,
      state: {
        array: [...arr],
        indices: currentWindowIndices,
        window: { start: i - k + 1, end: i },
      },
      activeIndices: currentWindowIndices,
      variables: {
        outgoing,
        incoming,
        windowSum,
        maxSum,
        bestWindow: `[${bestWindow.start}..${bestWindow.end}]`,
      },
      codeLine: 5,
    });
  }

  events.push({
    step: ++step,
    type: 'complete',
    description: `Sliding Window completed! Maximum subarray sum is ${maxSum} at window [${bestWindow.start}..${bestWindow.end}]: [${arr.slice(bestWindow.start, bestWindow.end + 1).join(', ')}].`,
    state: {
      array: [...arr],
      indices: Array.from({ length: k }, (_, idx) => bestWindow.start + idx),
      window: bestWindow,
    },
    activeIndices: Array.from({ length: k }, (_, idx) => bestWindow.start + idx),
    variables: { maxSum, bestStart: bestWindow.start, bestEnd: bestWindow.end },
    codeLine: 7,
  });

  return events;
}

/**
 * Stack Operations Event Generator
 */
export function generateStackOperationsTrace(operations: { op: 'push' | 'pop'; val?: number }[]): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const stack: number[] = [];
  let step = 0;

  events.push({
    step: ++step,
    type: 'initialize',
    description: 'Initialized empty Stack (LIFO: Last In First Out).',
    state: { stack: [] },
    variables: { size: 0, top: 'null' },
    codeLine: 1,
  });

  for (const { op, val } of operations) {
    if (op === 'push' && val !== undefined) {
      stack.push(val);
      events.push({
        step: ++step,
        type: 'push',
        description: `Pushed ${val} onto top of stack. Stack size is now ${stack.length}.`,
        state: { stack: [...stack] },
        variables: { operation: `push(${val})`, top: val, size: stack.length },
        codeLine: 2,
      });
    } else if (op === 'pop') {
      if (stack.length === 0) {
        events.push({
          step: ++step,
          type: 'not-found',
          description: 'Stack Underflow! Cannot pop from empty stack.',
          state: { stack: [] },
          variables: { error: 'Underflow' },
          codeLine: 4,
        });
      } else {
        const popped = stack.pop();
        events.push({
          step: ++step,
          type: 'pop',
          description: `Popped top element ${popped} from stack. New top is ${stack.length > 0 ? stack[stack.length - 1] : 'empty'}.`,
          state: { stack: [...stack] },
          variables: { poppedVal: popped ?? 'null', top: stack.length > 0 ? stack[stack.length - 1] : 'null', size: stack.length },
          codeLine: 5,
        });
      }
    }
  }

  return events;
}

/**
 * Queue Operations Event Generator
 */
export function generateQueueOperationsTrace(operations: { op: 'enqueue' | 'dequeue'; val?: number }[]): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  const queue: number[] = [];
  let step = 0;

  events.push({
    step: ++step,
    type: 'initialize',
    description: 'Initialized empty Queue (FIFO: First In First Out).',
    state: { queue: [] },
    variables: { size: 0, front: 'null', rear: 'null' },
    codeLine: 1,
  });

  for (const { op, val } of operations) {
    if (op === 'enqueue' && val !== undefined) {
      queue.push(val);
      events.push({
        step: ++step,
        type: 'insert',
        description: `Enqueued ${val} at the rear of the queue. Size is now ${queue.length}.`,
        state: { queue: [...queue] },
        variables: { operation: `enqueue(${val})`, front: queue[0], rear: val, size: queue.length },
        codeLine: 2,
      });
    } else if (op === 'dequeue') {
      if (queue.length === 0) {
        events.push({
          step: ++step,
          type: 'not-found',
          description: 'Queue Underflow! Cannot dequeue from empty queue.',
          state: { queue: [] },
          variables: { error: 'Underflow' },
          codeLine: 4,
        });
      } else {
        const dequeued = queue.shift();
        events.push({
          step: ++step,
          type: 'delete',
          description: `Dequeued front element ${dequeued}. New front is ${queue.length > 0 ? queue[0] : 'empty'}.`,
          state: { queue: [...queue] },
          variables: { dequeuedVal: dequeued ?? 'null', front: queue.length > 0 ? queue[0] : 'null', size: queue.length },
          codeLine: 5,
        });
      }
    }
  }

  return events;
}

/**
 * Reverse Linked List Event Generator
 */
export function generateReverseLinkedListTrace(values: number[]): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  let step = 0;

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Initialized singly linked list: [${values.join(' -> ')} -> NULL].`,
    state: {
      linkedList: values.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
    },
    variables: { prev: 'NULL', curr: values[0] ?? 'NULL', next: values[1] ?? 'NULL' },
    codeLine: 1,
  });

  const nodes = values.map((val) => ({ val }));
  let prev = 'NULL';

  for (let i = 0; i < nodes.length; i++) {
    const currVal = nodes[i].val;
    const nextVal = i + 1 < nodes.length ? nodes[i + 1].val.toString() : 'NULL';

    events.push({
      step: ++step,
      type: 'visit',
      description: `Processing node with value ${currVal}. Current pointers: prev = ${prev}, curr = ${currVal}, next = ${nextVal}.`,
      state: {
        linkedList: values.map((v, idx) => ({ value: v, isHead: idx === i })),
      },
      variables: { prev, curr: currVal, next: nextVal },
      codeLine: 3,
    });

    events.push({
      step: ++step,
      type: 'update',
      description: `Reversing link: setting node(${currVal})->next = ${prev}. Moving prev to ${currVal} and advancing curr to ${nextVal}.`,
      state: {
        linkedList: values.map((v, idx) => ({ value: v, isHead: idx === i })),
      },
      variables: { prev: currVal, curr: nextVal },
      codeLine: 5,
    });

    prev = currVal.toString();
  }

  const reversed = [...values].reverse();
  events.push({
    step: ++step,
    type: 'complete',
    description: `Linked List reversal complete! New head is ${reversed[0]}. New list: [${reversed.join(' -> ')} -> NULL].`,
    state: {
      linkedList: reversed.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
    },
    variables: { newHead: reversed[0], status: 'Reversed' },
    codeLine: 7,
  });

  return events;
}

/**
 * Rotate List (LeetCode 61) Event Generator
 */
export function generateRotateListTrace(initialList: number[], k: number): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  let step = 0;
  const values = initialList && initialList.length > 0 ? [...initialList] : [1, 2, 3, 4, 5];
  const n = values.length;

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Initialized linked list: [${values.join(' -> ')} -> NULL] with target rotation k = ${k}.`,
    state: {
      linkedList: values.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
    },
    variables: { k, length: n, head: values[0] },
    codeLine: 1,
  });

  const effectiveK = k % n;
  events.push({
    step: ++step,
    type: 'visit',
    description: `Traversed list to find length (${n}) and current tail node (${values[n - 1]}). Effective rotation k = ${k} % ${n} = ${effectiveK}.`,
    state: {
      linkedList: values.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
    },
    variables: { length: n, tail: values[n - 1], effectiveK },
    codeLine: 2,
  });

  if (effectiveK === 0) {
    events.push({
      step: ++step,
      type: 'complete',
      description: `Since k % n == 0, rotating by ${k} returns the list unchanged.`,
      state: {
        linkedList: values.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
      },
      variables: { result: 'Unchanged' },
      codeLine: 3,
    });
    return events;
  }

  // Connect tail to head (circular)
  events.push({
    step: ++step,
    type: 'update',
    description: `Connected tail node (${values[n - 1]}) to head node (${values[0]}), creating a circular list ring.`,
    state: {
      linkedList: values.map((v, i) => ({ value: v, next: (i + 1) % n, isHead: i === 0 })),
    },
    variables: { 'tail->next': values[0], isCircular: true },
    codeLine: 4,
  });

  // Steps to new tail from head: n - effectiveK
  const stepsToNewTail = n - effectiveK;
  const newTailIdx = stepsToNewTail - 1;
  const newTailVal = values[newTailIdx];
  const newHeadVal = values[(newTailIdx + 1) % n];

  events.push({
    step: ++step,
    type: 'visit',
    description: `Walking ${stepsToNewTail} steps from head to locate new tail at index ${newTailIdx} (node ${newTailVal}). The new head is node ${newHeadVal}.`,
    state: {
      linkedList: values.map((v, i) => ({ value: v, isHead: i === (newTailIdx + 1) % n })),
    },
    variables: { newTail: newTailVal, newHead: newHeadVal, stepsToNewTail },
    codeLine: 5,
  });

  // Rotated values array
  const rotatedValues = [...values.slice(n - effectiveK), ...values.slice(0, n - effectiveK)];

  events.push({
    step: ++step,
    type: 'swap',
    description: `Severing circular link at new tail: set node(${newTailVal})->next = NULL. New head is node ${newHeadVal}.`,
    state: {
      linkedList: rotatedValues.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
    },
    variables: { 'newTail->next': 'NULL', newHead: newHeadVal },
    codeLine: 6,
  });

  events.push({
    step: ++step,
    type: 'complete',
    description: `Rotate List complete! Rotated list is now [${rotatedValues.join(' -> ')} -> NULL].`,
    state: {
      linkedList: rotatedValues.map((v, i) => ({ value: v, next: i + 1, isHead: i === 0 })),
    },
    variables: { newHead: rotatedValues[0], status: 'Rotated' },
    codeLine: 7,
  });

  return events;
}

/**
 * Fibonacci DP Table Event Generator
 */
export function generateFibonacciDPTrace(n: number): AlgorithmEvent[] {
  const events: AlgorithmEvent[] = [];
  let step = 0;
  const dp: number[] = new Array(n + 1).fill(0);

  events.push({
    step: ++step,
    type: 'initialize',
    description: `Computing Fibonacci(${n}) using Bottom-Up Dynamic Programming (Tabulation). Initialized dp table of size ${n + 1}.`,
    state: {
      dpTable: [{ rowLabel: 'Fibonacci(i)', values: [...dp] }],
    },
    variables: { n, dp0: 0, dp1: 1 },
    codeLine: 1,
  });

  dp[0] = 0;
  events.push({
    step: ++step,
    type: 'update',
    description: 'Base Case: dp[0] = 0.',
    state: {
      dpTable: [{ rowLabel: 'Fibonacci(i)', values: [...dp], activeCol: 0 }],
    },
    variables: { 'dp[0]': 0 },
    codeLine: 2,
  });

  if (n >= 1) {
    dp[1] = 1;
    events.push({
      step: ++step,
      type: 'update',
      description: 'Base Case: dp[1] = 1.',
      state: {
        dpTable: [{ rowLabel: 'Fibonacci(i)', values: [...dp], activeCol: 1 }],
      },
      variables: { 'dp[1]': 1 },
      codeLine: 3,
    });
  }

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    events.push({
      step: ++step,
      type: 'update',
      description: `Recurrence: dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}.`,
      state: {
        dpTable: [{ rowLabel: 'Fibonacci(i)', values: [...dp], activeCol: i }],
      },
      variables: { i, 'dp[i-1]': dp[i - 1], 'dp[i-2]': dp[i - 2], 'dp[i]': dp[i] },
      codeLine: 5,
    });
  }

  events.push({
    step: ++step,
    type: 'complete',
    description: `Computation finished! Fibonacci(${n}) = ${dp[n]}. Time Complexity: O(n), Space: O(n).`,
    state: {
      dpTable: [{ rowLabel: 'Fibonacci(i)', values: [...dp], activeCol: n }],
    },
    variables: { result: dp[n], time: 'O(n)', space: 'O(n)' },
    codeLine: 7,
  });

  return events;
}

/**
 * Universal trace dispatcher based on visualizationType or algorithm name
 */
export function getAlgorithmTrace(
  type: string,
  input: {
    array?: number[];
    target?: number;
    k?: number;
    n?: number;
    stackOps?: { op: 'push' | 'pop'; val?: number }[];
    queueOps?: { op: 'enqueue' | 'dequeue'; val?: number }[];
  }
): AlgorithmEvent[] {
  const defaultArr = input.array && input.array.length > 0 ? input.array : [64, 34, 25, 12, 22, 11, 90];

  switch (type) {
    case 'bubble-sort':
    case 'array-sort':
      return generateBubbleSortTrace(defaultArr);
    case 'selection-sort':
      return generateSelectionSortTrace(defaultArr);
    case 'insertion-sort':
      return generateInsertionSortTrace(defaultArr);
    case 'binary-search':
    case 'array-search':
      return generateBinarySearchTrace(defaultArr, input.target ?? 22);
    case 'two-pointers':
      return generateTwoPointersTrace(defaultArr, input.target ?? 37);
    case 'sliding-window':
      return generateSlidingWindowTrace(defaultArr, input.k ?? 3);
    case 'stack':
      return generateStackOperationsTrace(
        input.stackOps ?? [
          { op: 'push', val: 10 },
          { op: 'push', val: 20 },
          { op: 'push', val: 30 },
          { op: 'pop' },
          { op: 'push', val: 40 },
          { op: 'pop' },
        ]
      );
    case 'queue':
      return generateQueueOperationsTrace(
        input.queueOps ?? [
          { op: 'enqueue', val: 5 },
          { op: 'enqueue', val: 15 },
          { op: 'enqueue', val: 25 },
          { op: 'dequeue' },
          { op: 'enqueue', val: 35 },
        ]
      );
    case 'linked-list':
      return generateReverseLinkedListTrace(input.array ?? [1, 2, 3, 4, 5]);
    case 'rotate-list':
      return generateRotateListTrace(input.array ?? [1, 2, 3, 4, 5], input.target ?? 2);
    case 'dp-table':
      return generateFibonacciDPTrace(input.n ?? 6);
    default:
      return generateBubbleSortTrace(defaultArr);
  }
}

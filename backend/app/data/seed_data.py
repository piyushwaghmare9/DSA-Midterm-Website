import json
from typing import List, Dict, Any

SEED_TOPICS: List[Dict[str, Any]] = [
    {
        "id": "arrays",
        "name": "Arrays",
        "slug": "arrays",
        "category": "Core Data Structures",
        "description": "Contiguous memory layout, cache locality, prefix sums, subsegment manipulation, and in-place transformations.",
        "prerequisites": ["Basic Loops", "Memory Model"],
        "keyPatterns": ["Two Pointers", "Prefix Sums", "Kadane's Algorithm", "In-place element swapping"],
        "commonMistakes": ["Off-by-one boundary index errors", "Allocating redundant memory"],
        "complexityRef": {"time": "Access O(1), Insert/Delete O(n)", "space": "O(n)"},
        "recommendedQuestions": ["two-sum", "best-time-to-buy-and-sell-stock", "maximum-subarray", "rotate-array"],
        "iconName": "SquareStack"
    },
    {
        "id": "strings",
        "name": "Strings",
        "slug": "strings",
        "category": "Core Data Structures",
        "description": "Character array manipulations, anagrams, palindrome verification, substring sliding windows, and matching algorithms.",
        "prerequisites": ["Arrays", "ASCII / Unicode encodings"],
        "keyPatterns": ["Frequency map of size 26", "Two pointers from ends", "Sliding window with hash set"],
        "commonMistakes": ["String immutability performance trap", "Case sensitivity oversights"],
        "complexityRef": {"time": "Access O(1), Search O(n)", "space": "O(n)"},
        "recommendedQuestions": ["valid-anagram", "valid-palindrome", "longest-substring-without-repeating-characters"],
        "iconName": "Type"
    },
    {
        "id": "linked-lists",
        "name": "Linked Lists",
        "slug": "linked-lists",
        "category": "Core Data Structures",
        "description": "Dynamic pointer-linked data structures, singly and doubly linked nodes, dummy head technique, and cycle detection.",
        "prerequisites": ["Pointers and References", "Dynamic Memory"],
        "keyPatterns": ["Fast & Slow Pointer (Floyd's Cycle)", "Sentinel / Dummy Head node", "In-place pointer reversal"],
        "commonMistakes": ["Losing pointer reference to the rest of the list", "Null pointer dereferencing on tail"],
        "complexityRef": {"time": "Access O(n), Insert/Delete O(1) at known position", "space": "O(n)"},
        "recommendedQuestions": ["reverse-linked-list", "middle-of-the-linked-list", "linked-list-cycle", "merge-two-sorted-lists", "rotate-list"],
        "iconName": "Link"
    },
    {
        "id": "stacks-and-queues",
        "name": "Stacks & Queues",
        "slug": "stacks-and-queues",
        "category": "Core Data Structures",
        "description": "LIFO stacks and FIFO queues, monotonic stacks, and circular ring buffers.",
        "prerequisites": ["Arrays", "Linked Lists"],
        "keyPatterns": ["Matching parentheses", "Monotonic increasing/decreasing stack", "Queue for BFS level-order"],
        "commonMistakes": ["Popping from empty stack", "Forgetting stack emptiness checks"],
        "complexityRef": {"time": "Push/Pop O(1), Peek O(1)", "space": "O(n)"},
        "recommendedQuestions": ["valid-parentheses", "min-stack", "implement-queue-using-stacks", "daily-temperatures"],
        "iconName": "Layers"
    },
    {
        "id": "trees",
        "name": "Binary Trees & BST",
        "slug": "trees",
        "category": "Core Data Structures",
        "description": "Hierarchical node structures, DFS traversals (pre, in, post), BFS level-order traversal, and BST binary search invariant.",
        "prerequisites": ["Recursion", "Linked Lists"],
        "keyPatterns": ["DFS bottom-up vs top-down recursion", "BFS using Queue", "In-order traversal yields sorted order in BST"],
        "commonMistakes": ["Not handling null root", "Forgetting to validate both min and max bounds for BST"],
        "complexityRef": {"time": "Balanced O(log n), Skewed O(n)", "space": "O(h)"},
        "recommendedQuestions": ["maximum-depth-of-binary-tree", "invert-binary-tree", "binary-tree-level-order-traversal", "validate-binary-search-tree"],
        "iconName": "GitFork"
    },
    {
        "id": "dynamic-programming",
        "name": "Dynamic Programming",
        "slug": "dynamic-programming",
        "category": "Algorithms",
        "description": "Optimal substructure and overlapping subproblems: Top-Down Memoization, Bottom-Up Tabulation, and state space compression.",
        "prerequisites": ["Recursion", "Mathematical Induction"],
        "keyPatterns": ["1D state: dp[i] depends on dp[i-1], dp[i-2]", "2D grid: dp[i][j]", "0/1 Knapsack include/exclude decision"],
        "commonMistakes": ["Incorrect base cases", "Subproblem dependency ordering errors"],
        "complexityRef": {"time": "O(states * transitions)", "space": "O(states)"},
        "recommendedQuestions": ["climbing-stairs", "fibonacci-number", "coin-change", "house-robber"],
        "iconName": "Cpu"
    }
]

# We seed with questions covering all primary topics
SEED_QUESTIONS_SUMMARY: List[Dict[str, Any]] = [
    {
        "id": "1",
        "slug": "two-sum",
        "title": "Two Sum",
        "difficulty": "Easy",
        "topic": "Arrays",
        "tags": ["Array", "Hash Table", "Two Pointers"],
        "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        "inputDescription": "nums array and target integer.",
        "outputDescription": "Array of two indices [i, j].",
        "constraints": ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
        "examples": [{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "2 + 7 = 9"}],
        "hints": ["Use a hash map to look up target - nums[i] in O(1) time."],
        "optimizedApproach": {
            "title": "One-Pass Hash Map Lookup",
            "description": "Iterate through array while maintaining seen value -> index map.",
            "intuition": "Instant complement lookup avoids nested loops.",
            "algorithmSteps": ["Initialize map", "Compute complement = target - x", "If seen, return [seen[comp], i]", "Store seen[x] = i"],
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)"
        },
        "solutions": {
            "cpp": {"language": "cpp", "code": "#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (seen.count(complement)) return {seen[complement], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};", "explanation": "std::unordered_map complement lookup", "timeComplexity": "O(n)", "spaceComplexity": "O(n)"},
            "c": {"language": "c", "code": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) { res[0] = i; res[1] = j; return res; }\n        }\n    }\n    return res;\n}", "explanation": "C nested loop allocation", "timeComplexity": "O(n^2)", "spaceComplexity": "O(1)"},
            "python": {"language": "python", "code": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in seen:\n                return [seen[comp], i]\n            seen[num] = i\n        return []", "explanation": "Python dict enumeration", "timeComplexity": "O(n)", "spaceComplexity": "O(n)"},
            "java": {"language": "java", "code": "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (seen.containsKey(comp)) return new int[] { seen.get(comp), i };\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}", "explanation": "Java HashMap implementation", "timeComplexity": "O(n)", "spaceComplexity": "O(n)"}
        },
        "visualizationType": "two-pointers",
        "supportedVisualizer": True,
        "defaultInput": {"array": [2, 7, 11, 15], "target": 9}
    },
    {
        "id": "2",
        "slug": "best-time-to-buy-and-sell-stock",
        "title": "Best Time to Buy and Sell Stock",
        "difficulty": "Easy",
        "topic": "Arrays",
        "tags": ["Array", "Dynamic Programming", "Greedy"],
        "description": "Maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        "inputDescription": "Array of prices.",
        "outputDescription": "Maximum profit integer.",
        "constraints": ["1 <= prices.length <= 10^5"],
        "examples": [{"input": "prices = [7,1,5,3,6,4]", "output": "5", "explanation": "Buy day 2 (1) and sell day 5 (6), profit = 5."}],
        "hints": ["Keep track of the minimum price observed so far."],
        "optimizedApproach": {
            "title": "Single Pass Min Price Tracking",
            "description": "Maintain running min price and max profit difference.",
            "intuition": "Buying at historical lowest before current day maximizes sell profit.",
            "algorithmSteps": ["minPrice = inf, maxProfit = 0", "Iterate prices", "Update minPrice and maxProfit", "Return maxProfit"],
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)"
        },
        "solutions": {
            "cpp": {"language": "cpp", "code": "class Solution {\npublic:\n    int maxProfit(std::vector<int>& prices) {\n        int minP = 1e9, maxProf = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxProf) maxProf = p - minP;\n        }\n        return maxProf;\n    }\n};", "explanation": "C++ min price tracking", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "c": {"language": "c", "code": "int maxProfit(int* prices, int n) {\n    int minP = 1e9, maxProf = 0;\n    for (int i = 0; i < n; i++) {\n        if (prices[i] < minP) minP = prices[i];\n        else if (prices[i] - minP > maxProf) maxProf = prices[i] - minP;\n    }\n    return maxProf;\n}", "explanation": "C linear scan", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "python": {"language": "python", "code": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_p, max_p = float('inf'), 0\n        for p in prices:\n            if p < min_p: min_p = p\n            elif p - min_p > max_p: max_p = p - min_p\n        return max_p", "explanation": "Python linear pass", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "java": {"language": "java", "code": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxProf = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxProf) maxProf = p - minP;\n        }\n        return maxProf;\n    }\n}", "explanation": "Java single pass", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"}
        },
        "visualizationType": "two-pointers",
        "supportedVisualizer": True,
        "defaultInput": {"array": [7, 1, 5, 3, 6, 4]}
    },
    {
        "id": "6",
        "slug": "binary-search",
        "title": "Binary Search",
        "difficulty": "Easy",
        "topic": "Searching",
        "tags": ["Binary Search", "Array"],
        "description": "Given a sorted array nums and target, return its index or -1 in O(log n) time.",
        "inputDescription": "Sorted array nums and target integer.",
        "outputDescription": "Index or -1.",
        "constraints": ["1 <= nums.length <= 10^4"],
        "examples": [{"input": "nums = [-1,0,3,5,9,12], target = 9", "output": "4", "explanation": "9 is at index 4"}],
        "hints": ["Calculate mid = left + (right - left) / 2 to avoid overflow."],
        "optimizedApproach": {
            "title": "Iterative Binary Search",
            "description": "Repeatedly discard the half that cannot contain target.",
            "intuition": "Sorted order allows ruling out half candidates on each step.",
            "algorithmSteps": ["left = 0, right = n - 1", "while left <= right: check mid", "adjust boundaries"],
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1)"
        },
        "solutions": {
            "cpp": {"language": "cpp", "code": "class Solution {\npublic:\n    int search(std::vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n};", "explanation": "C++ binary search", "timeComplexity": "O(log n)", "spaceComplexity": "O(1)"},
            "c": {"language": "c", "code": "int search(int* nums, int n, int target) {\n    int l = 0, r = n - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}", "explanation": "C binary search", "timeComplexity": "O(log n)", "spaceComplexity": "O(1)"},
            "python": {"language": "python", "code": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target: return m\n            elif nums[m] < target: l = m + 1\n            else: r = m - 1\n        return -1", "explanation": "Python binary search", "timeComplexity": "O(log n)", "spaceComplexity": "O(1)"},
            "java": {"language": "java", "code": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n}", "explanation": "Java binary search", "timeComplexity": "O(log n)", "spaceComplexity": "O(1)"}
        },
        "visualizationType": "array-search",
        "supportedVisualizer": True,
        "defaultInput": {"array": [-1, 0, 3, 5, 9, 12], "target": 9}
    },
    {
        "id": "61",
        "slug": "rotate-list",
        "title": "Rotate List",
        "difficulty": "Medium",
        "topic": "Linked Lists",
        "tags": ["Linked List", "Two Pointers", "Math"],
        "description": "Given the head of a linked list, rotate the list to the right by k places.",
        "inputDescription": "Head of a linked list and integer k.",
        "outputDescription": "Rotated linked list head pointer.",
        "constraints": ["The number of nodes in the list is in the range [0, 500].", "-100 <= Node.val <= 100", "0 <= k <= 2 * 10^9"],
        "examples": [{"input": "head = [1,2,3,4,5], k = 2", "output": "[4,5,1,2,3]", "explanation": "Rotate right by 2 shifts nodes to [4,5,1,2,3]"}],
        "hints": ["Rotating by list length n gives the same list. Use k = k % n.", "Connect tail to head to form a circular ring, then traverse to the new tail and break the link."],
        "optimizedApproach": {
            "title": "Circular Ring Link Severing",
            "description": "Calculate length n, connect tail to head, and sever the ring at (n - k % n).",
            "intuition": "Right rotation by k positions corresponds to moving the break point in a circular ring.",
            "algorithmSteps": ["Handle null or single-node edge cases", "Traverse to find length n and tail node", "k = k % n; if k == 0 return head", "tail.next = head (close ring)", "Walk n - k steps from tail to find newTail", "newHead = newTail.next; newTail.next = null", "Return newHead"],
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)"
        },
        "solutions": {
            "cpp": {"language": "cpp", "code": "class Solution {\npublic:\n    ListNode* rotateRight(ListNode* head, int k) {\n        if (!head || !head->next || k == 0) return head;\n        int n = 1; ListNode* tail = head;\n        while (tail->next) { tail = tail->next; n++; }\n        k = k % n; if (k == 0) return head;\n        tail->next = head;\n        int steps = n - k;\n        ListNode* newTail = tail;\n        while (steps--) newTail = newTail->next;\n        ListNode* newHead = newTail->next;\n        newTail->next = nullptr;\n        return newHead;\n    }\n};", "explanation": "C++ circular list rotation", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "c": {"language": "c", "code": "struct ListNode* rotateRight(struct ListNode* head, int k) {\n    if (!head || !head->next || k == 0) return head;\n    int n = 1; struct ListNode* tail = head;\n    while (tail->next) { tail = tail->next; n++; }\n    k = k % n; if (k == 0) return head;\n    tail->next = head;\n    int steps = n - k;\n    struct ListNode* newTail = tail;\n    while (steps--) newTail = newTail->next;\n    struct ListNode* newHead = newTail->next;\n    newTail->next = NULL;\n    return newHead;\n}", "explanation": "C circular list rotation", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "python": {"language": "python", "code": "class Solution:\n    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        if not head or not head.next or k == 0: return head\n        n, tail = 1, head\n        while tail.next:\n            tail = tail.next\n            n += 1\n        k = k % n\n        if k == 0: return head\n        tail.next = head\n        steps = n - k\n        new_tail = tail\n        while steps > 0:\n            new_tail = new_tail.next\n            steps -= 1\n        new_head = new_tail.next\n        new_tail.next = None\n        return new_head", "explanation": "Python circular list rotation", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"},
            "java": {"language": "java", "code": "class Solution {\n    public ListNode rotateRight(ListNode head, int k) {\n        if (head == null || head.next == null || k == 0) return head;\n        int n = 1; ListNode tail = head;\n        while (tail.next != null) { tail = tail.next; n++; }\n        k = k % n; if (k == 0) return head;\n        tail.next = head;\n        int steps = n - k;\n        ListNode newTail = tail;\n        while (steps-- > 0) newTail = newTail.next;\n        ListNode newHead = newTail.next;\n        newTail.next = null;\n        return newHead;\n    }\n}", "explanation": "Java circular list rotation", "timeComplexity": "O(n)", "spaceComplexity": "O(1)"}
        },
        "visualizationType": "rotate-list",
        "supportedVisualizer": True,
        "defaultInput": {"array": [1, 2, 3, 4, 5], "target": 2}
    }
]

def load_seed_data(manager):
    """Loads seed data into memory/MongoDB."""
    for t in SEED_TOPICS:
        manager.topics[t["slug"]] = t
    for q in SEED_QUESTIONS_SUMMARY:
        manager.questions[q["id"]] = q
        manager.questions[q["slug"]] = q

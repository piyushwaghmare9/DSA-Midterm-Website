import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // 1. Two Sum
  {
    id: '1',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    secondaryTopics: ['Hashing', 'Two Pointers'],
    tags: ['Array', 'Hash Table', 'Amazon', 'Google', 'Meta'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputDescription: 'An array of integers `nums` and an integer `target`.',
    outputDescription: 'An array of two integers representing indices `[i, j]`.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
        explanation: 'nums[0] + nums[1] == 3 + 3 == 6, we return [0, 1].',
      },
    ],
    hints: [
      'Can you check every possible pair of elements with two nested loops?',
      'How can we trade space for time? What if we stored each seen number and its index in a hash map?',
      'For each element x, the required complement is target - x. Check if it already exists in the map.',
    ],
    bruteForceApproach: {
      title: 'Nested Loops (Brute Force)',
      description: 'Check every possible pair (i, j) with i < j and see if nums[i] + nums[j] equals target.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
    },
    optimizedApproach: {
      title: 'One-Pass Hash Map Complement Lookup',
      description: 'Iterate through the array once while maintaining a hash map from number to index. For each number x at index i, compute complement = target - x. If complement is in the map, return [map[complement], i]. Otherwise, record map[x] = i.',
      intuition: 'Instead of searching repeatedly across all remaining elements, a hash map provides O(1) average lookup for the required complement.',
      algorithmSteps: [
        'Initialize an empty hash map (seen: value -> index).',
        'Iterate through the array with index i and value num.',
        'Compute complement = target - num.',
        'If complement is present in seen, return [seen[complement], i].',
        'Otherwise, store seen[num] = i.',
      ],
      timeComplexity: 'O(n) - Single pass through the array with O(1) average map operations.',
      spaceComplexity: 'O(n) - Space for the hash map storing at most n elements.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        explanation: 'Uses std::unordered_map to store values and their corresponding indices for O(1) average lookup.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        keyVariables: [
          { name: 'seen', description: 'Hash table mapping number values to their first observed indices' },
          { name: 'complement', description: 'Difference between target and current element (target - nums[i])' },
        ],
      },
      c: {
        language: 'c',
        code: `#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return result;
}`,
        explanation: 'In pure C without standard hash map headers, two-pointer or nested loop search provides straightforward memory allocation.',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        explanation: 'Python dict provides O(1) key lookups with enumerate yielding indices and values cleanly.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
        explanation: 'Java HashMap stores boxed Integer keys and indices.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'seen = empty Map',
      'for i from 0 to length(nums) - 1:',
      '    complement = target - nums[i]',
      '    if complement in seen:',
      '        return [seen[complement], i]',
      '    seen[nums[i]] = i',
      'return []',
    ],
    visualizationType: 'two-pointers',
    supportedVisualizer: true,
    defaultInput: { array: [2, 7, 11, 15], target: 9 },
    relatedQuestions: ['two-sum-ii-input-array-is-sorted', '3sum', 'contains-duplicate'],
  },

  // 2. Best Time to Buy and Sell Stock
  {
    id: '2',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topic: 'Arrays',
    secondaryTopics: ['Dynamic Programming', 'Greedy'],
    tags: ['Array', 'Dynamic Programming', 'Google', 'Apple'],
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    inputDescription: 'An array of integer prices.',
    outputDescription: 'Maximum possible profit as an integer.',
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
      },
      {
        input: 'prices = [7, 6, 4, 3, 1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.',
      },
    ],
    hints: [
      'Could we keep track of the lowest price observed so far as we traverse from left to right?',
      'At day i, the maximum profit if we sell today is prices[i] - minPriceSoFar.',
      'Update the overall max profit if today\'s profit is higher.',
    ],
    bruteForceApproach: {
      title: 'Compare All Pairs (i, j)',
      description: 'For each buy day i, evaluate every sell day j > i and compute prices[j] - prices[i].',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
    },
    optimizedApproach: {
      title: 'Single Pass Tracking Min Price (Greedy)',
      description: 'Maintain minPrice initialized to infinity and maxProfit to 0. For each price, update minPrice = min(minPrice, price), then update maxProfit = max(maxProfit, price - minPrice).',
      intuition: 'To maximize (sell - buy), we should buy at the lowest historical price encountered before the current day.',
      algorithmSteps: [
        'Set minPrice = INT_MAX, maxProfit = 0.',
        'Iterate through each price in the array.',
        'If price < minPrice, update minPrice.',
        'Else if price - minPrice > maxProfit, update maxProfit.',
        'Return maxProfit.',
      ],
      timeComplexity: 'O(n) - Exactly one linear pass through prices.',
      spaceComplexity: 'O(1) - Only two integer variables maintained.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
};`,
        explanation: 'Tracks the running minimum price and updates the maximum potential profit on every step.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <limits.h>

int maxProfit(int* prices, int pricesSize) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int i = 0; i < pricesSize; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
}`,
        explanation: 'Efficient C implementation with constant O(1) stack memory.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit`,
        explanation: 'Clean Python linear scan with float inf sentinel.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
        explanation: 'Single pass solution utilizing Integer.MAX_VALUE.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'minPrice = infinity',
      'maxProfit = 0',
      'for each price in prices:',
      '    if price < minPrice: minPrice = price',
      '    else if price - minPrice > maxProfit: maxProfit = price - minPrice',
      'return maxProfit',
    ],
    visualizationType: 'two-pointers',
    supportedVisualizer: true,
    defaultInput: { array: [7, 1, 5, 3, 6, 4] },
    relatedQuestions: ['maximum-subarray', 'jump-game'],
  },

  // 3. Contains Duplicate
  {
    id: '3',
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topic: 'Arrays',
    secondaryTopics: ['Hashing', 'Sorting'],
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    inputDescription: 'Array of integers `nums`.',
    outputDescription: 'Boolean true or false.',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true', explanation: '1 appears twice.' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false', explanation: 'All elements are distinct.' },
    ],
    hints: ['A hash set allows constant time insertion and membership check.'],
    optimizedApproach: {
      title: 'Hash Set Lookup',
      description: 'Insert numbers into a hash set. If an element already exists in the set, a duplicate is found.',
      intuition: 'Sets enforce uniqueness; checking contains before add detects duplicates immediately.',
      algorithmSteps: [
        'Create an empty hash set.',
        'Iterate through nums.',
        'If current element is in set, return true.',
        'Add current element to set.',
        'If loop completes, return false.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <unordered_set>

class Solution {
public:
    bool containsDuplicate(std::vector<int>& nums) {
        std::unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`,
        explanation: 'Uses std::unordered_set for average O(1) membership check.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `#include <stdbool.h>
#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

bool containsDuplicate(int* nums, int numsSize) {
    qsort(nums, numsSize, sizeof(int), cmp);
    for (int i = 0; i < numsSize - 1; i++) {
        if (nums[i] == nums[i + 1]) return true;
    }
    return false;
}`,
        explanation: 'Sorts array using qsort and checks adjacent elements.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        return len(nums) != len(set(nums))`,
        explanation: 'Comparing length with set(nums) gives concise duplicate detection.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}`,
        explanation: 'HashSet.add() returns false if element already existed.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'seen = empty Set',
      'for num in nums:',
      '    if num in seen: return true',
      '    seen.add(num)',
      'return false',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 1] },
    relatedQuestions: ['two-sum', 'valid-anagram'],
  },

  // 4. Valid Anagram
  {
    id: '4',
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topic: 'Strings',
    secondaryTopics: ['Hashing', 'Sorting'],
    tags: ['String', 'Hash Table', 'Sorting'],
    description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    inputDescription: 'Two strings `s` and `t`.',
    outputDescription: 'Boolean true or false.',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both contain the exact same letter counts.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Characters do not match.' },
    ],
    hints: ['Check if lengths differ first.', 'Count character frequencies with an array of size 26.'],
    optimizedApproach: {
      title: 'Fixed Size Frequency Counter Array',
      description: 'Count occurrences of each character in s and subtract occurrences in t. If all counts are zero, they are anagrams.',
      intuition: 'Lowercase English alphabet has only 26 characters, allowing an O(1) space frequency array.',
      algorithmSteps: [
        'If s.length != t.length, return false.',
        'Create count array of size 26 initialized to 0.',
        'Iterate through s and t: count[s[i] - \'a\']++, count[t[i] - \'a\']--.',
        'Verify all values in count array are 0.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) - fixed 26 elements',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <string>
#include <vector>

class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        if (s.length() != t.length()) return false;
        std::vector<int> count(26, 0);
        for (int i = 0; i < s.length(); ++i) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
};`,
        explanation: 'Increments for string s and decrements for string t simultaneously.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <stdbool.h>
#include <string.h>

bool isAnagram(char* s, char* t) {
    if (strlen(s) != strlen(t)) return false;
    int count[26] = {0};
    for (int i = 0; s[i] != '\\0'; i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int i = 0; i < 26; i++) {
        if (count[i] != 0) return false;
    }
    return true;
}`,
        explanation: 'Direct array indexing for lowercase ASCII characters.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)`,
        explanation: 'Collections Counter gives clean frequency mapping.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) (26 letters)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`,
        explanation: 'Java fixed array indexed by char - a.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'if length(s) != length(t): return false',
      'counts = array of 26 zeros',
      'for i from 0 to length(s) - 1:',
      '    counts[s[i] - \'a\']++',
      '    counts[t[i] - \'a\']--',
      'for val in counts:',
      '    if val != 0: return false',
      'return true',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 2, 1] },
    relatedQuestions: ['group-anagrams', 'valid-palindrome'],
  },

  // 5. Valid Parentheses
  {
    id: '5',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stacks & Queues',
    secondaryTopics: ['Strings'],
    tags: ['Stack', 'String', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Open brackets must be closed by the same type of brackets, and in the correct order. Every close bracket has a corresponding open bracket of the same type.',
    inputDescription: 'A bracket string `s`.',
    outputDescription: 'Boolean true or false.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Valid matching pair.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All pairs properly closed in order.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' },
    ],
    hints: ['Whenever you see an opening bracket, push it to a stack.', 'When you see a closing bracket, check if it matches the top of the stack.'],
    optimizedApproach: {
      title: 'LIFO Stack Matching',
      description: 'Use a stack to remember opening brackets in last-in, first-out order. When encountering a closing bracket, check if top of stack is its corresponding opener.',
      intuition: 'The most recently opened bracket must be the first one closed.',
      algorithmSteps: [
        'Initialize an empty stack.',
        'Iterate through character c in s.',
        'If c is (, {, or [, push to stack.',
        'Otherwise, if stack is empty or top does not match c, return false.',
        'Pop the matching opener.',
        'Return true if stack is empty after the loop.',
      ],
      timeComplexity: 'O(n) - One pass over characters.',
      spaceComplexity: 'O(n) - Worst case stack holds all opening brackets.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                st.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return st.empty();
    }
};`,
        explanation: 'std::stack preserves LIFO bracket pairing.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    int len = strlen(s);
    char stack[len];
    int top = -1;
    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) return false;
            char t = stack[top--];
            if ((c == ')' && t != '(') ||
                (c == '}' && t != '{') ||
                (c == ']' && t != '[')) return false;
        }
    }
    return top == -1;
}`,
        explanation: 'Array-based stack in C with top pointer.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        return not stack`,
        explanation: 'Python list as stack with dictionary lookup for closing matches.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return false;
            }
        }
        return stack.isEmpty();
    }
}`,
        explanation: 'ArrayDeque provides fast LIFO stack implementation in Java.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'stack = empty stack',
      'for char c in s:',
      '    if c is opener: stack.push(c)',
      '    else:',
      '        if stack.isEmpty(): return false',
      '        if stack.pop() does not match c: return false',
      'return stack.isEmpty()',
    ],
    visualizationType: 'stack',
    supportedVisualizer: true,
    defaultInput: { stackOps: [{ op: 'push', val: 1 }, { op: 'push', val: 2 }, { op: 'pop' }] },
    relatedQuestions: ['min-stack', 'daily-temperatures'],
  },

  // 6. Binary Search
  {
    id: '6',
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    topic: 'Searching',
    secondaryTopics: ['Arrays'],
    tags: ['Binary Search', 'Array', 'Google', 'Apple'],
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`. You must write an algorithm with `O(log n)` runtime complexity.',
    inputDescription: 'Sorted integer array `nums` and target integer.',
    outputDescription: 'Index of target if found; else -1.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All elements in nums are unique and sorted.'],
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' },
    ],
    hints: ['Compute mid = left + (right - left) / 2 to avoid overflow.', 'Halve the search space on each step depending on whether nums[mid] is smaller or larger than target.'],
    optimizedApproach: {
      title: 'Iterative Binary Search',
      description: 'Maintain left and right boundaries. Repeatedly examine the middle element and discard the half where the target cannot possibly lie.',
      intuition: 'Because the array is sorted, comparing target with the middle element immediately rules out half the remaining candidates.',
      algorithmSteps: [
        'Set left = 0, right = nums.length - 1.',
        'While left <= right:',
        '  mid = left + (right - left) / 2.',
        '  If nums[mid] == target, return mid.',
        '  If nums[mid] < target, left = mid + 1.',
        '  Else right = mid - 1.',
        'Return -1 if not found.',
      ],
      timeComplexity: 'O(log n) - Search space divides by 2 on each iteration.',
      spaceComplexity: 'O(1) - Constant auxiliary storage.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
        explanation: 'Avoids integer overflow by using left + (right - left) / 2.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int search(int* nums, int numsSize, int target) {
    int left = 0;
    int right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        explanation: 'Classic standard C binary search.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
        explanation: 'Python binary search with integer division.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
        explanation: 'Standard Java implementation.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'left = 0, right = n - 1',
      'while left <= right:',
      '    mid = left + (right - left) / 2',
      '    if nums[mid] == target: return mid',
      '    else if nums[mid] < target: left = mid + 1',
      '    else: right = mid - 1',
      'return -1',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [-1, 0, 3, 5, 9, 12], target: 9 },
    relatedQuestions: ['search-in-rotated-sorted-array', 'find-minimum-in-rotated-sorted-array'],
  },

  // 7. Maximum Subarray
  {
    id: '7',
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topic: 'Arrays',
    secondaryTopics: ['Dynamic Programming', 'Divide and Conquer'],
    tags: ['Array', 'Dynamic Programming', 'Kadane', 'Google'],
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.',
    inputDescription: 'Array of integers `nums`.',
    outputDescription: 'Maximum sum as an integer.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'Single element subarray.' },
      { input: 'nums = [5, 4, -1, 7, 8]', output: '23', explanation: 'Subarray [5, 4, -1, 7, 8] has the largest sum 23.' },
    ],
    hints: ['If the running sum becomes negative, it hurts any future subarray. Reset it to 0.'],
    optimizedApproach: {
      title: 'Kadane\'s Algorithm (Linear DP)',
      description: 'At each position i, decide whether to extend the previous subarray or start a new subarray at nums[i]: currentSum = max(nums[i], currentSum + nums[i]). Update maxSoFar accordingly.',
      intuition: 'A negative prefix sum will only decrease the sum of any subsequent subarray, so we abandon negative sums.',
      algorithmSteps: [
        'Initialize maxSoFar = nums[0], currentSum = nums[0].',
        'Iterate from index 1 to n - 1.',
        'currentSum = max(nums[i], currentSum + nums[i]).',
        'maxSoFar = max(maxSoFar, currentSum).',
        'Return maxSoFar.',
      ],
      timeComplexity: 'O(n) - Single scan through nums.',
      spaceComplexity: 'O(1) - Only two running variables.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int maxSoFar = nums[0];
        int currentSum = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            currentSum = std::max(nums[i], currentSum + nums[i]);
            maxSoFar = std::max(maxSoFar, currentSum);
        }
        return maxSoFar;
    }
};`,
        explanation: 'Kadane algorithm using std::max.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int maxSubArray(int* nums, int numsSize) {
    int maxSoFar = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < numsSize; i++) {
        currentSum = (nums[i] > currentSum + nums[i]) ? nums[i] : (currentSum + nums[i]);
        if (currentSum > maxSoFar) maxSoFar = currentSum;
    }
    return maxSoFar;
}`,
        explanation: 'Direct ternary operator comparison in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_so_far = current_sum = nums[0]
        for x in nums[1:]:
            current_sum = max(x, current_sum + x)
            max_so_far = max(max_so_far, current_sum)
        return max_so_far`,
        explanation: 'Concise python Kadane algorithm.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentSum);
        }
        return maxSoFar;
    }
}`,
        explanation: 'Math.max tracking for running subarray sum.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'maxSoFar = nums[0]',
      'currSum = nums[0]',
      'for i from 1 to n - 1:',
      '    currSum = max(nums[i], currSum + nums[i])',
      '    maxSoFar = max(maxSoFar, currSum)',
      'return maxSoFar',
    ],
    visualizationType: 'sliding-window',
    supportedVisualizer: true,
    defaultInput: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], k: 4 },
    relatedQuestions: ['best-time-to-buy-and-sell-stock', 'jump-game'],
  },

  // 8. Reverse Linked List
  {
    id: '8',
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    secondaryTopics: ['Recursion'],
    tags: ['Linked List', 'Recursion', 'Microsoft', 'Google'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    inputDescription: 'Head pointer of a singly linked list.',
    outputDescription: 'Head pointer of the newly reversed list.',
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Every next pointer is inverted.' },
      { input: 'head = [1, 2]', output: '[2, 1]', explanation: 'Reversed 2-element list.' },
      { input: 'head = []', output: '[]', explanation: 'Empty list remains empty.' },
    ],
    hints: ['Keep track of prev, curr, and next pointers.', 'Before overwriting curr->next, save the original next pointer.'],
    optimizedApproach: {
      title: 'Three Pointer In-Place Reversal',
      description: 'Traverse the list while reversing each node\'s next pointer to point to the previously visited node.',
      intuition: 'By saving next = curr.next before modifying curr.next = prev, we don\'t lose access to the remaining unvisited nodes.',
      algorithmSteps: [
        'Initialize prev = null, curr = head.',
        'While curr != null:',
        '  nextTemp = curr.next',
        '  curr.next = prev',
        '  prev = curr',
        '  curr = nextTemp',
        'Return prev (new head).',
      ],
      timeComplexity: 'O(n) - Single pass over list nodes.',
      spaceComplexity: 'O(1) - Constant pointer variables.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
        explanation: 'Standard pointer redirection in C++ with nullptr sentinel.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr != NULL) {
        struct ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
        explanation: 'In-place pointer reversal in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: ListNode | None) -> ListNode | None:
        prev = None
        curr = head
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        return prev`,
        explanation: 'Python iterative linked list reversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
        explanation: 'Java pointer reversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'prev = null',
      'curr = head',
      'while curr is not null:',
      '    nextTemp = curr.next',
      '    curr.next = prev',
      '    prev = curr',
      '    curr = nextTemp',
      'return prev',
    ],
    visualizationType: 'linked-list',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4, 5] },
    relatedQuestions: ['middle-of-the-linked-list', 'linked-list-cycle'],
  },

  // 9. Middle of the Linked List
  {
    id: '9',
    slug: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    secondaryTopics: ['Two Pointers'],
    tags: ['Linked List', 'Two Pointers'],
    description: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
    inputDescription: 'Head node of linked list.',
    outputDescription: 'Pointer to middle node.',
    constraints: ['The number of nodes in the list is in the range [1, 100].'],
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[3, 4, 5]', explanation: 'The middle node of the list is node 3.' },
      { input: 'head = [1, 2, 3, 4, 5, 6]', output: '[4, 5, 6]', explanation: 'Since the list has two middle nodes with values 3 and 4, we return the second one.' },
    ],
    hints: ['Can you solve it in a single pass using two pointers moving at different speeds?'],
    optimizedApproach: {
      title: 'Fast and Slow Pointers (Tortoise and Hare)',
      description: 'Move slow pointer 1 step and fast pointer 2 steps. When fast reaches the end, slow will be precisely at the middle.',
      intuition: 'Because fast travels at twice the speed of slow, it covers double the distance in the exact same time.',
      algorithmSteps: [
        'Initialize slow = head, fast = head.',
        'While fast != null and fast.next != null:',
        '  slow = slow.next',
        '  fast = fast.next.next',
        'Return slow.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
};`,
        explanation: 'Fast and slow pointer approach.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `struct ListNode* middleNode(struct ListNode* head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
        explanation: 'Standard fast/slow pointers.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def middleNode(self, head: ListNode | None) -> ListNode | None:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow`,
        explanation: 'Tortoise and hare traversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
        explanation: 'Two-speed pointers.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'slow = head, fast = head',
      'while fast != null and fast.next != null:',
      '    slow = slow.next',
      '    fast = fast.next.next',
      'return slow',
    ],
    visualizationType: 'linked-list',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4, 5, 6] },
    relatedQuestions: ['reverse-linked-list', 'linked-list-cycle'],
  },

  // 10. Linked List Cycle
  {
    id: '10',
    slug: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    secondaryTopics: ['Two Pointers', 'Hashing'],
    tags: ['Linked List', 'Two Pointers', 'Floyd Cycle'],
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.',
    inputDescription: 'Head of a linked list.',
    outputDescription: 'Boolean true if cycle exists; else false.',
    constraints: ['The number of the nodes in the list is in the range [0, 10^4].'],
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1 (tail connects to node index 1)', output: 'true', explanation: 'There is a cycle in the linked list.' },
      { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle.' },
    ],
    hints: ['Floyd\'s Cycle-Finding Algorithm: if there is a cycle, the fast pointer will eventually catch up with the slow pointer.'],
    optimizedApproach: {
      title: 'Floyd\'s Tortoise and Hare Cycle Detection',
      description: 'Slow moves by 1 step, fast moves by 2 steps. If fast meets slow, a cycle exists. If fast reaches null, no cycle exists.',
      intuition: 'Inside a loop of length L, the distance between fast and slow decreases by 1 on each step, guaranteeing they will collide.',
      algorithmSteps: [
        'If head is null or head.next is null, return false.',
        'slow = head, fast = head.',
        'While fast != null and fast.next != null:',
        '  slow = slow.next',
        '  fast = fast.next.next',
        '  if slow == fast, return true.',
        'Return false.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,
        explanation: 'Pointer comparison without allocating extra memory.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `bool hasCycle(struct ListNode *head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
        explanation: 'Floyd cycle detection in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def hasCycle(self, head: ListNode | None) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False`,
        explanation: 'Python cycle detector.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
        explanation: 'Fast and slow pointer cycle check in Java.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'slow = head, fast = head',
      'while fast != null and fast.next != null:',
      '    slow = slow.next',
      '    fast = fast.next.next',
      '    if slow == fast: return true',
      'return false',
    ],
    visualizationType: 'linked-list',
    supportedVisualizer: true,
    defaultInput: { array: [3, 2, 0, -4] },
    relatedQuestions: ['reverse-linked-list', 'middle-of-the-linked-list'],
  },

  // 11. Min Stack
  {
    id: '11',
    slug: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    topic: 'Stacks & Queues',
    secondaryTopics: ['Design'],
    tags: ['Stack', 'Design', 'Bloomberg', 'Goldman Sachs'],
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).',
    inputDescription: 'Calls to MinStack methods: push, pop, top, getMin.',
    outputDescription: 'Outputs corresponding to stack operations.',
    constraints: ['Methods pop, top and getMin will always be called on non-empty stacks.', '-2^31 <= val <= 2^31 - 1'],
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
        explanation: 'Stack operations correctly maintain running minimum.',
      },
    ],
    hints: ['Maintain a secondary stack that holds the minimum value observed up to each stack height.'],
    optimizedApproach: {
      title: 'Auxiliary Minimum Tracking Stack',
      description: 'Use a second stack `minSt`. When pushing x, push min(x, minSt.top()) onto minSt. When popping, pop from both stacks. getMin() returns minSt.top() in O(1).',
      intuition: 'Each element in minSt records the minimum element of all items below it in the main stack.',
      algorithmSteps: [
        'push(val): st.push(val); minSt.push(minSt.empty() ? val : min(val, minSt.top())).',
        'pop(): st.pop(); minSt.pop().',
        'top(): return st.top().',
        'getMin(): return minSt.top().',
      ],
      timeComplexity: 'O(1) for all operations: push, pop, top, getMin.',
      spaceComplexity: 'O(n) - Auxiliary stack scales with number of elements.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <stack>
#include <algorithm>

class MinStack {
private:
    std::stack<int> st;
    std::stack<int> minSt;
public:
    MinStack() {}
    
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top()) {
            minSt.push(val);
        } else {
            minSt.push(minSt.top());
        }
    }
    
    void pop() {
        st.pop();
        minSt.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return minSt.top();
    }
};`,
        explanation: 'Dual stack design guaranteeing O(1) minimum lookups.',
        timeComplexity: 'O(1) per operation',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `#include <stdlib.h>

typedef struct {
    int* data;
    int* minData;
    int top;
    int capacity;
} MinStack;

MinStack* minStackCreate() {
    MinStack* obj = (MinStack*)malloc(sizeof(MinStack));
    obj->capacity = 10000;
    obj->data = (int*)malloc(obj->capacity * sizeof(int));
    obj->minData = (int*)malloc(obj->capacity * sizeof(int));
    obj->top = -1;
    return obj;
}

void minStackPush(MinStack* obj, int val) {
    obj->top++;
    obj->data[obj->top] = val;
    if (obj->top == 0 || val < obj->minData[obj->top - 1]) {
        obj->minData[obj->top] = val;
    } else {
        obj->minData[obj->top] = obj->minData[obj->top - 1];
    }
}

void minStackPop(MinStack* obj) {
    obj->top--;
}

int minStackTop(MinStack* obj) {
    return obj->data[obj->top];
}

int minStackGetMin(MinStack* obj) {
    return obj->minData[obj->top];
}`,
        explanation: 'Dynamic array backed dual stack structure in C.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
        explanation: 'Python parallel lists for main stack and min stack.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class MinStack {
    private Deque<Integer> stack = new ArrayDeque<>();
    private Deque<Integer> minStack = new ArrayDeque<>();

    public MinStack() {}

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
        explanation: 'Java Deque implementation for O(1) stack operations.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'push(val):',
      '    st.push(val)',
      '    minSt.push(min(val, minSt.top()))',
      'pop(): st.pop(), minSt.pop()',
      'getMin(): return minSt.top()',
    ],
    visualizationType: 'stack',
    supportedVisualizer: true,
    defaultInput: { stackOps: [{ op: 'push', val: -2 }, { op: 'push', val: 0 }, { op: 'push', val: -3 }, { op: 'pop' }] },
    relatedQuestions: ['valid-parentheses', 'daily-temperatures'],
  },

  // 12. Maximum Depth of Binary Tree
  {
    id: '12',
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees & BST',
    secondaryTopics: ['Recursion', 'Breadth-First Search'],
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: 'Given the `root` of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    inputDescription: 'Root pointer of binary tree.',
    outputDescription: 'Integer maximum depth.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '3', explanation: 'Path 3 -> 20 -> 15 or 3 -> 20 -> 7 has length 3.' },
      { input: 'root = [1, null, 2]', output: '2', explanation: 'Path 1 -> 2 has length 2.' },
    ],
    hints: ['What is the base case when root is null?', 'The depth of a tree is 1 + max(depth(left), depth(right)).'],
    optimizedApproach: {
      title: 'Post-Order Recursive Depth Calculation (DFS)',
      description: 'Recursively compute the depth of left and right subtrees and take their maximum plus one.',
      intuition: 'Each subtree solves the same subproblem independently on its children.',
      algorithmSteps: [
        'If root is null, return 0.',
        'leftDepth = maxDepth(root.left).',
        'rightDepth = maxDepth(root.right).',
        'Return 1 + max(leftDepth, rightDepth).',
      ],
      timeComplexity: 'O(n) - Visits every node once.',
      spaceComplexity: 'O(h) - Call stack equal to tree height (O(log n) balanced, O(n) skewed).',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
        explanation: 'Clean one-line recursive post-order tree traversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      c: {
        language: 'c',
        code: `struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return 1 + (left > right ? left : right);
}`,
        explanation: 'Direct C recursion.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def maxDepth(self, root: TreeNode | None) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
        explanation: 'Idiomatic recursive depth computation in Python.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
        explanation: 'Standard Java recursion.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
    },
    pseudocode: [
      'function maxDepth(root):',
      '    if root is null: return 0',
      '    return 1 + max(maxDepth(root.left), maxDepth(root.right))',
    ],
    visualizationType: 'binary-tree',
    supportedVisualizer: true,
    defaultInput: { array: [3, 9, 20, 15, 7] },
    relatedQuestions: ['invert-binary-tree', 'binary-tree-level-order-traversal'],
  },

  // 13. Invert Binary Tree
  {
    id: '13',
    slug: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees & BST',
    secondaryTopics: ['Recursion'],
    tags: ['Tree', 'DFS', 'BFS', 'Google'],
    description: 'Given the `root` of a binary tree, invert the tree (swap left and right child nodes recursively), and return its root.',
    inputDescription: 'Root pointer of a binary tree.',
    outputDescription: 'Root pointer of inverted tree.',
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    examples: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', output: '[4, 7, 2, 9, 6, 3, 1]', explanation: 'Left and right subtrees mirror-swapped at every level.' },
      { input: 'root = [2, 1, 3]', output: '[2, 3, 1]', explanation: 'Children 1 and 3 swapped.' },
    ],
    hints: ['Swap the left and right pointers of root, then recursively invert root.left and root.right.'],
    optimizedApproach: {
      title: 'Recursive Child Pointer Inversion',
      description: 'At each node, swap left and right pointers, then recurse on both subtrees.',
      intuition: 'A mirrored binary tree has every node\'s left and right children transposed.',
      algorithmSteps: [
        'If root is null, return null.',
        'Swap root.left and root.right.',
        'invertTree(root.left).',
        'invertTree(root.right).',
        'Return root.',
      ],
      timeComplexity: 'O(n) - Touches each node once.',
      spaceComplexity: 'O(h) - Stack frames equal to tree height.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        std::swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,
        explanation: 'Uses std::swap on tree child pointers.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      c: {
        language: 'c',
        code: `struct TreeNode* invertTree(struct TreeNode* root) {
    if (!root) return NULL;
    struct TreeNode* temp = root->left;
    root->left = root->right;
    root->right = temp;
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`,
        explanation: 'C pointer swap.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def invertTree(self, root: TreeNode | None) -> TreeNode | None:
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root`,
        explanation: 'Python tuple assignment pointer swap.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,
        explanation: 'Java pointer reversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
    },
    pseudocode: [
      'function invertTree(root):',
      '    if root is null: return null',
      '    swap(root.left, root.right)',
      '    invertTree(root.left)',
      '    invertTree(root.right)',
      '    return root',
    ],
    visualizationType: 'binary-tree',
    supportedVisualizer: true,
    defaultInput: { array: [4, 2, 7, 1, 3, 6, 9] },
    relatedQuestions: ['maximum-depth-of-binary-tree', 'validate-binary-search-tree'],
  },

  // 14. Climbing Stairs
  {
    id: '14',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    secondaryTopics: ['Recursion', 'Math'],
    tags: ['Dynamic Programming', 'Math', 'Memoization'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    inputDescription: 'Positive integer `n`.',
    outputDescription: 'Number of distinct ways as an integer.',
    constraints: ['1 <= n <= 45'],
    examples: [
      { input: 'n = 2', output: '2', explanation: '1 step + 1 step, or 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1 steps.' },
    ],
    hints: ['To reach step n, you must come from step n-1 or step n-2.', 'ways(n) = ways(n-1) + ways(n-2). This is identical to the Fibonacci sequence.'],
    optimizedApproach: {
      title: 'Space-Optimized Bottom-Up Tabulation',
      description: 'Observe ways(i) = ways(i-1) + ways(i-2). Instead of storing the whole array, keep only the previous two values in two variables.',
      intuition: 'Only the immediate previous two states are needed to compute the current step.',
      algorithmSteps: [
        'If n <= 2, return n.',
        'prev2 = 1, prev1 = 2.',
        'For i from 3 to n:',
        '  curr = prev1 + prev2',
        '  prev2 = prev1',
        '  prev1 = curr',
        'Return prev1.',
      ],
      timeComplexity: 'O(n) - Single loop from 3 to n.',
      spaceComplexity: 'O(1) - Constant auxiliary memory.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; ++i) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`,
        explanation: 'Space-optimized Fibonacci recurrence.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
        explanation: 'O(1) space C implementation.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
        explanation: 'Python iterative state update.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
        explanation: 'Iterative Fibonacci-style state transition.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'if n <= 2: return n',
      'a = 1, b = 2',
      'for i from 3 to n:',
      '    temp = a + b',
      '    a = b',
      '    b = temp',
      'return b',
    ],
    visualizationType: 'dp-table',
    supportedVisualizer: true,
    defaultInput: { n: 6 },
    relatedQuestions: ['fibonacci-number', 'coin-change', 'house-robber'],
  },

  // 15. Fibonacci Number
  {
    id: '15',
    slug: 'fibonacci-number',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    secondaryTopics: ['Recursion', 'Math'],
    tags: ['Dynamic Programming', 'Math', 'Recursion'],
    description: 'The Fibonacci numbers, commonly denoted `F(n)` form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from `0` and `1`. Given `n`, calculate `F(n)`.',
    inputDescription: 'Non-negative integer `n`.',
    outputDescription: 'F(n) as integer.',
    constraints: ['0 <= n <= 30'],
    examples: [
      { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.' },
      { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
    ],
    hints: ['F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2).'],
    optimizedApproach: {
      title: 'Bottom-Up Tabulation / Constant Space',
      description: 'Iteratively calculate Fibonacci terms using two running variables.',
      intuition: 'Avoid exponential duplicate recursive calls by storing only the previous two terms.',
      algorithmSteps: [
        'If n <= 1, return n.',
        'a = 0, b = 1.',
        'Loop i from 2 to n: c = a + b; a = b; b = c.',
        'Return b.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; ++i) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
        explanation: 'Linear time Fibonacci.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
        explanation: 'C implementation.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`,
        explanation: 'Iterative Fibonacci in Python.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
        explanation: 'Java loop Fibonacci.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'if n <= 1: return n',
      'a = 0, b = 1',
      'for i from 2 to n:',
      '    c = a + b; a = b; b = c',
      'return b',
    ],
    visualizationType: 'dp-table',
    supportedVisualizer: true,
    defaultInput: { n: 6 },
    relatedQuestions: ['climbing-stairs', 'coin-change'],
  },

  // 16. Two Sum II - Input Array Is Sorted
  {
    id: '16',
    slug: 'two-sum-ii-input-array-is-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    secondaryTopics: ['Arrays', 'Binary Search'],
    tags: ['Two Pointers', 'Array', 'Binary Search'],
    description: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.',
    inputDescription: '1-indexed sorted array `numbers` and target sum.',
    outputDescription: '1-indexed pair `[index1, index2]`.',
    constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'Exactly one solution exists.'],
    examples: [
      { input: 'numbers = [2, 7, 11, 15], target = 9', output: '[1, 2]', explanation: '2 + 7 = 9. 1-indexed result is [1, 2].' },
      { input: 'numbers = [2, 3, 4], target = 6', output: '[1, 3]', explanation: '2 + 4 = 6. Result is [1, 3].' },
    ],
    hints: ['Place one pointer at start and one pointer at end.', 'If sum is too small, advance left pointer. If sum is too large, decrement right pointer.'],
    optimizedApproach: {
      title: 'Opposite-End Two Pointers',
      description: 'Start left = 0, right = n - 1. If sum == target, found. If sum < target, left++. If sum > target, right--.',
      intuition: 'Sorted property ensures incrementing left increases sum, and decrementing right decreases sum.',
      algorithmSteps: [
        'left = 0, right = numbers.length - 1.',
        'While left < right:',
        '  sum = numbers[left] + numbers[right]',
        '  if sum == target: return [left + 1, right + 1]',
        '  else if sum < target: left++',
        '  else: right--',
      ],
      timeComplexity: 'O(n) - At most n pointer moves.',
      spaceComplexity: 'O(1) - Constant auxiliary space.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
        explanation: 'Two-pointer convergence on sorted input.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <stdlib.h>

int* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    int left = 0, right = numbersSize - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            res[0] = left + 1;
            res[1] = right + 1;
            return res;
        }
        if (sum < target) left++;
        else right--;
    }
    return res;
}`,
        explanation: 'C two-pointer search with 1-based indexing output.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            current_sum = numbers[left] + numbers[right]
            if current_sum == target:
                return [left + 1, right + 1]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
        return []`,
        explanation: 'Python two-pointer approach.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[0];
    }
}`,
        explanation: 'Java two-pointer scan.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'left = 0, right = n - 1',
      'while left < right:',
      '    s = numbers[left] + numbers[right]',
      '    if s == target: return [left + 1, right + 1]',
      '    else if s < target: left++',
      '    else: right--',
    ],
    visualizationType: 'two-pointers',
    supportedVisualizer: true,
    defaultInput: { array: [2, 7, 11, 15], target: 9 },
    relatedQuestions: ['two-sum', '3sum', 'container-with-most-water'],
  },

  // 17. Container With Most Water
  {
    id: '17',
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    secondaryTopics: ['Greedy', 'Arrays'],
    tags: ['Two Pointers', 'Array', 'Greedy'],
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    inputDescription: 'Array of line heights.',
    outputDescription: 'Maximum area of water.',
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    examples: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49', explanation: 'Max area is between index 1 (height 8) and index 8 (height 7), width = 7, min height = 7, area = 49.' },
    ],
    hints: ['Area is determined by width * min(height[left], height[right]).', 'To find a larger area with smaller width, we must move the pointer with the smaller height.'],
    optimizedApproach: {
      title: 'Two Pointers Shrinking Search Space',
      description: 'Start with the widest container (left = 0, right = n - 1). Calculate area. Always advance the pointer pointing to the shorter vertical bar.',
      intuition: 'Moving the taller line cannot increase the area because height is bounded by the shorter line, while width strictly decreases. Only moving the shorter line offers a chance at a larger area.',
      algorithmSteps: [
        'left = 0, right = n - 1, maxArea = 0.',
        'While left < right:',
        '  h = min(height[left], height[right])',
        '  maxArea = max(maxArea, h * (right - left))',
        '  if height[left] < height[right]: left++',
        '  else: right--',
        'Return maxArea.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxArea(std::vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxWater = 0;
        while (left < right) {
            int h = std::min(height[left], height[right]);
            maxWater = std::max(maxWater, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
};`,
        explanation: 'Two pointers greedy area maximization.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int maxWater = 0;
    while (left < right) {
        int h = (height[left] < height[right]) ? height[left] : height[right];
        int area = h * (right - left);
        if (area > maxWater) maxWater = area;
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
        explanation: 'C implementation with inline min and max.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        max_area = 0
        while left < right:
            h = min(height[left], height[right])
            max_area = max(max_area, h * (right - left))
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_area`,
        explanation: 'Python two pointer scan.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxArea;
    }
}`,
        explanation: 'Standard Java implementation.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'left = 0, right = n - 1, maxArea = 0',
      'while left < right:',
      '    h = min(height[left], height[right])',
      '    maxArea = max(maxArea, h * (right - left))',
      '    if height[left] < height[right]: left++',
      '    else: right--',
      'return maxArea',
    ],
    visualizationType: 'two-pointers',
    supportedVisualizer: true,
    defaultInput: { array: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    relatedQuestions: ['two-sum-ii-input-array-is-sorted', '3sum'],
  },

  // 18. Longest Substring Without Repeating Characters
  {
    id: '18',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    secondaryTopics: ['Strings', 'Hashing'],
    tags: ['Sliding Window', 'Hash Table', 'String', 'Meta', 'Amazon'],
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    inputDescription: 'String `s`.',
    outputDescription: 'Integer length of longest valid substring.',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' },
    ],
    hints: ['Use a sliding window with left and right endpoints.', 'When character s[right] has been seen inside the window, slide left pointer past its previous occurrence.'],
    optimizedApproach: {
      title: 'Sliding Window with Last-Seen Index Map',
      description: 'Store the last seen index of each character. As right expands, if s[right] was seen at or after left, jump left to lastSeen[s[right]] + 1.',
      intuition: 'Jumping left directly avoids incrementally stepping left character by character.',
      algorithmSteps: [
        'Initialize lastSeen map / array of size 128 to -1.',
        'left = 0, maxLen = 0.',
        'For right from 0 to s.length - 1:',
        '  char c = s[right]',
        '  if lastSeen[c] >= left: left = lastSeen[c] + 1',
        '  lastSeen[c] = right',
        '  maxLen = max(maxLen, right - left + 1)',
        'Return maxLen.',
      ],
      timeComplexity: 'O(n) - Exactly n steps with O(1) jump updates.',
      spaceComplexity: 'O(min(m, n)) - Space for character set.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::vector<int> lastIndex(128, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); ++right) {
            char c = s[right];
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
        explanation: 'Fast direct 128-element ASCII table indexing.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int lastIndex[128];
    for (int i = 0; i < 128; i++) lastIndex[i] = -1;
    int left = 0, maxLen = 0;
    int len = strlen(s);
    for (int right = 0; right < len; right++) {
        unsigned char c = s[right];
        if (lastIndex[c] >= left) {
            left = lastIndex[c] + 1;
        }
        lastIndex[c] = right;
        int curLen = right - left + 1;
        if (curLen > maxLen) maxLen = curLen;
    }
    return maxLen;
}`,
        explanation: 'ASCII lookup array in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in last_seen and last_seen[char] >= left:
                left = last_seen[char] + 1
            last_seen[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
        explanation: 'Dictionary storing last observed character indices.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(m, n))',
      },
      java: {
        language: 'java',
        code: `import java.util.Arrays;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastIndex = new int[128];
        Arrays.fill(lastIndex, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        explanation: 'Java fixed array sliding window.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'lastIndex = map from char to last index',
      'left = 0, maxLen = 0',
      'for right from 0 to n - 1:',
      '    c = s[right]',
      '    if c in lastIndex and lastIndex[c] >= left:',
      '        left = lastIndex[c] + 1',
      '    lastIndex[c] = right',
      '    maxLen = max(maxLen, right - left + 1)',
      'return maxLen',
    ],
    visualizationType: 'sliding-window',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 1, 2, 4, 1], k: 3 },
    relatedQuestions: ['minimum-size-subarray-sum', 'valid-anagram'],
  },

  // 19. Merge Sorted Array
  {
    id: '19',
    slug: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    topic: 'Sorting',
    secondaryTopics: ['Arrays', 'Two Pointers'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively. Merge `nums1` and `nums2` into a single array sorted in non-decreasing order inside `nums1` in-place.',
    inputDescription: '`nums1` with m valid elements and size m + n, `nums2` with n elements.',
    outputDescription: 'nums1 modified in-place.',
    constraints: ['nums1.length == m + n', '0 <= m, n <= 200', '1 <= m + n <= 200'],
    examples: [
      { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]', explanation: 'Merged in sorted order.' },
    ],
    hints: ['Fill nums1 from the back to avoid overwriting elements that have not yet been placed!'],
    optimizedApproach: {
      title: 'Three Pointers from Back to Front',
      description: 'Place pointer p1 at m - 1, p2 at n - 1, and write pointer p at m + n - 1. Write the larger of nums1[p1] and nums2[p2] to nums1[p] and decrement.',
      intuition: 'The back of nums1 is unused buffer space, so writing largest elements backwards guarantees no overwrite conflicts.',
      algorithmSteps: [
        'p1 = m - 1, p2 = n - 1, p = m + n - 1.',
        'While p2 >= 0:',
        '  if p1 >= 0 and nums1[p1] > nums2[p2]: nums1[p--] = nums1[p1--]',
        '  else: nums1[p--] = nums2[p2--]',
      ],
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1) in-place',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
public:
    void merge(std::vector<int>& nums1, int m, std::vector<int>& nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p--] = nums1[p1--];
            } else {
                nums1[p--] = nums2[p2--];
            }
        }
    }
};`,
        explanation: 'Backward merge avoiding memory reallocation.',
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p--] = nums1[p1--];
        } else {
            nums1[p--] = nums2[p2--];
        }
    }
}`,
        explanation: 'Three pointers backwards in C.',
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:
        p1, p2, p = m - 1, n - 1, m + n - 1
        while p2 >= 0:
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1`,
        explanation: 'Python backwards pointer assignment.',
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p--] = nums1[p1--];
            } else {
                nums1[p--] = nums2[p2--];
            }
        }
    }
}`,
        explanation: 'Backward three-pointer merge in Java.',
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'p1 = m - 1, p2 = n - 1, p = m + n - 1',
      'while p2 >= 0:',
      '    if p1 >= 0 and nums1[p1] > nums2[p2]:',
      '        nums1[p--] = nums1[p1--]',
      '    else:',
      '        nums1[p--] = nums2[p2--]',
    ],
    visualizationType: 'array-sort',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 2, 5, 6] },
    relatedQuestions: ['merge-two-sorted-lists', 'two-sum-ii-input-array-is-sorted'],
  },

  // 20. Coin Change
  {
    id: '20',
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    secondaryTopics: ['Breadth-First Search'],
    tags: ['Dynamic Programming', 'BFS', 'Amazon', 'Apple'],
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.',
    inputDescription: 'Array of integer coin denominations and integer amount.',
    outputDescription: 'Minimum coins needed, or -1 if impossible.',
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1 (3 coins total).' },
      { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Impossible to make 3 with only 2-cent coins.' },
    ],
    hints: ['dp[i] represents minimum coins to make amount i.', 'dp[i] = min(dp[i - c] + 1) for each coin c <= i.'],
    optimizedApproach: {
      title: 'Bottom-Up DP Tabulation',
      description: 'Initialize array dp of size amount + 1 filled with infinity, and dp[0] = 0. For each value from 1 to amount, try every coin and take the minimum.',
      intuition: 'Building smallest amounts first lets larger amounts reuse already optimal subproblem solutions.',
      algorithmSteps: [
        'dp = array of size amount + 1 filled with amount + 1.',
        'dp[0] = 0.',
        'For i from 1 to amount:',
        '  for each coin in coins:',
        '    if i - coin >= 0:',
        '      dp[i] = min(dp[i], dp[i - coin] + 1)',
        'Return dp[amount] > amount ? -1 : dp[amount].',
      ],
      timeComplexity: 'O(amount * len(coins))',
      spaceComplexity: 'O(amount)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int coinChange(std::vector<int>& coins, int amount) {
        std::vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; ++i) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = std::min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
        explanation: 'Bottom-up DP table tracking minimum coins up to target amount.',
        timeComplexity: 'O(amount * coins.length)',
        spaceComplexity: 'O(amount)',
      },
      c: {
        language: 'c',
        code: `#include <stdlib.h>

int coinChange(int* coins, int coinsSize, int amount) {
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = amount + 1;
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (i - coins[j] >= 0) {
                int cand = dp[i - coins[j]] + 1;
                if (cand < dp[i]) dp[i] = cand;
            }
        }
    }
    int res = dp[amount] > amount ? -1 : dp[amount];
    free(dp);
    return res;
}`,
        explanation: 'Dynamic programming in C with manual malloc/free.',
        timeComplexity: 'O(amount * coinsSize)',
        spaceComplexity: 'O(amount)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`,
        explanation: 'Python tabulation using float(inf).',
        timeComplexity: 'O(amount * len(coins))',
        spaceComplexity: 'O(amount)',
      },
      java: {
        language: 'java',
        code: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        explanation: 'Java DP tabulation.',
        timeComplexity: 'O(amount * coins.length)',
        spaceComplexity: 'O(amount)',
      },
    },
    pseudocode: [
      'dp = array of size amount + 1 filled with infinity',
      'dp[0] = 0',
      'for i from 1 to amount:',
      '    for coin in coins:',
      '        if i - coin >= 0: dp[i] = min(dp[i], dp[i - coin] + 1)',
      'return dp[amount] == inf ? -1 : dp[amount]',
    ],
    visualizationType: 'dp-table',
    supportedVisualizer: true,
    defaultInput: { n: 6 },
    relatedQuestions: ['climbing-stairs', 'house-robber'],
  },

  // 21. Number of Islands
  {
    id: '21',
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    secondaryTopics: ['Breadth-First Search', 'Matrix'],
    tags: ['Graph', 'DFS', 'BFS', 'Matrix', 'Amazon', 'Google'],
    description: 'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    inputDescription: '`m x n` char grid.',
    outputDescription: 'Count of connected islands as integer.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\'.'],
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1',
        explanation: 'All lands are connected into one single island.',
      },
    ],
    hints: ['When you find a \'1\', increment island count and use DFS or BFS to sink the entire island to \'0\'.'],
    optimizedApproach: {
      title: 'DFS Connected Component Traversal (Grid Sinking)',
      description: 'Iterate across the grid. When encountering land \'1\', increment island count and trigger DFS in 4 directions, mutating visited cells to \'0\' to prevent recounting.',
      intuition: 'In-place sinking avoids maintaining a separate visited boolean matrix.',
      algorithmSteps: [
        'islands = 0.',
        'Iterate through row r and column c.',
        'If grid[r][c] == \'1\': islands++; dfs(grid, r, c).',
        'In dfs(r, c): if out of bounds or grid[r][c] != \'1\', return. Mark grid[r][c] = \'0\'. Recurse on up, down, left, right.',
        'Return islands.',
      ],
      timeComplexity: 'O(m * n) - Every cell is visited at most constant times.',
      spaceComplexity: 'O(m * n) - Worst-case call stack for entirely filled grid.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
private:
    void dfs(std::vector<std::vector<char>>& grid, int r, int c) {
        int m = grid.size(), n = grid[0].size();
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
public:
    int numIslands(std::vector<std::vector<char>>& grid) {
        if (grid.empty()) return 0;
        int count = 0;
        for (int r = 0; r < grid.size(); ++r) {
            for (int c = 0; c < grid[0].size(); ++c) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
};`,
        explanation: 'DFS grid traversal sinking visited land.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
      c: {
        language: 'c',
        code: `void dfs(char** grid, int m, int n, int r, int c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, m, n, r + 1, c);
    dfs(grid, m, n, r - 1, c);
    dfs(grid, m, n, r, c + 1);
    dfs(grid, m, n, r, c - 1);
}

int numIslands(char** grid, int gridSize, int* gridColSize) {
    int m = gridSize;
    int n = gridColSize[0];
    int count = 0;
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, m, n, r, c);
            }
        }
    }
    return count;
}`,
        explanation: 'C 2D array pointer navigation.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0

        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
        explanation: 'Python recursive island sinking.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    private void dfs(char[][] grid, int r, int c) {
        int m = grid.length, n = grid[0].length;
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
}`,
        explanation: 'Java DFS connected components on matrix.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
    },
    pseudocode: [
      'count = 0',
      'for each cell (r, c):',
      '    if grid[r][c] == "1":',
      '        count++',
      '        dfs(r, c)',
      'return count',
    ],
    visualizationType: 'graph',
    supportedVisualizer: true,
    defaultInput: { array: [1, 1, 0, 1, 0] },
    relatedQuestions: ['flood-fill', 'course-schedule'],
  },

  // 22. Flood Fill
  {
    id: '22',
    slug: 'flood-fill',
    title: 'Flood Fill',
    difficulty: 'Easy',
    topic: 'Graphs',
    secondaryTopics: ['Matrix', 'Breadth-First Search'],
    tags: ['Graph', 'DFS', 'BFS', 'Matrix'],
    description: 'An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image. You are also given three integers `sr`, `sc`, and `color`. You should perform a flood fill on the image starting from the pixel `image[sr][sc]`. Replace all pixels connected 4-directionally with the same initial color by `color`.',
    inputDescription: '`image` 2D matrix, starting row `sr`, starting col `sc`, new `color`.',
    outputDescription: 'Modified image.',
    constraints: ['1 <= m, n <= 50', '0 <= image[i][j], color < 2^16'],
    examples: [
      {
        input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2',
        output: '[[2,2,2],[2,2,0],[2,0,1]]',
        explanation: 'All connected pixels sharing starting value 1 changed to 2.',
      },
    ],
    hints: ['If starting pixel already equals new color, return image immediately to avoid infinite loop.'],
    optimizedApproach: {
      title: 'Depth-First Flood Recursion',
      description: 'Check starting pixel color. If already target color, return. Otherwise, recursively recolor 4-directionally matching neighbors.',
      intuition: 'Standard paint bucket tool algorithm.',
      algorithmSteps: [
        'originalColor = image[sr][sc].',
        'if originalColor == color, return image.',
        'dfs(r, c): recolor pixel and visit up, down, left, right.',
      ],
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
private:
    void dfs(std::vector<std::vector<int>>& image, int r, int c, int oldColor, int newColor) {
        if (r < 0 || r >= image.size() || c < 0 || c >= image[0].size()) return;
        if (image[r][c] != oldColor) return;
        image[r][c] = newColor;
        dfs(image, r + 1, c, oldColor, newColor);
        dfs(image, r - 1, c, oldColor, newColor);
        dfs(image, r, c + 1, oldColor, newColor);
        dfs(image, r, c - 1, oldColor, newColor);
    }
public:
    std::vector<std::vector<int>> floodFill(std::vector<std::vector<int>>& image, int sr, int sc, int color) {
        int oldColor = image[sr][sc];
        if (oldColor != color) {
            dfs(image, sr, sc, oldColor, color);
        }
        return image;
    }
};`,
        explanation: 'Four-way flood fill in C++.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
      c: {
        language: 'c',
        code: `void dfs(int** image, int m, int n, int r, int c, int oldColor, int newColor) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (image[r][c] != oldColor) return;
    image[r][c] = newColor;
    dfs(image, m, n, r + 1, c, oldColor, newColor);
    dfs(image, m, n, r - 1, c, oldColor, newColor);
    dfs(image, m, n, r, c + 1, oldColor, newColor);
    dfs(image, m, n, r, c - 1, oldColor, newColor);
}

int** floodFill(int** image, int imageSize, int* imageColSize, int sr, int sc, int color, int* returnSize, int** returnColumnSizes) {
    int oldColor = image[sr][sc];
    if (oldColor != color) {
        dfs(image, imageSize, imageColSize[0], sr, sc, oldColor, color);
    }
    *returnSize = imageSize;
    *returnColumnSizes = imageColSize;
    return image;
}`,
        explanation: 'C 2D pointer recursion.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
        old_color = image[sr][sc]
        if old_color == color:
            return image
        m, n = len(image), len(image[0])

        def dfs(r, c):
            if 0 <= r < m and 0 <= c < n and image[r][c] == old_color:
                image[r][c] = color
                dfs(r + 1, c)
                dfs(r - 1, c)
                dfs(r, c + 1)
                dfs(r, c - 1)

        dfs(sr, sc)
        return image`,
        explanation: 'Python flood fill.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    private void dfs(int[][] image, int r, int c, int oldColor, int newColor) {
        if (r < 0 || r >= image.length || c < 0 || c >= image[0].length) return;
        if (image[r][c] != oldColor) return;
        image[r][c] = newColor;
        dfs(image, r + 1, c, oldColor, newColor);
        dfs(image, r - 1, c, oldColor, newColor);
        dfs(image, r, c + 1, oldColor, newColor);
        dfs(image, r, c - 1, oldColor, newColor);
    }

    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int oldColor = image[sr][sc];
        if (oldColor != color) {
            dfs(image, sr, sc, oldColor, color);
        }
        return image;
    }
}`,
        explanation: 'Java matrix recursion.',
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
      },
    },
    pseudocode: [
      'oldColor = image[sr][sc]',
      'if oldColor != newColor: dfs(sr, sc)',
      'return image',
    ],
    visualizationType: 'graph',
    supportedVisualizer: true,
    defaultInput: { array: [1, 1, 1, 1, 0] },
    relatedQuestions: ['number-of-islands'],
  },

  // 23. Validate Binary Search Tree
  {
    id: '23',
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    topic: 'Trees & BST',
    secondaryTopics: ['Recursion'],
    tags: ['Tree', 'DFS', 'BST', 'Binary Tree'],
    description: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: the left subtree of a node contains only nodes with keys less than the node\'s key; the right subtree of a node contains only nodes with keys greater than the node\'s key; and both left and right subtrees must also be binary search trees.',
    inputDescription: 'Root pointer of binary tree.',
    outputDescription: 'Boolean true if valid BST; else false.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    examples: [
      { input: 'root = [2, 1, 3]', output: 'true', explanation: 'Valid BST.' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false', explanation: 'Root value 5 is larger than right child 4.' },
    ],
    hints: ['A node must be strictly greater than ALL nodes in its left subtree, not just its direct child! Pass lower and upper bound limits during recursion.'],
    optimizedApproach: {
      title: 'Range Boundary Propagation (Min/Max Bounds)',
      description: 'Recursively pass valid range (minVal, maxVal). For left child, update upper bound to current value. For right child, update lower bound to current value.',
      intuition: 'Each step down the tree tightens the allowed value range for all descendants.',
      algorithmSteps: [
        'validate(node, minBound, maxBound):',
        'if node is null, return true.',
        'if node.val <= minBound or node.val >= maxBound, return false.',
        'return validate(node.left, minBound, node.val) and validate(node.right, node.val, maxBound).',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <climits>

class Solution {
private:
    bool validate(TreeNode* node, long minBound, long maxBound) {
        if (!node) return true;
        if (node->val <= minBound || node->val >= maxBound) return false;
        return validate(node->left, minBound, node->val) &&
               validate(node->right, node->val, maxBound);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
};`,
        explanation: 'Uses 64-bit integer limits to safely handle 32-bit INT_MIN and INT_MAX node values.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      c: {
        language: 'c',
        code: `#include <stdbool.h>
#include <limits.h>

bool validate(struct TreeNode* node, long minBound, long maxBound) {
    if (!node) return true;
    if (node->val <= minBound || node->val >= maxBound) return false;
    return validate(node->left, minBound, node->val) &&
           validate(node->right, node->val, maxBound);
}

bool isValidBST(struct TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`,
        explanation: 'C implementation with long bounds.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def isValidBST(self, root: TreeNode | None) -> bool:
        def validate(node, low, high):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        return validate(root, float('-inf'), float('inf'))`,
        explanation: 'Python bounds verification.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    private boolean validate(TreeNode node, Long minBound, Long maxBound) {
        if (node == null) return true;
        if (minBound != null && node.val <= minBound) return false;
        if (maxBound != null && node.val >= maxBound) return false;
        return validate(node.left, minBound, (long)node.val) &&
               validate(node.right, (long)node.val, maxBound);
    }

    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
}`,
        explanation: 'Java with null Long boundaries.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
    },
    pseudocode: [
      'function validate(node, min, max):',
      '    if node is null: return true',
      '    if node.val <= min or node.val >= max: return false',
      '    return validate(node.left, min, node.val) and validate(node.right, node.val, max)',
    ],
    visualizationType: 'binary-tree',
    supportedVisualizer: true,
    defaultInput: { array: [2, 1, 3] },
    relatedQuestions: ['invert-binary-tree', 'lowest-common-ancestor'],
  },

  // 24. Product of Array Except Self
  {
    id: '24',
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topic: 'Arrays',
    secondaryTopics: ['Prefix Sums'],
    tags: ['Array', 'Prefix Sum', 'Amazon', 'Microsoft'],
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in `O(n)` time and without using the division operation.',
    inputDescription: 'Array of integers `nums`.',
    outputDescription: 'Array of products.',
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]', explanation: 'Each entry is the product of all elements except itself.' },
    ],
    hints: ['answer[i] = (prefix product of elements before i) * (suffix product of elements after i).'],
    optimizedApproach: {
      title: 'Prefix and Suffix Running Product in O(1) Extra Space',
      description: 'Fill output array with running prefix products from left to right. Then traverse backwards with a running suffix accumulator.',
      intuition: 'Multiplying prefix(i-1) and suffix(i+1) gives product of all items except nums[i].',
      algorithmSteps: [
        'res[0] = 1. For i from 1 to n - 1: res[i] = res[i - 1] * nums[i - 1].',
        'suffix = 1.',
        'For i from n - 1 down to 0: res[i] *= suffix; suffix *= nums[i].',
        'Return res.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) auxiliary',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        int n = nums.size();
        std::vector<int> res(n, 1);
        for (int i = 1; i < n; ++i) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; --i) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
};`,
        explanation: 'Two-pass prefix-suffix product calculation in C++.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <stdlib.h>

int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* res = (int*)malloc(numsSize * sizeof(int));
    res[0] = 1;
    for (int i = 1; i < numsSize; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    int suffix = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}`,
        explanation: 'C implementation with allocated return array.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        res = [1] * n
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
        suffix = 1
        for i in range(n - 1, -1, -1):
            res[i] *= suffix
            suffix *= nums[i]
        return res`,
        explanation: 'Python prefix/suffix product.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
}`,
        explanation: 'Java prefix-suffix traversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'res[0] = 1',
      'for i from 1 to n - 1: res[i] = res[i - 1] * nums[i - 1]',
      'suffix = 1',
      'for i from n - 1 down to 0: res[i] *= suffix; suffix *= nums[i]',
      'return res',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4] },
    relatedQuestions: ['maximum-subarray', 'two-sum'],
  },

  // 25. Rotate Array
  {
    id: '25',
    slug: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    topic: 'Arrays',
    secondaryTopics: ['Math', 'Two Pointers'],
    tags: ['Array', 'Math', 'Two Pointers'],
    description: 'Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.',
    inputDescription: 'Array `nums` and integer `k`.',
    outputDescription: 'nums rotated in-place.',
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '0 <= k <= 10^5'],
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explanation: 'Rotated 3 steps to the right.' },
    ],
    hints: ['Rotating an array of length n by k steps is equivalent to 3 reversals! Reverse the entire array, reverse first k, reverse remaining n-k.'],
    optimizedApproach: {
      title: 'Triple Reverse In-Place Inversion',
      description: 'Normalize k = k % n. Reverse entire array 0..n-1, reverse first k elements 0..k-1, reverse last n-k elements k..n-1.',
      intuition: 'Reversing shifts elements to the opposite end; subsequent subarray reversals restore their internal original order.',
      algorithmSteps: [
        'k = k % nums.length.',
        'reverse(nums, 0, n - 1).',
        'reverse(nums, 0, k - 1).',
        'reverse(nums, k, n - 1).',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    void rotate(std::vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        std::reverse(nums.begin(), nums.end());
        std::reverse(nums.begin(), nums.begin() + k);
        std::reverse(nums.begin() + k, nums.end());
    }
};`,
        explanation: 'Uses std::reverse with iterator ranges.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `void rev(int* nums, int l, int r) {
    while (l < r) {
        int t = nums[l];
        nums[l++] = nums[r];
        nums[r--] = t;
    }
}

void rotate(int* nums, int numsSize, int k) {
    k %= numsSize;
    rev(nums, 0, numsSize - 1);
    rev(nums, 0, k - 1);
    rev(nums, k, numsSize - 1);
}`,
        explanation: 'Three helper reversals in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def rotate(self, nums: list[int], k: int) -> None:
        n = len(nums)
        k %= n
        nums.reverse()
        nums[:k] = reversed(nums[:k])
        nums[k:] = reversed(nums[k:])`,
        explanation: 'Python in-place slice reversal.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int t = nums[l];
            nums[l++] = nums[r];
            nums[r--] = t;
        }
    }

    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
}`,
        explanation: 'Java triple reverse method.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'k = k % n',
      'reverse(0, n - 1)',
      'reverse(0, k - 1)',
      'reverse(k, n - 1)',
    ],
    visualizationType: 'array-sort',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4, 5, 6, 7] },
    relatedQuestions: ['product-of-array-except-self', 'merge-sorted-array'],
  },

  // 26. Valid Palindrome
  {
    id: '26',
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Strings',
    secondaryTopics: ['Two Pointers'],
    tags: ['Two Pointers', 'String'],
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    inputDescription: 'String `s`.',
    outputDescription: 'Boolean true or false.',
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
    ],
    hints: ['Use two pointers converging from both sides, skipping non-alphanumeric characters.'],
    optimizedApproach: {
      title: 'Two Pointers Skipping Non-Alphanumerics',
      description: 'Initialize left = 0, right = n - 1. Advance left and decrement right past any non-alphanumeric characters. Compare lowercased characters.',
      intuition: 'Avoids creating a new cleaned string, saving O(n) memory.',
      algorithmSteps: [
        'left = 0, right = s.length - 1.',
        'While left < right:',
        '  while left < right and !isalnum(s[left]): left++',
        '  while left < right and !isalnum(s[right]): right--',
        '  if tolower(s[left]) != tolower(s[right]): return false',
        '  left++; right--;',
        'Return true.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <string>
#include <cctype>

class Solution {
public:
    bool isPalindrome(std::string s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !std::isalnum(s[left])) left++;
            while (left < right && !std::isalnum(s[right])) right--;
            if (std::tolower(s[left]) != std::tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
        explanation: 'In-place two-pointer comparison with std::isalnum and std::tolower.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <stdbool.h>
#include <ctype.h>
#include <string.h>

bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}`,
        explanation: 'C character classification.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
        explanation: 'Python two-pointer palindrome check.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
        explanation: 'Java two-pointer scan with Character utilities.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'left = 0, right = n - 1',
      'while left < right:',
      '    skip non-alphanumeric at left and right',
      '    if lower(s[left]) != lower(s[right]): return false',
      '    left++; right--',
      'return true',
    ],
    visualizationType: 'two-pointers',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 2, 1] },
    relatedQuestions: ['valid-anagram', 'longest-substring-without-repeating-characters'],
  },

  // 27. Longest Common Prefix
  {
    id: '27',
    slug: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    topic: 'Strings',
    secondaryTopics: ['Trie'],
    tags: ['String', 'Trie'],
    description: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `""`.',
    inputDescription: 'Array of strings `strs`.',
    outputDescription: 'Common prefix string.',
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200'],
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: 'Common prefix is "fl".' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'No common prefix.' },
    ],
    hints: ['Compare characters column by column across all strings.'],
    optimizedApproach: {
      title: 'Vertical Scanning',
      description: 'Iterate index i of the first string. For all other strings, check if they are shorter than i or their character at i differs. If so, return prefix 0..i-1.',
      intuition: 'Stopping at the first mismatch checks minimum necessary characters.',
      algorithmSteps: [
        'If strs is empty, return "".',
        'For i from 0 to strs[0].length - 1:',
        '  char c = strs[0][i]',
        '  for j from 1 to strs.length - 1:',
        '    if i == strs[j].length or strs[j][i] != c: return strs[0].substr(0, i)',
        'Return strs[0].',
      ],
      timeComplexity: 'O(S) where S is sum of characters.',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <string>

class Solution {
public:
    std::string longestCommonPrefix(std::vector<std::string>& strs) {
        if (strs.empty()) return "";
        for (int i = 0; i < strs[0].length(); ++i) {
            char c = strs[0][i];
            for (int j = 1; j < strs.size(); ++j) {
                if (i == strs[j].length() || strs[j][i] != c) {
                    return strs[0].substr(0, i);
                }
            }
        }
        return strs[0];
    }
};`,
        explanation: 'Vertical character scan in C++.',
        timeComplexity: 'O(S)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <string.h>
#include <stdlib.h>

char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";
    int len = strlen(strs[0]);
    for (int i = 0; i < len; i++) {
        char c = strs[0][i];
        for (int j = 1; j < strsSize; j++) {
            if (i == strlen(strs[j]) || strs[j][i] != c) {
                strs[0][i] = '\\0';
                return strs[0];
            }
        }
    }
    return strs[0];
}`,
        explanation: 'In-place string null termination in C.',
        timeComplexity: 'O(S)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        for i, char in enumerate(strs[0]):
            for other in strs[1:]:
                if i == len(other) or other[i] != char:
                    return strs[0][:i]
        return strs[0]`,
        explanation: 'Python vertical scanning.',
        timeComplexity: 'O(S)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        for (int i = 0; i < strs[0].length(); i++) {
            char c = strs[0].charAt(i);
            for (int j = 1; j < strs.length; j++) {
                if (i == strs[j].length() || strs[j].charAt(i) != c) {
                    return strs[0].substring(0, i);
                }
            }
        }
        return strs[0];
    }
}`,
        explanation: 'Java character traversal.',
        timeComplexity: 'O(S)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'for i from 0 to length(first string):',
      '    c = first[i]',
      '    for each other string s:',
      '        if i >= length(s) or s[i] != c: return first[0..i-1]',
      'return first',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4] },
    relatedQuestions: ['valid-anagram', 'valid-palindrome'],
  },

  // 28. Search in Rotated Sorted Array
  {
    id: '28',
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Searching',
    secondaryTopics: ['Arrays', 'Binary Search'],
    tags: ['Binary Search', 'Array', 'Meta', 'Microsoft'],
    description: 'There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`. Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`. You must write an algorithm with `O(log n)` runtime complexity.',
    inputDescription: 'Rotated sorted array and target.',
    outputDescription: 'Index of target or -1.',
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i], target <= 10^4', 'All values in nums are unique.'],
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: '0 is found at index 4.' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', explanation: '3 does not exist.' },
    ],
    hints: ['In any rotated sorted array, at least one of the two halves (left..mid or mid..right) is guaranteed to be normally sorted.'],
    optimizedApproach: {
      title: 'Modified Binary Search with Sorted Half Detection',
      description: 'Check whether nums[left] <= nums[mid]. If true, left half is sorted. If target lies in nums[left]..nums[mid], search left; else search right. If right half is sorted, do the inverse.',
      intuition: 'Identifying the normally sorted half allows exact boundary checks for the target.',
      algorithmSteps: [
        'left = 0, right = n - 1.',
        'While left <= right:',
        '  mid = left + (right - left) / 2',
        '  if nums[mid] == target: return mid',
        '  if nums[left] <= nums[mid]: // left half sorted',
        '    if nums[left] <= target < nums[mid]: right = mid - 1',
        '    else: left = mid + 1',
        '  else: // right half sorted',
        '    if nums[mid] < target <= nums[right]: left = mid + 1',
        '    else: right = mid - 1',
        'Return -1.',
      ],
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>

class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
};`,
        explanation: 'Modified binary search checking sorted half.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}`,
        explanation: 'Rotated binary search in C.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1`,
        explanation: 'Python rotated binary search.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`,
        explanation: 'Java binary search with pivot handling.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'while left <= right:',
      '    mid = (left + right) / 2',
      '    if nums[mid] == target: return mid',
      '    if left half sorted: check target in left range',
      '    else right half sorted: check target in right range',
      'return -1',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    relatedQuestions: ['binary-search', 'find-minimum-in-rotated-sorted-array'],
  },

  // 29. 3Sum
  {
    id: '29',
    slug: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    secondaryTopics: ['Sorting', 'Arrays'],
    tags: ['Two Pointers', 'Sorting', 'Array', 'Meta', 'Amazon'],
    description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.',
    inputDescription: 'Array of integers `nums`.',
    outputDescription: 'List of unique zero-sum triplets.',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    examples: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]', explanation: 'Unique triplets that sum to 0.' },
    ],
    hints: ['Sort the array first.', 'Fix nums[i], then use two pointers left and right to find pairs where nums[left] + nums[right] == -nums[i].'],
    optimizedApproach: {
      title: 'Sort + Two Pointers with Duplicate Skipping',
      description: 'Sort nums in ascending order. Loop i from 0 to n - 3. If i > 0 and nums[i] == nums[i-1], continue. Run two pointers left = i + 1, right = n - 1. When match is found, record triplet and skip duplicate values on left and right.',
      intuition: 'Sorting converts 3-variable search into fixed element + 2-pointer convergence.',
      algorithmSteps: [
        'Sort nums.',
        'For i = 0 to n - 3:',
        '  if nums[i] > 0 break (sum cannot be 0).',
        '  if i > 0 and nums[i] == nums[i - 1] continue.',
        '  left = i + 1, right = n - 1.',
        '  while left < right:',
        '    sum = nums[i] + nums[left] + nums[right]',
        '    if sum == 0: add triplet, skip duplicate left and right.',
        '    else if sum < 0: left++',
        '    else: right--',
      ],
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1) extra space (ignoring output)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 0; i < n - 2; ++i) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};`,
        explanation: 'Sort and two-pointer scanning with duplicate pruning.',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `// C implementation with qsort and dynamic result matrix reallocation`,
        explanation: 'Uses qsort with standard two-pointer loop.',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        res = []
        nums.sort()
        n = len(nums)
        for i in range(n - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            l, r = i + 1, n - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
                elif s < 0:
                    l += 1
                else:
                    r -= 1
        return res`,
        explanation: 'Python two-pointer 3Sum.',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++;
                    r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
}`,
        explanation: 'Java two-pointer 3Sum.',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'sort(nums)',
      'for i from 0 to n - 3:',
      '    if duplicate i: continue',
      '    run two pointers left and right for -nums[i]',
    ],
    visualizationType: 'two-pointers',
    supportedVisualizer: true,
    defaultInput: { array: [-4, -1, -1, 0, 1, 2], target: 0 },
    relatedQuestions: ['two-sum', 'two-sum-ii-input-array-is-sorted', 'container-with-most-water'],
  },

  // 30. Implement Queue using Stacks
  {
    id: '30',
    slug: 'implement-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    topic: 'Stacks & Queues',
    secondaryTopics: ['Design'],
    tags: ['Stack', 'Queue', 'Design'],
    description: 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).',
    inputDescription: 'Calls to queue operations.',
    outputDescription: 'Returned values.',
    constraints: ['1 <= x <= 9', 'At most 100 calls made to push, pop, peek, empty.'],
    examples: [
      { input: '["MyQueue","push","push","peek","pop","empty"]\n[[],[1],[2],[],[],[]]', output: '[null,null,null,1,1,false]', explanation: 'Standard FIFO queue simulation.' },
    ],
    hints: ['Use an input stack for pushing and an output stack for popping/peeking.'],
    optimizedApproach: {
      title: 'Two Stacks (In and Out)',
      description: 'Push new items into `inputStack`. When popping or peeking, if `outputStack` is empty, pour all elements from `inputStack` into `outputStack` to reverse their order.',
      intuition: 'Pouring reverses LIFO order into FIFO order. Each element is poured at most once, giving amortized O(1) time.',
      algorithmSteps: [
        'push(x): inStack.push(x).',
        'pop(): shift(); return outStack.pop().',
        'peek(): shift(); return outStack.peek().',
        'empty(): return inStack.empty() && outStack.empty().',
        'shift(): if outStack is empty, while inStack is not empty, outStack.push(inStack.pop()).',
      ],
      timeComplexity: 'Amortized O(1) for pop and peek; O(1) for push and empty.',
      spaceComplexity: 'O(n) - Stores n elements.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <stack>

class MyQueue {
private:
    std::stack<int> inSt, outSt;
    void shift() {
        if (outSt.empty()) {
            while (!inSt.empty()) {
                outSt.push(inSt.top());
                inSt.pop();
            }
        }
    }
public:
    MyQueue() {}
    void push(int x) { inSt.push(x); }
    int pop() { shift(); int v = outSt.top(); outSt.pop(); return v; }
    int peek() { shift(); return outSt.top(); }
    bool empty() { return inSt.empty() && outSt.empty(); }
};`,
        explanation: 'Amortized O(1) two-stack queue design.',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `// C two-stack queue with fixed arrays`,
        explanation: 'Static arrays with in and out top pointers.',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `class MyQueue:
    def __init__(self):
        self.in_st = []
        self.out_st = []

    def push(self, x: int) -> None:
        self.in_st.append(x)

    def _shift(self):
        if not self.out_st:
            while self.in_st:
                self.out_st.append(self.in_st.pop())

    def pop(self) -> int:
        self._shift()
        return self.out_st.pop()

    def peek(self) -> int:
        self._shift()
        return self.out_st[-1]

    def empty(self) -> bool:
        return not self.in_st and not self.out_st`,
        explanation: 'Python lists as stacks with lazy pouring.',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class MyQueue {
    private Deque<Integer> inSt = new ArrayDeque<>();
    private Deque<Integer> outSt = new ArrayDeque<>();

    public void push(int x) { inSt.push(x); }

    private void shift() {
        if (outSt.isEmpty()) {
            while (!inSt.isEmpty()) outSt.push(inSt.pop());
        }
    }

    public int pop() { shift(); return outSt.pop(); }
    public int peek() { shift(); return outSt.peek(); }
    public boolean empty() { return inSt.isEmpty() && outSt.isEmpty(); }
}`,
        explanation: 'Java two-stack queue implementation.',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'push(x): inStack.push(x)',
      'pop(): if outStack empty: pour inStack into outStack; return outStack.pop()',
    ],
    visualizationType: 'queue',
    supportedVisualizer: true,
    defaultInput: { queueOps: [{ op: 'enqueue', val: 1 }, { op: 'enqueue', val: 2 }, { op: 'dequeue' }] },
    relatedQuestions: ['min-stack', 'valid-parentheses'],
  },

  // 31. Binary Tree Level Order Traversal
  {
    id: '31',
    slug: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees & BST',
    secondaryTopics: ['Breadth-First Search'],
    tags: ['Tree', 'BFS', 'Binary Tree', 'Amazon', 'LinkedIn'],
    description: 'Given the `root` of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    inputDescription: 'Root of binary tree.',
    outputDescription: 'List of lists of integers per level.',
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: 'Level-by-level groupings.' },
    ],
    hints: ['Use a queue. Process level by level by taking the current queue size before dequeuing.'],
    optimizedApproach: {
      title: 'Breadth-First Search with Level Sizing Queue',
      description: 'Enqueue root. While queue is not empty, levelSize = queue.size(). Dequeue levelSize nodes and push their values into current level list, enqueuing their left and right children.',
      intuition: 'Fixing levelSize at the start of each while iteration separates nodes of the current level from their children.',
      algorithmSteps: [
        'If root is null, return [].',
        'queue.push(root).',
        'While queue is not empty:',
        '  levelSize = queue.size(), level = []',
        '  For i from 0 to levelSize - 1:',
        '    node = queue.pop()',
        '    level.push(node.val)',
        '    if node.left: queue.push(node.left)',
        '    if node.right: queue.push(node.right)',
        '  res.push(level)',
        'Return res.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <queue>

class Solution {
public:
    std::vector<std::vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        std::vector<std::vector<int>> res;
        std::queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int levelSize = q.size();
            std::vector<int> currentLevel;
            for (int i = 0; i < levelSize; ++i) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(currentLevel);
        }
        return res;
    }
};`,
        explanation: 'BFS queue level order traversal in C++.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `// C queue implementation with pointer array`,
        explanation: 'BFS queue in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `from collections import deque

class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if not root:
            return []
        res = []
        q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(level)
        return res`,
        explanation: 'Python deque for O(1) popleft in BFS.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
        explanation: 'Java Queue level order.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'q = [root]',
      'while q is not empty:',
      '    size = len(q)',
      '    level = []',
      '    for i in 0..size-1: pop node, add val, push children',
      '    res.add(level)',
    ],
    visualizationType: 'binary-tree',
    supportedVisualizer: true,
    defaultInput: { array: [3, 9, 20, 15, 7] },
    relatedQuestions: ['maximum-depth-of-binary-tree', 'invert-binary-tree'],
  },

  // 32. Lowest Common Ancestor of a Binary Search Tree
  {
    id: '32',
    slug: 'lowest-common-ancestor',
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'Medium',
    topic: 'Trees & BST',
    secondaryTopics: ['Recursion'],
    tags: ['BST', 'Tree', 'DFS', 'Amazon'],
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes `p` and `q` in the BST. According to the definition of LCA: "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself)."',
    inputDescription: 'Root of BST and nodes `p` and `q`.',
    outputDescription: 'LCA node pointer.',
    constraints: ['The number of nodes in the tree is in the range [2, 10^5].', 'All Node.val are unique.', 'p != q and both p and q exist in the BST.'],
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'The LCA of nodes 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'The LCA of nodes 2 and 4 is 2 since a node can be descendant of itself.' },
    ],
    hints: ['Utilize BST properties: if both p and q values are less than root.val, LCA is in left subtree. If both greater, LCA is in right subtree.'],
    optimizedApproach: {
      title: 'BST Invariant Traversal',
      description: 'Start at root. If both p and q are smaller than current node, walk left. If both are larger, walk right. The first node where p and q split (or match) is the LCA.',
      intuition: 'The split point in a BST is uniquely the lowest common ancestor.',
      algorithmSteps: [
        'curr = root.',
        'While curr is not null:',
        '  if p.val < curr.val and q.val < curr.val: curr = curr.left',
        '  else if p.val > curr.val and q.val > curr.val: curr = curr.right',
        '  else: return curr',
      ],
      timeComplexity: 'O(h) - At most tree height steps.',
      spaceComplexity: 'O(1) - Iterative with constant variables.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* curr = root;
        while (curr) {
            if (p->val < curr->val && q->val < curr->val) {
                curr = curr->left;
            } else if (p->val > curr->val && q->val > curr->val) {
                curr = curr->right;
            } else {
                return curr;
            }
        }
        return nullptr;
    }
};`,
        explanation: 'Iterative BST traversal with O(1) space.',
        timeComplexity: 'O(h)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    struct TreeNode* curr = root;
    while (curr) {
        if (p->val < curr->val && q->val < curr->val) curr = curr->left;
        else if (p->val > curr->val && q->val > curr->val) curr = curr->right;
        else return curr;
    }
    return NULL;
}`,
        explanation: 'Direct C iterative pointer navigation.',
        timeComplexity: 'O(h)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        curr = root
        while curr:
            if p.val < curr.val and q.val < curr.val:
                curr = curr.left
            elif p.val > curr.val and q.val > curr.val:
                curr = curr.right
            else:
                return curr`,
        explanation: 'Python iterative LCA.',
        timeComplexity: 'O(h)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;
        while (curr != null) {
            if (p.val < curr.val && q.val < curr.val) curr = curr.left;
            else if (p.val > curr.val && q.val > curr.val) curr = curr.right;
            else return curr;
        }
        return null;
    }
}`,
        explanation: 'Java iterative BST LCA.',
        timeComplexity: 'O(h)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'curr = root',
      'while curr:',
      '    if p.val < curr.val and q.val < curr.val: curr = curr.left',
      '    else if p.val > curr.val and q.val > curr.val: curr = curr.right',
      '    else: return curr',
    ],
    visualizationType: 'binary-tree',
    supportedVisualizer: true,
    defaultInput: { array: [6, 2, 8, 0, 4, 7, 9] },
    relatedQuestions: ['validate-binary-search-tree', 'maximum-depth-of-binary-tree'],
  },

  // 33. Merge Two Sorted Lists
  {
    id: '33',
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    secondaryTopics: ['Recursion'],
    tags: ['Linked List', 'Recursion', 'Microsoft', 'Amazon'],
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    inputDescription: 'Two sorted linked list heads.',
    outputDescription: 'Head of merged linked list.',
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100'],
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: 'Merged sorted chain.' },
    ],
    hints: ['Create a dummy node to hold the head of the new list, and attach the smaller of the two heads on each step.'],
    optimizedApproach: {
      title: 'Sentinel Dummy Node Iteration',
      description: 'Use a dummy head node. While both lists are non-empty, link the smaller node and advance its pointer.',
      intuition: 'Dummy sentinel simplifies edge cases such as empty lists or head pointer assignment.',
      algorithmSteps: [
        'dummy = new ListNode(0), tail = dummy.',
        'While list1 != null and list2 != null:',
        '  if list1.val <= list2.val: tail.next = list1; list1 = list1.next',
        '  else: tail.next = list2; list2 = list2.next',
        '  tail = tail.next',
        'tail.next = list1 != null ? list1 : list2',
        'Return dummy.next.',
      ],
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
        explanation: 'Stack-allocated dummy node with pointer splicing.',
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode dummy;
    struct ListNode* tail = &dummy;
    dummy.next = NULL;
    while (list1 && list2) {
        if (list1->val <= list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }
    tail->next = list1 ? list1 : list2;
    return dummy.next;
}`,
        explanation: 'Dummy node in C.',
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def mergeTwoLists(self, list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
        dummy = ListNode(0)
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`,
        explanation: 'Python dummy head merge.',
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
        explanation: 'Java sentinel merge.',
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'dummy = ListNode(0), tail = dummy',
      'while list1 and list2:',
      '    tail.next = min(list1, list2); advance min list',
      '    tail = tail.next',
      'tail.next = remaining list',
      'return dummy.next',
    ],
    visualizationType: 'linked-list',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 4, 1, 3, 4] },
    relatedQuestions: ['reverse-linked-list', 'merge-sorted-array'],
  },

  // 34. Remove Nth Node From End of List
  {
    id: '34',
    slug: 'remove-nth-node-from-end',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    topic: 'Linked Lists',
    secondaryTopics: ['Two Pointers'],
    tags: ['Linked List', 'Two Pointers'],
    description: 'Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.',
    inputDescription: 'Head of list and integer `n`.',
    outputDescription: 'Head of list with target node removed.',
    constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '1 <= n <= sz'],
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: 'Node 4 removed.' },
    ],
    hints: ['Create an n-step gap between two pointers fast and slow.'],
    optimizedApproach: {
      title: 'Two Pointers with n-Step Gap (Single Pass)',
      description: 'Advance fast pointer n + 1 steps ahead of slow (using dummy node). Then move both until fast is null. slow.next will be the node to delete.',
      intuition: 'Maintaining a constant window of n + 1 nodes ensures slow lands immediately before the target node.',
      algorithmSteps: [
        'dummy = new ListNode(0, head), slow = dummy, fast = dummy.',
        'Advance fast by n + 1 steps.',
        'While fast != null: slow = slow.next; fast = fast.next.',
        'slow.next = slow.next.next.',
        'Return dummy.next.',
      ],
      timeComplexity: 'O(sz) - Single pass.',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;
        for (int i = 0; i <= n; ++i) fast = fast->next;
        while (fast) {
            slow = slow->next;
            fast = fast->next;
        }
        slow->next = slow->next->next;
        return dummy.next;
    }
};`,
        explanation: 'Single-pass gap traversal.',
        timeComplexity: 'O(sz)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    struct ListNode dummy;
    dummy.next = head;
    struct ListNode* fast = &dummy;
    struct ListNode* slow = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) {
        slow = slow->next;
        fast = fast->next;
    }
    slow->next = slow->next->next;
    return dummy.next;
}`,
        explanation: 'C implementation with dummy node.',
        timeComplexity: 'O(sz)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def removeNthFromEnd(self, head: ListNode | None, n: int) -> ListNode | None:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n + 1):
            fast = fast.next
        while fast:
            slow = slow.next
            fast = fast.next
        slow.next = slow.next.next
        return dummy.next`,
        explanation: 'Python gap pointer approach.',
        timeComplexity: 'O(sz)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
        explanation: 'Java single pass.',
        timeComplexity: 'O(sz)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'fast = dummy, slow = dummy',
      'advance fast by n + 1',
      'move both until fast reaches null',
      'slow.next = slow.next.next',
      'return dummy.next',
    ],
    visualizationType: 'linked-list',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4, 5] },
    relatedQuestions: ['reverse-linked-list', 'middle-of-the-linked-list'],
  },

  // 35. Daily Temperatures
  {
    id: '35',
    slug: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    topic: 'Stacks & Queues',
    secondaryTopics: ['Arrays'],
    tags: ['Stack', 'Monotonic Stack', 'Array'],
    description: 'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.',
    inputDescription: 'Array of integer temperatures.',
    outputDescription: 'Array of day count delays.',
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]', explanation: 'Next warmer day wait times calculated.' },
    ],
    hints: ['Use a monotonic decreasing stack holding indices of days waiting for a warmer temperature.'],
    optimizedApproach: {
      title: 'Monotonic Decreasing Stack',
      description: 'Iterate through temperatures with index i. While stack is not empty and temperatures[i] > temperatures[stack.top()], pop prevIdx and set answer[prevIdx] = i - prevIdx. Then push i.',
      intuition: 'Elements in the stack represent days whose next warmer day has not yet been encountered.',
      algorithmSteps: [
        'res = array of size n initialized to 0, st = empty stack.',
        'For i from 0 to n - 1:',
        '  while !st.empty() and temperatures[i] > temperatures[st.top()]:',
        '    prev = st.pop()',
        '    res[prev] = i - prev',
        '  st.push(i)',
        'Return res.',
      ],
      timeComplexity: 'O(n) - Each index pushed and popped at most once.',
      spaceComplexity: 'O(n) - Stack space.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
        int n = temperatures.size();
        std::vector<int> res(n, 0);
        std::stack<int> st;
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prev = st.top();
                st.pop();
                res[prev] = i - prev;
            }
            st.push(i);
        }
        return res;
    }
};`,
        explanation: 'Monotonic stack storing day indices.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `// C monotonic stack with index array`,
        explanation: 'Array stack in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        res = [0] * n
        st = []
        for i, temp in enumerate(temperatures):
            while st and temp > temperatures[st[-1]]:
                prev = st.pop()
                res[prev] = i - prev
            st.append(i)
        return res`,
        explanation: 'Python monotonic stack.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && temperatures[i] > temperatures[st.peek()]) {
                int prev = st.pop();
                res[prev] = i - prev;
            }
            st.push(i);
        }
        return res;
    }
}`,
        explanation: 'Java monotonic stack.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'for i from 0 to n - 1:',
      '    while st not empty and temp[i] > temp[st.top]:',
      '        prev = st.pop(); res[prev] = i - prev',
      '    st.push(i)',
      'return res',
    ],
    visualizationType: 'stack',
    supportedVisualizer: true,
    defaultInput: { stackOps: [{ op: 'push', val: 73 }, { op: 'push', val: 74 }, { op: 'pop' }] },
    relatedQuestions: ['min-stack', 'valid-parentheses'],
  },

  // 36. Top K Frequent Elements
  {
    id: '36',
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topic: 'Heaps & Priority Queues',
    secondaryTopics: ['Hashing', 'Sorting'],
    tags: ['Heap', 'Hash Table', 'Bucket Sort'],
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    inputDescription: 'Array `nums` and integer `k`.',
    outputDescription: 'List of k most frequent elements.',
    constraints: ['1 <= nums.length <= 10^5', 'k is in the range [1, the number of unique elements in the array].'],
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1, 2]', explanation: '1 occurs 3 times, 2 occurs 2 times.' },
    ],
    hints: ['Count frequencies with a map, then use Bucket Sort where index represents frequency count.'],
    optimizedApproach: {
      title: 'Bucket Sort by Frequency',
      description: 'Count counts in hash map. Create buckets array where buckets[freq] holds numbers with that frequency. Scan buckets from n down to 1 until k elements gathered.',
      intuition: 'Frequencies cannot exceed n, allowing linear time bucket distribution.',
      algorithmSteps: [
        'Count frequency of each number in map.',
        'buckets = array of lists of size n + 1.',
        'For each (num, freq) in map: buckets[freq].append(num).',
        'Collect numbers from buckets[n] down to 1 until k numbers picked.',
        'Return result.',
      ],
      timeComplexity: 'O(n) - Linear frequency counting and bucket collection.',
      spaceComplexity: 'O(n) - Buckets storage.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        int n = nums.size();
        std::vector<std::vector<int>> buckets(n + 1);
        for (auto& [val, freq] : count) {
            buckets[freq].push_back(val);
        }
        std::vector<int> res;
        for (int i = n; i >= 0 && res.size() < k; --i) {
            for (int val : buckets[i]) {
                res.push_back(val);
                if (res.size() == k) break;
            }
        }
        return res;
    }
};`,
        explanation: 'Linear time bucket sort on element frequencies.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `// C implementation with count array and sorting`,
        explanation: 'Frequency sorting in C.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `from collections import Counter

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        counts = Counter(nums)
        buckets = [[] for _ in range(len(nums) + 1)]
        for val, freq in counts.items():
            buckets[freq].append(val)
        res = []
        for i in range(len(nums), 0, -1):
            for val in buckets[i]:
                res.append(val)
                if len(res) == k:
                    return res
        return res`,
        explanation: 'Bucket sort in Python.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int n : nums) counts.put(n, counts.getOrDefault(n, 0) + 1);
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : counts.keySet()) {
            int freq = counts.get(key);
            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
            buckets[freq].add(key);
        }
        int[] res = new int[k];
        int idx = 0;
        for (int i = nums.length; i >= 0 && idx < k; i--) {
            if (buckets[i] != null) {
                for (int val : buckets[i]) {
                    res[idx++] = val;
                    if (idx == k) break;
                }
            }
        }
        return res;
    }
}`,
        explanation: 'Java bucket sort array of lists.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'count frequencies',
      'populate buckets[frequency] = [values]',
      'collect top k from highest frequency buckets downwards',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [1, 1, 1, 2, 2, 3] },
    relatedQuestions: ['two-sum', 'contains-duplicate'],
  },

  // 37. Course Schedule
  {
    id: '37',
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    topic: 'Graphs',
    secondaryTopics: ['Topological Sort', 'Breadth-First Search'],
    tags: ['Graph', 'Topological Sort', 'BFS', 'DFS'],
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`. Return `true` if you can finish all courses. Otherwise, return `false`.',
    inputDescription: '`numCourses` integer and `prerequisites` pairs.',
    outputDescription: 'Boolean true if valid DAG; else false.',
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'],
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Circular dependency cycle exists.' },
    ],
    hints: ['This problem reduces to detecting a cycle in a directed graph. Kahn\'s algorithm uses in-degrees and a queue.'],
    optimizedApproach: {
      title: 'Kahn\'s Algorithm (BFS Topological Sort)',
      description: 'Compute in-degree for every course. Push courses with in-degree 0 to a queue. As each course is dequeued, decrement in-degree of its neighbors. If neighbor hits 0, enqueue it. If count of processed courses equals numCourses, no cycle exists.',
      intuition: 'Courses with 0 in-degree can be taken immediately, unlocking future prerequisite courses.',
      algorithmSteps: [
        'Build adjacency list and in-degree array of size numCourses.',
        'Enqueue all courses with in-degree == 0.',
        'processed = 0.',
        'While queue is not empty:',
        '  curr = queue.pop(); processed++.',
        '  for neighbor in adj[curr]:',
        '    inDegree[neighbor]--',
        '    if inDegree[neighbor] == 0: queue.push(neighbor)',
        'Return processed == numCourses.',
      ],
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <queue>

class Solution {
public:
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<std::vector<int>> adj(numCourses);
        std::vector<int> inDegree(numCourses, 0);
        for (const auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        std::queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }
        int processed = 0;
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            processed++;
            for (int neighbor : adj[curr]) {
                if (--inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        return processed == numCourses;
    }
};`,
        explanation: 'Kahn topological sort in C++.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
      },
      c: {
        language: 'c',
        code: `// C adjacency list and in-degree array implementation`,
        explanation: 'Kahn algorithm in C.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
      },
      python: {
        language: 'python',
        code: `from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        for course, pre in prerequisites:
            adj[pre].append(course)
            in_degree[course] += 1
        q = deque([i for i in range(numCourses) if in_degree[i] == 0])
        processed = 0
        while q:
            curr = q.popleft()
            processed += 1
            for nxt in adj[curr]:
                in_degree[nxt] -= 1
                if in_degree[nxt] == 0:
                    q.append(nxt)
        return processed == numCourses`,
        explanation: 'Python Kahn algorithm.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
      },
      java: {
        language: 'java',
        code: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        int processed = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            processed++;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        return processed == numCourses;
    }
}`,
        explanation: 'Java Kahn BFS Topological Sort.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
      },
    },
    pseudocode: [
      'calculate inDegrees and build adjacency list',
      'enqueue nodes with inDegree 0',
      'while queue not empty:',
      '    dequeue node, increment count',
      '    decrement neighbors, enqueue if inDegree hits 0',
      'return count == numCourses',
    ],
    visualizationType: 'graph',
    supportedVisualizer: true,
    defaultInput: { array: [1, 0, 0, 1] },
    relatedQuestions: ['number-of-islands', 'flood-fill'],
  },

  // 38. House Robber
  {
    id: '38',
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    secondaryTopics: ['Arrays'],
    tags: ['Dynamic Programming', 'Array', 'Google', 'Amazon'],
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.',
    inputDescription: 'Array of integer values representing cash per house.',
    outputDescription: 'Maximum rob profit.',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: '4', explanation: 'Rob house 1 (money = 1) and house 3 (money = 3), total = 4.' },
      { input: 'nums = [2, 7, 9, 3, 1]', output: '12', explanation: 'Rob house 1 (2), house 3 (9), and house 5 (1), total = 12.' },
    ],
    hints: ['At each house i, you either rob it (nums[i] + rob(i-2)) or skip it (rob(i-1)).'],
    optimizedApproach: {
      title: 'Space-Optimized 1D Dynamic Programming',
      description: 'dp[i] = max(dp[i-1], nums[i] + dp[i-2]). Maintain rob1 and rob2 representing the max cash up to two houses ago and one house ago.',
      intuition: 'Only the previous two states are needed to make the current decision.',
      algorithmSteps: [
        'rob1 = 0, rob2 = 0.',
        'For each num in nums:',
        '  temp = max(num + rob1, rob2)',
        '  rob1 = rob2',
        '  rob2 = temp',
        'Return rob2.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int rob(std::vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int temp = std::max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
};`,
        explanation: 'Constant space dynamic programming recurrence.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `int rob(int* nums, int numsSize) {
    int rob1 = 0, rob2 = 0;
    for (int i = 0; i < numsSize; i++) {
        int cand = nums[i] + rob1;
        int temp = (cand > rob2) ? cand : rob2;
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,
        explanation: 'C implementation with O(1) memory.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def rob(self, nums: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in nums:
            temp = max(n + rob1, rob2)
            rob1 = rob2
            rob2 = temp
        return rob2`,
        explanation: 'Python iterative state update.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int num : nums) {
            int temp = Math.max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`,
        explanation: 'Java DP.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'rob1 = 0, rob2 = 0',
      'for num in nums:',
      '    curr = max(num + rob1, rob2)',
      '    rob1 = rob2',
      '    rob2 = curr',
      'return rob2',
    ],
    visualizationType: 'dp-table',
    supportedVisualizer: true,
    defaultInput: { array: [2, 7, 9, 3, 1] },
    relatedQuestions: ['climbing-stairs', 'coin-change'],
  },

  // 39. Longest Increasing Subsequence
  {
    id: '39',
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    secondaryTopics: ['Binary Search', 'Arrays'],
    tags: ['Dynamic Programming', 'Binary Search', 'Array', 'Google', 'Microsoft'],
    description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.',
    inputDescription: 'Array `nums`.',
    outputDescription: 'Integer length of LIS.',
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', output: '4', explanation: 'The longest increasing subsequence is [2, 3, 7, 101] with length 4.' },
    ],
    hints: ['Patience sorting algorithm: maintain tails array and use binary search (lower_bound) in O(n log n).'],
    optimizedApproach: {
      title: 'Patience Sorting with Binary Search',
      description: 'Maintain array tails where tails[i] stores the smallest tail of all increasing subsequences of length i + 1. For each x in nums, binary search for the first element >= x in tails and replace it. If no element >= x exists, append x to tails.',
      intuition: 'Greedily keeping tail values as small as possible leaves maximum opportunity for future numbers to extend the subsequence.',
      algorithmSteps: [
        'tails = empty array.',
        'For each x in nums:',
        '  use binary search to find idx = first position in tails with tails[idx] >= x.',
        '  if idx == tails.length: tails.append(x).',
        '  else: tails[idx] = x.',
        'Return tails.length.',
      ],
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    int lengthOfLIS(std::vector<int>& nums) {
        std::vector<int> tails;
        for (int x : nums) {
            auto it = std::lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};`,
        explanation: 'Patience sorting using std::lower_bound in C++.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
      },
      c: {
        language: 'c',
        code: `// C binary search patience sorting`,
        explanation: 'Binary search lower bound in C.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
      },
      python: {
        language: 'python',
        code: `from bisect import bisect_left

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
        explanation: 'Python bisect_left implementation of patience sorting.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
      },
      java: {
        language: 'java',
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) tails.add(x);
            else tails.set(idx, x);
        }
        return tails.size();
    }
}`,
        explanation: 'Java Collections.binarySearch patience sort.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
      },
    },
    pseudocode: [
      'tails = []',
      'for x in nums:',
      '    idx = lower_bound(tails, x)',
      '    if idx == len(tails): tails.append(x)',
      '    else: tails[idx] = x',
      'return len(tails)',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [10, 9, 2, 5, 3, 7, 101, 18], target: 7 },
    relatedQuestions: ['coin-change', 'maximum-subarray'],
  },

  // 40. Jump Game
  {
    id: '40',
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    topic: 'Greedy',
    secondaryTopics: ['Dynamic Programming', 'Arrays'],
    tags: ['Greedy', 'Array', 'Dynamic Programming'],
    description: 'You are given an integer array `nums`. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.',
    inputDescription: 'Array `nums`.',
    outputDescription: 'Boolean true or false.',
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    examples: [
      { input: 'nums = [2, 3, 1, 1, 4]', output: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { input: 'nums = [3, 2, 1, 0, 4]', output: 'false', explanation: 'You will always arrive at index 3 with 0 jump potential.' },
    ],
    hints: ['Track the furthest reachable index as you traverse left to right.'],
    optimizedApproach: {
      title: 'Greedy Maximum Reachable Frontier',
      description: 'Maintain maxReach = 0. Iterate i from 0 to n - 1. If i > maxReach, return false (cannot reach this position). Update maxReach = max(maxReach, i + nums[i]). If maxReach >= n - 1, return true.',
      intuition: 'If we can reach any index i, we can also reach any index between 0 and i + nums[i].',
      algorithmSteps: [
        'maxReach = 0.',
        'For i from 0 to n - 1:',
        '  if i > maxReach return false',
        '  maxReach = max(maxReach, i + nums[i])',
        '  if maxReach >= n - 1 return true',
        'Return true.',
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    bool canJump(std::vector<int>& nums) {
        int maxReach = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (i > maxReach) return false;
            maxReach = std::max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) return true;
        }
        return true;
    }
};`,
        explanation: 'Greedy reach frontier check.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `#include <stdbool.h>

bool canJump(int* nums, int numsSize) {
    int maxReach = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > maxReach) return false;
        int reach = i + nums[i];
        if (reach > maxReach) maxReach = reach;
        if (maxReach >= numsSize - 1) return true;
    }
    return true;
}`,
        explanation: 'Greedy jump game in C.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def canJump(self, nums: list[int]) -> bool:
        max_reach = 0
        for i, jump in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + jump)
            if max_reach >= len(nums) - 1:
                return True
        return True`,
        explanation: 'Python greedy scan.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`,
        explanation: 'Java greedy jump game.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'maxReach = 0',
      'for i from 0 to n - 1:',
      '    if i > maxReach: return false',
      '    maxReach = max(maxReach, i + nums[i])',
      '    if maxReach >= n - 1: return true',
      'return true',
    ],
    visualizationType: 'array-search',
    supportedVisualizer: true,
    defaultInput: { array: [2, 3, 1, 1, 4] },
    relatedQuestions: ['best-time-to-buy-and-sell-stock', 'climbing-stairs'],
  },

  // 41. Sort Colors (Dutch National Flag)
  {
    id: '41',
    slug: 'sort-colors',
    title: 'Sort Colors (Dutch National Flag)',
    difficulty: 'Medium',
    topic: 'Sorting',
    secondaryTopics: ['Two Pointers', 'Arrays'],
    tags: ['Two Pointers', 'Sorting', 'Array', 'Microsoft'],
    description: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively. You must solve this problem without using the library\'s sort function.',
    inputDescription: 'Array `nums` containing only 0, 1, and 2.',
    outputDescription: 'nums sorted in-place.',
    constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is either 0, 1, or 2.'],
    examples: [
      { input: 'nums = [2, 0, 2, 1, 1, 0]', output: '[0, 0, 1, 1, 2, 2]', explanation: 'In-place partitioned.' },
    ],
    hints: ['Dutch National Flag algorithm: three pointers low, mid, high partitions array into 0s, 1s, and 2s.'],
    optimizedApproach: {
      title: 'Dutch National Flag 3-Way Partition',
      description: 'Maintain low = 0, mid = 0, high = n - 1. If nums[mid] == 0, swap(nums[low], nums[mid]), low++, mid++. If nums[mid] == 1, mid++. If nums[mid] == 2, swap(nums[mid], nums[high]), high--.',
      intuition: 'Invariant ensures elements before low are 0, between low and mid are 1, and after high are 2.',
      algorithmSteps: [
        'low = 0, mid = 0, high = n - 1.',
        'While mid <= high:',
        '  if nums[mid] == 0: swap(low++, mid++)',
        '  else if nums[mid] == 1: mid++',
        '  else: swap(mid, high--)',
      ],
      timeComplexity: 'O(n) - Single pass.',
      spaceComplexity: 'O(1) - In-place.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>

class Solution {
public:
    void sortColors(std::vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                std::swap(nums[low++], nums[mid++]);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                std::swap(nums[mid], nums[high--]);
            }
        }
    }
};`,
        explanation: 'Dutch National Flag three-way in-place partition.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      c: {
        language: 'c',
        code: `void sortColors(int* nums, int numsSize) {
    int low = 0, mid = 0, high = numsSize - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t;
        }
    }
}`,
        explanation: 'C 3-way partition.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      python: {
        language: 'python',
        code: `class Solution:
    def sortColors(self, nums: list[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`,
        explanation: 'Python Dutch flag partition.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      java: {
        language: 'java',
        code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t;
            }
        }
    }
}`,
        explanation: 'Java DNF algorithm.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    },
    pseudocode: [
      'low = 0, mid = 0, high = n - 1',
      'while mid <= high:',
      '    if nums[mid] == 0: swap(low++, mid++)',
      '    else if nums[mid] == 1: mid++',
      '    else: swap(mid, high--)',
    ],
    visualizationType: 'array-sort',
    supportedVisualizer: true,
    defaultInput: { array: [2, 0, 2, 1, 1, 0] },
    relatedQuestions: ['merge-sorted-array', 'rotate-array'],
  },

  // 61. Rotate List (LeetCode 61)
  {
    id: '61',
    slug: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'Medium',
    topic: 'Linked Lists',
    secondaryTopics: ['Two Pointers'],
    tags: ['Linked List', 'Two Pointers', 'Math', 'Amazon', 'Microsoft', 'Bloomberg'],
    description:
      'Given the `head` of a linked list, rotate the list to the right by `k` places.\n\nA rotation to the right by `k` places shifts every node in the linked list towards the right by `k` steps. Nodes that are pushed past the end of the list wrap around to the front.\n\n### Key Observations:\n- If `n` is the length of the list, rotating by `n` places results in the exact original list.\n- Therefore, rotating by `k` places is equivalent to rotating by `k % n` places.\n- If `k % n == 0` or the list is empty / has only 1 node, no modifications are necessary.\n- By connecting the tail node to the head node, we form a circular ring. The new tail will be located at position `(n - (k % n) - 1)` from the head (or `n - (k % n)` steps from the tail). Breaking the circular connection at that point yields the final rotated list in O(n) time with O(1) auxiliary space.',
    inputDescription: 'The head of a singly linked list and an integer k representing the number of rightward rotation steps.',
    outputDescription: 'The head pointer of the newly rotated linked list.',
    constraints: [
      'The number of nodes in the list is in the range [0, 500].',
      '-100 <= Node.val <= 100',
      '0 <= k <= 2 * 10^9',
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5], k = 2',
        output: '[4, 5, 1, 2, 3]',
        explanation: 'Rotate 1 step: [5, 1, 2, 3, 4]. Rotate 2 steps: [4, 5, 1, 2, 3].',
      },
      {
        input: 'head = [0, 1, 2], k = 4',
        output: '[2, 0, 1]',
        explanation: 'Length is 3. Effective rotation is k % 3 = 4 % 3 = 1 step. Rotate 1 step gives [2, 0, 1].',
      },
      {
        input: 'head = [1, 2], k = 0',
        output: '[1, 2]',
        explanation: 'k = 0 requires zero rotations; original list is returned unchanged.',
      },
    ],
    hints: [
      'Notice that rotating a list of length n by n positions gives back the exact original list.',
      'Calculate the length of the list n, then calculate effective rotation k = k % n.',
      'If effective k == 0 or head is null, no rotation is needed.',
      'Connect the current tail to the head node to form a circular ring, then traverse (n - k) steps to find the new tail.',
      'Sever the link after newTail (set newTail.next = null) and return the saved newHead.',
    ],
    bruteForceApproach: {
      title: 'Repeated Single Rotations',
      description:
        'Perform k single-step rotations. In each step, traverse the list to find the second-to-last node and tail node, move the tail to the front as the new head, and set the second-to-last node next to NULL.',
      timeComplexity: 'O(k * n) - In the worst case, k can be up to 2 * 10^9, leading to Time Limit Exceeded.',
      spaceComplexity: 'O(1) - Constant auxiliary pointer space.',
    },
    optimizedApproach: {
      title: 'Circular Ring Formation & Link Severing',
      description:
        'Measure the list length n while reaching the tail node. Normalize k = k % n. Connect the tail to the head to make the list circular, traverse n - k steps to locate the new tail, break the cycle by setting newTail.next = NULL, and return newHead.',
      intuition:
        'Since a rotation of n steps preserves the list identity, k rotations is equivalent to k % n. Forming a circular ring converts right rotation into finding the split point at index n - (k % n) in a single linear pass.',
      algorithmSteps: [
        'Handle boundary conditions: if head == null || head.next == null || k == 0, return head.',
        'Traverse to the tail of the list while counting the total node count n.',
        'Compute effective rotation k = k % n. If k == 0, return head immediately.',
        'Connect tail.next = head to make the linked list a circular ring.',
        'Find the new tail by taking (n - k) steps starting from tail.',
        'Set newHead = newTail.next and break the circle by setting newTail.next = null.',
        'Return newHead.',
      ],
      correctnessProof:
        'A right rotation of k places shifts the last k elements to the prefix of the list and the first n - k elements to the suffix. By connecting the tail to the head and severing the link at index n - k, the node at index n - k becomes the head while preserving all relative node orderings in O(n) time and O(1) space.',
      timeComplexity: 'O(n) - Single pass to find length n and tail, followed by at most n steps to reach the new tail.',
      spaceComplexity: 'O(1) - In-place pointer modifications with zero extra dynamic allocations.',
    },
    solutions: {
      cpp: {
        language: 'cpp',
        code: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;

        // 1. Calculate the length and find the tail node
        int length = 1;
        ListNode* tail = head;
        while (tail->next != nullptr) {
            tail = tail->next;
            length++;
        }

        // 2. Normalize k using modulo
        k = k % length;
        if (k == 0) return head;

        // 3. Connect tail to head to form a circular ring
        tail->next = head;

        // 4. Find the new tail: (length - k) steps from tail
        int stepsToNewTail = length - k;
        ListNode* newTail = tail;
        while (stepsToNewTail-- > 0) {
            newTail = newTail->next;
        }

        // 5. Sever the circular link and set new head
        ListNode* newHead = newTail->next;
        newTail->next = nullptr;

        return newHead;
    }
};`,
        explanation: 'C++ implementation connecting tail to head into a ring, locating the split node, and severing the cycle.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        keyVariables: [
          { name: 'length', description: 'Total number of nodes in the linked list.' },
          { name: 'tail', description: 'Pointer to the last node of the original list.' },
          { name: 'stepsToNewTail', description: 'Number of steps from tail to reach the new tail (length - k).' },
          { name: 'newTail', description: 'Node that will become the end of the rotated list (next set to NULL).' },
          { name: 'newHead', description: 'The new entry point of the rotated list (originally newTail->next).' },
        ],
      },
      c: {
        language: 'c',
        code: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* rotateRight(struct ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;

    // 1. Calculate the length and locate the tail node
    int length = 1;
    struct ListNode* tail = head;
    while (tail->next != NULL) {
        tail = tail->next;
        length++;
    }

    // 2. Normalize k
    k = k % length;
    if (k == 0) return head;

    // 3. Connect tail to head to form a circle
    tail->next = head;

    // 4. Traverse to the new tail node: length - k steps from tail
    int stepsToNewTail = length - k;
    struct ListNode* newTail = tail;
    while (stepsToNewTail > 0) {
        newTail = newTail->next;
        stepsToNewTail--;
    }

    // 5. Break the ring and designate new head
    struct ListNode* newHead = newTail->next;
    newTail->next = NULL;

    return newHead;
}`,
        explanation: 'Standard C pointer manipulation forming a circular list and breaking it at position (length - k).',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        keyVariables: [
          { name: 'length', description: 'Total count of nodes in the linked list.' },
          { name: 'tail', description: 'Pointer pointing to the terminal node of the original list.' },
          { name: 'newTail', description: 'Pointer to the node that will terminate the rotated list.' },
          { name: 'newHead', description: 'Pointer to the new head of the rotated list.' },
        ],
      },
      python: {
        language: 'python',
        code: `from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val: int = 0, next: Optional['ListNode'] = None):
        self.val = val
        self.next = next

class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head

        # 1. Compute length and find the tail node
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1

        # 2. Normalize k
        k = k % length
        if k == 0:
            return head

        # 3. Form a circular ring
        tail.next = head

        # 4. Traverse to the new tail: (length - k) steps from tail
        steps_to_new_tail = length - k
        new_tail = tail
        while steps_to_new_tail > 0:
            new_tail = new_tail.next
            steps_to_new_tail -= 1

        # 5. Break cycle and return new head
        new_head = new_tail.next
        new_tail.next = None
        return new_head`,
        explanation: 'Pythonic circular linked list approach with modulo normalization and O(1) space pointer detachment.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        keyVariables: [
          { name: 'length', description: 'Length of the linked list.' },
          { name: 'k', description: 'Normalized rotation count k % length.' },
          { name: 'new_tail', description: 'Node whose next pointer is cleared to None.' },
          { name: 'new_head', description: 'Resulting head returned to caller.' },
        ],
      },
      java: {
        language: 'java',
        code: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        // 1. Calculate length and find tail
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        // 2. Normalize k
        k = k % length;
        if (k == 0) {
            return head;
        }

        // 3. Close the ring
        tail.next = head;

        // 4. Walk to new tail: (length - k) steps from tail
        int stepsToNewTail = length - k;
        ListNode newTail = tail;
        while (stepsToNewTail > 0) {
            newTail = newTail.next;
            stepsToNewTail--;
        }

        // 5. Break the ring and extract new head
        ListNode newHead = newTail.next;
        newTail.next = null;

        return newHead;
    }
}`,
        explanation: 'Java pointer manipulation closing the list into a circular loop and breaking it at the new tail node.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        keyVariables: [
          { name: 'length', description: 'Total node count in the list.' },
          { name: 'k', description: 'Effective rotation steps (k % length).' },
          { name: 'newTail', description: 'End node of the new rotated list.' },
          { name: 'newHead', description: 'Start node of the new rotated list.' },
        ],
      },
    },
    pseudocode: [
      'function rotateRight(head, k):',
      '    if head == NULL or head.next == NULL or k == 0: return head',
      '    length = 1, tail = head',
      '    while tail.next != NULL:',
      '        tail = tail.next',
      '        length = length + 1',
      '    k = k % length',
      '    if k == 0: return head',
      '    tail.next = head // connect tail to head, forming circular list',
      '    stepsToNewTail = length - k',
      '    newTail = tail',
      '    while stepsToNewTail > 0:',
      '        newTail = newTail.next',
      '        stepsToNewTail = stepsToNewTail - 1',
      '    newHead = newTail.next',
      '    newTail.next = NULL // break circular connection',
      '    return newHead',
    ],
    visualizationType: 'rotate-list',
    supportedVisualizer: true,
    defaultInput: { array: [1, 2, 3, 4, 5], target: 2 },
    relatedQuestions: ['reverse-linked-list', 'rotate-array', 'remove-nth-node-from-end-of-list', 'linked-list-cycle'],
  },
];

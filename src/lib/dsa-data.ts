import { slugify } from "@/lib/utils";
import { Topic } from "@/lib/types";

export const dsaTheoretical = [
  {
    id: slugify("Big O Notation Basics"),
    type: "theoretical",
    question: "Explain Big O notation. What do O(1), O(n), O(log n), and O(n^2) mean?",
    answer: `**Answer Guidance:**\n\n- **Big O:** Describes the upper bound of the time/space complexity of an algorithm.\n- **O(1) (Constant):** Time does not increase with input size (e.g., accessing array index).\n- **O(log n) (Logarithmic):** Time increases logarithmically (e.g., Binary Search).\n- **O(n) (Linear):** Time increases linearly (e.g., iterating an array).\n- **O(n^2) (Quadratic):** Time increases quadratically (e.g., nested loops, Bubble Sort).\n- **Importance:** Helps predict scalability.`
  },
  {
    id: slugify("Array vs Linked List"),
    type: "theoretical",
    question: "Compare Arrays and Linked Lists. When would you use one over the other?",
    answer: `**Answer Guidance:**\n\n- **Array:** Contiguous memory. O(1) access. O(n) insertion/deletion (shifting needed).\n- **Linked List:** Non-contiguous. O(n) access. O(1) insertion/deletion (if pointer known).\n- **Usage:** Use Arrays for fast access/cache locality. Use Linked Lists for frequent insertions/deletions.`
  },
  {
    id: slugify("Stack vs Queue"),
    type: "theoretical",
    question: "What is the difference between a Stack and a Queue? Give real-world examples.",
    answer: `**Answer Guidance:**\n\n- **Stack:** LIFO (Last In First Out). Push/Pop. Example: Browser history, Undo mechanisms, Call stack.\n- **Queue:** FIFO (First In First Out). Enqueue/Dequeue. Example: Print jobs, Task scheduling, BFS.`
  },
  {
    id: slugify("Hash Tables"),
    type: "theoretical",
    question: "How do Hash Tables work? Explain collisions and how to handle them.",
    answer: `**Answer Guidance:**\n\n- **Mechanism:** Maps keys to values using a hash function. O(1) average lookup.\n- **Collisions:** When two keys hash to the same index.\n- **Handling:**\n  - **Chaining:** Use a linked list at each bucket.\n  - **Open Addressing:** Find the next open slot (Linear Probing).`
  },
  {
    id: slugify("BFS vs DFS"),
    type: "theoretical",
    question: "Explain BFS (Breadth-First Search) and DFS (Depth-First Search).",
    answer: `**Answer Guidance:**\n\n- **BFS:** Explores neighbors first (level by level). Uses a Queue. Good for finding shortest path in unweighted graphs.\n- **DFS:** Explores as deep as possible first. Uses a Stack (or recursion). Good for pathfinding puzzles, topological sort.`
  },
  // --- New Questions (Batch 1) ---
  {
    id: slugify("Time Complexity of Sorting"),
    type: "theoretical",
    question: "What is the time complexity of Merge Sort, Quick Sort, and Bubble Sort?",
    answer: `**Answer Guidance:**\n\n- **Merge Sort:** O(n log n) always.\n- **Quick Sort:** O(n log n) average, O(n^2) worst case.\n- **Bubble Sort:** O(n^2) average/worst, O(n) best (if already sorted).`
  },
  {
    id: slugify("What is a Heap"),
    type: "theoretical",
    question: "What is a Heap data structure? Difference between Min-Heap and Max-Heap?",
    answer: `**Answer Guidance:**\n\n- **Heap:** A complete binary tree satisfying the heap property.\n- **Min-Heap:** Parent node <= children. Root is minimum.\n- **Max-Heap:** Parent node >= children. Root is maximum.\n- **Uses:** Priority Queues, Heap Sort.`
  },
  {
    id: slugify("Dynamic Programming Concept"),
    type: "theoretical",
    question: "Explain the concept of Dynamic Programming (DP).",
    answer: `**Answer Guidance:**\n\n- **Definition:** Optimization technique breaking problems into overlapping subproblems.\n- **Key properties:**\n  1. **Optimal Substructure:** Solution to problem can be composed of solutions to subproblems.\n  2. **Overlapping Subproblems:** Subproblems recur many times.\n- **Approaches:** Top-down (Memoization), Bottom-up (Tabulation).`
  },
  {
    id: slugify("Greedy Algorithm"),
    type: "theoretical",
    question: "What is a Greedy Algorithm? Give an example.",
    answer: `**Answer Guidance:**\n\n- **Definition:** Algorithm that makes the locally optimal choice at each step hoping to find the global optimum.\n- **Example:** Dijkstra's Algorithm, Prim's Algorithm, Huffman Coding.\n- **Pros/Cons:** Fast, but doesn't always find the best solution for all problems (e.g., Knapsack).`
  },
  {
    id: slugify("Trie Data Structure"),
    type: "theoretical",
    question: "What is a Trie (Prefix Tree)? Where is it used?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Tree-like data structure used to store a dynamic set of strings.\n- **Structure:** Each node represents a character.\n- **Usage:** Autocomplete systems, Spell checkers, IP routing (Longest prefix match).`
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Binary Tree vs BST"),
    type: "theoretical",
    question: "Difference between a Binary Tree and a Binary Search Tree (BST)?",
    answer: `**Answer Guidance:**\n\n- **Binary Tree:** Each node has at most 2 children.\n- **BST:** Binary Tree where left child < parent < right child. Allows O(log n) search.`
  },
  {
    id: slugify("AVL Tree"),
    type: "theoretical",
    question: "What is an AVL Tree?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Self-balancing BST.\n- **Property:** Height difference between left and right subtrees (balance factor) is at most 1.\n- **Benefit:** Guarantees O(log n) for operations.`
  },
  {
    id: slugify("Graph Representations"),
    type: "theoretical",
    question: "Compare Adjacency List vs Adjacency Matrix.",
    answer: `**Answer Guidance:**\n\n- **Adj Matrix:** O(1) edge lookup, O(V^2) space. Good for dense graphs.\n- **Adj List:** O(d) edge lookup, O(V+E) space. Good for sparse graphs.`
  },
  {
    id: slugify("Dijkstra Algorithm"),
    type: "theoretical",
    question: "Explain Dijkstra's Algorithm.",
    answer: `**Answer Guidance:**\n\n- **Goal:** Shortest path from source to all other nodes in weighted graph (non-negative).\n- **Method:** Greedy approach using Priority Queue. Relax edges.`
  },
  {
    id: slugify("Bellman-Ford"),
    type: "theoretical",
    question: "When would you use Bellman-Ford over Dijkstra?",
    answer: `**Answer Guidance:**\n\n- **Use Case:** Graphs with negative edge weights.\n- **Feature:** Can detect negative weight cycles.\n- **Cost:** Slower O(VE) compared to Dijkstra O((V+E)logV).`
  },
  {
    id: slugify("Topological Sort"),
    type: "theoretical",
    question: "What is Topological Sort? Where is it applied?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Linear ordering of vertices in DAG such that for every edge u->v, u comes before v.\n- **App:** Task scheduling, Build systems (dependencies), Course prerequisites.`
  },
  {
    id: slugify("Prim vs Kruskal"),
    type: "theoretical",
    question: "Difference between Prim's and Kruskal's algorithms?",
    answer: `**Answer Guidance:**\n\n- **Goal:** Both find MST (Minimum Spanning Tree).\n- **Prim:** Grows tree from a node (Vertex-based).\n- **Kruskal:** Adds lightest edges, checking for cycles (Edge-based, uses Union-Find).`
  },
  {
    id: slugify("Space Complexity"),
    type: "theoretical",
    question: "What is Auxiliary Space vs Space Complexity?",
    answer: `**Answer Guidance:**\n\n- **Space Complexity:** Total space used (Input + Auxiliary).\n- **Auxiliary Space:** Extra space used by algorithm (excluding input).`
  },
  {
    id: slugify("In-place Sorting"),
    type: "theoretical",
    question: "What does it mean for a sorting algorithm to be In-Place?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Requires small, constant amount of extra space O(1).\n- **Examples:** Bubble Sort, Insertion Sort, Quick Sort, Heapsort.\n- **Not In-Place:** Merge Sort.`
  },
  {
    id: slugify("Stable Sorting"),
    type: "theoretical",
    question: "What is a Stable Sort?",
    answer: `**Answer Guidance:**\n\n- **Definition:** Preserves the relative order of equal elements.\n- **Examples:** Merge Sort, Bubble Sort, Insertion Sort.\n- **Unstable:** Quick Sort, Heap Sort.`
  }
];

export const dsaCoding = [
  {
    id: slugify("Implement Bubble Sort"),
    type: "coding",
    question: "Implement Bubble Sort in JavaScript.",
    answer: `\`\`\`js
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
\`\`\``
  },
  {
    id: slugify("Implement Binary Search"),
    type: "coding",
    question: "Implement Binary Search on a sorted array.",
    answer: `\`\`\`js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // Not found
}
\`\`\``
  },
  {
    id: slugify("Reverse a Linked List"),
    type: "coding",
    question: "Reverse a singly Linked List.",
    answer: `\`\`\`js
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    let nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  return prev;
}
\`\`\``
  },
  {
    id: slugify("Detect Cycle in Linked List"),
    type: "coding",
    question: "Detect if a Linked List has a cycle (Floyd's Cycle-Finding Algorithm).",
    answer: `\`\`\`js
function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
\`\`\``
  },
  {
    id: slugify("Valid Parentheses"),
    type: "coding",
    question: "Check if a string of parentheses '()[]{}' is valid.",
    answer: `\`\`\`js
function isValid(s) {
  const stack = [];
  const map = { '(': ')', '{': '}', '[': ']' };
  
  for (let char of s) {
    if (map[char]) {
      stack.push(map[char]);
    } else {
      if (stack.pop() !== char) return false;
    }
  }
  return stack.length === 0;
}
\`\`\``
  },
  // --- New Questions (Batch 1) ---
  {
    id: slugify("Merge Two Sorted Lists"),
    type: "coding",
    question: "Merge two sorted linked lists into one sorted list.",
    answer: `\`\`\`js
function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
\`\`\``
  },
  {
    id: slugify("Maximum Subarray Sum"),
    type: "coding",
    question: "Find the contiguous subarray with the largest sum (Kadane's Algorithm).",
    answer: `\`\`\`js
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}
\`\`\``
  },
  {
    id: slugify("Two Sum"),
    type: "coding",
    question: "Given an array of integers and a target, return indices of the two numbers that add up to target.",
    answer: `\`\`\`js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
\`\`\``
  },
  {
    id: slugify("Lowest Common Ancestor BST"),
    type: "coding",
    question: "Find the Lowest Common Ancestor (LCA) in a Binary Search Tree (BST).",
    answer: `\`\`\`js
function lowestCommonAncestor(root, p, q) {
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else {
    return root;
  }
}
\`\`\``
  },
  {
    id: slugify("Climbing Stairs"),
    type: "coding",
    question: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    answer: `\`\`\`js
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}
\`\`\``
  },
  // --- New Questions (Batch 2) ---
  {
    id: slugify("Invert Binary Tree"),
    type: "coding",
    question: "Invert a binary tree.",
    answer: `\`\`\`js
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
\`\`\``
  },
  {
    id: slugify("Maximum Depth of Binary Tree"),
    type: "coding",
    question: "Find the maximum depth of a binary tree.",
    answer: `\`\`\`js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\``
  },
  {
    id: slugify("Same Tree"),
    type: "coding",
    question: "Check if two binary trees are the same.",
    answer: `\`\`\`js
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
\`\`\``
  },
  {
    id: slugify("Number of Islands"),
    type: "coding",
    question: "Given a grid of '1's (land) and '0's (water), count the number of islands. (DFS/BFS)",
    answer: `\`\`\`js
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark as visited
    dfs(r+1, c);
    dfs(r-1, c);
    dfs(r, c+1);
    dfs(r, c-1);
  };
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
\`\`\``
  },
  {
    id: slugify("Longest Substring Without Repeating Characters"),
    type: "coding",
    question: "Find length of longest substring without repeating characters.",
    answer: `\`\`\`js
function lengthOfLongestSubstring(s) {
  let map = new Map();
  let left = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(map.get(s[right]) + 1, left);
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
\`\`\``
  },
  {
    id: slugify("3Sum"),
    type: "coding",
    question: "Find all unique triplets in the array which gives the sum of zero.",
    answer: `\`\`\`js
function threeSum(nums) {
  nums.sort((a,b) => a-b);
  const res = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let l = i+1, r = nums.length-1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l+1]) l++;
        while (l < r && nums[r] === nums[r-1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
}
\`\`\``
  },
  {
    id: slugify("Container With Most Water"),
    type: "coding",
    question: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    answer: `\`\`\`js
function maxArea(height) {
  let l = 0, r = height.length - 1;
  let max = 0;
  while (l < r) {
    const w = r - l;
    const h = Math.min(height[l], height[r]);
    max = Math.max(max, w * h);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}
\`\`\``
  },
  {
    id: slugify("Group Anagrams"),
    type: "coding",
    question: "Group an array of strings into anagrams.",
    answer: `\`\`\`js
function groupAnagrams(strs) {
  const map = new Map();
  for (let s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}
\`\`\``
  },
  {
    id: slugify("Sort Colors"),
    type: "coding",
    question: "Sort an array of 0s, 1s, and 2s in-place (Dutch National Flag problem).",
    answer: `\`\`\`js
function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}
\`\`\``
  },
  {
    id: slugify("Product of Array Except Self"),
    type: "coding",
    question: "Return an array such that answer[i] is equal to the product of all the elements of nums except nums[i]. No division allowed.",
    answer: `\`\`\`js
function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}
\`\`\``
  }
];

export const dsaPath: Topic[] = [
  { id: "dsa-theoretical", title: "DSA Concepts", questions: dsaTheoretical as any },
  { id: "dsa-coding", title: "Algorithms", questions: dsaCoding as any },
];

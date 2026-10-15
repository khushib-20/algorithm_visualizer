export const CATEGORIES = [
  { id: 'sorting', name: 'Sorting' },
  { id: 'searching', name: 'Searching' },
  { id: 'graphs', name: 'Graphs' },
];

export const algorithmsInCategory = (categoryId) =>
  Object.entries(ALGORITHMS).filter(([, algo]) => algo.category === categoryId);

export const ALGORITHMS = {
  //sorting
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    shortDescription: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if in the wrong order.',
    howItWorks: [
      'Iterate through the array from the first to the penultimate element.',
      'Compare each element with its adjacent neighbor.',
      'If the current element is greater than the next element, swap them.',
      'After each pass, the next largest element settles into its correct sorted position at the end.',
      'Repeat until no swaps are required in a full pass.'
    ],
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    },
    stability: 'Stable',
    inPlace: 'Yes',
    bestUseCases: [
      'Educational introduction to sorting concepts.',
      'Small datasets or lists that are already nearly sorted.'
    ],
    advantages: [
      'Simplest sorting algorithm to understand and implement.',
      'Requires zero auxiliary memory (O(1) extra space).',
      'Detects already sorted arrays in O(n) time with early exit.'
    ],
    limitations: [
      'Extremely inefficient on large datasets with quadratic O(n²) runtime.',
      'Performs a high number of element swaps.'
    ]
  },
  'selection-sort': {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    shortDescription: 'Divides input into sorted and unsorted regions, repeatedly finding the minimum element from the unsorted region.',
    howItWorks: [
      'Maintain two sub-arrays: sorted (left) and unsorted (right).',
      'Scan the unsorted portion to find the minimum element.',
      'Swap the found minimum element with the first element of the unsorted section.',
      'Advance the boundary of the sorted region by one position.',
      'Repeat until the entire array is sorted.'
    ],
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    },
    stability: 'Unstable',
    inPlace: 'Yes',
    bestUseCases: [
      'Small arrays where memory write operations are significantly more expensive than reads.',
      'Embedded systems with very strict memory constraints.'
    ],
    advantages: [
      'Performs at most O(n) swaps, ideal when writing to memory is costly.',
      'In-place sorting with O(1) auxiliary space.',
      'Simple, predictable step-by-step logic.'
    ],
    limitations: [
      'Always runs in O(n²) time regardless of whether the array is already sorted.',
      'Not a stable sort in its default implementation.'
    ]
  },
  'insertion-sort': {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    shortDescription: 'Builds the final sorted array one item at a time by repeatedly picking and inserting into the sorted portion.',
    howItWorks: [
      'Assume the first element is already sorted.',
      'Pick the next element (the "key") from the unsorted segment.',
      'Compare the key with elements in the sorted segment from right to left.',
      'Shift elements that are greater than the key one position to the right.',
      'Insert the key into its correct vacant position.',
      'Repeat for all remaining elements.'
    ],
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)'
    },
    stability: 'Stable',
    inPlace: 'Yes',
    bestUseCases: [
      'Small datasets (typically < 30 elements).',
      'Online sorting where data arrives in a continuous stream.',
      'Nearly sorted arrays.'
    ],
    advantages: [
      'Adaptive: runs in linear O(n) time for already sorted data.',
      'Stable sort that preserves the relative order of duplicate elements.',
      'Very low overhead and used as the base case in hybrid algorithms like Timsort.'
    ],
    limitations: [
      'Quadratic worst-case performance for reverse-sorted arrays.',
      'Requires substantial element shifting.'
    ]
  },
  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    shortDescription: 'A divide-and-conquer algorithm that recursively splits the array into halves and merges the sorted halves.',
    howItWorks: [
      'Divide the unsorted array into two halves at the midpoint.',
      'Recursively sort each half until sub-arrays of size 1 are reached.',
      'Merge the two sorted sub-arrays by comparing the smallest elements of each.',
      'Copy merged elements back into the main array.',
      'Repeat until all levels are merged.'
    ],
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)'
    },
    stability: 'Stable',
    inPlace: 'No',
    bestUseCases: [
      'Sorting linked lists without requiring random memory access.',
      'External sorting when datasets exceed available RAM.',
      'Applications requiring guaranteed O(n log n) worst-case time.'
    ],
    advantages: [
      'Guaranteed O(n log n) runtime across all input variations.',
      'Stable sorting preserving equal element order.',
      'Highly parallelizable divide-and-conquer structure.'
    ],
    limitations: [
      'Requires O(n) auxiliary memory for buffer arrays.',
      'Slower than Quick Sort on average for in-memory primitive arrays due to memory copying.'
    ]
  },
  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    shortDescription: 'Selects a "pivot" element, partitions other elements into smaller and greater subsets, and recursively sorts.',
    howItWorks: [
      'Select a pivot element from the current array segment.',
      'Partition the segment: move elements smaller than the pivot to its left and larger to its right.',
      'Place the pivot into its final sorted position.',
      'Recursively apply the same partitioning to the left and right sub-arrays.'
    ],
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)'
    },
    stability: 'Unstable',
    inPlace: 'Yes',
    bestUseCases: [
      'General-purpose fast in-memory sorting.',
      'Standard library sorting for primitive types in many runtimes.'
    ],
    advantages: [
      'Fastest average-case sorting algorithm in practice with excellent cache locality.',
      'In-place sort requiring only O(log n) recursion stack space.',
      'Tail-call optimizations possible.'
    ],
    limitations: [
      'O(n²) worst-case runtime when pivot selection is poor (mitigated by median-of-three).',
      'Unstable default partitioning.'
    ]
  },
  'heap-sort': {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    shortDescription: 'Builds a max-heap from the input data, then repeatedly extracts the maximum element and restores the heap property.',
    howItWorks: [
      'Build a max-heap from the input array so the largest element is at index 0.',
      'Swap root (index 0) with the last element of the heap.',
      'Reduce the heap size by one.',
      'Heapify down the new root to maintain the max-heap invariant.',
      'Repeat until all elements have been extracted into the sorted section.'
    ],
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)'
    },
    stability: 'Unstable',
    inPlace: 'Yes',
    bestUseCases: [
      'Systems requiring strict worst-case O(n log n) time and O(1) space.',
      'Real-time safety-critical systems where predictable memory and latency are vital.'
    ],
    advantages: [
      'Guaranteed O(n log n) runtime with zero auxiliary memory.',
      'Does not suffer from catastrophic quadratic degradation like Quick Sort.',
      'In-place binary heap representation inside the array.'
    ],
    limitations: [
      'Poor cache locality compared to Quick Sort due to jumping array indices.',
      'Unstable sorting.'
    ]
  },

  // === SEARCHING ===
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    shortDescription: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    howItWorks: [
      'Start at the first element (index 0).',
      'Compare the target value with the current element.',
      'If equal, return the current index.',
      'If not equal, move to the next index.',
      'If the end of the array is reached without a match, report target not found.'
    ],
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)'
    },
    stability: 'N/A',
    inPlace: 'Yes',
    bestUseCases: [
      'Unsorted datasets where sorting beforehand is not cost-effective.',
      'Small collections with fewer than 20 items.'
    ],
    advantages: [
      'Works on completely unsorted and unordered data.',
      'Direct sequential memory access with optimal CPU cache performance.',
      'Requires no additional memory.'
    ],
    limitations: [
      'Linear time complexity O(n) becomes prohibitively slow for large datasets.'
    ]
  },
  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    shortDescription: 'Repeatedly divides a sorted search interval in half to locate a target value in logarithmic time.',
    howItWorks: [
      'Verify the array is sorted in ascending order.',
      'Initialize pointers: low = 0 and high = array.length - 1.',
      'Calculate mid = floor((low + high) / 2).',
      'If target equals array[mid], element is found.',
      'If target is smaller than array[mid], narrow search to left half: high = mid - 1.',
      'If target is greater, narrow to right half: low = mid + 1.',
      'Repeat while low <= high.'
    ],
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)'
    },
    stability: 'N/A',
    inPlace: 'Yes',
    bestUseCases: [
      'Frequent lookups on static or rarely modified sorted datasets.',
      'Database B-Tree index block lookups.'
    ],
    advantages: [
      'Extremely fast logarithmic runtime O(log n); searches 1 billion items in ~30 comparisons.',
      'Minimal O(1) space requirement in iterative form.'
    ],
    limitations: [
      'Requires the data to be strictly sorted in advance.',
      'Requires random access support (inefficient on singly linked lists).'
    ]
  },

  // === GRAPH ALGORITHMS ===
  'bfs': {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'graphs',
    shortDescription: 'Explores the graph level by level using a Queue, finding the shortest path on unweighted graphs.',
    howItWorks: [
      'Mark the start node as visited and enqueue it into a FIFO Queue.',
      'While the queue is not empty, dequeue the front node.',
      'Inspect each unvisited neighbor of the current node.',
      'Mark neighbors as visited, record parent pointers, and enqueue them.',
      'Continue until all reachable nodes are visited or target is found.'
    ],
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)'
    },
    stability: 'N/A',
    inPlace: 'No',
    bestUseCases: [
      'Finding the shortest path in unweighted graphs or grids.',
      'Peer-to-peer torrent discovery, social network degrees of separation.'
    ],
    advantages: [
      'Guaranteed to find the path with the fewest edges.',
      'Simple queue-based iterative implementation.'
    ],
    limitations: [
      'High memory consumption storing entire frontier in queue: O(b^d).'
    ]
  },
  'dfs': {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'graphs',
    shortDescription: 'Explores as deep as possible along each branch before backtracking, utilizing a Stack or recursion.',
    howItWorks: [
      'Push the start node onto the stack (or call recursive function) and mark visited.',
      'Pop the current node and visit its first unvisited neighbor.',
      'Recurse deeply along that branch until a dead end is reached.',
      'Backtrack to the previous node and explore alternate branches.',
      'Repeat until all connected components are explored.'
    ],
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)'
    },
    stability: 'N/A',
    inPlace: 'No',
    bestUseCases: [
      'Cycle detection in directed and undirected graphs.',
      'Topological sorting and connected components discovery.',
      'Solving maze puzzles.'
    ],
    advantages: [
      'Requires less memory than BFS on deep graphs: O(h) where h is height.',
      'Forms the foundation of many advanced graph algorithms.'
    ],
    limitations: [
      'Does not guarantee shortest path.',
      'Can get trapped in infinite depth without cycle prevention.'
    ]
  },
  'dijkstra': {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graphs',
    shortDescription: 'Finds the shortest paths from a single source node to all other nodes in a graph with non-negative edge weights.',
    howItWorks: [
      'Set distance to start node as 0 and all other nodes to infinity.',
      'Insert all nodes into a priority queue keyed by tentative distance.',
      'Extract the node with the minimum tentative distance.',
      'For each neighbor, calculate alternative distance via current node.',
      'If alternative distance is less than current recorded distance, update it (relaxation).',
      'Repeat until the target is visited or queue is empty.'
    ],
    complexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
      space: 'O(V)'
    },
    stability: 'N/A',
    inPlace: 'No',
    bestUseCases: [
      'GPS navigation and map routing.',
      'Network routing protocols (OSPF, IS-IS).'
    ],
    advantages: [
      'Optimal shortest path guarantee for non-negative weighted graphs.',
      'Highly efficient with min-heap / priority queue.'
    ],
    limitations: [
      'Fails or loops infinitely if negative edge weights are present (requires Bellman-Ford).'
    ]
  },
};
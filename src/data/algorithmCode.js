export const ALGORITHM_CODE = {
    //Sorting algorithms
  'bubble-sort': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> bubbleSort(vector<int> arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return arr;
}`,
    py: `def bubble_sort(arr):
    arr = arr.copy()
    n = len(arr)

    for i in range(n - 1):
        swapped = False

        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr`,
  },

  'selection-sort': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> selectionSort(vector<int> arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }

    return arr;
}`,
    py: `def selection_sort(arr):
    arr = arr.copy()
    n = len(arr)

    for i in range(n - 1):
        min_idx = i

        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr`,
  },

  'insertion-sort': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> insertionSort(vector<int> arr) {
    int n = arr.size();

    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}`,
    py: `def insertion_sort(arr):
    arr = arr.copy()

    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key

    return arr`,
  },

  'merge-sort': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

void mergeParts(vector<int>& arr, int l, int mid, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + mid + 1);
    vector<int> right(arr.begin() + mid + 1, arr.begin() + r + 1);

    int i = 0, j = 0, k = l;

    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }

    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;

    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    mergeParts(arr, l, mid, r);
}`,
    py: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr.copy()

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },

  'quick-sort': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}`,
    py: `def quick_sort(arr):
    arr = arr.copy()

    def partition(low, high):
        pivot = arr[high]
        i = low - 1

        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    def sort(low, high):
        if low < high:
            pivot_idx = partition(low, high)
            sort(low, pivot_idx - 1)
            sort(pivot_idx + 1, high)

    sort(0, len(arr) - 1)
    return arr`,
  },

  'heap-sort': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

vector<int> heapSort(vector<int> arr) {
    int n = arr.size();

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }

    return arr;
}`,
    py: `def heap_sort(arr):
    arr = arr.copy()
    n = len(arr)

    def heapify(size, root):
        largest = root
        left = 2 * root + 1
        right = 2 * root + 2

        if left < size and arr[left] > arr[largest]:
            largest = left

        if right < size and arr[right] > arr[largest]:
            largest = right

        if largest != root:
            arr[root], arr[largest] = arr[largest], arr[root]
            heapify(size, largest)

    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)

    return arr`,
  },

  //Searching algorithms

  'linear-search': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }

    return -1;
}`,
    py: `def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i

    return -1`,
  },

  'binary-search': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Input array must be sorted in ascending order.
int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`,
    py: `def binary_search(arr, target):
    # Input must be sorted in ascending order.
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1`,
  },

  //graph traversal algorithms

  'bfs': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

using Graph = unordered_map<char, vector<pair<char, int>>>;

vector<char> bfs(const Graph& graph, char start, char target) {
    unordered_set<char> visited;
    queue<char> q;
    vector<char> order;

    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        char curr = q.front();
        q.pop();
        order.push_back(curr);

        if (curr == target) break;

        auto it = graph.find(curr);
        if (it == graph.end()) continue;

        for (const auto& edge : it->second) {
            char neighbor = edge.first;

            if (!visited.count(neighbor)) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }

    return order;
}`,
    py: `from collections import deque

def bfs(graph, start, target):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        curr = queue.popleft()
        order.append(curr)

        if curr == target:
            break

        for neighbor, _weight in graph.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order`,
  },

  'dfs': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

using Graph = unordered_map<char, vector<pair<char, int>>>;

vector<char> dfs(const Graph& graph, char start, char target) {
    unordered_set<char> visited;
    vector<char> order;

    function<bool(char)> traverse = [&](char node) {
        visited.insert(node);
        order.push_back(node);

        if (node == target) return true;

        auto it = graph.find(node);
        if (it == graph.end()) return false;

        for (const auto& edge : it->second) {
            char neighbor = edge.first;

            if (!visited.count(neighbor) && traverse(neighbor)) {
                return true;
            }
        }

        return false;
    };

    traverse(start);
    return order;
}`,
    py: `def dfs(graph, start, target):
    visited = set()
    order = []

    def traverse(node):
        visited.add(node)
        order.append(node)

        if node == target:
            return True

        for neighbor, _weight in graph.get(node, []):
            if neighbor not in visited and traverse(neighbor):
                return True

        return False

    traverse(start)
    return order`,
  },

  'dijkstra': {
    cpp: `#include <bits/stdc++.h>
using namespace std;

using Graph = unordered_map<char, vector<pair<char, int>>>;
const int INF = numeric_limits<int>::max();

struct DijkstraResult {
    unordered_map<char, int> dist;
    unordered_map<char, char> prev;
};

DijkstraResult dijkstra(const Graph& graph, char start, char target) {
    unordered_map<char, int> dist;
    unordered_map<char, char> prev;

    // Initialize every node, including destination-only nodes.
    for (const auto& entry : graph) {
        dist[entry.first] = INF;
        for (const auto& edge : entry.second) {
            dist[edge.first] = INF;
        }
    }

    dist[start] = 0;

    using Item = pair<int, char>;
    priority_queue<Item, vector<Item>, greater<Item>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [distance, curr] = pq.top();
        pq.pop();

        if (distance != dist[curr]) continue;
        if (curr == target) break;

        auto it = graph.find(curr);
        if (it == graph.end()) continue;

        for (const auto& edge : it->second) {
            char neighbor = edge.first;
            int weight = edge.second;

            if (weight < 0) {
                throw invalid_argument("Dijkstra requires non-negative weights");
            }

            if (distance > INF - weight) continue;
            int candidate = distance + weight;

            if (candidate < dist[neighbor]) {
                dist[neighbor] = candidate;
                prev[neighbor] = curr;
                pq.push({candidate, neighbor});
            }
        }
    }

    return {dist, prev};
}`,
    py: `import heapq
from math import inf

def dijkstra(graph, start, target):
    # Graph maps nodes to (neighbor, weight) pairs.
    nodes = set(graph)
    for edges in graph.values():
        for neighbor, _weight in edges:
            nodes.add(neighbor)

    nodes.add(start)
    dist = {node: inf for node in nodes}
    prev = {}

    dist[start] = 0
    pq = [(0, start)]

    while pq:
        distance, curr = heapq.heappop(pq)

        if distance != dist[curr]:
            continue

        if curr == target:
            break

        for neighbor, weight in graph.get(curr, []):
            if weight < 0:
                raise ValueError(
                    "Dijkstra requires non-negative weights"
                )

            candidate = distance + weight

            if candidate < dist[neighbor]:
                dist[neighbor] = candidate
                prev[neighbor] = curr
                heapq.heappush(pq, (candidate, neighbor))

    return dist, prev`,
  },
};

export const CODE_ANCHORS = {
  'bubble-sort': {
    init: ['vector<int> bubbleSort', 'def bubble_sort'],
    compare: ['if (arr[j] > arr[j + 1])', 'if arr[j] > arr[j + 1]:'],
    swap: ['swap(arr[j], arr[j + 1]);', 'arr[j], arr[j + 1] = arr[j + 1], arr[j]'],
    'element-sorted': ['if (!swapped) break;', 'if not swapped:'],
    complete: ['return arr;', 'return arr'],
  },
  'selection-sort': {
    init: ['vector<int> selectionSort', 'def selection_sort'],
    'set-min': ['int minIdx = i;', 'min_idx = i'],
    compare: ['if (arr[j] < arr[minIdx])', 'if arr[j] < arr[min_idx]:'],
    'update-min': ['minIdx = j;', 'min_idx = j'],
    swap: ['swap(arr[i], arr[minIdx]);', 'arr[i], arr[min_idx] = arr[min_idx], arr[i]'],
    'element-sorted': ['if (minIdx != i)', 'if min_idx != i:'],
    complete: ['return arr;', 'return arr'],
  },
  'insertion-sort': {
    init: ['vector<int> insertionSort', 'def insertion_sort'],
    'pick-key': ['int key = arr[i];', 'key = arr[i]'],
    compare: ['while (j >= 0 && arr[j] > key)', 'while j >= 0 and arr[j] > key:'],
    shift: ['arr[j + 1] = arr[j];', 'arr[j + 1] = arr[j]'],
    'insert-key': ['arr[j + 1] = key;', 'arr[j + 1] = key'],
    complete: ['return arr;', 'return arr'],
  },
  'merge-sort': {
    init: ['void mergeSort(', 'def merge_sort'],
    split: ['int mid = l + (r - l) / 2;', 'mid = len(arr) // 2'],
    'merge-start': ['vector<int> left(', 'result = []'],
    compare: ['while (i < left.size() && j < right.size())', 'while i < len(left) and j < len(right):'],
    overwrite: ['if (left[i] <= right[j])', 'if left[i] <= right[j]:'],
    'flush-left': ['while (i < left.size()) arr[k++]', 'result.extend(left[i:])'],
    'flush-right': ['while (j < right.size()) arr[k++]', 'result.extend(right[j:])'],
    complete: ['mergeParts(arr, l, mid, r);', 'return result'],
  },
  'quick-sort': {
    init: ['void quickSort(', 'def quick_sort'],
    'choose-pivot': ['int pivot = arr[high];', 'pivot = arr[high]'],
    compare: ['if (arr[j] <= pivot)', 'if arr[j] <= pivot:'],
    swap: ['swap(arr[i], arr[j]);', 'arr[i], arr[j] = arr[j], arr[i]'],
    'swap-pivot': ['swap(arr[i + 1], arr[high]);', 'arr[i + 1], arr[high] = arr[high], arr[i + 1]'],
    'pivot-placed': ['int pivotIdx = partition(', 'pivot_idx = partition('],
    complete: ['quickSort(arr, pivotIdx + 1, high);', 'sort(0, len(arr) - 1)'],
  },
  'heap-sort': {
    init: ['vector<int> heapSort', 'def heap_sort'],
    'heapify-check': ['int largest = i;', 'largest = root'],
    swap: ['swap(arr[i], arr[largest]);', 'arr[root], arr[largest] = arr[largest], arr[root]'],
    'heap-built': ['for (int i = n / 2 - 1', 'for i in range(n // 2 - 1'],
    extract: ['swap(arr[0], arr[i]);', 'arr[0], arr[i] = arr[i], arr[0]'],
    complete: ['return arr;', 'return arr'],
  },
  'linear-search': {
    init: ['int linearSearch(', 'def linear_search'],
    compare: ['if (arr[i] == target)', 'if value == target:'],
    found: ['return i;', 'return i'],
    'not-found': ['return -1;', 'return -1'],
  },
  'binary-search': {
    init: ['int low = 0;', 'low = 0'],
    'calculate-mid': ['int mid = low + (high - low) / 2;', 'mid = low + (high - low) // 2'],
    found: ['return mid;', 'return mid'],
    'narrow-right': ['low = mid + 1;', 'low = mid + 1'],
    'narrow-left': ['high = mid - 1;', 'high = mid - 1'],
    'not-found': ['return -1;', 'return -1'],
  },
  bfs: {
    init: ['q.push(start);', 'queue = deque([start])'],
    'visit-node': ['char curr = q.front();', 'curr = queue.popleft()'],
    'target-reached': ['if (curr == target) break;', 'if curr == target:'],
    'check-neighbor': ['if (!visited.count(neighbor))', 'if neighbor not in visited:'],
    'enqueue-neighbor': ['q.push(neighbor);', 'queue.append(neighbor)'],
  },
  dfs: {
    init: ['function<bool(char)> traverse', 'def traverse(node):'],
    'visit-node': ['visited.insert(node);', 'visited.add(node)'],
    'target-reached': ['if (node == target) return true;', 'if node == target:'],
    'explore-edge': ['if (!visited.count(neighbor) && traverse(neighbor))', 'if neighbor not in visited and traverse(neighbor):'],
    backtrack: ['return false;', 'return False'],
  },
  dijkstra: {
    init: ['dist[start] = 0;', 'dist[start] = 0'],
    'pick-min': ['auto [distance, curr] = pq.top();', 'distance, curr = heapq.heappop(pq)'],
    complete: ['if (curr == target) break;', 'if curr == target:'],
    'relax-edge': ['int candidate = distance + weight;', 'candidate = distance + weight'],
    'distance-updated': ['dist[neighbor] = candidate;', 'dist[neighbor] = candidate'],
  },
};

export function getCodeLine(algorithmId, language, stepType) {
  const anchor = CODE_ANCHORS[algorithmId]?.[stepType];
  const source = ALGORITHM_CODE[algorithmId]?.[language];
  if (!anchor || !source) return null;

  const needle = anchor[language === 'cpp' ? 0 : 1];
  const lines = source.split('\n');

  let index = lines.findIndex((line) => line.trim() === needle);
  if (index === -1) index = lines.findIndex((line) => line.includes(needle));
  return index === -1 ? null : index + 1;
}

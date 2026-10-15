// Step generators for graph traversal / shortest path.
//
// Every step is { type, state, explanation }.
// `type` also selects which line of source code is highlighted
// (see CODE_ANCHORS in data/algorithmCode.js).
//
// state:
//   visited     nodes already processed
//   frontier    queue (BFS) or the waiting recursion stack (DFS)
//   current     node being processed
//   path        the final route, only once the target is reached
//   activeEdge  edge being inspected, { u, v }
//   distances   (Dijkstra) tentative distances

export const DEFAULT_GRAPH = {
  nodes: [
    { id: 'A', label: 'A', x: 80, y: 150 },
    { id: 'B', label: 'B', x: 200, y: 70 },
    { id: 'C', label: 'C', x: 200, y: 230 },
    { id: 'D', label: 'D', x: 340, y: 70 },
    { id: 'E', label: 'E', x: 340, y: 230 },
    { id: 'F', label: 'F', x: 460, y: 150 },
  ],
  edges: [
    { u: 'A', v: 'B', weight: 4 },
    { u: 'A', v: 'C', weight: 2 },
    { u: 'B', v: 'C', weight: 1 },
    { u: 'B', v: 'D', weight: 5 },
    { u: 'C', v: 'E', weight: 8 },
    { u: 'C', v: 'D', weight: 10 },
    { u: 'D', v: 'E', weight: 2 },
    { u: 'D', v: 'F', weight: 6 },
    { u: 'E', v: 'F', weight: 3 },
  ],
};

function getAdjacency(graph) {
  const adj = {};
  graph.nodes.forEach((n) => {
    adj[n.id] = [];
  });
  graph.edges.forEach((e) => {
    adj[e.u].push({ node: e.v, weight: e.weight ?? 1 });
    adj[e.v].push({ node: e.u, weight: e.weight ?? 1 });
  });
  return adj;
}

function tracePath(prev, target) {
  const path = [];
  for (let node = target; node !== undefined; node = prev[node]) {
    path.unshift(node);
  }
  return path;
}

// ---------------------------------------------------------------- BFS

export function generateBFSSteps(graph = DEFAULT_GRAPH, startNode = 'A', targetNode = 'F') {
  const steps = [];
  const adj = getAdjacency(graph);
  const visited = new Set([startNode]);
  const queue = [startNode];
  const parent = {};

  steps.push({
    type: 'init',
    state: { visited: [...visited], frontier: [...queue], current: startNode, path: [], activeEdge: null },
    explanation: {
      operation: `Initialize BFS at start node ${startNode}. Marked visited and enqueued.`,
      why: 'BFS explores the graph level-by-level using a FIFO queue.',
      stateVars: { startNode, queue: [...queue], visited: [...visited] },
      next: `Dequeue ${startNode} and inspect all neighbors.`,
    },
  });

  while (queue.length > 0) {
    const curr = queue.shift();

    steps.push({
      type: 'visit-node',
      state: { visited: [...visited], frontier: [...queue], current: curr, path: [], activeEdge: null },
      explanation: {
        operation: `Dequeued and visiting node ${curr}.`,
        why: 'Processing the next node at the current BFS depth level.',
        stateVars: { currentNode: curr, remainingQueue: [...queue] },
        next: `Examine neighbors of node ${curr}.`,
      },
    });

    if (curr === targetNode) {
      const path = tracePath(parent, targetNode);

      steps.push({
        type: 'target-reached',
        state: { visited: [...visited], frontier: [...queue], current: curr, path, activeEdge: null },
        explanation: {
          operation: `Target node ${targetNode} reached! Shortest path: ${path.join(' -> ')}.`,
          why: 'BFS guarantees the path with the minimum number of edge hops.',
          stateVars: { targetNode, pathLength: path.length - 1, fullPath: path },
          next: 'Search complete.',
        },
      });
      return steps;
    }

    for (const { node: neighbor } of adj[curr]) {
      const seen = visited.has(neighbor);

      steps.push({
        type: 'check-neighbor',
        state: { visited: [...visited], frontier: [...queue], current: curr, path: [], activeEdge: { u: curr, v: neighbor } },
        explanation: {
          operation: `Inspecting neighbor edge (${curr} -> ${neighbor}).`,
          why: 'Check if neighbor has already been visited or is in queue.',
          stateVars: { neighbor, alreadyVisited: seen },
          next: seen ? `Node ${neighbor} already visited. Skipping.` : `Enqueue node ${neighbor}.`,
        },
      });

      if (!seen) {
        visited.add(neighbor);
        parent[neighbor] = curr;
        queue.push(neighbor);

        steps.push({
          type: 'enqueue-neighbor',
          state: { visited: [...visited], frontier: [...queue], current: curr, path: [], activeEdge: { u: curr, v: neighbor } },
          explanation: {
            operation: `Enqueued neighbor node ${neighbor}.`,
            why: 'Node added to frontier to be explored in subsequent BFS level.',
            stateVars: { enqueued: neighbor, queue: [...queue] },
            next: 'Continue inspecting remaining neighbors.',
          },
        });
      }
    }
  }

  return steps;
}

// ---------------------------------------------------------------- DFS

export function generateDFSSteps(graph = DEFAULT_GRAPH, startNode = 'A', targetNode = 'F') {
  const steps = [];
  const adj = getAdjacency(graph);
  const visited = new Set();
  const trail = []; // current root -> node recursion stack

  steps.push({
    type: 'init',
    state: { visited: [], frontier: [], current: startNode, path: [], activeEdge: null },
    explanation: {
      operation: `Initiating Depth-First Search from node ${startNode}.`,
      why: 'DFS dives deep along each branch before backtracking.',
      stateVars: { startNode },
      next: 'Visit start node.',
    },
  });

  // frontier = nodes still waiting on the recursion stack (everything except `current`)
  const snapshot = (current, extra = {}) => ({
    visited: [...visited],
    frontier: trail.filter((id) => id !== current),
    current,
    path: [],
    activeEdge: null,
    ...extra,
  });

  function visit(curr, parentNode = null) {
    visited.add(curr);
    trail.push(curr);

    steps.push({
      type: 'visit-node',
      state: snapshot(curr, { activeEdge: parentNode ? { u: parentNode, v: curr } : null }),
      explanation: {
        operation: `Visited node ${curr}. Call stack depth: ${trail.length}.`,
        why: 'Advancing as far forward as possible along the current path.',
        stateVars: { currentNode: curr, callStack: [...trail] },
        next: curr === targetNode ? 'Target reached!' : `Explore unvisited neighbors of ${curr}.`,
      },
    });

    if (curr === targetNode) {
      const path = [...trail];

      steps.push({
        type: 'target-reached',
        state: snapshot(curr, { path }),
        explanation: {
          operation: `Target node ${targetNode} found. Route taken: ${path.join(' -> ')}.`,
          why: 'DFS stops at the first route it finds; it is not necessarily the shortest.',
          stateVars: { targetNode, route: path },
          next: 'Search complete.',
        },
      });
      return true;
    }

    for (const { node: neighbor } of adj[curr]) {
      if (visited.has(neighbor)) continue;

      steps.push({
        type: 'explore-edge',
        state: snapshot(curr, { activeEdge: { u: curr, v: neighbor } }),
        explanation: {
          operation: `Exploring unvisited neighbor edge (${curr} -> ${neighbor}).`,
          why: 'Recursively descend into neighbor branch.',
          stateVars: { from: curr, to: neighbor },
          next: `Call traverse(${neighbor}).`,
        },
      });

      if (visit(neighbor, curr)) return true;

      trail.pop(); // neighbor's branch is exhausted

      steps.push({
        type: 'backtrack',
        state: snapshot(curr),
        explanation: {
          operation: `Backtracked to node ${curr} from ${neighbor}.`,
          why: 'Finished exploring that branch (dead end or all neighbors visited).',
          stateVars: { backtrackedTo: curr, callStack: [...trail] },
          next: 'Check remaining neighbors.',
        },
      });
    }

    return false;
  }

  visit(startNode);
  return steps;
}

// ----------------------------------------------------------- Dijkstra

export function generateDijkstraSteps(graph = DEFAULT_GRAPH, start = 'A', end = 'F') {
  const steps = [];
  const adj = getAdjacency(graph);
  const dist = {};
  const prev = {};
  const unvisited = new Set(graph.nodes.map((n) => n.id));

  graph.nodes.forEach((n) => {
    dist[n.id] = Infinity;
  });
  dist[start] = 0;

  steps.push({
    type: 'init',
    state: { visited: [], current: start, distances: { ...dist }, path: [], activeEdge: null },
    explanation: {
      operation: `Initialized Dijkstra's from source ${start}. Set dist[${start}] = 0, others = ∞.`,
      why: 'Dijkstra maintains tentative minimum distances from the source to every node.',
      stateVars: { source: start, distances: { ...dist } },
      next: 'Select unvisited node with smallest tentative distance.',
    },
  });

  while (unvisited.size > 0) {
    let curr = null;
    let minD = Infinity;
    for (const node of unvisited) {
      if (dist[node] < minD) {
        minD = dist[node];
        curr = node;
      }
    }

    if (curr === null) break; // everything left is unreachable

    unvisited.delete(curr);
    const visitedNodes = graph.nodes.filter((n) => !unvisited.has(n.id)).map((n) => n.id);

    steps.push({
      type: 'pick-min',
      state: { visited: visitedNodes, current: curr, distances: { ...dist }, path: [], activeEdge: null },
      explanation: {
        operation: `Selected node ${curr} with minimum tentative distance ${dist[curr]}.`,
        why: 'Greedy choice: no shorter path to this node can exist assuming non-negative weights.',
        stateVars: { currentNode: curr, currentDistance: dist[curr] },
        next: curr === end ? 'Destination reached!' : `Relax all outgoing edges from ${curr}.`,
      },
    });

    if (curr === end) {
      const path = tracePath(prev, end);

      steps.push({
        type: 'complete',
        state: { visited: visitedNodes, current: curr, distances: { ...dist }, path, activeEdge: null },
        explanation: {
          operation: `Shortest path to ${end} confirmed! Total distance: ${dist[end]}. Path: ${path.join(' -> ')}.`,
          why: 'Optimal path discovered.',
          stateVars: { finalDistance: dist[end], optimalPath: path },
          next: 'Finished.',
        },
      });
      return steps;
    }

    for (const { node: neighbor, weight } of adj[curr]) {
      if (!unvisited.has(neighbor)) continue;

      const alt = dist[curr] + weight;
      const oldDist = dist[neighbor];

      steps.push({
        type: 'relax-edge',
        state: { visited: visitedNodes, current: curr, distances: { ...dist }, path: [], activeEdge: { u: curr, v: neighbor } },
        explanation: {
          operation: `Checking edge (${curr} -> ${neighbor}, w=${weight}). Alt distance: ${dist[curr]} + ${weight} = ${alt}. Current dist[${neighbor}]: ${oldDist === Infinity ? '∞' : oldDist}.`,
          why: `Edge relaxation: verify if routing through ${curr} offers a shorter route.`,
          stateVars: { curr, neighbor, edgeWeight: weight, alt, currentRecorded: oldDist },
          next: alt < oldDist ? `Relaxation succeeds! Update dist[${neighbor}] = ${alt}.` : `No improvement for ${neighbor}.`,
        },
      });

      if (alt < oldDist) {
        dist[neighbor] = alt;
        prev[neighbor] = curr;

        steps.push({
          type: 'distance-updated',
          state: { visited: visitedNodes, current: curr, distances: { ...dist }, path: [], activeEdge: { u: curr, v: neighbor } },
          explanation: {
            operation: `Updated dist[${neighbor}] = ${alt}. Set previous pointer to ${curr}.`,
            why: `Found shorter path to ${neighbor} via ${curr}.`,
            stateVars: { node: neighbor, newDist: alt, prev: curr },
            next: 'Continue inspecting remaining neighbors.',
          },
        });
      }
    }
  }

  return steps;
}

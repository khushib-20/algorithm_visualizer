import test from 'node:test';
import assert from 'node:assert/strict';

import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
} from '../src/algorithms/sorting.js';
import { generateLinearSearchSteps, generateBinarySearchSteps } from '../src/algorithms/searching.js';
import { DEFAULT_GRAPH, generateBFSSteps, generateDFSSteps, generateDijkstraSteps } from '../src/algorithms/graphs.js';
import { buildSteps } from '../src/hooks/useAlgorithmExecution.js';
import { ALGORITHMS, CATEGORIES, algorithmsInCategory } from '../src/data/algorithmMetadata.js';
import { ALGORITHM_CODE, CODE_ANCHORS, getCodeLine } from '../src/data/algorithmCode.js';

const SORTS = {
  'bubble-sort': generateBubbleSortSteps,
  'selection-sort': generateSelectionSortSteps,
  'insertion-sort': generateInsertionSortSteps,
  'merge-sort': generateMergeSortSteps,
  'quick-sort': generateQuickSortSteps,
  'heap-sort': generateHeapSortSteps,
};

const last = (steps) => steps.at(-1).state;

for (const [id, generate] of Object.entries(SORTS)) {
  test(`${id} sorts varied inputs`, () => {
    const inputs = [[], [9], [5, 1, 3, 2], [-4, 0, 7, -4, 2], [3, 3, 3], [1, 2, 3, 4, 5], [9, 8, 7, 6, 5, 4]];
    for (const input of inputs) {
      const steps = generate([...input]);
      assert.deepEqual(last(steps).array, [...input].sort((a, b) => a - b));
      assert.equal(last(steps).sortedIndices.length, input.length);
    }
  });
}

test('search algorithms find and miss targets', () => {
  assert.equal(last(generateLinearSearchSteps([7, 2, 9], 2)).foundIndex, 1);
  assert.equal(last(generateLinearSearchSteps([7, 2, 9], 8)).foundIndex, -1);

  const found = last(generateBinarySearchSteps([7, 2, 9, 4], 7));
  assert.equal(found.array[found.foundIndex], 7);
  assert.equal(last(generateBinarySearchSteps([7, 2, 9, 4], 8)).foundIndex, -1);
});

test('BFS finds a minimum-hop path', () => {
  const { path } = last(generateBFSSteps(DEFAULT_GRAPH, 'A', 'F'));
  assert.equal(path[0], 'A');
  assert.equal(path.at(-1), 'F');
  assert.equal(path.length, 4);
});

test('DFS path is a real connected route, not the visit order', () => {
  const steps = generateDFSSteps(DEFAULT_GRAPH, 'A', 'F');
  const { path } = last(steps);
  const connected = (a, b) => DEFAULT_GRAPH.edges.some((e) => (e.u === a && e.v === b) || (e.u === b && e.v === a));

  assert.equal(path[0], 'A');
  assert.equal(path.at(-1), 'F');
  path.slice(1).forEach((node, i) => assert.ok(connected(path[i], node), `${path[i]}-${node} must be an edge`));

  steps.slice(0, -1).forEach((step) => assert.deepEqual(step.state.path, []));
});

test('Dijkstra finds the shortest distance and route', () => {
  const { path, distances } = last(generateDijkstraSteps(DEFAULT_GRAPH, 'A', 'F'));
  assert.equal(distances.F, 13);
  assert.equal(path[0], 'A');
  assert.equal(path.at(-1), 'F');
});

test('every step has an explanation and a state', () => {
  for (const id of Object.keys(ALGORITHMS)) {
    const steps = buildSteps(id);
    assert.ok(steps.length > 1, `${id} should produce steps`);
    for (const step of steps) {
      assert.ok(step.type && step.state, `${id}: step needs type and state`);
      assert.equal(typeof step.explanation.operation, 'string');
      assert.equal(typeof step.explanation.next, 'string');
    }
  }
});

test('every step type highlights a line in both C++ and Python', () => {
  for (const id of Object.keys(ALGORITHMS)) {
    const types = new Set(buildSteps(id).map((step) => step.type));
    // also exercise paths that the default input may not hit
    for (const input of [{ array: [3, 1, 2], target: 99 }, { array: [1, 2, 3], target: 2 }, { startNode: 'F', targetNode: 'A' }]) {
      buildSteps(id, input).forEach((step) => types.add(step.type));
    }

    for (const type of types) {
      for (const lang of ['cpp', 'py']) {
        assert.ok(getCodeLine(id, lang, type), `${id}/${lang}: no code line for step type "${type}"`);
      }
    }
  }
});

test('highlighted lines are the intended ones', () => {
  const text = (id, lang, type) => ALGORITHM_CODE[id][lang].split('\n')[getCodeLine(id, lang, type) - 1].trim();

  assert.equal(text('bubble-sort', 'cpp', 'compare'), 'if (arr[j] > arr[j + 1]) {');
  assert.equal(text('bubble-sort', 'py', 'swap'), 'arr[j], arr[j + 1] = arr[j + 1], arr[j]');
  assert.equal(text('dfs', 'cpp', 'backtrack'), 'return false;');
  assert.equal(text('binary-search', 'py', 'narrow-right'), 'low = mid + 1');
});

test('anchors only reference algorithms that have code', () => {
  for (const id of Object.keys(CODE_ANCHORS)) assert.ok(ALGORITHM_CODE[id], id);
  for (const id of Object.keys(ALGORITHMS)) assert.ok(CODE_ANCHORS[id] && ALGORITHM_CODE[id], id);
});

test('every category has algorithms, and every algorithm has a category', () => {
  for (const { id } of CATEGORIES) assert.ok(algorithmsInCategory(id).length > 0, id);
  for (const algo of Object.values(ALGORITHMS)) assert.ok(CATEGORIES.some((c) => c.id === algo.category));
});

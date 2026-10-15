import { useState, useEffect, useMemo, useCallback } from 'react';

import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
} from '../algorithms/sorting.js';
import { generateLinearSearchSteps, generateBinarySearchSteps } from '../algorithms/searching.js';
import {
  generateBFSSteps,
  generateDFSSteps,
  generateDijkstraSteps,
  DEFAULT_GRAPH,
} from '../algorithms/graphs.js';

const DEFAULT_SORT_ARRAY = [45, 12, 85, 32, 89, 39, 69, 22, 58, 14, 73, 50];
const DEFAULT_LINEAR_ARRAY = [14, 85, 32, 50, 22, 39, 69, 58, 73];
const DEFAULT_BINARY_ARRAY = [14, 22, 32, 39, 45, 50, 58, 69, 73, 85, 89];
const DEFAULT_TARGET = 85;

export const SPEED_DELAYS = [1000, 800, 640, 500, 400, 300, 200, 130, 80, 50];
export const DEFAULT_SPEED = 5;

const SORTERS = {
  'bubble-sort': generateBubbleSortSteps,
  'selection-sort': generateSelectionSortSteps,
  'insertion-sort': generateInsertionSortSteps,
  'merge-sort': generateMergeSortSteps,
  'quick-sort': generateQuickSortSteps,
  'heap-sort': generateHeapSortSteps,
};

const TRAVERSALS = {
  bfs: generateBFSSteps,
  dfs: generateDFSSteps,
  dijkstra: generateDijkstraSteps,
};

export function buildSteps(algorithmId, input = null) {
  if (SORTERS[algorithmId]) {
    return SORTERS[algorithmId](input?.array ?? DEFAULT_SORT_ARRAY);
  }

  if (algorithmId === 'linear-search') {
    return generateLinearSearchSteps(input?.array ?? DEFAULT_LINEAR_ARRAY, input?.target ?? DEFAULT_TARGET);
  }

  if (algorithmId === 'binary-search') {
    return generateBinarySearchSteps(input?.array ?? DEFAULT_BINARY_ARRAY, input?.target ?? DEFAULT_TARGET);
  }

  if (TRAVERSALS[algorithmId]) {
    return TRAVERSALS[algorithmId](DEFAULT_GRAPH, input?.startNode ?? 'A', input?.targetNode ?? 'F');
  }

  return [];
}

export function useAlgorithmExecution(algorithmId, customInput = null) {
  const steps = useMemo(() => buildSteps(algorithmId, customInput), [algorithmId, customInput]);

  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [previousSteps, setPreviousSteps] = useState(steps);
  if (previousSteps !== steps) {
    setPreviousSteps(steps);
    setStepIndex(0);
    setIsPlaying(false);
  }

  const lastIndex = Math.max(steps.length - 1, 0);
  const delay = SPEED_DELAYS[speed - 1] ?? SPEED_DELAYS[DEFAULT_SPEED - 1];

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = setInterval(() => {
      setStepIndex((index) => {
        if (index >= lastIndex) return index;
        return index + 1;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [isPlaying, delay, lastIndex]);

  useEffect(() => {
    if (isPlaying && stepIndex >= lastIndex) setIsPlaying(false);
  }, [isPlaying, stepIndex, lastIndex]);

  const togglePlay = useCallback(() => {
    if (lastIndex === 0) return;

    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (stepIndex >= lastIndex) setStepIndex(0);
    setIsPlaying(true);
  }, [isPlaying, stepIndex, lastIndex]);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((index) => Math.min(index + 1, lastIndex));
  }, [lastIndex]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((index) => Math.max(index - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(0);
  }, []);

  const seekTo = useCallback(
    (index) => {
      setIsPlaying(false);
      const requested = Math.floor(Number(index));
      setStepIndex(Number.isFinite(requested) ? Math.max(0, Math.min(requested, lastIndex)) : 0);
    },
    [lastIndex]
  );

  return {
    stepIndex: Math.min(stepIndex, lastIndex),
    totalSteps: steps.length,
    currentStep: steps[Math.min(stepIndex, lastIndex)] ?? null,
    isPlaying,
    speed,
    setSpeed,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    seekTo,
  };
}

// Generates deterministic step snapshots for Linear and Binary Search

export function generateLinearSearchSteps(arr, target) {
  const steps = [];
  const n = arr.length;

  steps.push({
    type: 'init',
    state: { array: [...arr], currentIndex: null, target, foundIndex: null, status: 'searching' },
    explanation: {
      operation: `Initiating Linear Search for target value ${target}.`,
      why: 'Linear search inspects every element from left to right one by one.',
      stateVars: { target, arrayLength: n, currentIndex: 0 },
      next: 'Compare target with first element arr[0].'
    }
  });

  for (let i = 0; i < n; i++) {
    const isMatch = arr[i] === target;

    steps.push({
      type: 'compare',
      state: { array: [...arr], currentIndex: i, target, foundIndex: isMatch ? i : null, status: isMatch ? 'found' : 'searching' },
      explanation: {
        operation: `Checking index ${i}: arr[${i}] = ${arr[i]}. Target is ${target}.`,
        why: 'Evaluating whether the current value equals our search target.',
        stateVars: { i, 'arr[i]': arr[i], target, match: isMatch },
        next: isMatch ? `Target found at index ${i}! Terminating search.` : `Not a match (${arr[i]} !== ${target}). Moving to index ${i + 1}.`
      }
    });

    if (isMatch) {
      steps.push({
        type: 'found',
        state: { array: [...arr], currentIndex: i, target, foundIndex: i, status: 'found' },
        explanation: {
          operation: `Success! Target value ${target} found at index ${i}.`,
          why: 'Linear search returns the index of the first matching element.',
          stateVars: { foundIndex: i, comparisonsMade: i + 1 },
          next: 'Search completed.'
        }
      });
      return steps;
    }
  }

  steps.push({
    type: 'not-found',
    state: { array: [...arr], currentIndex: null, target, foundIndex: -1, status: 'not-found' },
    explanation: {
      operation: `Target value ${target} was not found in the array.`,
      why: 'All elements have been scanned without encountering a match.',
      stateVars: { foundIndex: -1, totalComparisons: n },
      next: 'Search concluded with return value -1.'
    }
  });

  return steps;
}

export function generateBinarySearchSteps(initialArr, target) {
  const steps = [];
  // Binary search requires a sorted array
  const arr = [...initialArr].sort((a, b) => a - b);
  let low = 0;
  let high = arr.length - 1;

  steps.push({
    type: 'init',
    state: { array: [...arr], low, high, mid: null, target, foundIndex: null, status: 'searching' },
    explanation: {
      operation: `Initiating Binary Search for target value ${target} in sorted array.`,
      why: 'Binary search halves the search space at each step by comparing the middle element.',
      stateVars: { low, high, target, size: arr.length },
      next: 'Calculate middle index: mid = floor((low + high) / 2).'
    }
  });

  let stepCount = 0;
  while (low <= high && stepCount < 30) {
    stepCount++;
    const mid = Math.floor((low + high) / 2);

    steps.push({
      type: 'calculate-mid',
      state: { array: [...arr], low, high, mid, target, foundIndex: null, status: 'searching' },
      explanation: {
        operation: `Calculated middle index mid = ${mid} (value = ${arr[mid]}). Window is [${low}..${high}].`,
        why: 'The midpoint divides the active candidate search interval into two equal halves.',
        stateVars: { low, high, mid, 'arr[mid]': arr[mid], target },
        next: `Compare arr[${mid}] (${arr[mid]}) with target (${target}).`
      }
    });

    if (arr[mid] === target) {
      steps.push({
        type: 'found',
        state: { array: [...arr], low, high, mid, target, foundIndex: mid, status: 'found' },
        explanation: {
          operation: `Target found! arr[${mid}] === ${target}.`,
          why: 'The middle element matches the search target exactly.',
          stateVars: { foundIndex: mid, comparisons: stepCount },
          next: 'Search completed successfully.'
        }
      });
      return steps;
    } else if (arr[mid] < target) {
      steps.push({
        type: 'narrow-right',
        state: { array: [...arr], low, high, mid, target, foundIndex: null, status: 'searching' },
        explanation: {
          operation: `arr[${mid}] (${arr[mid]}) < target (${target}). Target must be in the right half.`,
          why: 'Because the array is sorted, all elements to the left of mid are also smaller than target and can be discarded.',
          stateVars: { previousLow: low, newLow: mid + 1 },
          next: `Update low = mid + 1 = ${mid + 1}.`
        }
      });
      low = mid + 1;
    } else {
      steps.push({
        type: 'narrow-left',
        state: { array: [...arr], low, high, mid, target, foundIndex: null, status: 'searching' },
        explanation: {
          operation: `arr[${mid}] (${arr[mid]}) > target (${target}). Target must be in the left half.`,
          why: 'Because the array is sorted, all elements to the right of mid are strictly larger and can be eliminated.',
          stateVars: { previousHigh: high, newHigh: mid - 1 },
          next: `Update high = mid - 1 = ${mid - 1}.`
        }
      });
      high = mid - 1;
    }
  }

  steps.push({
    type: 'not-found',
    state: { array: [...arr], low, high, mid: null, target, foundIndex: -1, status: 'not-found' },
    explanation: {
      operation: `Target ${target} was not found. Pointers crossed (low: ${low} > high: ${high}).`,
      why: 'Search window has been reduced to size 0 without discovering the target.',
      stateVars: { low, high, foundIndex: -1 },
      next: 'Return -1.'
    }
  });

  return steps;
}

// Generates deterministic step snapshots for sorting algorithms

export function generateBubbleSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sorted = new Set();

  steps.push({
    type: 'init',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Initialized Bubble Sort with array of ' + n + ' elements.',
      why: 'Bubble Sort starts at the beginning of the array, comparing adjacent elements.',
      stateVars: { n, i: 0, j: 0 },
      next: 'Start outer pass i = 0.'
    }
  });

  for (let i = 0; i < n - 1; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison step
      steps.push({
        type: 'compare',
        state: { array: [...arr], comparing: [j, j + 1], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
          why: 'Bubble sort requires adjacent pairs to be in non-decreasing order.',
          stateVars: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] },
          next: arr[j] > arr[j + 1]
            ? `${arr[j]} > ${arr[j + 1]}: Will swap them to bubble the larger value forward.`
            : `${arr[j]} <= ${arr[j + 1]}: Order is already correct, no swap needed.`
        }
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedAny = true;

        steps.push({
          type: 'swap',
          state: { array: [...arr], comparing: [j, j + 1], swapped: [j, j + 1], sortedIndices: Array.from(sorted), pivot: null },
          explanation: {
            operation: `Swapped ${temp} and ${arr[j]} at positions ${j} and ${j + 1}.`,
            why: 'Moving larger values towards the end of the array.',
            stateVars: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] },
            next: 'Advance comparison to next pair.'
          }
        });
      }
    }
    // Element at n - 1 - i is now in its final sorted position
    sorted.add(n - 1 - i);
    steps.push({
      type: 'element-sorted',
      state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
      explanation: {
        operation: `Element ${arr[n - 1 - i]} at index ${n - 1 - i} has reached its final sorted position.`,
        why: 'In pass ' + (i + 1) + ', the maximum value among unsorted elements has bubbled up completely.',
        stateVars: { sortedCount: sorted.size, pass: i + 1 },
        next: swappedAny ? 'Continue to next outer pass.' : 'No swaps occurred; array is fully sorted early!'
      }
    });

    if (!swappedAny) break;
  }

  // Mark all as sorted
  for (let k = 0; k < n; k++) sorted.add(k);
  steps.push({
    type: 'complete',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Bubble Sort completed! Array is now completely sorted.',
      why: 'All elements have settled into ascending order.',
      stateVars: { status: 'COMPLETE', totalElements: n },
      next: 'Finished execution.'
    }
  });

  return steps;
}

export function generateSelectionSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sorted = new Set();

  steps.push({
    type: 'init',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: [], pivot: null },
    explanation: {
      operation: 'Initialized Selection Sort with ' + n + ' elements.',
      why: 'Selection Sort searches the unsorted portion for the minimum element in each pass.',
      stateVars: { n, i: 0 },
      next: 'Start scanning for minimum at i = 0.'
    }
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      type: 'set-min',
      state: { array: [...arr], comparing: [i], swapped: [], sortedIndices: Array.from(sorted), pivot: minIdx },
      explanation: {
        operation: `Set initial candidate minimum to index ${i} (value ${arr[i]}).`,
        why: 'We assume the first element of the unsorted segment is the smallest until proven otherwise.',
        stateVars: { i, minIdx, 'arr[minIdx]': arr[minIdx] },
        next: 'Compare candidate minimum with rest of unsorted elements.'
      }
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        state: { array: [...arr], comparing: [j, minIdx], swapped: [], sortedIndices: Array.from(sorted), pivot: minIdx },
        explanation: {
          operation: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`,
          why: 'Check if we found a smaller value in the unsorted region.',
          stateVars: { i, j, minIdx, 'arr[j]': arr[j], 'arr[minIdx]': arr[minIdx] },
          next: arr[j] < arr[minIdx]
            ? `Found smaller element! Update minimum index to ${j}.`
            : `Keep current minimum at index ${minIdx}.`
        }
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'update-min',
          state: { array: [...arr], comparing: [j], swapped: [], sortedIndices: Array.from(sorted), pivot: minIdx },
          explanation: {
            operation: `New minimum found at index ${minIdx} (value ${arr[minIdx]}).`,
            why: `${arr[minIdx]} is the smallest value seen so far in this pass.`,
            stateVars: { minIdx, 'minVal': arr[minIdx] },
            next: 'Continue scanning remaining elements.'
          }
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      steps.push({
        type: 'swap',
        state: { array: [...arr], comparing: [], swapped: [i, minIdx], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Swapped minimum element ${arr[i]} into sorted position ${i}.`,
          why: 'Placing the smallest unsorted element into its proper position.',
          stateVars: { i, minIdx, swappedWith: temp },
          next: 'Advance sorted partition boundary.'
        }
      });
    }

    sorted.add(i);
    steps.push({
      type: 'element-sorted',
      state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
      explanation: {
        operation: `Element at index ${i} (${arr[i]}) is now sorted.`,
        why: 'Sorted region now spans from index 0 to ' + i + '.',
        stateVars: { sortedBoundary: i },
        next: 'Begin next pass.'
      }
    });
  }

  for (let k = 0; k < n; k++) sorted.add(k);
  steps.push({
    type: 'complete',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Selection Sort completed! Array is now fully sorted.',
      why: 'All positions have received their respective minimums.',
      stateVars: { status: 'COMPLETE' },
      next: 'Done.'
    }
  });

  return steps;
}

export function generateInsertionSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sorted = new Set(n > 0 ? [0] : []);

  steps.push({
    type: 'init',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Initialized Insertion Sort. First element at index 0 is trivially sorted.',
      why: 'A single element is always considered a sorted sub-array.',
      stateVars: { n, i: 1 },
      next: 'Pick element at index 1 to insert into sorted sub-array.'
    }
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      type: 'pick-key',
      state: { array: [...arr], comparing: [i], swapped: [], sortedIndices: Array.from(sorted), pivot: i },
      explanation: {
        operation: `Picked key element arr[${i}] = ${key}.`,
        why: 'We will compare this key backwards against elements in the sorted sub-array [0..i-1].',
        stateVars: { i, key, j },
        next: 'Compare key with arr[' + j + '] (' + arr[j] + ').'
      }
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        type: 'compare',
        state: { array: [...arr], comparing: [j, j + 1], swapped: [], sortedIndices: Array.from(sorted), pivot: i },
        explanation: {
          operation: `arr[${j}] (${arr[j]}) is greater than key (${key}).`,
          why: 'Since arr[' + j + '] > key, it must shift one position to the right to make room.',
          stateVars: { j, 'arr[j]': arr[j], key },
          next: 'Shift arr[' + j + '] to arr[' + (j + 1) + '].'
        }
      });

      arr[j + 1] = arr[j];
      steps.push({
        type: 'shift',
        state: { array: [...arr], comparing: [], swapped: [j + 1], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Shifted value ${arr[j]} from index ${j} to index ${j + 1}.`,
          why: 'Creating a slot for the key.',
          stateVars: { shiftedVal: arr[j], toIndex: j + 1 },
          next: 'Move backwards to check previous sorted element.'
        }
      });

      j--;
    }

    arr[j + 1] = key;
    sorted.add(i);
    steps.push({
      type: 'insert-key',
      state: { array: [...arr], comparing: [], swapped: [j + 1], sortedIndices: Array.from(sorted), pivot: null },
      explanation: {
        operation: `Inserted key ${key} into position ${j + 1}.`,
        why: 'Proper insertion location found where elements to the left are smaller or equal.',
        stateVars: { insertedAt: j + 1, key },
        next: 'Sorted region now includes index 0 to ' + i + '.'
      }
    });
  }

  for (let k = 0; k < n; k++) sorted.add(k);
  steps.push({
    type: 'complete',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Insertion Sort completed! Entire array is sorted.',
      why: 'Every element has been systematically inserted into its correct relative position.',
      stateVars: { status: 'COMPLETE' },
      next: 'Done.'
    }
  });

  return steps;
}

export function generateMergeSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sorted = new Set();

  steps.push({
    type: 'init',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: [], pivot: null },
    explanation: {
      operation: 'Initialized Merge Sort.',
      why: 'Merge Sort uses divide-and-conquer to split the array into halves until base cases of size 1 are reached.',
      stateVars: { length: n },
      next: 'Begin recursive division.'
    }
  });

  function mergeSortHelper(l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);

    steps.push({
      type: 'split',
      state: { array: [...arr], comparing: [l, r], swapped: [], sortedIndices: Array.from(sorted), pivot: mid },
      explanation: {
        operation: `Dividing sub-array [${l}..${r}] at midpoint ${mid}.`,
        why: 'Divide step: splits problems into two smaller subproblems [l..mid] and [mid+1..r].',
        stateVars: { l, mid, r },
        next: `Recursively sort left half [${l}..${mid}].`
      }
    });

    mergeSortHelper(l, mid);
    mergeSortHelper(mid + 1, r);
    mergeHelper(l, mid, r);
  }

  function mergeHelper(l, mid, r) {
    steps.push({
      type: 'merge-start',
      state: { array: [...arr], comparing: [l, r], swapped: [], sortedIndices: Array.from(sorted), pivot: mid },
      explanation: {
        operation: `Merging sorted segments [${l}..${mid}] and [${mid + 1}..${r}].`,
        why: 'Conquer step: sequentially compare smallest available items from both segments and merge.',
        stateVars: { leftSub: [l, mid], rightSub: [mid + 1, r] },
        next: 'Begin comparing elements from each half.'
      }
    });

    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      steps.push({
        type: 'compare',
        state: { array: [...arr], comparing: [l + i, mid + 1 + j], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Comparing left element ${left[i]} with right element ${right[j]}.`,
          why: 'Determine which element is smaller to place next into index ' + k + '.',
          stateVars: { 'left[i]': left[i], 'right[j]': right[j], targetIdx: k },
          next: left[i] <= right[j] ? `Take ${left[i]} from left.` : `Take ${right[j]} from right.`
        }
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }

      steps.push({
        type: 'overwrite',
        state: { array: [...arr], comparing: [], swapped: [k], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Placed value ${arr[k]} into merged array at index ${k}.`,
          why: 'Smaller element placed in ascending order.',
          stateVars: { k, val: arr[k] },
          next: 'Advance to next position.'
        }
      });
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        type: 'flush-left',
        state: { array: [...arr], comparing: [], swapped: [k], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Flushed remaining left element ${left[i]} to index ${k}.`,
          why: 'Remaining elements in sorted segment are already larger and can be appended directly.',
          stateVars: { k, val: arr[k] },
          next: 'Continue merging.'
        }
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        type: 'flush-right',
        state: { array: [...arr], comparing: [], swapped: [k], sortedIndices: Array.from(sorted), pivot: null },
        explanation: {
          operation: `Flushed remaining right element ${right[j]} to index ${k}.`,
          why: 'Remaining right elements are appended directly.',
          stateVars: { k, val: arr[k] },
          next: 'Continue merging.'
        }
      });
      j++;
      k++;
    }

    if (l === 0 && r === n - 1) {
      for (let idx = 0; idx < n; idx++) sorted.add(idx);
    }
  }

  mergeSortHelper(0, n - 1);

  for (let k = 0; k < n; k++) sorted.add(k);
  steps.push({
    type: 'complete',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Merge Sort finished! Array completely merged in ascending order.',
      why: 'All sub-arrays have been merged back to the root array.',
      stateVars: { status: 'COMPLETE' },
      next: 'Done.'
    }
  });

  return steps;
}

export function generateQuickSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sorted = new Set();

  steps.push({
    type: 'init',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: [], pivot: null },
    explanation: {
      operation: 'Initialized Quick Sort with ' + n + ' elements.',
      why: 'Quick Sort chooses a pivot element and partitions the array into smaller and greater subsets.',
      stateVars: { n },
      next: 'Begin partitioning range [0..' + (n - 1) + '].'
    }
  });

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partitionHelper(low, high);
      sorted.add(pi);

      steps.push({
        type: 'pivot-placed',
        state: { array: [...arr], comparing: [], swapped: [pi], sortedIndices: Array.from(sorted), pivot: pi },
        explanation: {
          operation: `Pivot ${arr[pi]} settled in its permanent sorted index ${pi}.`,
          why: 'All elements left of ' + pi + ' are <= pivot, and all elements right are >= pivot.',
          stateVars: { pivotIndex: pi, pivotVal: arr[pi] },
          next: `Recursively partition left [${low}..${pi - 1}] and right [${pi + 1}..${high}].`
        }
      });

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sorted.add(low);
    }
  }

  function partitionHelper(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      type: 'choose-pivot',
      state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: high },
      explanation: {
        operation: `Selected pivot arr[${high}] = ${pivot}.`,
        why: 'Partitioning sub-array [' + low + '..' + high + '] around this pivot.',
        stateVars: { low, high, pivot },
        next: 'Iterate j from ' + low + ' to ' + (high - 1) + ' to compare against pivot.'
      }
    });

    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        state: { array: [...arr], comparing: [j], swapped: [], sortedIndices: Array.from(sorted), pivot: high },
        explanation: {
          operation: `Comparing element arr[${j}] (${arr[j]}) with pivot (${pivot}).`,
          why: 'Elements <= pivot must move to the left partition.',
          stateVars: { j, 'arr[j]': arr[j], pivot, i },
          next: arr[j] <= pivot ? `arr[${j}] <= pivot: Increment i and swap arr[${i + 1}] and arr[${j}].` : `arr[${j}] > pivot: Stays in right partition.`
        }
      });

      if (arr[j] <= pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          type: 'swap',
          state: { array: [...arr], comparing: [], swapped: [i, j], sortedIndices: Array.from(sorted), pivot: high },
          explanation: {
            operation: `Swapped arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]}).`,
            why: 'Placed element <= pivot into the lower partition.',
            stateVars: { i, j },
            next: 'Advance j.'
          }
        });
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      type: 'swap-pivot',
      state: { array: [...arr], comparing: [], swapped: [i + 1, high], sortedIndices: Array.from(sorted), pivot: i + 1 },
      explanation: {
        operation: `Placed pivot ${arr[i + 1]} into its final position index ${i + 1}.`,
        why: 'The pivot now sits squarely between the smaller and larger partitions.',
        stateVars: { finalPivotIdx: i + 1 },
        next: 'Partition complete.'
      }
    });

    return i + 1;
  }

  quickSortHelper(0, n - 1);

  for (let k = 0; k < n; k++) sorted.add(k);
  steps.push({
    type: 'complete',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Quick Sort completed successfully!',
      why: 'All partitions have been recursively sorted and joined.',
      stateVars: { status: 'COMPLETE' },
      next: 'Done.'
    }
  });

  return steps;
}

export function generateHeapSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sorted = new Set();

  steps.push({
    type: 'init',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: [], pivot: null },
    explanation: {
      operation: 'Initialized Heap Sort. Phase 1: Build Max-Heap.',
      why: 'Transforming arbitrary array into a binary max-heap where each parent >= its children.',
      stateVars: { n },
      next: 'Heapify subtrees starting from the last internal node.'
    }
  });

  function heapifyHelper(size, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    steps.push({
      type: 'heapify-check',
      state: { array: [...arr], comparing: [i], swapped: [], sortedIndices: Array.from(sorted), pivot: i },
      explanation: {
        operation: `Heapifying at node index ${i} (value ${arr[i]}).`,
        why: 'Check left child index ' + l + ' and right child index ' + r + ' against parent.',
        stateVars: { i, 'arr[i]': arr[i], leftChild: l < size ? arr[l] : 'None', rightChild: r < size ? arr[r] : 'None' },
        next: 'Find maximum among node and its children.'
      }
    });

    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        type: 'swap',
        state: { array: [...arr], comparing: [], swapped: [i, largest], sortedIndices: Array.from(sorted), pivot: largest },
        explanation: {
          operation: `Swapped parent arr[${i}] (${temp}) with larger child arr[${largest}] (${arr[i]}).`,
          why: 'Restoring max-heap property for this subtree.',
          stateVars: { parent: i, child: largest },
          next: 'Recursively heapify affected subtree at index ' + largest + '.'
        }
      });

      heapifyHelper(size, largest);
    }
  }

  // Phase 1: Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyHelper(n, i);
  }

  steps.push({
    type: 'heap-built',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: [], pivot: 0 },
    explanation: {
      operation: 'Max-Heap constructed successfully! Max element ' + arr[0] + ' is at root (index 0).',
      why: 'Phase 2: Repeatedly swap root with end element and re-heapify remaining elements.',
      stateVars: { rootMax: arr[0] },
      next: 'Begin extraction phase.'
    }
  });

  // Phase 2: Extract elements
  for (let i = n - 1; i > 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    sorted.add(i);

    steps.push({
      type: 'extract',
      state: { array: [...arr], comparing: [], swapped: [0, i], sortedIndices: Array.from(sorted), pivot: null },
      explanation: {
        operation: `Extracted max element ${temp} from root and swapped with index ${i}.`,
        why: 'Placing the current maximum into its permanent sorted position at the end.',
        stateVars: { extractedMax: temp, placedAt: i },
        next: 'Heapify remaining ' + i + ' elements.'
      }
    });

    heapifyHelper(i, 0);
  }

  for (let k = 0; k < n; k++) sorted.add(k);
  steps.push({
    type: 'complete',
    state: { array: [...arr], comparing: [], swapped: [], sortedIndices: Array.from(sorted), pivot: null },
    explanation: {
      operation: 'Heap Sort completed! Array is fully sorted in ascending order.',
      why: 'All elements extracted in descending order to fill array from end to start.',
      stateVars: { status: 'COMPLETE' },
      next: 'Done.'
    }
  });

  return steps;
}

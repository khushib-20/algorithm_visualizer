# AlgoViz — Interactive Algorithm Visualizer

**Explore algorithms. Understand the logic. Visualize every step.**

An interactive algorithm visualization application built with React and Vite, designed to make learning algorithms more intuitive through animated execution, step-by-step controls, and detailed explanations.

<p align="center">
  <a href="https://algorithm-visualizer-teal-psi.vercel.app/"><strong>🚀 Live Demo</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/khushib-20/algorithm_visualizer"><strong>💻 Source Code</strong></a>
</p>

## Overview

AlgoViz brings algorithms to life by showing how they execute rather than just presenting their code. Explore sorting, searching, and graph algorithms through interactive visualizations, inspect their implementations, and learn how their time and space complexities affect performance.

## Features

- **Interactive Visualizations** — Watch algorithms execute step by step.
- **Multiple Algorithm Categories** — Explore sorting, searching, and graph algorithms.
- **Execution Controls** — Control playback and navigate through algorithm steps.
- **Code Viewer** — Inspect algorithm implementations alongside their visualizations.
- **Algorithm Explanations** — Understand the logic behind each algorithm.
- **Complexity Analysis** — Explore time and space complexity.
- **Dark Interface** — A focused, developer-friendly visual experience.
- **Automated Tests** — Test algorithm implementations and expected behavior.

## Try It Out

Visit the [live application](https://algorithm-visualizer-teal-psi.vercel.app/) to explore the visualizer directly in your browser.

## Algorithms

### Sorting

| Algorithm | Best Time | Average Time | Worst Time |
|---|---:|---:|---:|
| Bubble Sort | O(n) | O(n²) | O(n²) |
| Selection Sort | O(n²) | O(n²) | O(n²) |
| Insertion Sort | O(n) | O(n²) | O(n²) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) |

*Time complexities represent standard implementations; actual behavior depends on the implementation and input.*

### Searching

| Algorithm | Time Complexity |
|---|---|
| Linear Search | O(n) |
| Binary Search | O(log n) |

Binary Search requires sorted input.

### Graph Algorithms

| Algorithm | Purpose |
|---|---|
| Breadth-First Search (BFS) | Explores a graph level by level |
| Depth-First Search (DFS) | Explores paths before backtracking |
| Dijkstra's Algorithm | Finds shortest paths in graphs with non-negative edge weights |

## Tech Stack

- **React** — Component-based user interface
- **JavaScript (ES6+)** — Algorithm implementations and application logic
- **Vite** — Development server and build tooling
- **CSS** — Layout, styling, animations, and responsive design
- **Vitest** — Automated testing

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm before running the project.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khushib-20/algorithm_visualizer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd algorithm_visualizer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run the automated test suite |

## Project Structure

```text
algorithm_visualizer/
├── public/
├── src/
│   ├── algorithms/
│   │   ├── sorting.js
│   │   ├── searching.js
│   │   └── graphs.js
│   ├── components/
│   │   ├── visualizers/
│   │   ├── AlgorithmSelector.jsx
│   │   ├── VisualizationPanel.jsx
│   │   ├── ExecutionControls.jsx
│   │   ├── ExplanationPanel.jsx
│   │   └── CodePanel.jsx
│   ├── data/
│   │   ├── algorithmCode.js
│   │   └── algorithmMetadata.js
│   ├── hooks/
│   │   └── useAlgorithmExecution.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── tests/
│   └── algorithms.test.js
├── index.html
├── package.json
└── vite.config.js
```

*The structure above is representative; filenames may vary slightly across versions.*

## Learning Goals

This project explores several concepts at the intersection of software development and computer science:

- Data structures and algorithm design
- Time and space complexity
- React components, state, and hooks
- Animation and step-based execution
- Separation of algorithm logic from UI rendering
- Automated testing and maintainable code

## Testing

Run the test suite with:

```bash
npm test
```

The tests help verify algorithm correctness and expected behavior across different inputs.

## Future Improvements

Potential extensions include:

- More algorithms and data structures
- Additional graph editing and interaction tools
- Side-by-side algorithm comparisons
- More detailed execution metrics
- Expanded explanations and learning exercises

## Contributing

Suggestions, bug reports, and improvements are welcome. Feel free to fork the repository, create a branch, and submit a pull request.

## Author

**Khushi Bhamare**

- GitHub: [@khushib-20](https://github.com/khushib-20)

---

Built to make algorithms easier to see, understand, and explore.

AlgoViz — Interactive Algorithm Visualizer

Explore algorithms. Understand the logic. Visualize every step.

An interactive algorithm visualization application built with React and Vite, designed to make learning algorithms more intuitive through animated execution, step-by-step controls, and detailed explanations.

<p align="center"> <a href="https://algorithm-visualizer-teal-psi.vercel.app/"><strong>🚀 Live Demo</strong></a> &nbsp; · &nbsp; <a href="https://github.com/khushib-20/algorithm_visualizer"><strong>💻 Source Code</strong></a> </p>
Overview

AlgoViz brings algorithms to life by showing how they execute rather than just presenting their code. Explore sorting, searching, and graph algorithms through interactive visualizations, inspect their implementations, and learn how their time and space complexities affect performance.

Features
Interactive Visualizations — Watch algorithms execute step by step.
Multiple Algorithm Categories — Sorting, searching, and graph algorithms.
Execution Controls — Play, pause, step, scrub, change speed, and use keyboard shortcuts (Space, ← →, R).
Synchronized Code Viewer — C++ and Python implementations with the current line highlighted.
Custom Input — Enter your own array, target, or start/destination nodes, or randomize.
Algorithm Explanations — The operation, the reason, state variables, and what comes next.
Complexity Analysis — Time and space complexity, plus an algorithm docs dialog.
Minimal Dark Interface — Black, white, and a single mint accent; draggable graph nodes.
Automated Tests — Algorithm correctness and code-highlight coverage.
Try It Out

Visit the live application to explore the visualizer directly in your browser.

Algorithms
Sorting
Algorithm	Best Time	Average Time	Worst Time
Bubble Sort	O(n)	O(n²)	O(n²)
Selection Sort	O(n²)	O(n²)	O(n²)
Insertion Sort	O(n)	O(n²)	O(n²)
Merge Sort	O(n log n)	O(n log n)	O(n log n)
Quick Sort	O(n log n)	O(n log n)	O(n²)
Heap Sort	O(n log n)	O(n log n)	O(n log n)
Searching
Algorithm	Time Complexity
Linear Search	O(n)
Binary Search	O(log n)

Binary Search requires sorted input (the visualizer sorts custom input for you).

Graph Algorithms
Algorithm	Purpose
Breadth-First Search (BFS)	Explores a graph level by level; finds the fewest-hop path
Depth-First Search (DFS)	Explores paths before backtracking
Dijkstra's Algorithm	Finds shortest paths in graphs with non-negative edge weights
Tech Stack
React — Component-based user interface
JavaScript (ES6+) — Algorithm implementations and application logic
Vite — Development server and build tooling
CSS — A single hand-written stylesheet
Prism.js — Syntax highlighting in the code viewer
Node.js test runner (node --test) — Automated testing, no extra dependency
Getting Started

Requires Node.js 18 or newer.

bash
git clone https://github.com/khushib-20/algorithm_visualizer.git
cd algorithm_visualizer
npm install
npm run dev

Open the local URL shown in your terminal, usually http://localhost:5173.

Available Commands
Command	Description
npm run dev	Start the development server
npm run build	Build the application for production
npm run preview	Preview the production build
npm test	Run the automated test suite
Project Structure
text
algorithm_visualizer/
├── src/
│   ├── algorithms/          step generators
│   │   ├── sorting.js
│   │   ├── searching.js
│   │   └── graphs.js
│   ├── components/
│   │   ├── visualizers/     Sorting / Searching / Graph drawing
│   │   ├── AlgorithmSelector.jsx
│   │   ├── VisualizationPanel.jsx
│   │   ├── ExecutionControls.jsx
│   │   ├── ExplanationPanel.jsx
│   │   ├── CodePanel.jsx
│   │   ├── AlgorithmInfoModal.jsx
│   │   ├── InputConfigModal.jsx
│   │   ├── Modal.jsx
│   │   └── Header.jsx
│   ├── data/
│   │   ├── algorithmCode.js      source code + line anchors
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
Adding an Algorithm
Write a generator returning { type, state, explanation } steps in src/algorithms/.
Add its metadata (algorithmMetadata.js) and C++/Python source (algorithmCode.js).
Add CODE_ANCHORS for each step type: the text of the line to highlight.
Register it in useAlgorithmExecution.js.

npm test fails if any step type has no line to highlight.

Learning Goals
Data structures and algorithm design
Time and space complexity
React components, state, and hooks
Animation and step-based execution
Separation of algorithm logic from UI rendering
Automated testing and maintainable code
Testing
bash
npm test

Verifies that every sorting algorithm sorts (including empty, single, duplicate, and negative inputs), searches find or miss correctly, BFS/DFS/Dijkstra return valid paths, and every step highlights a line of code.

Future Improvements
More algorithms and data structures
Graph editing (add/remove nodes and edges)
Side-by-side algorithm comparisons
More detailed execution metrics
Expanded explanations and learning exercises
Contributing

Suggestions, bug reports, and improvements are welcome. Fork the repository, create a branch, and open a pull request.

Author

Khushi Bhamare — GitHub: @khushib-20
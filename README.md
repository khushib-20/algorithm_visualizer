# AlgoViz

Step-by-step visualizer for sorting, searching and graph algorithms, with
synchronized C++ / Python code, per-step explanations and custom input.

## Run

```bash
npm install
npm run dev     
npm test        
npm run build   
```

Requires Node.js 18+.

## Layout

```
src/
  algorithms/   step generators (sorting, searching, graphs)
  data/         algorithm metadata, source code, code-line anchors
  hooks/        useAlgorithmExecution (playback state)
  components/   UI; components/visualizers/ draws each category
  styles.css    the only stylesheet
tests/          node:test suite
```

## Adding an algorithm

1. Write a generator returning `{ type, state, explanation }` steps.
2. Add its metadata (`data/algorithmMetadata.js`) and C++/Python source
   (`data/algorithmCode.js`).
3. Add `CODE_ANCHORS` for each step `type`: the text of the line to highlight.
4. Register it in `hooks/useAlgorithmExecution.js`.

`npm test` fails if any step type has no line to highlight.

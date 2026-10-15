import React, { useState, useEffect, useCallback } from 'react';

import Header from './components/Header';
import AlgorithmSelector from './components/AlgorithmSelector';
import VisualizationPanel from './components/VisualizationPanel';
import ExecutionControls from './components/ExecutionControls';
import CodePanel from './components/CodePanel';
import ExplanationPanel from './components/ExplanationPanel';
import AlgorithmInfoModal from './components/AlgorithmInfoModal';
import InputConfigModal from './components/InputConfigModal';
import { useAlgorithmExecution } from './hooks/useAlgorithmExecution';
import { algorithmsInCategory } from './data/algorithmMetadata';
import { DEFAULT_GRAPH } from './algorithms/graphs';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomNumbers = (count, min = 10, max = 99) =>
  Array.from({ length: count }, () => randomInt(min, max));

function randomInput(category, algorithmId) {
  if (category === 'graphs') {
    const ids = DEFAULT_GRAPH.nodes.map((node) => node.id);
    const startNode = ids[randomInt(0, ids.length - 1)];
    const others = ids.filter((id) => id !== startNode);
    return { startNode, targetNode: others[randomInt(0, others.length - 1)] };
  }

  const array = randomNumbers(12);
  if (algorithmId === 'binary-search') array.sort((a, b) => a - b);

  return { array, target: array[randomInt(0, array.length - 1)] };
}

export default function App() {
  const [category, setCategory] = useState('sorting');
  const [algorithmId, setAlgorithmId] = useState('bubble-sort');
  const [customInput, setCustomInput] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const execution = useAlgorithmExecution(algorithmId, customInput);
  const { togglePlay, stepForward, stepBackward, reset } = execution;

  const isModalOpen = isInfoOpen || isConfigOpen;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (isModalOpen || event.ctrlKey || event.metaKey || event.altKey) return;

      const tag = event.target?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(tag) || event.target?.isContentEditable) return;

      if (event.code === 'Space') {
        event.preventDefault();
        togglePlay();
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();
        stepForward();
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault();
        stepBackward();
      } else if (event.key.toLowerCase() === 'r') {
        reset();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen, togglePlay, stepForward, stepBackward, reset]);

  const selectCategory = (nextCategory) => {
    if (nextCategory === category) return;

    const [firstId] = algorithmsInCategory(nextCategory)[0] ?? [];

    setCategory(nextCategory);
    if (firstId) setAlgorithmId(firstId);
    setCustomInput(null);
  };

  const selectAlgorithm = (nextId) => {
    setAlgorithmId(nextId);
    setCustomInput(null);
  };

  const closeInfo = useCallback(() => setIsInfoOpen(false), []);
  const closeConfig = useCallback(() => setIsConfigOpen(false), []);

  return (
    <div className="app">
      <Header onOpenInfo={() => setIsInfoOpen(true)} />

      <AlgorithmSelector
        category={category}
        onSelectCategory={selectCategory}
        algorithmId={algorithmId}
        onSelectAlgorithm={selectAlgorithm}
      />

      <main className="workspace">
        <div className="workspace__main">
          <VisualizationPanel algorithmId={algorithmId} currentStep={execution.currentStep} />

          <ExecutionControls
            isPlaying={execution.isPlaying}
            onTogglePlay={togglePlay}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
            onReset={reset}
            onRandomize={() => setCustomInput(randomInput(category, algorithmId))}
            onOpenConfig={() => setIsConfigOpen(true)}
            speed={execution.speed}
            onSpeedChange={execution.setSpeed}
            stepIndex={execution.stepIndex}
            totalSteps={execution.totalSteps}
            onSeek={execution.seekTo}
          />

          <ExplanationPanel currentStep={execution.currentStep} algorithmId={algorithmId} />
        </div>

        <aside className="workspace__side">
          <CodePanel algorithmId={algorithmId} currentStep={execution.currentStep} />
        </aside>
      </main>

      <footer className="footer">
        <span>AlgoViz</span>
        <span className="footer__keys">
          <span><kbd>Space</kbd> Play / pause</span>
          <span><kbd>←</kbd> Previous</span>
          <span><kbd>→</kbd> Next</span>
          <span><kbd>R</kbd> Reset</span>
        </span>
      </footer>

      {isInfoOpen && <AlgorithmInfoModal algorithmId={algorithmId} onClose={closeInfo} />}

      {isConfigOpen && (
        <InputConfigModal
          algorithmId={algorithmId}
          onClose={closeConfig}
          onApplyConfig={setCustomInput}
        />
      )}
    </div>
  );
}

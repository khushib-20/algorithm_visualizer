import React from 'react';

import SortingVisualizer from './visualizers/SortingVisualizer';
import SearchingVisualizer from './visualizers/SearchingVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';
import { ALGORITHMS } from '../data/algorithmMetadata';

const VISUALIZERS = {
  sorting: SortingVisualizer,
  searching: SearchingVisualizer,
  graphs: GraphVisualizer,
};

export default function VisualizationPanel({ algorithmId, currentStep }) {
  const algo = ALGORITHMS[algorithmId] ?? {};
  const Visualizer = VISUALIZERS[algo.category];

  return (
    <section className="panel stage" aria-label="Visualization">
      <div className="panel__head">
        <h2 className="panel__title">{algo.name ?? 'Algorithm'}</h2>
        {algo.category && <span className="tag">{algo.category}</span>}
      </div>

      {algo.shortDescription && <p className="stage__desc">{algo.shortDescription}</p>}

      <div className="stage__canvas">
        {Visualizer ? (
          <Visualizer step={currentStep} />
        ) : (
          <p className="empty">Select an algorithm to begin.</p>
        )}
      </div>
    </section>
  );
}

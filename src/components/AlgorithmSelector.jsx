import React from 'react';
import { CATEGORIES, algorithmsInCategory } from '../data/algorithmMetadata';

//BFS
const buttonLabel = (name) => name.match(/\((.+)\)/)?.[1] ?? name;

export default function AlgorithmSelector({
  category,
  onSelectCategory,
  algorithmId,
  onSelectAlgorithm,
}) {
  return (
    <nav className="toolbar" aria-label="Algorithm selection">
      <div className="toolbar__group" role="group" aria-label="Category">
        {CATEGORIES.map(({ id, name }) => (
          <button
            key={id}
            type="button"
            className={`btn${id === category ? ' is-active' : ''}`}
            aria-pressed={id === category}
            onClick={() => onSelectCategory(id)}
          >
            {name}
          </button>
        ))}
      </div>

      <span className="toolbar__divider" aria-hidden="true" />

      <div className="toolbar__group" role="group" aria-label="Algorithm">
        {algorithmsInCategory(category).map(([id, algo]) => (
          <button
            key={id}
            type="button"
            className={`btn${id === algorithmId ? ' is-active' : ''}`}
            aria-pressed={id === algorithmId}
            onClick={() => onSelectAlgorithm(id)}
          >
            {buttonLabel(algo.name)}
          </button>
        ))}
      </div>
    </nav>
  );
}

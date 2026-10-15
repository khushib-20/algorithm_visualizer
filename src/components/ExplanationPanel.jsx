import React from 'react';
import { ALGORITHMS } from '../data/algorithmMetadata';

const IDLE = {
  operation: 'Algorithm initialized and ready.',
  why: 'Press play, or step forward, to see how the algorithm progresses.',
  stateVars: {},
  next: 'Begin execution to view the next step.',
};

function formatValue(value) {
  if (value === Infinity) return '∞';
  if (value === null || value === undefined) return String(value);
  if (typeof value === 'string') return value;

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, (_key, item) => (item === Infinity ? '∞' : item)).replace(/"∞"/g, '∞');
    } catch {
      return '[complex value]';
    }
  }

  return String(value);
}

export default function ExplanationPanel({ currentStep, algorithmId }) {
  const algo = ALGORITHMS[algorithmId] ?? {};
  const complexity = algo.complexity ?? {};
  const explanation = currentStep?.explanation ?? IDLE;
  const stateVars = explanation.stateVars ?? {};

  const chips = [
    ['Best', complexity.best],
    ['Average', complexity.average],
    ['Worst', complexity.worst],
    ['Space', complexity.space],
  ];

  return (
    <section className="panel explain" aria-label="Step explanation" aria-live="polite">
      <div className="panel__head">
        <h2 className="panel__title">Step explanation</h2>
        <span className="muted">{algo.name}</span>
      </div>

      <div className="explain__body">
        <ul className="chips">
          {chips.map(([label, value]) => (
            <li key={label} className="chip">
              <span className="chip__label">{label}</span>
              <span className="chip__value">{value ?? 'N/A'}</span>
            </li>
          ))}
        </ul>

        <div className="block">
          <h3 className="block__label">Current operation</h3>
          <p className="block__text block__text--strong">{explanation.operation}</p>
        </div>

        <div className="block">
          <h3 className="block__label">Why it matters</h3>
          <p className="block__text">{explanation.why}</p>
        </div>

        <div className="block">
          <h3 className="block__label">State variables</h3>
          <div className="vars">
            {Object.keys(stateVars).length === 0 ? (
              <span className="muted">None</span>
            ) : (
              Object.entries(stateVars).map(([key, value]) => (
                <span key={key} className="var" title={`${key}: ${formatValue(value)}`}>
                  <span className="var__key">{key}</span>
                  <span className="var__value">{formatValue(value)}</span>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="block block--next">
          <h3 className="block__label">Next</h3>
          <p className="block__text muted">{explanation.next}</p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const LEGEND = [
  ['default', 'Unsorted'],
  ['compare', 'Comparing'],
  ['swap', 'Swapped / written'],
  ['pivot', 'Pivot / candidate'],
  ['sorted', 'Sorted'],
];

export default function SortingVisualizer({ step }) {
  if (!step?.state) return null;

  const { array = [], comparing = [], swapped = [], sortedIndices = [], pivot = null } = step.state;

  const maxValue = Math.max(1, ...array.map((value) => Math.abs(Number(value) || 0)));
  const comparingSet = new Set(comparing);
  const swappedSet = new Set(swapped);
  const sortedSet = new Set(sortedIndices);

  const stateOf = (index) => {
    if (swappedSet.has(index)) return 'swap';
    if (index === pivot) return 'pivot';
    if (comparingSet.has(index)) return 'compare';
    if (sortedSet.has(index)) return 'sorted';
    return 'default';
  };

  const showValues = array.length <= 25;
  const showIndices = array.length <= 25;

  return (
    <div className="viz">
      <Legend items={LEGEND} />

      <div className={`bars${array.length > 40 ? ' bars--dense' : ''}`} role="img" aria-label={`Array: ${array.join(', ')}`}>
        {array.map((value, index) => {
          const height = Math.max((Math.abs(Number(value) || 0) / maxValue) * 100, 2);

          return (
            <div key={index} className={`bar-col is-${stateOf(index)}`}>
              <span className="bar-col__value">{showValues ? value : ''}</span>
              <div className="bar-col__track">
                <div className="bar" style={{ height: `${height}%` }} />
              </div>
              <span className="bar-col__index">{showIndices ? index : ''}</span>
            </div>
          );
        })}
      </div>

      <div className="viz__foot">
        <span>Elements <b>{array.length}</b></span>
        <span>Sorted <b>{sortedSet.size} / {array.length}</b></span>
      </div>
    </div>
  );
}

export function Legend({ items }) {
  return (
    <ul className="legend">
      {items.map(([key, label]) => (
        <li key={key} className="legend__item">
          <span className={`swatch swatch--${key}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}

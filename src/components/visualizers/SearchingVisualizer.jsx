import React from 'react';
import { Legend } from './SortingVisualizer';

const LEGEND = [
  ['default', 'In range'],
  ['current', 'Checking'],
  ['found', 'Found'],
  ['dim', 'Ruled out'],
];

export default function SearchingVisualizer({ step }) {
  if (!step?.state) return null;

  const {
    array = [],
    currentIndex = null,
    low = null,
    high = null,
    mid = null,
    target,
    foundIndex = null,
    status = 'searching',
  } = step.state;

  const isBinary = low !== null || high !== null || mid !== null;

  const cellState = (index) => {
    if (foundIndex === index) return 'found';
    if (mid === index || currentIndex === index) return 'current';
    if (isBinary && (index < low || index > high)) return 'dim';
    return 'default';
  };

  return (
    <div className="viz">
      <div className="viz__top">
        <div className="readout">
          <span className="readout__label">Target</span>
          <span className="readout__value">{target}</span>
        </div>

        {status === 'found' && <span className="status status--found">Found at index {foundIndex}</span>}
        {status === 'not-found' && <span className="status">Not found (-1)</span>}
      </div>

      <Legend items={LEGEND} />

      <div className="cells-wrap">
        <div className="cells">
          {array.map((value, index) => {
            const tags = [];
            if (isBinary && index === mid) tags.push('MID');
            else {
              if (isBinary && index === low) tags.push('LOW');
              if (isBinary && index === high) tags.push('HIGH');
            }

            return (
              <div key={index} className={`cell-col is-${cellState(index)}`}>
                <span className="cell-col__pointer">
                  {tags.map((tag) => (
                    <span key={tag} className={`pointer pointer--${tag.toLowerCase()}`}>{tag}</span>
                  ))}
                  {!isBinary && currentIndex === index && <span className="pointer pointer--arrow">▼</span>}
                </span>
                <div className="cell">{value}</div>
                <span className="cell-col__index">[{index}]</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="viz__foot">
        <span>
          {isBinary ? <>Window <b>[{low ?? '-'} .. {high ?? '-'}]</b></> : <>Index <b>{currentIndex ?? '-'}</b></>}
        </span>
        <span>Elements <b>{array.length}</b></span>
      </div>
    </div>
  );
}

import React from 'react';

export default function Header({ onOpenInfo }) {
  return (
    <header className="header">
      <div className="brand">
        <h1 className="brand__name">AlgoViz</h1>
        <p className="brand__tag">Understand algorithms, one step at a time.</p>
      </div>

      <button type="button" className="btn" onClick={onOpenInfo} title="Complexity, theory and use cases">
        Algorithm docs
      </button>
    </header>
  );
}

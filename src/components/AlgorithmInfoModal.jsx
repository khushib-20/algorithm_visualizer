import React from 'react';
import Modal from './Modal';
import { ALGORITHMS } from '../data/algorithmMetadata';

const List = ({ items, empty }) =>
  items?.length ? (
    <ul className="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) : (
    <p className="muted">{empty}</p>
  );

export default function AlgorithmInfoModal({ algorithmId, onClose }) {
  const algo = ALGORITHMS[algorithmId] ?? {};
  const complexity = algo.complexity ?? {};

  const cards = [
    ['Best', complexity.best],
    ['Average', complexity.average],
    ['Worst', complexity.worst],
    ['Space', complexity.space],
  ];

  return (
    <Modal title={algo.name ?? algorithmId} subtitle={algo.category} onClose={onClose}>
      <section className="section">
        <h3 className="section__label">Description</h3>
        <p>{algo.shortDescription ?? 'No description available.'}</p>
      </section>

      <section className="section">
        <h3 className="section__label">Complexity</h3>
        <ul className="chips chips--wide">
          {cards.map(([label, value]) => (
            <li key={label} className="chip">
              <span className="chip__label">{label}</span>
              <span className="chip__value">{value ?? 'N/A'}</span>
            </li>
          ))}
        </ul>
        {(algo.stability != null || algo.inPlace != null) && (
          <p className="muted section__meta">
            {algo.stability != null && <>Stability: <b>{String(algo.stability)}</b></>}
            {algo.stability != null && algo.inPlace != null && ' · '}
            {algo.inPlace != null && <>In-place: <b>{String(algo.inPlace)}</b></>}
          </p>
        )}
      </section>

      <section className="section">
        <h3 className="section__label">How it works</h3>
        {algo.howItWorks?.length ? (
          <ol className="list list--ordered">
            {algo.howItWorks.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="muted">Not available.</p>
        )}
      </section>

      <section className="section">
        <h3 className="section__label">Best use cases</h3>
        <List items={algo.bestUseCases} empty="None listed." />
      </section>

      <div className="two-col">
        <section className="section">
          <h3 className="section__label">Advantages</h3>
          <List items={algo.advantages} empty="None listed." />
        </section>
        <section className="section">
          <h3 className="section__label">Limitations</h3>
          <List items={algo.limitations} empty="None listed." />
        </section>
      </div>
    </Modal>
  );
}

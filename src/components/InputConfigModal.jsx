import React, { useState } from 'react';
import Modal from './Modal';
import { ALGORITHMS } from '../data/algorithmMetadata';
import { DEFAULT_GRAPH } from '../algorithms/graphs';

const DEFAULT_ARRAY = '45, 12, 85, 32, 89, 39, 69, 22, 58, 14, 73, 50';
const NODE_IDS = DEFAULT_GRAPH.nodes.map((node) => node.id);
const MAX_ELEMENTS = 100;

function parseNumberList(text) {
  const parts = text.split(',').map((part) => part.trim());
  if (parts.some((part) => part === '' || !Number.isFinite(Number(part)))) return null;
  return parts.map(Number);
}

const randomArray = (size, sorted) => {
  const values = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  return sorted ? values.sort((a, b) => a - b) : values;
};

export default function InputConfigModal({ algorithmId, onClose, onApplyConfig }) {
  const algo = ALGORITHMS[algorithmId] ?? {};
  const { category } = algo;

  const [arrayText, setArrayText] = useState(DEFAULT_ARRAY);
  const [size, setSize] = useState(12);
  const [targetText, setTargetText] = useState('50');
  const [startNode, setStartNode] = useState('A');
  const [targetNode, setTargetNode] = useState('F');
  const [error, setError] = useState('');

  const generate = () => {
    setArrayText(randomArray(size, algorithmId === 'binary-search').join(', '));
    setError('');
  };

  const apply = () => {
    if (category === 'graphs') {
      onApplyConfig({ startNode, targetNode });
      onClose();
      return;
    }

    const parsed = parseNumberList(arrayText);
    if (!parsed) return setError('Enter numbers separated by commas, with no empty entries.');
    if (parsed.length < 3) return setError('Please enter at least 3 numbers.');
    if (parsed.length > MAX_ELEMENTS) return setError(`Limited to ${MAX_ELEMENTS} elements.`);

    if (category === 'searching') {
      const target = Number(targetText);
      if (targetText.trim() === '' || !Number.isFinite(target)) return setError('Enter a numeric search target.');
      onApplyConfig({ array: parsed, target });
    } else {
      onApplyConfig({ array: parsed });
    }

    onClose();
  };

  const footer = (
    <>
      <button type="button" className="btn" onClick={onClose}>Cancel</button>
      <button type="button" className="btn btn--primary" onClick={apply}>Apply</button>
    </>
  );

  return (
    <Modal title="Custom input" subtitle={algo.name} onClose={onClose} footer={footer}>
      {error && <p className="alert" role="alert">{error}</p>}

      {category === 'graphs' ? (
        <div className="two-col">
          <label className="field-group">
            <span className="field-group__label">Start node</span>
            <select className="field" value={startNode} onChange={(e) => setStartNode(e.target.value)}>
              {NODE_IDS.map((id) => <option key={id} value={id}>Node {id}</option>)}
            </select>
          </label>

          <label className="field-group">
            <span className="field-group__label">Destination node</span>
            <select className="field" value={targetNode} onChange={(e) => setTargetNode(e.target.value)}>
              {NODE_IDS.map((id) => <option key={id} value={id}>Node {id}</option>)}
            </select>
          </label>
        </div>
      ) : (
        <>
          <label className="field-group">
            <span className="field-group__label">Numbers, comma separated (3–{MAX_ELEMENTS})</span>
            <textarea
              className="field field--mono"
              rows={3}
              value={arrayText}
              onChange={(e) => setArrayText(e.target.value)}
              placeholder="45, 12, 85, 32, 89"
            />
            {algorithmId === 'binary-search' && (
              <span className="muted">The array is sorted automatically before Binary Search runs.</span>
            )}
          </label>

          <div className="field-group">
            <span className="field-group__label">Random array</span>
            <div className="inline">
              <input
                type="range"
                min="5"
                max="60"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                aria-label="Random array size"
              />
              <span className="inline__value">{size}</span>
              <button type="button" className="btn btn--sm" onClick={generate}>Generate</button>
            </div>
          </div>

          {category === 'searching' && (
            <label className="field-group">
              <span className="field-group__label">Target value</span>
              <input
                className="field field--mono field--short"
                type="number"
                value={targetText}
                onChange={(e) => setTargetText(e.target.value)}
              />
            </label>
          )}
        </>
      )}
    </Modal>
  );
}

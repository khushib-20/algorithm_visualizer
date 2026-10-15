import React, { useState, useEffect, useMemo, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';

import { ALGORITHM_CODE, getCodeLine } from '../data/algorithmCode';

const LANGUAGES = [
  ['cpp', 'C++', 'cpp'],
  ['py', 'Python', 'python'],
];

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function CodePanel({ algorithmId, currentStep }) {
  const [language, setLanguage] = useState('cpp');
  const [copyState, setCopyState] = useState('idle');
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  const source = ALGORITHM_CODE[algorithmId]?.[language] ?? '# Implementation not available yet.';
  const prismName = LANGUAGES.find(([id]) => id === language)[2];
  const activeLine = getCodeLine(algorithmId, language, currentStep?.type);

  const lines = useMemo(() => {
    const grammar = Prism.languages[prismName];
    return source.split('\n').map((line) => {
      try {
        return Prism.highlight(line || ' ', grammar, prismName);
      } catch {
        return escapeHtml(line || ' ');
      }
    });
  }, [source, prismName]);

  useEffect(() => setCopyState('idle'), [algorithmId, language]);

  useEffect(() => {
    const box = scrollRef.current;
    const line = activeRef.current;
    if (!box || !line) return;

    if (line.offsetTop < box.scrollTop + 8) {
      box.scrollTop = Math.max(0, line.offsetTop - 40);
    } else if (line.offsetTop + line.offsetHeight > box.scrollTop + box.clientHeight - 8) {
      box.scrollTop = line.offsetTop + line.offsetHeight - box.clientHeight + 40;
    }
  }, [activeLine, algorithmId, language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 1800);
  };

  return (
    <section className="panel code" aria-label="Source code">
      <div className="panel__head">
        <div className="btn-group">
          {LANGUAGES.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`btn btn--sm${language === id ? ' is-active' : ''}`}
              aria-pressed={language === id}
              onClick={() => setLanguage(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <button type="button" className="btn btn--sm" onClick={copy}>
          {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'}
        </button>
      </div>

      <div className="code__scroll" ref={scrollRef}>
        <div className="code__lines">
          {lines.map((html, index) => {
            const number = index + 1;
            const isActive = number === activeLine;

            return (
              <div
                key={number}
                ref={isActive ? activeRef : null}
                className={`code__line${isActive ? ' is-active' : ''}`}
              >
                <span className="code__num">{number}</span>
                <span className="code__text" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="code__status">
        <span>{activeLine ? `Line ${activeLine}` : 'Idle'}</span>
        <span>{language === 'cpp' ? 'C++' : 'Python'}</span>
      </div>
    </section>
  );
}

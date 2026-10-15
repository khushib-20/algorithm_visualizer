import React from 'react';

export default function ExecutionControls({
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onRandomize,
  onOpenConfig,
  speed,
  onSpeedChange,
  stepIndex,
  totalSteps,
  onSeek,
}) {
  const hasSteps = totalSteps > 0;
  const atStart = !hasSteps || stepIndex === 0;
  const atEnd = !hasSteps || stepIndex >= totalSteps - 1;

  return (
    <section className="panel controls" aria-label="Playback controls">
      <div className="controls__row">
        <label className="slider">
          <span className="slider__label">
            Step <b>{hasSteps ? stepIndex + 1 : 0}</b> / {totalSteps}
          </span>
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={stepIndex}
            disabled={!hasSteps}
            onChange={(event) => onSeek(Number(event.target.value))}
            aria-label="Execution progress"
          />
        </label>

        <label className="slider slider--speed">
          <span className="slider__label">
            Speed <b>{speed}x</b>
          </span>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={speed}
            onChange={(event) => onSpeedChange(Number(event.target.value))}
            aria-label="Animation speed"
          />
        </label>
      </div>

      <div className="controls__row controls__row--buttons">
        <div className="btn-group">
          <button type="button" className="btn" onClick={onReset} disabled={atStart && !isPlaying}>
            Reset
          </button>
          <button type="button" className="btn" onClick={onStepBackward} disabled={atStart}>
            Prev
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onTogglePlay}
            disabled={totalSteps <= 1}
          >
            {isPlaying ? 'Pause' : atEnd ? 'Replay' : 'Play'}
          </button>
          <button type="button" className="btn" onClick={onStepForward} disabled={atEnd}>
            Next
          </button>
        </div>

        <div className="btn-group">
          <button type="button" className="btn" onClick={onRandomize}>
            Randomize
          </button>
          <button type="button" className="btn" onClick={onOpenConfig}>
            Custom input
          </button>
        </div>
      </div>
    </section>
  );
}

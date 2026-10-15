import React, { useRef, useState } from 'react';
import { DEFAULT_GRAPH } from '../../algorithms/graphs';
import { Legend } from './SortingVisualizer';

const VIEW_W = 540;
const VIEW_H = 300;
const MARGIN = 26;
const NODE_R = 18;

const LEGEND = [
  ['unvisited', 'Unvisited'],
  ['frontier', 'Queue / stack'],
  ['current', 'Current'],
  ['visited', 'Visited'],
  ['path', 'Path'],
];

const initialPositions = (graph) =>
  Object.fromEntries(graph.nodes.map((node) => [node.id, { x: node.x, y: node.y }]));

const sameEdge = (a, b, u, v) => (a === u && b === v) || (a === v && b === u);

export default function GraphVisualizer({ step, graph = DEFAULT_GRAPH }) {
  const svgRef = useRef(null);
  const [positions, setPositions] = useState(() => initialPositions(graph));
  const [dragging, setDragging] = useState(null);

  const toViewBox = (event) => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!matrix) return null;

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(matrix.inverse());
  };

  const startDrag = (nodeId) => (event) => {
    event.preventDefault();
    svgRef.current?.setPointerCapture(event.pointerId);
    setDragging(nodeId);
  };

  const onPointerMove = (event) => {
    if (!dragging) return;

    const point = toViewBox(event);
    if (!point) return;

    setPositions((previous) => ({
      ...previous,
      [dragging]: {
        x: Math.max(MARGIN, Math.min(VIEW_W - MARGIN, point.x)),
        y: Math.max(MARGIN, Math.min(VIEW_H - MARGIN, point.y)),
      },
    }));
  };

  const stopDrag = () => setDragging(null);

  if (!step?.state) return null;

  const { visited = [], frontier = [], current = null, path = [], activeEdge = null, distances } = step.state;

  const visitedSet = new Set(visited);
  const frontierSet = new Set(frontier);
  const pathSet = new Set(path);

  const isPathEdge = (u, v) =>
    path.some((node, index) => index < path.length - 1 && sameEdge(node, path[index + 1], u, v));

  const isActiveEdge = (u, v) => Boolean(activeEdge) && sameEdge(activeEdge.u, activeEdge.v, u, v);

  const nodeState = (id) => {
    if (pathSet.has(id)) return 'path';
    if (current === id) return 'current';
    if (frontierSet.has(id)) return 'frontier';
    if (visitedSet.has(id)) return 'visited';
    return 'unvisited';
  };

  return (
    <div className="viz">
      <Legend items={LEGEND} />

      <div className="graph">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="graph__svg"
          role="img"
          aria-label="Graph"
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        >
          {graph.edges.map((edge) => {
            const a = positions[edge.u];
            const b = positions[edge.v];
            const onPath = isPathEdge(edge.u, edge.v);
            const active = isActiveEdge(edge.u, edge.v);
            const tone = onPath ? 'path' : active ? 'active' : 'idle';

            return (
              <g key={`${edge.u}-${edge.v}`} className={`edge edge--${tone}`}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                {edge.weight !== undefined && (
                  <g transform={`translate(${(a.x + b.x) / 2}, ${(a.y + b.y) / 2})`}>
                    <rect x="-9" y="-8" width="18" height="16" />
                    <text textAnchor="middle" dy="3.5">{edge.weight}</text>
                  </g>
                )}
              </g>
            );
          })}

          {graph.nodes.map((node) => {
            const { x, y } = positions[node.id];
            const state = nodeState(node.id);
            const distance = distances?.[node.id];

            return (
              <g
                key={node.id}
                className={`node node--${state}${dragging === node.id ? ' is-dragging' : ''}`}
                transform={`translate(${x}, ${y})`}
                onPointerDown={startDrag(node.id)}
              >
                {(state === 'current' || state === 'frontier') && <circle className="node__ring" r={NODE_R + 6} />}
                <circle className="node__body" r={NODE_R} />
                <text className="node__label" textAnchor="middle" dy="4">{node.label ?? node.id}</text>

                {distance !== undefined && (
                  <g className="node__dist" transform={`translate(0, ${-NODE_R - 12})`}>
                    <rect x="-14" y="-8" width="28" height="15" />
                    <text textAnchor="middle" dy="3">{distance === Infinity ? '∞' : distance}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="viz__foot">
        <span>Visited <b>{visited.length} / {graph.nodes.length}</b></span>
        {path.length > 0 ? <span>Path <b>{path.join(' → ')}</b></span> : <span className="muted">Drag a node to rearrange</span>}
      </div>
    </div>
  );
}

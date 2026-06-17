'use client';

import { useMemo } from 'react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Slider, Stage, Transport, ProgressBar, Legend, useStepPlayer } from './shared';
import { useState } from 'react';

export type GraphAlgo = 'bfs' | 'dfs' | 'dijkstra';

const POS: Record<string, { x: number; y: number }> = {
  A: { x: 80, y: 180 },
  B: { x: 220, y: 70 },
  C: { x: 220, y: 290 },
  D: { x: 410, y: 170 },
  E: { x: 560, y: 300 },
  F: { x: 650, y: 120 },
};
const NODES = Object.keys(POS);
const EDGES: [string, string, number][] = [
  ['A', 'B', 4],
  ['A', 'C', 2],
  ['B', 'C', 1],
  ['B', 'D', 5],
  ['C', 'D', 8],
  ['C', 'E', 10],
  ['D', 'E', 2],
  ['D', 'F', 6],
  ['E', 'F', 3],
];

const ADJ: Record<string, { to: string; w: number }[]> = {};
NODES.forEach((n) => (ADJ[n] = []));
EDGES.forEach(([a, b, w]) => {
  ADJ[a].push({ to: b, w });
  ADJ[b].push({ to: a, w });
});
NODES.forEach((n) => ADJ[n].sort((x, y) => x.to.localeCompare(y.to)));

interface Frame {
  visited: Set<string>;
  current: string | null;
  dist?: Record<string, number>;
  note: { en: string; pt: string };
}

function build(algo: GraphAlgo, start: string): Frame[] {
  const frames: Frame[] = [];

  if (algo === 'bfs') {
    const visited = new Set([start]);
    const queue = [start];
    frames.push({ visited: new Set(visited), current: null, note: { en: `Start at ${start}`, pt: `Começar em ${start}` } });
    while (queue.length) {
      const node = queue.shift()!;
      frames.push({ visited: new Set(visited), current: node, note: { en: `Visit ${node}`, pt: `Visitar ${node}` } });
      for (const { to } of ADJ[node]) if (!visited.has(to)) { visited.add(to); queue.push(to); }
      frames.push({ visited: new Set(visited), current: node, note: { en: `Queue: ${queue.join(', ') || '∅'}`, pt: `Fila: ${queue.join(', ') || '∅'}` } });
    }
  } else if (algo === 'dfs') {
    const visited = new Set<string>();
    frames.push({ visited: new Set(), current: null, note: { en: `Start at ${start}`, pt: `Começar em ${start}` } });
    const rec = (node: string) => {
      visited.add(node);
      frames.push({ visited: new Set(visited), current: node, note: { en: `Visit ${node}`, pt: `Visitar ${node}` } });
      for (const { to } of ADJ[node]) if (!visited.has(to)) rec(to);
    };
    rec(start);
  } else {
    const dist: Record<string, number> = {};
    NODES.forEach((n) => (dist[n] = Infinity));
    dist[start] = 0;
    const done = new Set<string>();
    frames.push({ visited: new Set(), current: null, dist: { ...dist }, note: { en: `dist[${start}] = 0, rest = ∞`, pt: `dist[${start}] = 0, resto = ∞` } });
    while (done.size < NODES.length) {
      let u: string | null = null;
      let best = Infinity;
      for (const n of NODES) if (!done.has(n) && dist[n] < best) { best = dist[n]; u = n; }
      if (u === null) break;
      done.add(u);
      frames.push({ visited: new Set(done), current: u, dist: { ...dist }, note: { en: `Finalize ${u} (dist ${dist[u]})`, pt: `Finalizar ${u} (dist ${dist[u]})` } });
      for (const { to, w } of ADJ[u]) if (!done.has(to) && dist[u] + w < dist[to]) dist[to] = dist[u] + w;
      frames.push({ visited: new Set(done), current: u, dist: { ...dist }, note: { en: `Relax edges from ${u}`, pt: `Relaxar arestas de ${u}` } });
    }
  }

  frames.push({
    visited: new Set(NODES),
    current: null,
    dist: undefined,
    note: { en: 'Done', pt: 'Concluído' },
  });
  return frames;
}

export default function GraphVisualizer({
  algorithm,
  locale = 'en',
}: {
  algorithm: GraphAlgo;
  locale?: Locale;
}) {
  const [speed, setSpeed] = useState(45);
  const frames = useMemo(() => build(algorithm, 'A'), [algorithm]);
  const player = useStepPlayer(frames.length, speed);
  const frame = frames[Math.min(player.index, frames.length - 1)];
  const showWeights = algorithm === 'dijkstra';

  const nodeColor = (n: string) => {
    if (frame.current === n) return { fill: '#fbbf24', stroke: '#fde68a' };
    if (frame.visited.has(n)) return { fill: '#10b981', stroke: '#6ee7b7' };
    return { fill: '#0284c7', stroke: '#38bdf8' };
  };

  const title =
    algorithm === 'bfs' ? 'Breadth-First Search' : algorithm === 'dfs' ? 'Depth-First Search' : "Dijkstra's Algorithm";

  return (
    <Panel
      title={title}
      meta={
        <>
          <span>
            {tr(locale, 'Step', 'Passo')} {player.index + 1}/{frames.length}
          </span>
          <span className="text-amber-300">{tr(locale, frame.note.en, frame.note.pt)}</span>
        </>
      }
      controls={<Transport player={player} locale={locale} />}
    >
      <div className="mb-4">
        <Slider label={tr(locale, 'Speed', 'Velocidade')} value={speed} min={1} max={100} onChange={setSpeed} />
      </div>

      <Stage className="overflow-x-auto">
        <svg viewBox="0 0 720 360" className="mx-auto w-full" style={{ maxHeight: 360 }}>
          {EDGES.map(([a, b, w], i) => {
            const pa = POS[a];
            const pb = POS[b];
            return (
              <g key={i}>
                <line x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#475569" strokeWidth={2} />
                {showWeights && (
                  <text
                    x={(pa.x + pb.x) / 2}
                    y={(pa.y + pb.y) / 2 - 6}
                    textAnchor="middle"
                    className="fill-dark-300 text-xs font-mono"
                  >
                    {w}
                  </text>
                )}
              </g>
            );
          })}
          {NODES.map((n) => {
            const p = POS[n];
            const c = nodeColor(n);
            const d = frame.dist?.[n];
            return (
              <g key={n}>
                <circle cx={p.x} cy={p.y} r={24} fill={c.fill} stroke={c.stroke} strokeWidth={2} className="transition-colors" />
                <text x={p.x} y={p.y + 5} textAnchor="middle" className="fill-white text-sm font-bold">
                  {n}
                </text>
                {showWeights && d !== undefined && (
                  <text x={p.x} y={p.y - 32} textAnchor="middle" className="fill-primary-200 text-xs font-mono">
                    {d === Infinity ? '∞' : d}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </Stage>

      <ProgressBar index={player.index} total={frames.length} />

      <Legend
        items={[
          { color: 'bg-primary-600', label: tr(locale, 'Unvisited', 'Não visitado') },
          { color: 'bg-amber-400', label: tr(locale, 'Current', 'Atual') },
          { color: 'bg-emerald-500', label: tr(locale, 'Visited', 'Visitado') },
        ]}
      />
    </Panel>
  );
}

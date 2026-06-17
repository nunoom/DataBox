'use client';

import { useMemo, useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, Legend } from './shared';

const RING = 360;
function hash(s: string): number {
  let h = 2166136261;
  for (const ch of s) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % RING;
}

const NODE_COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6'];
const KEYS = ['user:42', 'order:7', 'cart:9', 'img:3', 'log:88', 'doc:5', 'sess:1', 'evt:21'];
const ALL_NODES = ['Node-A', 'Node-B', 'Node-C', 'Node-D', 'Node-E'];

export default function ConsistentHashingVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [count, setCount] = useState(3);
  const nodes = ALL_NODES.slice(0, count);

  const { cx, cy, R } = { cx: 200, cy: 200, R: 150 };
  const angleToXY = (deg: number, r = R) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const nodePoints = useMemo(
    () =>
      nodes.map((n, i) => ({ name: n, angle: hash(n), color: NODE_COLORS[i % NODE_COLORS.length], idx: i })),
    [nodes]
  );

  const owner = (keyAngle: number) => {
    const sorted = [...nodePoints].sort((a, b) => a.angle - b.angle);
    const found = sorted.find((n) => n.angle >= keyAngle) ?? sorted[0];
    return found;
  };

  const keyPoints = KEYS.map((k) => {
    const angle = hash(k);
    return { key: k, angle, owner: owner(angle) };
  });

  return (
    <Panel
      title={tr(locale, 'Consistent Hashing Ring', 'Anel de Consistent Hashing')}
      meta={
        <span className="text-amber-300">
          {tr(locale, 'Each key belongs to the next node clockwise', 'Cada chave pertence ao próximo nó no sentido horário')}
        </span>
      }
      controls={
        <>
          <ControlButton onClick={() => setCount((c) => Math.min(ALL_NODES.length, c + 1))} variant="primary" disabled={count >= ALL_NODES.length}>
            <Plus className="h-4 w-4" /> {tr(locale, 'Add node', 'Adicionar nó')}
          </ControlButton>
          <ControlButton onClick={() => setCount((c) => Math.max(1, c - 1))} disabled={count <= 1}>
            <Minus className="h-4 w-4" /> {tr(locale, 'Remove node', 'Remover nó')}
          </ControlButton>
          <ControlButton onClick={() => setCount(3)} title="reset">
            <RotateCcw className="h-4 w-4" />
          </ControlButton>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <Stage className="flex justify-center">
          <svg viewBox="0 0 400 400" className="w-full" style={{ maxWidth: 360 }}>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#334155" strokeWidth={2} />
            {/* keys */}
            {keyPoints.map((k) => {
              const p = angleToXY(k.angle, R);
              return <circle key={k.key} cx={p.x} cy={p.y} r={6} fill={k.owner?.color ?? '#94a3b8'} stroke="#0f172a" strokeWidth={1.5} />;
            })}
            {/* nodes */}
            {nodePoints.map((n) => {
              const p = angleToXY(n.angle, R);
              const label = angleToXY(n.angle, R + 26);
              return (
                <g key={n.name}>
                  <rect x={p.x - 8} y={p.y - 8} width={16} height={16} rx={3} fill={n.color} stroke="#0f172a" strokeWidth={1.5} />
                  <text x={label.x} y={label.y} textAnchor="middle" className="fill-dark-200 text-[10px] font-semibold">
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Stage>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-dark-400">
            {tr(locale, 'Key → Node assignment', 'Atribuição Chave → Nó')}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {keyPoints.map((k) => (
              <div key={k.key} className="flex items-center justify-between rounded-lg bg-dark-800 px-3 py-2 text-sm">
                <span className="font-mono text-dark-200">{k.key}</span>
                <span className="flex items-center gap-1.5 text-dark-300">
                  <span className="inline-block h-3 w-3 rounded" style={{ background: k.owner?.color }} />
                  {k.owner?.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-dark-400">
            {tr(
              locale,
              'Add or remove a node and notice only the keys near it change owner — not the whole map.',
              'Adiciona ou remove um nó e repara que só as chaves perto dele mudam de dono — não o mapa todo.'
            )}
          </p>
        </div>
      </div>

      <Legend
        items={[
          { color: 'bg-dark-400', label: tr(locale, 'Key (●)', 'Chave (●)') },
          { color: 'bg-primary-500', label: tr(locale, 'Node (■)', 'Nó (■)') },
        ]}
      />
    </Panel>
  );
}

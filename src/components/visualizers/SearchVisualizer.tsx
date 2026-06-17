'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import {
  Panel,
  Slider,
  Legend,
  Stage,
  Transport,
  ProgressBar,
  ControlButton,
  useStepPlayer,
} from './shared';

export type SearchAlgo = 'linear' | 'binary';

type Cell = 'default' | 'active' | 'excluded' | 'found' | 'range';
interface Frame {
  states: Cell[];
  note: { en: string; pt: string };
}

function build(algo: SearchAlgo, values: number[], target: number): Frame[] {
  const frames: Frame[] = [];
  const n = values.length;

  if (algo === 'linear') {
    for (let i = 0; i < n; i++) {
      const states: Cell[] = values.map((_, k) => (k < i ? 'excluded' : 'default'));
      states[i] = values[i] === target ? 'found' : 'active';
      frames.push({
        states,
        note:
          values[i] === target
            ? { en: `Found ${target} at index ${i}`, pt: `Encontrado ${target} no índice ${i}` }
            : { en: `Index ${i}: ${values[i]} ≠ ${target}`, pt: `Índice ${i}: ${values[i]} ≠ ${target}` },
      });
      if (values[i] === target) return frames;
    }
    frames.push({
      states: values.map(() => 'excluded'),
      note: { en: `${target} not found`, pt: `${target} não encontrado` },
    });
    return frames;
  }

  // binary
  let lo = 0;
  let hi = n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const states: Cell[] = values.map((_, k) => (k < lo || k > hi ? 'excluded' : 'range'));
    states[mid] = values[mid] === target ? 'found' : 'active';
    frames.push({
      states,
      note:
        values[mid] === target
          ? { en: `Found ${target} at index ${mid}`, pt: `Encontrado ${target} no índice ${mid}` }
          : values[mid] < target
          ? { en: `${values[mid]} < ${target} → search right`, pt: `${values[mid]} < ${target} → procurar à direita` }
          : { en: `${values[mid]} > ${target} → search left`, pt: `${values[mid]} > ${target} → procurar à esquerda` },
    });
    if (values[mid] === target) return frames;
    if (values[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  frames.push({
    states: values.map(() => 'excluded'),
    note: { en: `${target} not found`, pt: `${target} não encontrado` },
  });
  return frames;
}

const COLORS: Record<Cell, string> = {
  default: 'bg-dark-700 text-dark-100',
  active: 'bg-amber-400 text-dark-900',
  excluded: 'bg-dark-800 text-dark-500 opacity-50',
  found: 'bg-emerald-500 text-white',
  range: 'bg-primary-600/40 text-white',
};

function makeData(size: number, sorted: boolean): number[] {
  const set = new Set<number>();
  while (set.size < size) set.add(Math.floor(Math.random() * 99) + 1);
  const arr = [...set];
  return sorted ? arr.sort((a, b) => a - b) : arr;
}

export default function SearchVisualizer({
  algorithm,
  locale = 'en',
}: {
  algorithm: SearchAlgo;
  locale?: Locale;
}) {
  const [size, setSize] = useState(12);
  const [speed, setSpeed] = useState(45);
  const [data, setData] = useState<number[]>(() => makeData(12, algorithm === 'binary'));
  const [target, setTarget] = useState<number>(() => data[Math.floor(Math.random() * data.length)]);

  const frames = useMemo(() => build(algorithm, data, target), [algorithm, data, target]);
  const player = useStepPlayer(frames.length, speed);
  const frame = frames[Math.min(player.index, frames.length - 1)];

  const regenerate = (s = size) => {
    const d = makeData(s, algorithm === 'binary');
    setData(d);
    setTarget(d[Math.floor(Math.random() * d.length)]);
    player.reset();
  };
  const newTarget = () => {
    setTarget(data[Math.floor(Math.random() * data.length)]);
    player.reset();
  };

  return (
    <Panel
      title={algorithm === 'binary' ? 'Binary Search' : 'Linear Search'}
      meta={
        <>
          <span>
            {tr(locale, 'Target', 'Alvo')}: <span className="text-primary-300 font-semibold">{target}</span>
          </span>
          <span className="text-amber-300">{tr(locale, frame.note.en, frame.note.pt)}</span>
        </>
      }
      controls={
        <>
          <ControlButton onClick={newTarget} disabled={player.isPlaying}>
            {tr(locale, 'New target', 'Novo alvo')}
          </ControlButton>
          <Transport player={player} locale={locale} onShuffle={() => regenerate()} shuffleDisabled={player.isPlaying} />
        </>
      }
    >
      <div className="mb-4 flex flex-wrap gap-5">
        <Slider label={tr(locale, 'Speed', 'Velocidade')} value={speed} min={1} max={100} onChange={setSpeed} />
        <Slider
          label={tr(locale, 'Size', 'Tamanho')}
          value={size}
          min={5}
          max={20}
          onChange={(v) => {
            setSize(v);
            regenerate(v);
          }}
          disabled={player.isPlaying}
        />
      </div>

      <Stage className="flex flex-wrap items-end justify-center gap-2 py-8">
        {data.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg font-semibold transition-all ${COLORS[frame.states[i]]}`}
            >
              {v}
            </div>
            <span className="text-[10px] text-dark-500">{i}</span>
          </div>
        ))}
      </Stage>

      <ProgressBar index={player.index} total={frames.length} />

      <Legend
        items={[
          { color: 'bg-primary-600/40', label: tr(locale, 'In range', 'No intervalo') },
          { color: 'bg-amber-400', label: tr(locale, 'Checking', 'A verificar') },
          { color: 'bg-emerald-500', label: tr(locale, 'Found', 'Encontrado') },
          { color: 'bg-dark-800', label: tr(locale, 'Excluded', 'Excluído') },
        ]}
      />
    </Panel>
  );
}

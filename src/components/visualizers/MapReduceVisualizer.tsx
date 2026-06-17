'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Slider, Stage, Transport, ProgressBar, useStepPlayer } from './shared';

type Phase = 'input' | 'map' | 'shuffle' | 'reduce';
interface Frame {
  phase: Phase;
  chunkActive: number;
  mapped: number; // how many chunks have been mapped
  grouped: boolean;
  reduced: boolean;
  note: { en: string; pt: string };
}

const SENTENCES = [
  'the quick brown fox',
  'the lazy dog sleeps',
  'the fox jumps high',
];

function chunkWords() {
  return SENTENCES.map((s, i) => ({ id: i, words: s.split(' ') }));
}

function build(chunks: { id: number; words: string[] }[]): Frame[] {
  const frames: Frame[] = [];
  frames.push({ phase: 'input', chunkActive: -1, mapped: 0, grouped: false, reduced: false, note: { en: 'Input split into chunks', pt: 'Entrada dividida em chunks' } });
  chunks.forEach((c, i) => {
    frames.push({ phase: 'map', chunkActive: i, mapped: i, grouped: false, reduced: false, note: { en: `Map chunk ${i + 1} → (word, 1)`, pt: `Map chunk ${i + 1} → (palavra, 1)` } });
    frames.push({ phase: 'map', chunkActive: i, mapped: i + 1, grouped: false, reduced: false, note: { en: `Chunk ${i + 1} emitted pairs`, pt: `Chunk ${i + 1} emitiu pares` } });
  });
  frames.push({ phase: 'shuffle', chunkActive: -1, mapped: chunks.length, grouped: true, reduced: false, note: { en: 'Shuffle: group pairs by key', pt: 'Shuffle: agrupar pares por chave' } });
  frames.push({ phase: 'reduce', chunkActive: -1, mapped: chunks.length, grouped: true, reduced: true, note: { en: 'Reduce: sum values per key', pt: 'Reduce: somar valores por chave' } });
  return frames;
}

const PHASES: { key: Phase; en: string; pt: string }[] = [
  { key: 'input', en: 'Input', pt: 'Entrada' },
  { key: 'map', en: 'Map', pt: 'Map' },
  { key: 'shuffle', en: 'Shuffle', pt: 'Shuffle' },
  { key: 'reduce', en: 'Reduce', pt: 'Reduce' },
];

export default function MapReduceVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [speed, setSpeed] = useState(35);
  const chunks = useMemo(() => chunkWords(), []);
  const frames = useMemo(() => build(chunks), [chunks]);
  const player = useStepPlayer(frames.length, speed);
  const frame = frames[Math.min(player.index, frames.length - 1)];

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    chunks.forEach((c) => c.words.forEach((w) => (m[w] = (m[w] ?? 0) + 1)));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [chunks]);
  const maxCount = Math.max(...counts.map(([, c]) => c), 1);

  return (
    <Panel
      title="MapReduce — Word Count"
      meta={
        <>
          <span>
            {tr(locale, 'Phase', 'Fase')}: <span className="capitalize text-primary-300">{frame.phase}</span>
          </span>
          <span className="text-amber-300">{tr(locale, frame.note.en, frame.note.pt)}</span>
        </>
      }
      controls={<Transport player={player} locale={locale} />}
    >
      <div className="mb-4">
        <Slider label={tr(locale, 'Speed', 'Velocidade')} value={speed} min={1} max={100} onChange={setSpeed} />
      </div>

      {/* phase tracker */}
      <div className="mb-5 flex items-center gap-2">
        {PHASES.map((p, i) => {
          const reached = PHASES.findIndex((x) => x.key === frame.phase) >= i;
          return (
            <div key={p.key} className="flex flex-1 items-center gap-2">
              <div
                className={`flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold transition-colors ${
                  frame.phase === p.key
                    ? 'bg-primary-600 text-white'
                    : reached
                    ? 'bg-emerald-600/30 text-emerald-200'
                    : 'bg-dark-700 text-dark-400'
                }`}
              >
                {tr(locale, p.en, p.pt)}
              </div>
            </div>
          );
        })}
      </div>

      <Stage className="space-y-6 py-5">
        {/* chunks / map */}
        <div className="grid gap-4 md:grid-cols-3">
          {chunks.map((c, i) => {
            const done = frame.mapped > i;
            const activeNow = frame.chunkActive === i && frame.phase === 'map';
            return (
              <div
                key={c.id}
                className={`rounded-xl border-2 p-3 transition-all ${
                  activeNow
                    ? 'border-amber-400 shadow-lg shadow-amber-500/10'
                    : done
                    ? 'border-emerald-500/60'
                    : 'border-dark-700'
                }`}
              >
                <div className="mb-2 text-xs font-semibold text-dark-300">Chunk {i + 1}</div>
                <div className="space-y-1">
                  {c.words.map((w, k) => (
                    <div key={k} className="font-mono text-xs text-dark-200">
                      {done || activeNow ? (
                        <span>
                          {w} → <span className="text-primary-300">(&quot;{w}&quot;, 1)</span>
                        </span>
                      ) : (
                        <span className="text-dark-400">{w}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* reduce results */}
        {frame.grouped && (
          <div className="animate-[fade-in_0.4s_ease]">
            <div className="mb-2 text-xs font-semibold text-dark-300">
              {frame.reduced ? tr(locale, 'Reduce output', 'Saída do Reduce') : tr(locale, 'Grouped by key', 'Agrupado por chave')}
            </div>
            <div className="space-y-2">
              {counts.map(([word, count]) => (
                <div key={word} className="flex items-center gap-3">
                  <span className="w-16 truncate font-mono text-xs text-dark-200">{word}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded bg-dark-800">
                    <div
                      className="flex h-full items-center justify-end rounded bg-linear-to-r from-primary-600 to-blue-500 px-2 text-[10px] font-bold text-white transition-all duration-500"
                      style={{ width: frame.reduced ? `${(count / maxCount) * 100}%` : '0%' }}
                    >
                      {frame.reduced ? count : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Stage>

      <ProgressBar index={player.index} total={frames.length} />
    </Panel>
  );
}

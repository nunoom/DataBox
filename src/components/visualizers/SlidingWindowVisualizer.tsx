'use client';

import { useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, Slider, Transport, ProgressBar, ControlButton, useStepPlayer } from './shared';

function genStream(n: number) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

export default function SlidingWindowVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [w, setW] = useState(3);
  const [speed, setSpeed] = useState(40);
  const [stream, setStream] = useState(() => genStream(14));

  const positions = useMemo(() => {
    const out: { end: number; start: number; avg: number; sum: number }[] = [];
    for (let end = 0; end < stream.length; end++) {
      const start = Math.max(0, end - w + 1);
      const slice = stream.slice(start, end + 1);
      const sum = slice.reduce((a, b) => a + b, 0);
      out.push({ start, end, sum, avg: sum / slice.length });
    }
    return out;
  }, [stream, w]);

  const player = useStepPlayer(positions.length, speed);
  const pos = positions[Math.min(player.index, positions.length - 1)];
  const maxVal = Math.max(...stream, 1);

  return (
    <Panel
      title={tr(locale, 'Sliding Window', 'Janela Deslizante')}
      meta={
        <>
          <span>
            {tr(locale, 'Window', 'Janela')} [{pos.start}, {pos.end}]
          </span>
          <span className="text-amber-300">
            {tr(locale, 'avg', 'média')} = {pos.avg.toFixed(1)} · {tr(locale, 'sum', 'soma')} = {pos.sum}
          </span>
        </>
      }
      controls={
        <>
          <ControlButton
            onClick={() => {
              setStream(genStream(14));
              player.reset();
            }}
            disabled={player.isPlaying}
          >
            <Shuffle className="h-4 w-4" /> {tr(locale, 'New stream', 'Novo stream')}
          </ControlButton>
          <Transport player={player} locale={locale} />
        </>
      }
    >
      <div className="mb-4 flex flex-wrap gap-5">
        <Slider label={tr(locale, 'Speed', 'Velocidade')} value={speed} min={1} max={100} onChange={setSpeed} />
        <Slider
          label={tr(locale, 'Window size', 'Tamanho da janela')}
          value={w}
          min={2}
          max={6}
          onChange={(v) => {
            setW(v);
            player.reset();
          }}
          disabled={player.isPlaying}
        />
      </div>

      <Stage className="flex h-56 items-end justify-center gap-1.5 py-4">
        {stream.map((v, i) => {
          const inWindow = i >= pos.start && i <= pos.end;
          const isCurrent = i === pos.end;
          return (
            <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1" style={{ maxWidth: 44 }}>
              <span className={`text-[10px] ${inWindow ? 'text-amber-200' : 'text-dark-600'}`}>{v}</span>
              <div
                className={`w-full rounded-t transition-all ${
                  isCurrent ? 'bg-amber-400' : inWindow ? 'bg-primary-500' : 'bg-dark-700'
                }`}
                style={{ height: `${(v / maxVal) * 100}%` }}
              />
            </div>
          );
        })}
      </Stage>

      <ProgressBar index={player.index} total={positions.length} />

      <p className="mt-4 text-xs text-dark-400">
        {tr(
          locale,
          'The aggregate updates in O(1): add the entering element, subtract the leaving one.',
          'A agregação atualiza em O(1): soma o elemento que entra, subtrai o que sai.'
        )}
      </p>
    </Panel>
  );
}

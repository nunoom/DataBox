'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, Slider, Transport, ProgressBar, useStepPlayer, Legend } from './shared';

// arrival order is intentionally out-of-order in event time
const ARRIVALS = [1, 3, 2, 6, 4, 5, 9, 7, 11];
const T_MAX = 12;
const WIN = 4;
const LATENESS = 1;

export default function StreamTimelineVisualizer({
  mode,
  locale = 'en',
}: {
  mode: 'event-time' | 'watermarks';
  locale?: Locale;
}) {
  const [speed, setSpeed] = useState(40);
  const player = useStepPlayer(ARRIVALS.length, speed);
  const step = Math.min(player.index, ARRIVALS.length - 1);

  const state = useMemo(() => {
    const arrived = ARRIVALS.slice(0, step + 1).map((t, i) => ({ t, order: i }));
    const maxSeen = Math.max(...arrived.map((e) => e.t));
    const watermark = maxSeen - LATENESS;
    const events = arrived.map((e) => ({
      ...e,
      // late if it arrives behind the watermark that existed before it landed
      late: e.t < (() => {
        const before = ARRIVALS.slice(0, e.order);
        if (!before.length) return -Infinity;
        return Math.max(...before) - LATENESS;
      })(),
    }));
    return { events, maxSeen, watermark, current: ARRIVALS[step] };
  }, [step]);

  const W = 720;
  const pad = 40;
  const x = (t: number) => pad + (t / T_MAX) * (W - 2 * pad);
  const windows = Array.from({ length: Math.ceil(T_MAX / WIN) }, (_, i) => ({ start: i * WIN, end: (i + 1) * WIN }));
  const isWatermark = mode === 'watermarks';

  return (
    <Panel
      title={isWatermark ? tr(locale, 'Watermarks', 'Watermarks') : tr(locale, 'Event-Time Processing', 'Processamento por Event-Time')}
      meta={
        <>
          <span>
            {tr(locale, 'Arrival', 'Chegada')} #{step + 1} · {tr(locale, 'event-time', 'event-time')} = {state.current}
          </span>
          <span className="text-amber-300">
            {tr(locale, 'Watermark', 'Watermark')} = {state.watermark}
          </span>
        </>
      }
      controls={<Transport player={player} locale={locale} />}
    >
      <div className="mb-4">
        <Slider label={tr(locale, 'Speed', 'Velocidade')} value={speed} min={1} max={100} onChange={setSpeed} />
      </div>

      <Stage className="overflow-x-auto py-4">
        <svg viewBox={`0 0 ${W} 220`} className="w-full" style={{ maxHeight: 240 }}>
          {/* windows */}
          {windows.map((w, i) => {
            const fired = isWatermark && state.watermark >= w.end;
            return (
              <g key={i}>
                <rect
                  x={x(w.start)}
                  y={30}
                  width={x(w.end) - x(w.start)}
                  height={120}
                  fill={fired ? 'rgba(16,185,129,0.10)' : 'rgba(148,163,184,0.05)'}
                  stroke="#334155"
                  strokeDasharray="4 4"
                />
                <text x={(x(w.start) + x(w.end)) / 2} y={24} textAnchor="middle" className="fill-dark-400 text-[10px]">
                  [{w.start},{w.end})
                </text>
                {fired && (
                  <text x={(x(w.start) + x(w.end)) / 2} y={168} textAnchor="middle" className="fill-emerald-300 text-[10px] font-semibold">
                    {tr(locale, 'fired ✓', 'disparada ✓')}
                  </text>
                )}
              </g>
            );
          })}

          {/* axis */}
          <line x1={pad} y1={150} x2={W - pad} y2={150} stroke="#475569" strokeWidth={1.5} />
          {Array.from({ length: T_MAX + 1 }, (_, t) => (
            <text key={t} x={x(t)} y={166} textAnchor="middle" className="fill-dark-500 text-[9px]">
              {t}
            </text>
          ))}

          {/* watermark line */}
          {state.watermark >= 0 && (
            <g>
              <line x1={x(state.watermark)} y1={20} x2={x(state.watermark)} y2={150} stroke="#f59e0b" strokeWidth={2} />
              <text x={x(state.watermark)} y={198} textAnchor="middle" className="fill-amber-300 text-[10px] font-semibold">
                {tr(locale, 'watermark', 'watermark')}
              </text>
            </g>
          )}

          {/* events */}
          {state.events.map((e) => {
            const isCurrent = e.order === step;
            const fill = e.late ? '#ef4444' : isCurrent ? '#fbbf24' : '#0ea5e9';
            const cy = 150 - 20 - (e.order % 3) * 22;
            return (
              <g key={e.order}>
                <line x1={x(e.t)} y1={150} x2={x(e.t)} y2={cy} stroke="#334155" strokeWidth={1} />
                <circle cx={x(e.t)} cy={cy} r={9} fill={fill} stroke="#0f172a" strokeWidth={1.5} />
                <text x={x(e.t)} y={cy + 3.5} textAnchor="middle" className="fill-white text-[9px] font-bold">
                  {e.t}
                </text>
              </g>
            );
          })}
        </svg>
      </Stage>

      <ProgressBar index={player.index} total={ARRIVALS.length} />

      <Legend
        items={[
          { color: 'bg-primary-500', label: tr(locale, 'On-time event', 'Evento a tempo') },
          { color: 'bg-amber-400', label: tr(locale, 'Just arrived', 'Acabou de chegar') },
          { color: 'bg-rose-500', label: tr(locale, 'Late event', 'Evento atrasado') },
        ]}
      />
      <p className="mt-3 text-xs text-dark-400">
        {isWatermark
          ? tr(
              locale,
              'When the watermark passes a window’s end, the window fires its result; later events are late.',
              'Quando a watermark passa o fim de uma janela, a janela dispara o resultado; eventos posteriores são atrasados.'
            )
          : tr(
              locale,
              'Each event is bucketed by its own timestamp, so out-of-order arrivals still land in the right window.',
              'Cada evento é colocado pela sua própria timestamp, por isso chegadas fora de ordem caem na janela certa.'
            )}
      </p>
    </Panel>
  );
}

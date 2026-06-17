'use client';

import { useCallback, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Shuffle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';

/* ----------------------------- Layout ----------------------------- */

export function Panel({
  title,
  meta,
  controls,
  children,
}: {
  title: React.ReactNode;
  meta?: React.ReactNode;
  controls?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          {meta && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-dark-300">
              {meta}
            </div>
          )}
        </div>
        {controls && <div className="flex flex-wrap items-center gap-2">{controls}</div>}
      </div>
      {children}
    </div>
  );
}

/* ---------------------------- Buttons ----------------------------- */

export function ControlButton({
  onClick,
  disabled,
  variant = 'ghost',
  children,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  title?: string;
}) {
  const base =
    'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed';
  const styles =
    variant === 'primary'
      ? 'bg-linear-to-r from-primary-600 to-blue-600 text-white hover:from-primary-500 hover:to-blue-500 shadow-lg shadow-primary-900/30'
      : 'bg-dark-700/70 text-dark-100 hover:bg-dark-600 border border-dark-600/60';
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-dark-300">
      <span className="whitespace-nowrap">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-primary-500 w-28 cursor-pointer disabled:cursor-not-allowed"
      />
      <span className="w-8 tabular-nums text-dark-200">{value}</span>
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  onEnter,
  placeholder,
  disabled,
  className = '',
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <input
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onEnter) onEnter();
      }}
      className={`rounded-lg bg-dark-900/80 border border-dark-600 px-3 py-2 text-sm text-white placeholder:text-dark-500 outline-none focus:border-primary-500 ${className}`}
    />
  );
}

/* ---------------------------- Legend ------------------------------ */

export function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2">
          <span className={`inline-block h-3.5 w-3.5 rounded ${it.color}`} />
          <span className="text-dark-300">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/* --------------------- Stage (dark canvas) ------------------------ */

export function Stage({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-dark-900/70 border border-dark-700/60 p-4 ${className}`}>
      {children}
    </div>
  );
}

/* ----------------- Step playback engine (no stale state) ---------- */

export interface StepPlayer {
  index: number;
  total: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBack: () => void;
  atEnd: boolean;
}

/**
 * Plays through a fixed number of precomputed frames on a timer.
 * Because frames are computed up-front and we only advance an index,
 * there is no async closure capturing stale React state (the bug in the
 * original visualizer where sorting returned immediately).
 */
export function useStepPlayer(total: number, speed: number): StepPlayer {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Index is always read clamped, so regenerating to a shorter/longer set of
  // frames is safe; callers invoke reset() from their data-changing handlers
  // to restart playback at frame 0.
  const safeIndex = Math.min(index, Math.max(0, total - 1));
  const atEnd = safeIndex >= total - 1;

  useEffect(() => {
    if (!isPlaying || safeIndex >= total - 1) return;
    const delay = Math.max(16, 540 - speed * 5);
    const id = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, total - 1));
      // stop once we reach the final frame (inside the timer callback,
      // not synchronously in the effect body)
      if (safeIndex + 1 >= total - 1) setIsPlaying(false);
    }, delay);
    return () => clearTimeout(id);
  }, [isPlaying, safeIndex, total, speed]);

  const play = useCallback(() => {
    setIndex((i) => (i >= total - 1 ? 0 : i));
    setIsPlaying(true);
  }, [total]);
  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, pause, play]);
  const reset = useCallback(() => {
    setIsPlaying(false);
    setIndex(0);
  }, []);
  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);
  const stepBack = useCallback(() => {
    setIsPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  return { index: safeIndex, total, isPlaying, play, pause, toggle, reset, stepForward, stepBack, atEnd };
}

/** Standard transport controls bound to a StepPlayer. */
export function Transport({
  player,
  locale,
  onShuffle,
  shuffleDisabled,
}: {
  player: StepPlayer;
  locale: Locale;
  onShuffle?: () => void;
  shuffleDisabled?: boolean;
}) {
  return (
    <>
      <ControlButton onClick={player.stepBack} disabled={player.index === 0} title={tr(locale, 'Step back', 'Recuar')}>
        <SkipBack className="h-4 w-4" />
      </ControlButton>
      <ControlButton onClick={player.toggle} variant="primary">
        {player.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span>{player.isPlaying ? tr(locale, 'Pause', 'Pausar') : tr(locale, 'Play', 'Reproduzir')}</span>
      </ControlButton>
      <ControlButton onClick={player.stepForward} disabled={player.atEnd} title={tr(locale, 'Step forward', 'Avançar')}>
        <SkipForward className="h-4 w-4" />
      </ControlButton>
      <ControlButton onClick={player.reset} title={tr(locale, 'Reset', 'Reiniciar')}>
        <RotateCcw className="h-4 w-4" />
      </ControlButton>
      {onShuffle && (
        <ControlButton onClick={onShuffle} disabled={shuffleDisabled} title={tr(locale, 'New data', 'Novos dados')}>
          <Shuffle className="h-4 w-4" />
          <span className="hidden sm:inline">{tr(locale, 'Shuffle', 'Baralhar')}</span>
        </ControlButton>
      )}
    </>
  );
}

export function ProgressBar({ index, total }: { index: number; total: number }) {
  const pct = total <= 1 ? 100 : (index / (total - 1)) * 100;
  return (
    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-dark-700">
      <div
        className="h-full rounded-full bg-linear-to-r from-primary-500 to-blue-500 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

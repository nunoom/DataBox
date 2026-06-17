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
  useStepPlayer,
} from './shared';

export type SortAlgo = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

type Cell = 'default' | 'compare' | 'swap' | 'pivot' | 'sorted';
interface Frame {
  values: number[];
  states: Cell[];
  note?: { en: string; pt: string };
}

const ALGO_NAME: Record<SortAlgo, string> = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
  quick: 'Quick Sort',
  heap: 'Heap Sort',
};

/* --------------------------- Frame generators --------------------------- */

function buildFrames(algo: SortAlgo, input: number[]): Frame[] {
  const a = [...input];
  const n = a.length;
  const frames: Frame[] = [];
  const sorted = new Set<number>();
  const base = (): Cell[] => a.map((_, i) => (sorted.has(i) ? 'sorted' : 'default'));
  const snap = (states: Cell[], note?: Frame['note']) =>
    frames.push({ values: [...a], states, note });

  snap(base());

  if (algo === 'bubble') {
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        const s = base();
        s[j] = 'compare';
        s[j + 1] = 'compare';
        snap(s, { en: `Compare ${a[j]} and ${a[j + 1]}`, pt: `Comparar ${a[j]} e ${a[j + 1]}` });
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          const s2 = base();
          s2[j] = 'swap';
          s2[j + 1] = 'swap';
          snap(s2, { en: `Swap`, pt: `Trocar` });
          swapped = true;
        }
      }
      sorted.add(n - 1 - i);
      if (!swapped) {
        for (let k = 0; k <= n - 1 - i; k++) sorted.add(k);
        break;
      }
    }
    sorted.add(0);
  }

  if (algo === 'selection') {
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        const s = base();
        s[min] = 'pivot';
        s[j] = 'compare';
        snap(s, { en: `Find minimum`, pt: `Procurar o mínimo` });
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        const s = base();
        s[i] = 'swap';
        s[min] = 'swap';
        snap(s, { en: `Place minimum`, pt: `Colocar o mínimo` });
      }
      sorted.add(i);
    }
    sorted.add(n - 1);
  }

  if (algo === 'insertion') {
    sorted.add(0);
    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;
      const s0 = base();
      s0[i] = 'pivot';
      snap(s0, { en: `Key = ${key}`, pt: `Chave = ${key}` });
      while (j >= 0 && a[j] > key) {
        const s = base();
        s[j] = 'compare';
        s[j + 1] = 'swap';
        snap(s, { en: `Shift ${a[j]} right`, pt: `Deslocar ${a[j]} à direita` });
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = key;
      sorted.add(i);
      snap(base());
    }
  }

  if (algo === 'merge') {
    const msort = (lo: number, hi: number) => {
      if (hi - lo < 2) return;
      const mid = (lo + hi) >> 1;
      msort(lo, mid);
      msort(mid, hi);
      const tmp: number[] = [];
      let i = lo;
      let j = mid;
      while (i < mid && j < hi) {
        const s = base();
        s[i] = 'compare';
        s[j] = 'compare';
        snap(s, { en: `Merge: ${a[i]} vs ${a[j]}`, pt: `Merge: ${a[i]} vs ${a[j]}` });
        tmp.push(a[i] <= a[j] ? a[i++] : a[j++]);
      }
      while (i < mid) tmp.push(a[i++]);
      while (j < hi) tmp.push(a[j++]);
      for (let k = 0; k < tmp.length; k++) {
        a[lo + k] = tmp[k];
        const s = base();
        s[lo + k] = 'swap';
        snap(s, { en: `Write ${tmp[k]}`, pt: `Escrever ${tmp[k]}` });
      }
    };
    msort(0, n);
  }

  if (algo === 'quick') {
    const qsort = (lo: number, hi: number) => {
      if (lo > hi) return;
      if (lo === hi) {
        sorted.add(lo);
        snap(base());
        return;
      }
      const pivot = a[hi];
      let i = lo - 1;
      for (let j = lo; j < hi; j++) {
        const s = base();
        s[hi] = 'pivot';
        s[j] = 'compare';
        snap(s, { en: `Pivot ${pivot}: check ${a[j]}`, pt: `Pivô ${pivot}: verificar ${a[j]}` });
        if (a[j] < pivot) {
          i++;
          if (i !== j) {
            [a[i], a[j]] = [a[j], a[i]];
            const s2 = base();
            s2[hi] = 'pivot';
            s2[i] = 'swap';
            s2[j] = 'swap';
            snap(s2, { en: `Swap`, pt: `Trocar` });
          }
        }
      }
      [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
      const sp = base();
      sp[i + 1] = 'swap';
      sp[hi] = 'swap';
      snap(sp, { en: `Place pivot`, pt: `Colocar pivô` });
      sorted.add(i + 1);
      snap(base());
      qsort(lo, i);
      qsort(i + 2, hi);
    };
    qsort(0, n - 1);
  }

  if (algo === 'heap') {
    const heapify = (size: number, i: number) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      const s = base();
      s[i] = 'pivot';
      if (l < size) s[l] = 'compare';
      if (r < size) s[r] = 'compare';
      snap(s, { en: `Heapify node ${i}`, pt: `Heapify nó ${i}` });
      if (l < size && a[l] > a[largest]) largest = l;
      if (r < size && a[r] > a[largest]) largest = r;
      if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        const s2 = base();
        s2[i] = 'swap';
        s2[largest] = 'swap';
        snap(s2, { en: `Swap`, pt: `Trocar` });
        heapify(size, largest);
      }
    };
    for (let i = (n >> 1) - 1; i >= 0; i--) heapify(n, i);
    for (let end = n - 1; end > 0; end--) {
      [a[0], a[end]] = [a[end], a[0]];
      sorted.add(end);
      const s = base();
      s[0] = 'swap';
      s[end] = 'swap';
      snap(s, { en: `Move max to end`, pt: `Mover máx para o fim` });
      heapify(end, 0);
    }
    sorted.add(0);
  }

  snap(a.map(() => 'sorted'), { en: 'Sorted!', pt: 'Ordenado!' });
  return frames;
}

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

/* ------------------------------- Component ------------------------------- */

const CELL_COLORS: Record<Cell, string> = {
  default: 'bg-primary-500',
  compare: 'bg-amber-400',
  swap: 'bg-rose-500',
  pivot: 'bg-fuchsia-500',
  sorted: 'bg-emerald-500',
};

export default function SortingVisualizer({
  algorithm,
  locale = 'en',
}: {
  algorithm: SortAlgo;
  locale?: Locale;
}) {
  const [size, setSize] = useState(18);
  const [speed, setSpeed] = useState(55);
  const [data, setData] = useState<number[]>(() => randomArray(18));

  const frames = useMemo(() => buildFrames(algorithm, data), [algorithm, data]);
  const player = useStepPlayer(frames.length, speed);
  const frame = frames[Math.min(player.index, frames.length - 1)];

  const regenerate = (s = size) => {
    setData(randomArray(s));
    player.reset();
  };
  const maxVal = Math.max(...frame.values, 1);

  return (
    <Panel
      title={ALGO_NAME[algorithm]}
      meta={
        <>
          <span>
            {tr(locale, 'Step', 'Passo')} {player.index + 1}/{frames.length}
          </span>
          <span className="text-amber-300">{frame.note ? tr(locale, frame.note.en, frame.note.pt) : ''}</span>
        </>
      }
      controls={
        <Transport player={player} locale={locale} onShuffle={() => regenerate()} shuffleDisabled={player.isPlaying} />
      }
    >
      <div className="mb-4 flex flex-wrap gap-5">
        <Slider
          label={tr(locale, 'Speed', 'Velocidade')}
          value={speed}
          min={1}
          max={100}
          onChange={setSpeed}
        />
        <Slider
          label={tr(locale, 'Size', 'Tamanho')}
          value={size}
          min={6}
          max={40}
          onChange={(v) => {
            setSize(v);
            regenerate(v);
          }}
          disabled={player.isPlaying}
        />
      </div>

      <Stage className="flex h-72 items-end justify-center gap-[3px] overflow-hidden">
        {frame.values.map((v, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t transition-[height,background-color] duration-150 ${CELL_COLORS[frame.states[i]]}`}
            style={{ height: `${(v / maxVal) * 100}%`, maxWidth: 48 }}
            title={String(v)}
          />
        ))}
      </Stage>

      <ProgressBar index={player.index} total={frames.length} />

      <Legend
        items={[
          { color: CELL_COLORS.default, label: tr(locale, 'Unsorted', 'Não ordenado') },
          { color: CELL_COLORS.compare, label: tr(locale, 'Comparing', 'A comparar') },
          { color: CELL_COLORS.swap, label: tr(locale, 'Swapping / Writing', 'Troca / Escrita') },
          { color: CELL_COLORS.pivot, label: tr(locale, 'Pivot / Key', 'Pivô / Chave') },
          { color: CELL_COLORS.sorted, label: tr(locale, 'Sorted', 'Ordenado') },
        ]}
      />
    </Panel>
  );
}

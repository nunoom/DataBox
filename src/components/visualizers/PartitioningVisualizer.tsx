'use client';

import { useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, Slider, Legend } from './shared';

type Scheme = 'range' | 'hash' | 'round';
const COLORS = ['bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 'bg-fuchsia-500', 'bg-rose-500', 'bg-teal-500'];

function genRecords(n: number) {
  return Array.from({ length: n }, (_, i) => ({ id: i, key: Math.floor(Math.random() * 100) }));
}
function hash(k: number) {
  let h = (k ^ 0x9e3779b1) >>> 0;
  h = Math.imul(h, 2654435761) >>> 0;
  return h;
}

export default function PartitioningVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [scheme, setScheme] = useState<Scheme>('hash');
  const [p, setP] = useState(3);
  const [records, setRecords] = useState(() => genRecords(18));

  const partitions = useMemo(() => {
    const buckets: { id: number; key: number }[][] = Array.from({ length: p }, () => []);
    let rr = 0;
    records.forEach((r) => {
      let idx = 0;
      if (scheme === 'range') idx = Math.min(p - 1, Math.floor((r.key / 100) * p));
      else if (scheme === 'hash') idx = hash(r.key) % p;
      else idx = rr++ % p;
      buckets[idx].push(r);
    });
    return buckets;
  }, [records, scheme, p]);

  const counts = partitions.map((b) => b.length);
  const max = Math.max(...counts, 1);
  const min = Math.min(...counts);
  const skew = max - min;

  const SCHEMES: { key: Scheme; en: string; pt: string; desc: { en: string; pt: string } }[] = [
    { key: 'range', en: 'Range', pt: 'Range', desc: { en: 'Split by value ranges (good for range scans, prone to skew).', pt: 'Divide por intervalos de valor (bom para range scans, propenso a desequilíbrio).' } },
    { key: 'hash', en: 'Hash', pt: 'Hash', desc: { en: 'hash(key) % p — even spread, no range locality.', pt: 'hash(chave) % p — distribuição uniforme, sem localidade.' } },
    { key: 'round', en: 'Round-robin', pt: 'Round-robin', desc: { en: 'Ignore the key, spread evenly in turn.', pt: 'Ignora a chave, distribui à vez de forma uniforme.' } },
  ];
  const active = SCHEMES.find((s) => s.key === scheme)!;

  return (
    <Panel
      title={tr(locale, 'Partitioning Strategies', 'Estratégias de Particionamento')}
      meta={
        <>
          <span>
            {tr(locale, 'Skew', 'Desequilíbrio')}:{' '}
            <span className={skew <= 1 ? 'text-emerald-300' : skew <= 3 ? 'text-amber-300' : 'text-rose-300'}>{skew}</span>
          </span>
          <span className="text-dark-300">{tr(locale, active.desc.en, active.desc.pt)}</span>
        </>
      }
      controls={
        <ControlButton onClick={() => setRecords(genRecords(18))}>
          <Shuffle className="h-4 w-4" /> {tr(locale, 'New data', 'Novos dados')}
        </ControlButton>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {SCHEMES.map((s) => (
          <ControlButton key={s.key} onClick={() => setScheme(s.key)} variant={scheme === s.key ? 'primary' : 'ghost'}>
            {tr(locale, s.en, s.pt)}
          </ControlButton>
        ))}
        <Slider label={tr(locale, 'Partitions', 'Partições')} value={p} min={2} max={6} onChange={setP} />
      </div>

      <Stage className="py-5">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${p}, minmax(0, 1fr))` }}>
          {partitions.map((bucket, i) => (
            <div key={i} className="rounded-xl border border-dark-700 bg-dark-800/50 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-dark-200">P{i}</span>
                <span className="text-dark-400">{bucket.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {bucket.map((r) => (
                  <span key={r.id} className={`flex h-8 w-8 items-center justify-center rounded text-[11px] font-bold text-white ${COLORS[i % COLORS.length]}`}>
                    {r.key}
                  </span>
                ))}
                {bucket.length === 0 && <span className="text-xs text-dark-600">{tr(locale, 'empty', 'vazio')}</span>}
              </div>
            </div>
          ))}
        </div>
      </Stage>

      <Legend
        items={[
          { color: 'bg-emerald-400', label: tr(locale, 'Balanced', 'Equilibrado') },
          { color: 'bg-rose-400', label: tr(locale, 'Skewed (hot partition)', 'Desequilibrado (partição quente)') },
        ]}
      />
    </Panel>
  );
}

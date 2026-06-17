'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search as SearchIcon, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

const SIZE = 8;
interface Entry {
  id: number;
  key: string;
}
let uid = 0;

function hash(key: string): number {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % SIZE;
  return h;
}

export default function HashTableVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [buckets, setBuckets] = useState<Entry[][]>(() => {
    const b: Entry[][] = Array.from({ length: SIZE }, () => []);
    ['cat', 'dog', 'sun', 'data'].forEach((k) => b[hash(k)].push({ id: uid++, key: k }));
    return b;
  });
  const [key, setKey] = useState('moon');
  const [activeBucket, setActiveBucket] = useState<number | null>(null);
  const [foundId, setFoundId] = useState<number | null>(null);
  const [msg, setMsg] = useState({ en: 'hash(key) → bucket index', pt: 'hash(chave) → índice do balde' });

  const flashBucket = (i: number) => {
    setActiveBucket(i);
    setTimeout(() => setActiveBucket(null), 1200);
  };

  const insert = () => {
    const k = key.trim();
    if (!k) return;
    const i = hash(k);
    setFoundId(null);
    setBuckets((prev) => {
      const next = prev.map((b) => [...b]);
      if (!next[i].some((e) => e.key === k)) next[i].push({ id: uid++, key: k });
      return next;
    });
    flashBucket(i);
    setMsg({ en: `hash("${k}") = ${i}`, pt: `hash("${k}") = ${i}` });
  };
  const search = () => {
    const k = key.trim();
    if (!k) return;
    const i = hash(k);
    flashBucket(i);
    const entry = buckets[i].find((e) => e.key === k);
    if (entry) {
      setFoundId(entry.id);
      setTimeout(() => setFoundId(null), 1400);
      setMsg({ en: `Found "${k}" in bucket ${i}`, pt: `Encontrado "${k}" no balde ${i}` });
    } else {
      setMsg({ en: `"${k}" not in bucket ${i}`, pt: `"${k}" não está no balde ${i}` });
    }
  };
  const reset = () => {
    const b: Entry[][] = Array.from({ length: SIZE }, () => []);
    ['cat', 'dog', 'sun', 'data'].forEach((k) => b[hash(k)].push({ id: uid++, key: k }));
    setBuckets(b);
    setMsg({ en: 'Reset', pt: 'Reiniciado' });
  };

  return (
    <Panel
      title={tr(locale, 'Hash Table (chaining)', 'Tabela Hash (encadeamento)')}
      meta={<span className="text-amber-300">{tr(locale, msg.en, msg.pt)}</span>}
      controls={
        <ControlButton onClick={reset} title="reset">
          <RotateCcw className="h-4 w-4" />
        </ControlButton>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <TextInput value={key} onChange={setKey} onEnter={insert} placeholder={tr(locale, 'key', 'chave')} className="w-36" />
        <ControlButton onClick={insert} variant="primary">
          <Plus className="h-4 w-4" /> {tr(locale, 'Insert', 'Inserir')}
        </ControlButton>
        <ControlButton onClick={search}>
          <SearchIcon className="h-4 w-4" /> {tr(locale, 'Search', 'Procurar')}
        </ControlButton>
      </div>

      <Stage className="space-y-1.5 py-4">
        {buckets.map((bucket, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border font-mono text-sm transition-colors ${
                activeBucket === i ? 'border-amber-300 bg-amber-400/20 text-amber-200' : 'border-dark-600 bg-dark-800 text-dark-400'
              }`}
            >
              {i}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <AnimatePresence mode="popLayout">
                {bucket.map((e) => (
                  <motion.div
                    key={e.id}
                    layout
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
                      foundId === e.id
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-primary-500/60 bg-primary-600/20 text-primary-100'
                    }`}
                  >
                    {e.key}
                  </motion.div>
                ))}
              </AnimatePresence>
              {bucket.length === 0 && <span className="text-xs text-dark-600">{tr(locale, 'empty', 'vazio')}</span>}
              {bucket.length > 1 && (
                <span className="text-[10px] text-rose-300">{tr(locale, '← collision (chained)', '← colisão (encadeada)')}</span>
              )}
            </div>
          </div>
        ))}
      </Stage>

      <Legend
        items={[
          { color: 'bg-primary-600', label: tr(locale, 'Entry', 'Entrada') },
          { color: 'bg-amber-400', label: tr(locale, 'Target bucket', 'Balde alvo') },
          { color: 'bg-emerald-500', label: tr(locale, 'Found', 'Encontrado') },
        ]}
      />
    </Panel>
  );
}

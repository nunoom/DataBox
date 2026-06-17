'use client';

import { useState } from 'react';
import { Plus, HelpCircle, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

const M = 24;
const K = 3;

function hashes(item: string): number[] {
  const out: number[] = [];
  for (let s = 0; s < K; s++) {
    let h = 2166136261 ^ (s * 0x9e3779b1);
    for (const ch of item) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    out.push(Math.abs(h) % M);
  }
  return out;
}

export default function BloomFilterVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [bits, setBits] = useState<number[]>(() => new Array(M).fill(0));
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [item, setItem] = useState('apple');
  const [lit, setLit] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState({ en: 'Add items, then test membership', pt: 'Adiciona itens e testa o pertencimento' });
  const [tone, setTone] = useState<'info' | 'good' | 'warn' | 'bad'>('info');

  const add = () => {
    const k = item.trim().toLowerCase();
    if (!k) return;
    const idxs = hashes(k);
    setBits((prev) => {
      const next = [...prev];
      idxs.forEach((i) => (next[i] = 1));
      return next;
    });
    setAdded((prev) => new Set(prev).add(k));
    setLit(new Set(idxs));
    setTone('good');
    setMsg({ en: `Added "${k}" → set bits ${idxs.join(', ')}`, pt: `Adicionado "${k}" → bits ${idxs.join(', ')}` });
  };

  const test = () => {
    const k = item.trim().toLowerCase();
    if (!k) return;
    const idxs = hashes(k);
    setLit(new Set(idxs));
    const present = idxs.every((i) => bits[i] === 1);
    if (!present) {
      setTone('info');
      setMsg({ en: `"${k}": a bit is 0 → DEFINITELY NOT present`, pt: `"${k}": um bit é 0 → DEFINITIVAMENTE ausente` });
    } else if (added.has(k)) {
      setTone('good');
      setMsg({ en: `"${k}": all bits 1 → probably present (true positive)`, pt: `"${k}": todos os bits 1 → provavelmente presente (verdadeiro positivo)` });
    } else {
      setTone('warn');
      setMsg({ en: `"${k}": all bits 1 → "present", but never added (FALSE POSITIVE)`, pt: `"${k}": todos os bits 1 → "presente", mas nunca adicionado (FALSO POSITIVO)` });
    }
  };

  const reset = () => {
    setBits(new Array(M).fill(0));
    setAdded(new Set());
    setLit(new Set());
    setTone('info');
    setMsg({ en: 'Reset', pt: 'Reiniciado' });
  };

  const toneColor =
    tone === 'good' ? 'text-emerald-300' : tone === 'warn' ? 'text-amber-300' : tone === 'bad' ? 'text-rose-300' : 'text-primary-300';

  return (
    <Panel
      title={tr(locale, 'Bloom Filter', 'Bloom Filter')}
      meta={
        <>
          <span>
            m={M} bits, k={K} hashes
          </span>
          <span className={toneColor}>{tr(locale, msg.en, msg.pt)}</span>
        </>
      }
      controls={
        <ControlButton onClick={reset} title="reset">
          <RotateCcw className="h-4 w-4" />
        </ControlButton>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <TextInput value={item} onChange={setItem} onEnter={add} placeholder={tr(locale, 'item', 'item')} className="w-36" />
        <ControlButton onClick={add} variant="primary">
          <Plus className="h-4 w-4" /> {tr(locale, 'Add', 'Adicionar')}
        </ControlButton>
        <ControlButton onClick={test}>
          <HelpCircle className="h-4 w-4" /> {tr(locale, 'Test', 'Testar')}
        </ControlButton>
      </div>

      <Stage className="py-6">
        <div className="flex flex-wrap justify-center gap-1.5">
          {bits.map((b, i) => {
            const active = lit.has(i);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm transition-all ${
                    active
                      ? 'scale-110 border-amber-300 bg-amber-400 text-dark-900'
                      : b
                      ? 'border-primary-400 bg-primary-600 text-white'
                      : 'border-dark-600 bg-dark-800 text-dark-500'
                  }`}
                >
                  {b}
                </div>
                <span className="text-[9px] text-dark-600">{i}</span>
              </div>
            );
          })}
        </div>
        {added.size > 0 && (
          <p className="mt-5 text-center text-xs text-dark-400">
            {tr(locale, 'Added set:', 'Conjunto adicionado:')}{' '}
            <span className="font-mono text-dark-200">{[...added].join(', ')}</span>
          </p>
        )}
      </Stage>

      <Legend
        items={[
          { color: 'bg-dark-800', label: '0' },
          { color: 'bg-primary-600', label: '1' },
          { color: 'bg-amber-400', label: tr(locale, 'Hashed bit', 'Bit do hash') },
        ]}
      />
    </Panel>
  );
}

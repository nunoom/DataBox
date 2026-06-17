'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

interface Item {
  id: number;
  value: number;
}
let uid = 0;
const make = (v: number): Item => ({ id: uid++, value: v });

export default function StackQueueVisualizer({
  mode,
  locale = 'en',
}: {
  mode: 'stack' | 'queue';
  locale?: Locale;
}) {
  const isStack = mode === 'stack';
  const [items, setItems] = useState<Item[]>(() => [3, 8, 5].map(make));
  const [value, setValue] = useState('10');
  const [flash, setFlash] = useState<number | null>(null);
  const [msg, setMsg] = useState(
    isStack
      ? { en: 'LIFO — add & remove at the top', pt: 'LIFO — adicionar e remover no topo' }
      : { en: 'FIFO — add at back, remove at front', pt: 'FIFO — adicionar ao fim, remover no início' }
  );
  const val = () => parseInt(value || '0', 10) || 0;

  const add = () => {
    const it = make(val());
    setItems((p) => [...p, it]);
    setFlash(it.id);
    setTimeout(() => setFlash(null), 800);
    setMsg(isStack ? { en: `push(${it.value})`, pt: `push(${it.value})` } : { en: `enqueue(${it.value})`, pt: `enqueue(${it.value})` });
  };
  const remove = () => {
    setItems((p) => {
      if (!p.length) return p;
      const removed = isStack ? p[p.length - 1] : p[0];
      setMsg(
        isStack
          ? { en: `pop() → ${removed.value}`, pt: `pop() → ${removed.value}` }
          : { en: `dequeue() → ${removed.value}`, pt: `dequeue() → ${removed.value}` }
      );
      return isStack ? p.slice(0, -1) : p.slice(1);
    });
  };
  const reset = () => {
    setItems([3, 8, 5].map(make));
    setMsg({ en: 'Reset', pt: 'Reiniciado' });
  };

  return (
    <Panel
      title={isStack ? tr(locale, 'Interactive Stack', 'Pilha Interativa') : tr(locale, 'Interactive Queue', 'Fila Interativa')}
      meta={<span className="text-amber-300">{tr(locale, msg.en, msg.pt)}</span>}
      controls={
        <ControlButton onClick={reset} title="reset">
          <RotateCcw className="h-4 w-4" />
        </ControlButton>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <TextInput value={value} onChange={setValue} placeholder={tr(locale, 'value', 'valor')} className="w-24" />
        <ControlButton onClick={add} variant="primary">
          <ArrowDown className="h-4 w-4" /> {isStack ? 'push' : 'enqueue'}
        </ControlButton>
        <ControlButton onClick={remove}>
          <ArrowUp className="h-4 w-4" /> {isStack ? 'pop' : 'dequeue'}
        </ControlButton>
      </div>

      {isStack ? (
        <Stage className="flex min-h-[260px] flex-col-reverse items-center justify-start gap-2 py-6">
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                className={`flex h-12 w-40 items-center justify-center rounded-lg border-2 font-bold text-white ${
                  flash === it.id ? 'border-emerald-300 bg-emerald-500' : 'border-primary-400 bg-primary-600'
                }`}
              >
                {it.value}
                {i === items.length - 1 && (
                  <span className="ml-2 text-[10px] font-normal text-primary-100">{tr(locale, 'top', 'topo')}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && <span className="text-dark-500">{tr(locale, 'empty', 'vazio')}</span>}
        </Stage>
      ) : (
        <Stage className="min-h-[140px] overflow-x-auto py-8">
          <div className="flex min-w-max items-center justify-start gap-2 px-2">
            <span className="mr-1 text-xs text-dark-400">{tr(locale, 'front →', 'início →')}</span>
            <AnimatePresence mode="popLayout">
              {items.map((it) => (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, x: 30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.7 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className={`flex h-12 w-14 items-center justify-center rounded-lg border-2 font-bold text-white ${
                    flash === it.id ? 'border-emerald-300 bg-emerald-500' : 'border-primary-400 bg-primary-600'
                  }`}
                >
                  {it.value}
                </motion.div>
              ))}
            </AnimatePresence>
            <span className="ml-1 text-xs text-dark-400">{tr(locale, '← back', '← fim')}</span>
            {items.length === 0 && <span className="text-dark-500">{tr(locale, 'empty', 'vazio')}</span>}
          </div>
        </Stage>
      )}

      <Legend
        items={[
          { color: 'bg-primary-600', label: tr(locale, 'Element', 'Elemento') },
          { color: 'bg-emerald-500', label: tr(locale, 'Just added', 'Acabado de adicionar') },
        ]}
      />
    </Panel>
  );
}

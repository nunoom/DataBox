'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search as SearchIcon, MousePointerClick, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

interface Item {
  id: number;
  value: number;
}

let uid = 0;
const make = (value: number): Item => ({ id: uid++, value });
const initial = () => [12, 27, 9, 34, 6, 41].map(make);

export default function ArrayVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [items, setItems] = useState<Item[]>(initial);
  const [value, setValue] = useState('20');
  const [index, setIndex] = useState('2');
  const [highlight, setHighlight] = useState<{ id: number; kind: 'hit' | 'access' } | null>(null);
  const [msg, setMsg] = useState<{ en: string; pt: string }>({ en: 'Try the operations below', pt: 'Experimenta as operações abaixo' });

  const flash = (id: number, kind: 'hit' | 'access') => {
    setHighlight({ id, kind });
    setTimeout(() => setHighlight(null), 1200);
  };

  const idx = () => Math.max(0, Math.min(items.length, parseInt(index || '0', 10) || 0));
  const val = () => parseInt(value || '0', 10) || 0;

  const insertAt = () => {
    const i = idx();
    const it = make(val());
    setItems((prev) => [...prev.slice(0, i), it, ...prev.slice(i)]);
    flash(it.id, 'hit');
    setMsg({ en: `Inserted ${it.value} at index ${i} — O(n) shift`, pt: `Inserido ${it.value} no índice ${i} — deslocamento O(n)` });
  };
  const append = () => {
    const it = make(val());
    setItems((prev) => [...prev, it]);
    flash(it.id, 'hit');
    setMsg({ en: `Appended ${it.value} — amortised O(1)`, pt: `Adicionado ${it.value} no fim — O(1) amortizado` });
  };
  const removeAt = () => {
    const i = Math.min(idx(), items.length - 1);
    if (i < 0) return;
    setMsg({ en: `Removed index ${i} — O(n) shift`, pt: `Removido índice ${i} — deslocamento O(n)` });
    setItems((prev) => prev.filter((_, k) => k !== i));
  };
  const access = () => {
    const i = Math.min(idx(), items.length - 1);
    if (items[i]) {
      flash(items[i].id, 'access');
      setMsg({ en: `array[${i}] = ${items[i].value} — O(1) direct access`, pt: `array[${i}] = ${items[i].value} — acesso direto O(1)` });
    }
  };
  const search = () => {
    const target = val();
    const found = items.find((it) => it.value === target);
    if (found) {
      flash(found.id, 'hit');
      setMsg({ en: `Found ${target} — O(n) scan`, pt: `Encontrado ${target} — varrimento O(n)` });
    } else {
      setMsg({ en: `${target} not found`, pt: `${target} não encontrado` });
    }
  };
  const reset = () => {
    setItems(initial());
    setMsg({ en: 'Reset', pt: 'Reiniciado' });
  };

  return (
    <Panel
      title={tr(locale, 'Interactive Array', 'Array Interativo')}
      meta={<span className="text-amber-300">{tr(locale, msg.en, msg.pt)}</span>}
      controls={
        <ControlButton onClick={reset} title="reset">
          <RotateCcw className="h-4 w-4" />
        </ControlButton>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <TextInput value={value} onChange={setValue} placeholder={tr(locale, 'value', 'valor')} className="w-24" />
        <TextInput value={index} onChange={setIndex} placeholder={tr(locale, 'index', 'índice')} className="w-24" />
        <ControlButton onClick={insertAt} variant="primary">
          <Plus className="h-4 w-4" /> {tr(locale, 'Insert @i', 'Inserir @i')}
        </ControlButton>
        <ControlButton onClick={append}>
          <Plus className="h-4 w-4" /> {tr(locale, 'Append', 'Append')}
        </ControlButton>
        <ControlButton onClick={removeAt}>
          <Trash2 className="h-4 w-4" /> {tr(locale, 'Remove @i', 'Remover @i')}
        </ControlButton>
        <ControlButton onClick={access}>
          <MousePointerClick className="h-4 w-4" /> {tr(locale, 'Access @i', 'Aceder @i')}
        </ControlButton>
        <ControlButton onClick={search}>
          <SearchIcon className="h-4 w-4" /> {tr(locale, 'Search', 'Procurar')}
        </ControlButton>
      </div>

      <Stage className="min-h-[140px] py-6">
        <div className="flex flex-wrap items-end justify-center gap-2">
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => {
              const active = highlight?.id === it.id;
              const color =
                active && highlight?.kind === 'hit'
                  ? 'bg-emerald-500 border-emerald-300'
                  : active
                  ? 'bg-amber-400 border-amber-200 text-dark-900'
                  : 'bg-primary-600 border-primary-400';
              return (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: -16, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-lg border-2 font-bold text-white ${color}`}
                  >
                    {it.value}
                  </div>
                  <span className="text-[10px] text-dark-500">[{i}]</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Stage>

      <Legend
        items={[
          { color: 'bg-primary-600', label: tr(locale, 'Element', 'Elemento') },
          { color: 'bg-amber-400', label: tr(locale, 'Accessed', 'Acedido') },
          { color: 'bg-emerald-500', label: tr(locale, 'Inserted / Found', 'Inserido / Encontrado') },
        ]}
      />
    </Panel>
  );
}

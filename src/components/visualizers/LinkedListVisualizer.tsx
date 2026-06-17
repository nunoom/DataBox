'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search as SearchIcon, RotateCcw, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

interface Node {
  id: number;
  value: number;
}
let uid = 0;
const make = (v: number): Node => ({ id: uid++, value: v });
const initial = () => [7, 14, 21, 28].map(make);

export default function LinkedListVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [nodes, setNodes] = useState<Node[]>(initial);
  const [value, setValue] = useState('33');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [foundId, setFoundId] = useState<number | null>(null);
  const [msg, setMsg] = useState({ en: 'A head pointer links nodes one to the next', pt: 'Um ponteiro head liga os nós um ao seguinte' });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActiveId(null);
    setFoundId(null);
  };
  const val = () => parseInt(value || '0', 10) || 0;

  const prepend = () => {
    clearTimers();
    setNodes((p) => [make(val()), ...p]);
    setMsg({ en: `Prepended ${val()} — O(1)`, pt: `Inserido ${val()} no início — O(1)` });
  };
  const append = () => {
    clearTimers();
    setNodes((p) => [...p, make(val())]);
    setMsg({ en: `Appended ${val()} — O(n) traversal to tail`, pt: `Inserido ${val()} no fim — percurso O(n) até à cauda` });
  };
  const removeHead = () => {
    clearTimers();
    setNodes((p) => p.slice(1));
    setMsg({ en: 'Removed head — O(1)', pt: 'Removido o início — O(1)' });
  };
  const search = () => {
    clearTimers();
    const target = val();
    setMsg({ en: `Traversing to find ${target}…`, pt: `A percorrer para encontrar ${target}…` });
    nodes.forEach((n, i) => {
      const t = setTimeout(() => {
        setActiveId(n.id);
        if (n.value === target) {
          setFoundId(n.id);
          setMsg({ en: `Found ${target} at position ${i} — O(n)`, pt: `Encontrado ${target} na posição ${i} — O(n)` });
        } else if (i === nodes.length - 1) {
          setMsg({ en: `${target} not found`, pt: `${target} não encontrado` });
        }
      }, i * 450);
      timers.current.push(t);
    });
  };
  const reset = () => {
    clearTimers();
    setNodes(initial());
    setMsg({ en: 'Reset', pt: 'Reiniciado' });
  };

  return (
    <Panel
      title={tr(locale, 'Interactive Linked List', 'Lista Ligada Interativa')}
      meta={<span className="text-amber-300">{tr(locale, msg.en, msg.pt)}</span>}
      controls={
        <ControlButton onClick={reset} title="reset">
          <RotateCcw className="h-4 w-4" />
        </ControlButton>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <TextInput value={value} onChange={setValue} placeholder={tr(locale, 'value', 'valor')} className="w-24" />
        <ControlButton onClick={prepend} variant="primary">
          <Plus className="h-4 w-4" /> {tr(locale, 'Prepend', 'Início')}
        </ControlButton>
        <ControlButton onClick={append}>
          <Plus className="h-4 w-4" /> {tr(locale, 'Append', 'Fim')}
        </ControlButton>
        <ControlButton onClick={removeHead}>
          <Trash2 className="h-4 w-4" /> {tr(locale, 'Remove head', 'Remover início')}
        </ControlButton>
        <ControlButton onClick={search}>
          <SearchIcon className="h-4 w-4" /> {tr(locale, 'Search', 'Procurar')}
        </ControlButton>
      </div>

      <Stage className="min-h-[150px] overflow-x-auto py-6">
        <div className="flex items-center justify-start gap-1 min-w-max px-2">
          <span className="mr-1 rounded bg-dark-700 px-2 py-1 text-xs font-semibold text-primary-300">head</span>
          <ArrowRight className="h-4 w-4 shrink-0 text-dark-500" />
          <AnimatePresence mode="popLayout">
            {nodes.map((n) => {
              const color =
                foundId === n.id
                  ? 'border-emerald-400 bg-emerald-500/20'
                  : activeId === n.id
                  ? 'border-amber-300 bg-amber-400/20'
                  : 'border-primary-500 bg-dark-800';
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="flex items-center gap-1"
                >
                  <div className={`flex items-center overflow-hidden rounded-lg border-2 ${color}`}>
                    <div className="flex h-12 w-12 items-center justify-center font-bold text-white">{n.value}</div>
                    <div className="flex h-12 w-7 items-center justify-center border-l border-dark-600 text-dark-400">
                      <span className="text-[10px]">●</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-dark-500" />
                </motion.div>
              );
            })}
          </AnimatePresence>
          <span className="rounded bg-dark-700 px-2 py-1 text-xs font-mono text-dark-400">null</span>
        </div>
      </Stage>

      <Legend
        items={[
          { color: 'bg-primary-500', label: tr(locale, 'Node', 'Nó') },
          { color: 'bg-amber-400', label: tr(locale, 'Visiting', 'A visitar') },
          { color: 'bg-emerald-500', label: tr(locale, 'Found', 'Encontrado') },
        ]}
      />
    </Panel>
  );
}

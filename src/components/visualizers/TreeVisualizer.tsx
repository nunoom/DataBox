'use client';

import { useRef, useState } from 'react';
import { Plus, Minus, RotateCcw, Sparkles, ListOrdered } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

interface BNode {
  value: number;
  left: BNode | null;
  right: BNode | null;
}
interface PNode {
  key: string;
  value: number;
  x: number;
  y: number;
}
interface PEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/* ----------------------------- BST helpers ----------------------------- */

function insertBST(root: BNode | null, value: number): BNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insertBST(root.left, value);
  else if (value > root.value) root.right = insertBST(root.right, value);
  return root;
}
function inorder(root: BNode | null, out: number[] = []): number[] {
  if (!root) return out;
  inorder(root.left, out);
  out.push(root.value);
  inorder(root.right, out);
  return out;
}
function layoutBST(root: BNode | null): { nodes: PNode[]; edges: PEdge[] } {
  const nodes: PNode[] = [];
  const edges: PEdge[] = [];
  let col = 0;
  let maxDepth = 0;
  const rec = (node: BNode | null, depth: number): PNode | null => {
    if (!node) return null;
    const leftPos = rec(node.left, depth + 1);
    const x = col++;
    maxDepth = Math.max(maxDepth, depth);
    const pos: PNode = { key: String(node.value), value: node.value, x, y: depth };
    nodes.push(pos);
    const rightPos = rec(node.right, depth + 1);
    if (leftPos) edges.push({ x1: x, y1: depth, x2: leftPos.x, y2: leftPos.y });
    if (rightPos) edges.push({ x1: x, y1: depth, x2: rightPos.x, y2: rightPos.y });
    return pos;
  };
  rec(root, 0);
  void maxDepth;
  const cols = Math.max(col, 1);
  const W = 760;
  const sx = (x: number) => ((x + 0.5) / cols) * W;
  const sy = (y: number) => y * 90 + 36;
  return {
    nodes: nodes.map((n) => ({ ...n, x: sx(n.x), y: sy(n.y) })),
    edges: edges.map((e) => ({ x1: sx(e.x1), y1: sy(e.y1), x2: sx(e.x2), y2: sy(e.y2) })),
  };
}

/* ----------------------------- Heap helpers ---------------------------- */

function layoutHeap(h: number[]): { nodes: PNode[]; edges: PEdge[] } {
  const nodes: PNode[] = [];
  const edges: PEdge[] = [];
  const W = 760;
  const maxLevel = h.length ? Math.floor(Math.log2(h.length)) : 0;
  const sy = (lvl: number) => lvl * 90 + 36;
  const sx = (idxInLevel: number, cols: number) => ((idxInLevel + 0.5) / cols) * W;
  h.forEach((v, i) => {
    const level = Math.floor(Math.log2(i + 1));
    const idxInLevel = i - (2 ** level - 1);
    const cols = 2 ** level;
    const x = sx(idxInLevel, cols);
    const y = sy(level);
    nodes.push({ key: String(i), value: v, x, y });
    if (i > 0) {
      const p = nodes[(i - 1) >> 1];
      edges.push({ x1: p.x, y1: p.y, x2: x, y2: y });
    }
  });
  void maxLevel;
  return { nodes, edges };
}

/* ------------------------------- Component ----------------------------- */

export default function TreeVisualizer({
  mode,
  locale = 'en',
}: {
  mode: 'bst' | 'heap';
  locale?: Locale;
}) {
  const isBST = mode === 'bst';
  const [root, setRoot] = useState<BNode | null>(() => {
    let r: BNode | null = null;
    [50, 30, 70, 20, 40, 60, 80].forEach((v) => (r = insertBST(r, v)));
    return r;
  });
  const [heap, setHeap] = useState<number[]>([5, 9, 12, 17, 24, 19]);
  const [value, setValue] = useState('45');
  const [active, setActive] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState(
    isBST
      ? { en: 'Insert values — smaller go left, larger go right', pt: 'Insere valores — menores à esquerda, maiores à direita' }
      : { en: 'A min-heap: every parent ≤ its children', pt: 'Um min-heap: todo pai ≤ os seus filhos' }
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const val = () => parseInt(value || '0', 10) || 0;

  /* ---- BST ops ---- */
  const insertBSTOp = () => {
    clearTimers();
    setActive(new Set());
    const v = val();
    setRoot((prev) => insertBST(prev ? structuredClone(prev) : null, v));
    setMsg({ en: `Inserted ${v}`, pt: `Inserido ${v}` });
  };
  const traverse = () => {
    clearTimers();
    const order = inorder(root);
    setMsg({ en: 'In-order traversal → sorted output', pt: 'Percurso in-order → saída ordenada' });
    setActive(new Set());
    order.forEach((v, i) => {
      const t = setTimeout(() => {
        setActive(new Set([String(v)]));
        if (i === order.length - 1) {
          const tt = setTimeout(() => {
            setActive(new Set(order.map(String)));
            setMsg({ en: `Sorted: ${order.join(', ')}`, pt: `Ordenado: ${order.join(', ')}` });
          }, 450);
          timers.current.push(tt);
        }
      }, i * 500);
      timers.current.push(t);
    });
  };

  /* ---- Heap ops (min-heap) ---- */
  const heapPush = () => {
    clearTimers();
    const v = val();
    setHeap((prev) => {
      const h = [...prev, v];
      let i = h.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (h[p] <= h[i]) break;
        [h[p], h[i]] = [h[i], h[p]];
        i = p;
      }
      return h;
    });
    setMsg({ en: `push(${v}) then sift up`, pt: `push(${v}) e sobe (sift up)` });
  };
  const heapPop = () => {
    clearTimers();
    setHeap((prev) => {
      if (!prev.length) return prev;
      const h = [...prev];
      const min = h[0];
      const last = h.pop()!;
      if (h.length) {
        h[0] = last;
        let i = 0;
        const n = h.length;
        while (true) {
          const l = 2 * i + 1;
          const r = 2 * i + 2;
          let s = i;
          if (l < n && h[l] < h[s]) s = l;
          if (r < n && h[r] < h[s]) s = r;
          if (s === i) break;
          [h[s], h[i]] = [h[i], h[s]];
          i = s;
        }
      }
      setMsg({ en: `extract-min → ${min}`, pt: `extrair-mín → ${min}` });
      return h;
    });
  };

  const randomFill = () => {
    clearTimers();
    setActive(new Set());
    if (isBST) {
      let r: BNode | null = null;
      const vals = new Set<number>();
      while (vals.size < 7) vals.add(Math.floor(Math.random() * 99) + 1);
      [...vals].forEach((v) => (r = insertBST(r, v)));
      setRoot(r);
    } else {
      const arr: number[] = [];
      for (let k = 0; k < 7; k++) {
        arr.push(Math.floor(Math.random() * 99) + 1);
        let i = arr.length - 1;
        while (i > 0) {
          const p = (i - 1) >> 1;
          if (arr[p] <= arr[i]) break;
          [arr[p], arr[i]] = [arr[i], arr[p]];
          i = p;
        }
      }
      setHeap(arr);
    }
    setMsg({ en: 'Random data', pt: 'Dados aleatórios' });
  };
  const reset = () => {
    clearTimers();
    setActive(new Set());
    if (isBST) {
      let r: BNode | null = null;
      [50, 30, 70, 20, 40, 60, 80].forEach((v) => (r = insertBST(r, v)));
      setRoot(r);
    } else {
      setHeap([5, 9, 12, 17, 24, 19]);
    }
    setMsg({ en: 'Reset', pt: 'Reiniciado' });
  };

  const { nodes, edges } = isBST ? layoutBST(root) : layoutHeap(heap);
  const height = (nodes.reduce((m, n) => Math.max(m, n.y), 0) || 36) + 60;

  return (
    <Panel
      title={isBST ? tr(locale, 'Binary Search Tree', 'Árvore Binária de Busca') : tr(locale, 'Min-Heap', 'Min-Heap')}
      meta={<span className="text-amber-300">{tr(locale, msg.en, msg.pt)}</span>}
      controls={
        <>
          <ControlButton onClick={randomFill}>
            <Sparkles className="h-4 w-4" /> {tr(locale, 'Random', 'Aleatório')}
          </ControlButton>
          <ControlButton onClick={reset} title="reset">
            <RotateCcw className="h-4 w-4" />
          </ControlButton>
        </>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <TextInput value={value} onChange={setValue} placeholder={tr(locale, 'value', 'valor')} className="w-24" />
        {isBST ? (
          <>
            <ControlButton onClick={insertBSTOp} variant="primary">
              <Plus className="h-4 w-4" /> {tr(locale, 'Insert', 'Inserir')}
            </ControlButton>
            <ControlButton onClick={traverse}>
              <ListOrdered className="h-4 w-4" /> {tr(locale, 'In-order', 'In-order')}
            </ControlButton>
          </>
        ) : (
          <>
            <ControlButton onClick={heapPush} variant="primary">
              <Plus className="h-4 w-4" /> push
            </ControlButton>
            <ControlButton onClick={heapPop}>
              <Minus className="h-4 w-4" /> extract-min
            </ControlButton>
          </>
        )}
      </div>

      <Stage className="overflow-x-auto">
        <svg viewBox={`0 0 760 ${height}`} className="mx-auto w-full" style={{ maxHeight: 380 }}>
          {edges.map((e, i) => (
            <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#475569" strokeWidth={2} />
          ))}
          {nodes.map((n) => {
            const on = active.has(n.key);
            return (
              <g key={n.key}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={22}
                  className="transition-colors"
                  fill={on ? '#10b981' : '#0284c7'}
                  stroke={on ? '#6ee7b7' : '#38bdf8'}
                  strokeWidth={2}
                />
                <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-white text-sm font-bold">
                  {n.value}
                </text>
              </g>
            );
          })}
        </svg>
        {nodes.length === 0 && (
          <p className="py-10 text-center text-dark-500">{tr(locale, 'Empty', 'Vazio')}</p>
        )}
      </Stage>

      {!isBST && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs text-dark-400">{tr(locale, 'Array backing:', 'Array de suporte:')}</span>
          {heap.map((v, i) => (
            <span key={i} className="rounded bg-dark-700 px-2 py-1 font-mono text-xs text-dark-200">
              {v}
            </span>
          ))}
        </div>
      )}

      <Legend
        items={[
          { color: 'bg-primary-600', label: tr(locale, 'Node', 'Nó') },
          { color: 'bg-emerald-500', label: tr(locale, 'Highlighted', 'Destacado') },
        ]}
      />
    </Panel>
  );
}

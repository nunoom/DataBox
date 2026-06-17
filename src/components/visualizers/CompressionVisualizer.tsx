'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, ControlButton, TextInput, Legend } from './shared';

const RUN_COLORS = ['bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 'bg-fuchsia-500', 'bg-rose-500', 'bg-teal-500', 'bg-indigo-500'];
const SAMPLES = ['AAAABBBCCDAA', 'WWWWWWWWWWWWB', 'ABABABAB', 'MISSISSIPPI'];

export default function CompressionVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [input, setInput] = useState('AAAABBBCCDAA');

  const runs = useMemo(() => {
    const out: { ch: string; count: number }[] = [];
    for (let i = 0; i < input.length; ) {
      let j = i;
      while (j < input.length && input[j] === input[i]) j++;
      out.push({ ch: input[i], count: j - i });
      i = j;
    }
    return out;
  }, [input]);

  const encoded = runs.map((r) => `${r.count}${r.ch}`).join('');
  const ratio = input.length ? encoded.length / input.length : 1;
  const saved = Math.max(0, Math.round((1 - ratio) * 100));

  let runIndex = -1;

  return (
    <Panel
      title={tr(locale, 'Run-Length Encoding', 'Run-Length Encoding')}
      meta={
        <>
          <span>
            {tr(locale, 'Original', 'Original')}: {input.length} · {tr(locale, 'Encoded', 'Codificado')}: {encoded.length}
          </span>
          <span className={saved > 0 ? 'text-emerald-300' : 'text-rose-300'}>
            {saved > 0 ? `−${saved}%` : tr(locale, 'larger!', 'maior!')}
          </span>
        </>
      }
      controls={
        <>
          {SAMPLES.map((s) => (
            <ControlButton key={s} onClick={() => setInput(s)} variant={input === s ? 'primary' : 'ghost'}>
              {s.slice(0, 6)}…
            </ControlButton>
          ))}
        </>
      }
    >
      <div className="mb-5">
        <TextInput
          value={input}
          onChange={(v) => setInput(v.toUpperCase().replace(/[^A-Z]/g, ''))}
          placeholder={tr(locale, 'type letters…', 'escreve letras…')}
          className="w-full"
        />
      </div>

      <Stage className="space-y-6 py-5">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark-400">{tr(locale, 'Input', 'Entrada')}</div>
          <div className="flex flex-wrap gap-1">
            {input.split('').map((ch, i) => {
              // assign a run color
              if (i === 0 || input[i] !== input[i - 1]) runIndex++;
              const color = RUN_COLORS[runIndex % RUN_COLORS.length];
              return (
                <span key={i} className={`flex h-9 w-9 items-center justify-center rounded font-mono font-bold text-white ${color}`}>
                  {ch}
                </span>
              );
            })}
            {input.length === 0 && <span className="text-dark-600">{tr(locale, 'empty', 'vazio')}</span>}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark-400">{tr(locale, 'Encoded (count + symbol)', 'Codificado (contagem + símbolo)')}</div>
          <div className="flex flex-wrap gap-2">
            {runs.map((r, i) => (
              <span
                key={i}
                className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 font-mono text-sm ${
                  r.count > 1 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' : 'border-dark-600 bg-dark-800 text-dark-300'
                }`}
              >
                <span className="font-bold">{r.count}</span>
                <span>{r.ch}</span>
              </span>
            ))}
          </div>
        </div>
      </Stage>

      <Legend
        items={[
          { color: 'bg-emerald-500', label: tr(locale, 'Compressed run (count > 1)', 'Sequência comprimida (contagem > 1)') },
          { color: 'bg-dark-700', label: tr(locale, 'Single char (no gain)', 'Carácter único (sem ganho)') },
        ]}
      />
      <p className="mt-3 text-xs text-dark-400">
        {tr(
          locale,
          'RLE shines on long runs (sorted columns, sparse data). On alternating data it can grow — that is why engines pick encodings per column.',
          'O RLE brilha em sequências longas (colunas ordenadas, dados esparsos). Em dados alternados pode crescer — por isso os motores escolhem a codificação por coluna.'
        )}
      </p>
    </Panel>
  );
}

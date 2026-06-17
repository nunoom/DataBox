'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { tr } from '@/lib/i18n';
import { Panel, Stage, Slider, Transport, ProgressBar, ControlButton, useStepPlayer } from './shared';

interface Row {
  user: string;
  day: number;
  amount: number;
}
const DATA: Row[] = [
  { user: 'ana', day: 1, amount: 50 },
  { user: 'ana', day: 2, amount: 30 },
  { user: 'ana', day: 3, amount: 90 },
  { user: 'bob', day: 1, amount: 20 },
  { user: 'bob', day: 2, amount: 70 },
  { user: 'bob', day: 3, amount: 40 },
];

type Fn = 'running_sum' | 'rank' | 'row_number';

export default function WindowFunctionsVisualizer({ locale = 'en' }: { locale?: Locale }) {
  const [fn, setFn] = useState<Fn>('running_sum');
  const [speed, setSpeed] = useState(35);

  // partition by user, order by day (data already ordered)
  const computed = useMemo(() => {
    const result: (Row & { value: number })[] = [];
    const byUser: Record<string, Row[]> = {};
    DATA.forEach((r) => (byUser[r.user] ??= []).push(r));
    DATA.forEach((r, i) => {
      const part = byUser[r.user];
      let value = 0;
      if (fn === 'running_sum') {
        value = part.filter((x) => x.day <= r.day).reduce((a, b) => a + b.amount, 0);
      } else if (fn === 'rank') {
        value = part.filter((x) => x.amount > r.amount).length + 1;
      } else {
        value = part.findIndex((x) => x.day === r.day) + 1;
      }
      result.push({ ...r, value });
      void i;
    });
    return result;
  }, [fn]);

  const player = useStepPlayer(DATA.length, speed);
  const current = Math.min(player.index, DATA.length - 1);
  const currentUser = computed[current]?.user;

  const FNS: { key: Fn; label: string; col: string }[] = [
    { key: 'running_sum', label: 'SUM() OVER', col: 'running_total' },
    { key: 'rank', label: 'RANK() OVER', col: 'rnk' },
    { key: 'row_number', label: 'ROW_NUMBER()', col: 'row_num' },
  ];
  const colName = FNS.find((f) => f.key === fn)!.col;

  return (
    <Panel
      title={tr(locale, 'Window Functions', 'Window Functions')}
      meta={
        <span className="text-amber-300">
          {tr(locale, 'PARTITION BY user ORDER BY day', 'PARTITION BY user ORDER BY day')}
        </span>
      }
      controls={<Transport player={player} locale={locale} />}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {FNS.map((f) => (
          <ControlButton
            key={f.key}
            onClick={() => {
              setFn(f.key);
              player.reset();
            }}
            variant={fn === f.key ? 'primary' : 'ghost'}
          >
            {f.label}
          </ControlButton>
        ))}
        <Slider label={tr(locale, 'Speed', 'Velocidade')} value={speed} min={1} max={100} onChange={setSpeed} />
      </div>

      <Stage className="overflow-x-auto py-4">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="text-left text-dark-400">
              <th className="px-3 py-2">user</th>
              <th className="px-3 py-2">day</th>
              <th className="px-3 py-2">amount</th>
              <th className="px-3 py-2 text-primary-300">{colName}</th>
            </tr>
          </thead>
          <tbody>
            {computed.map((r, i) => {
              const revealed = i <= current;
              const isCurrent = i === current;
              const inPartition = r.user === currentUser;
              return (
                <tr
                  key={i}
                  className={`border-t border-dark-700 transition-colors ${
                    isCurrent ? 'bg-amber-400/10' : inPartition ? 'bg-primary-600/5' : ''
                  }`}
                >
                  <td className="px-3 py-2 font-mono text-dark-200">{r.user}</td>
                  <td className="px-3 py-2 text-dark-300">{r.day}</td>
                  <td className="px-3 py-2 text-dark-300">{r.amount}</td>
                  <td className={`px-3 py-2 font-bold ${revealed ? 'text-primary-300' : 'text-dark-700'}`}>
                    {revealed ? r.value : '·'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Stage>

      <ProgressBar index={player.index} total={DATA.length} />

      <p className="mt-4 text-xs text-dark-400">
        {tr(
          locale,
          'The function runs per row over its partition — every input row stays in the output.',
          'A função corre por linha sobre a sua partição — todas as linhas de entrada permanecem na saída.'
        )}
      </p>
    </Panel>
  );
}

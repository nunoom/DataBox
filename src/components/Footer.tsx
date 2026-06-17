import Link from 'next/link';
import { Boxes } from 'lucide-react';
import { tr, type Locale } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const cols = [
    {
      title: tr(locale, 'Algorithms', 'Algoritmos'),
      links: [
        { label: tr(locale, 'Sorting', 'Ordenação'), href: `/${locale}/algorithms/bubble-sort` },
        { label: tr(locale, 'Searching', 'Busca'), href: `/${locale}/algorithms/binary-search` },
        { label: tr(locale, 'Graphs', 'Grafos'), href: `/${locale}/algorithms/bfs` },
      ],
    },
    {
      title: tr(locale, 'Structures', 'Estruturas'),
      links: [
        { label: 'Array', href: `/${locale}/data-structures/array` },
        { label: tr(locale, 'Hash Table', 'Tabela Hash'), href: `/${locale}/data-structures/hash-table` },
        { label: tr(locale, 'Binary Tree', 'Árvore Binária'), href: `/${locale}/data-structures/binary-tree` },
      ],
    },
    {
      title: tr(locale, 'Data Engineering', 'Engenharia de Dados'),
      links: [
        { label: 'MapReduce', href: `/${locale}/data-engineering/mapreduce` },
        { label: 'Bloom Filter', href: `/${locale}/data-engineering/bloom-filter` },
        { label: tr(locale, 'Consistent Hashing', 'Consistent Hashing'), href: `/${locale}/data-engineering/consistent-hashing` },
      ],
    },
  ];

  return (
    <footer className="mt-20 border-t border-dark-700/60 bg-dark-950/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary-500 to-purple-600">
                <Boxes className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Data<span className="text-gradient">Box</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-dark-400">
              {tr(
                locale,
                'Learn algorithms & data engineering through interactive visualizations.',
                'Aprende algoritmos e engenharia de dados através de visualizações interativas.'
              )}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-dark-400 transition-colors hover:text-primary-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-dark-800 pt-6 text-center text-xs text-dark-500">
          {tr(locale, 'Built for learners of data engineering & computer science.', 'Feito para quem aprende engenharia de dados e ciência da computação.')}
        </div>
      </div>
    </footer>
  );
}

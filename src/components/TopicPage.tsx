import Link from 'next/link';
import { ArrowLeft, Clock, Zap, CheckCircle2, ListOrdered, Code, Rocket } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/CodeBlock';
import { Icon } from '@/components/Icon';
import Visualizer from '@/components/visualizers/Visualizer';
import { sectionMeta, type Topic, type Tone } from '@/lib/content';
import { tr, type Locale } from '@/lib/i18n';

const toneText: Record<Tone, string> = {
  good: 'text-emerald-400',
  warn: 'text-amber-400',
  bad: 'text-rose-400',
  info: 'text-primary-300',
};
const toneDot: Record<Tone, string> = {
  good: 'bg-emerald-400',
  warn: 'bg-amber-400',
  bad: 'bg-rose-400',
  info: 'bg-primary-400',
};

export default function TopicPage({ topic, locale }: { topic: Topic; locale: Locale }) {
  const sec = sectionMeta[topic.section];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-400">
          <Link href={`/${locale}/${topic.section}`} className="transition-colors hover:text-white">
            {tr(locale, sec.title.en, sec.title.pt)}
          </Link>
          <span>/</span>
          <span className="text-white">{tr(locale, topic.title.en, topic.title.pt)}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/${topic.section}`}
              className="rounded-lg bg-dark-800 p-2 text-dark-400 transition-colors hover:bg-dark-700 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${topic.accent}`}>
              <Icon name={topic.icon} className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">{tr(locale, topic.title.en, topic.title.pt)}</h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-dark-300">{tr(locale, topic.description.en, topic.description.pt)}</p>
        </div>

        {/* Info cards */}
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-400" />
              <h3 className="font-semibold text-white">{tr(locale, 'Complexity', 'Complexidade')}</h3>
            </div>
            <div className="space-y-2 text-sm">
              {topic.complexity.map((row, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-dark-400">{tr(locale, row.label.en, row.label.pt)}</span>
                  <span className={`font-mono ${row.tone ? toneText[row.tone] : 'text-dark-200'}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {topic.space && (
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">{tr(locale, 'Space', 'Espaço')}</h3>
              </div>
              <div className="text-center">
                <div className="font-mono text-3xl text-blue-300">{topic.space.value}</div>
                <p className="mt-2 text-sm text-dark-400">{tr(locale, topic.space.note.en, topic.space.note.pt)}</p>
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-white">{tr(locale, 'Properties', 'Características')}</h3>
            </div>
            <div className="space-y-2 text-sm">
              {topic.properties.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${toneDot[p.tone]}`} />
                  <span className="text-dark-200">{tr(locale, p.label.en, p.label.pt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visualizer */}
        {topic.visualizer && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              {tr(locale, 'Interactive Visualization', 'Visualização Interativa')}
            </h2>
            <Visualizer id={topic.visualizer} locale={locale} />
          </section>
        )}

        {/* How it works + Code */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-primary-400" />
              <h2 className="text-xl font-bold text-white">{tr(locale, 'How It Works', 'Como Funciona')}</h2>
            </div>
            <ol className="space-y-4">
              {topic.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary-600 to-blue-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-dark-200">{tr(locale, s.text.en, s.text.pt)}</span>
                </li>
              ))}
            </ol>
          </div>

          {topic.code && (
            <div className="glass rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary-400" />
                <h2 className="text-xl font-bold text-white">{tr(locale, 'Example Code', 'Código de Exemplo')}</h2>
              </div>
              <CodeBlock source={topic.code.source} lang={topic.code.lang} />
            </div>
          )}
        </div>

        {/* Use cases */}
        {topic.useCases && topic.useCases.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {topic.useCases.map((uc, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <h3 className={`mb-3 font-semibold ${toneText[uc.tone]}`}>{tr(locale, uc.title.en, uc.title.pt)}</h3>
                <ul className="space-y-2">
                  {uc.items.map((it, k) => (
                    <li key={k} className="flex items-center gap-2 text-dark-200">
                      <span className={`h-1.5 w-1.5 rounded-full ${toneDot[uc.tone]}`} />
                      {tr(locale, it.en, it.pt)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Applications */}
        {topic.applications && topic.applications.length > 0 && (
          <div className="mt-8 rounded-2xl border border-primary-800/30 bg-linear-to-r from-primary-900/20 to-purple-900/20 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary-300" />
              <h2 className="text-xl font-bold text-white">{tr(locale, 'Real-World Uses', 'Usos no Mundo Real')}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {topic.applications.map((a, i) => (
                <span key={i} className="rounded-full bg-dark-800/80 px-4 py-1.5 text-sm text-dark-200">
                  {tr(locale, a.en, a.pt)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer locale={locale} />
    </div>
  );
}

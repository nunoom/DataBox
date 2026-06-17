import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { getTopicsBySection, sectionMeta, type Section } from '@/lib/content';
import { tr, type Locale } from '@/lib/i18n';

const SECTIONS: { key: Section; accent: string }[] = [
  { key: 'algorithms', accent: 'from-sky-500 to-cyan-500' },
  { key: 'data-structures', accent: 'from-purple-500 to-pink-500' },
  { key: 'data-engineering', accent: 'from-emerald-500 to-teal-500' },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale} />
      <Hero locale={locale} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          {tr(locale, 'Three tracks, one platform', 'Três trilhos, uma plataforma')}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-dark-400">
          {tr(
            locale,
            'From classic computer-science fundamentals to the distributed systems that power modern data pipelines.',
            'Dos fundamentos clássicos da computação aos sistemas distribuídos que alimentam os pipelines de dados modernos.'
          )}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {SECTIONS.map(({ key, accent }) => {
            const meta = sectionMeta[key];
            const topics = getTopicsBySection(key);
            return (
              <Link
                key={key}
                href={`/${locale}/${key}`}
                className="group relative overflow-hidden rounded-3xl border border-dark-700 bg-dark-800/60 p-7 transition-all hover:-translate-y-1 hover:border-primary-600/50"
              >
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br ${accent} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${accent}`}>
                  <Icon name={meta.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{tr(locale, meta.title.en, meta.title.pt)}</h3>
                <p className="mt-2 text-sm text-dark-400">{tr(locale, meta.subtitle.en, meta.subtitle.pt)}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-dark-300">
                    {topics.length} {tr(locale, 'topics', 'tópicos')}
                  </span>
                  <ArrowRight className="h-5 w-5 text-primary-400 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}

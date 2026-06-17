import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Icon } from '@/components/Icon';
import {
  getCategoriesBySection,
  getTopicsByCategory,
  sectionMeta,
  type Section,
} from '@/lib/content';
import { tr, type Locale } from '@/lib/i18n';

export default function SectionListing({ section, locale }: { section: Section; locale: Locale }) {
  const meta = sectionMeta[section];
  const cats = getCategoriesBySection(section);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale} />

      <div className="relative overflow-hidden border-b border-dark-800 bg-grid">
        <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500 to-purple-600 shadow-lg">
            <Icon name={meta.icon} className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">{tr(locale, meta.title.en, meta.title.pt)}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">{tr(locale, meta.subtitle.en, meta.subtitle.pt)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
        {cats.map((cat) => {
          const items = getTopicsByCategory(section, cat.key);
          if (!items.length) return null;
          return (
            <section key={cat.key}>
              <div className="mb-6 flex items-center gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${cat.accent}`}>
                  <Icon name={cat.icon} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{tr(locale, cat.title.en, cat.title.pt)}</h2>
                  <p className="text-sm text-dark-400">{tr(locale, cat.description.en, cat.description.pt)}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/${locale}/${section}/${topic.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-800/60 p-5 transition-all hover:-translate-y-0.5 hover:border-primary-600/50 hover:bg-dark-800"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${topic.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
                    <div className="mb-3 flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br ${topic.accent}`}>
                        <Icon name={topic.icon} className="h-5 w-5 text-white" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-dark-500 transition-all group-hover:translate-x-1 group-hover:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-300">
                      {tr(locale, topic.title.en, topic.title.pt)}
                    </h3>
                    <p className="mt-1 text-sm text-dark-400">{tr(locale, topic.tagline.en, topic.tagline.pt)}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Footer locale={locale} />
    </div>
  );
}

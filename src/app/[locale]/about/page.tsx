import Link from 'next/link';
import { Code2, Database, Cloud, Zap, Globe, GraduationCap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { tr, type Locale } from '@/lib/i18n';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;

  const features = [
    {
      icon: Code2,
      title: tr(locale, 'Step-by-step playback', 'Reprodução passo a passo'),
      desc: tr(locale, 'Play, pause, step and scrub through every algorithm with adjustable speed.', 'Reproduz, pausa, avança e percorre cada algoritmo com velocidade ajustável.'),
    },
    {
      icon: Database,
      title: tr(locale, 'Hands-on structures', 'Estruturas práticas'),
      desc: tr(locale, 'Insert, delete and search directly in arrays, lists, trees and hash tables.', 'Insere, remove e procura diretamente em arrays, listas, árvores e tabelas hash.'),
    },
    {
      icon: Cloud,
      title: tr(locale, 'Real data-engineering', 'Engenharia de dados real'),
      desc: tr(locale, 'MapReduce, Bloom filters, consistent hashing, partitioning and streaming.', 'MapReduce, Bloom filters, consistent hashing, particionamento e streaming.'),
    },
    {
      icon: Zap,
      title: tr(locale, 'Complexity at a glance', 'Complexidade num relance'),
      desc: tr(locale, 'Time and space complexity, properties and trade-offs on every page.', 'Complexidade de tempo e espaço, características e trade-offs em cada página.'),
    },
    {
      icon: Globe,
      title: tr(locale, 'Bilingual', 'Bilingue'),
      desc: tr(locale, 'Full Portuguese and English, switchable with one click.', 'Português e inglês completos, alternáveis com um clique.'),
    },
    {
      icon: GraduationCap,
      title: tr(locale, 'For learners & pros', 'Para alunos e profissionais'),
      desc: tr(locale, 'From first steps to interview prep and system-design review.', 'Dos primeiros passos à preparação de entrevistas e revisão de system design.'),
    },
  ];

  const tech = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Lucide Icons'];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale} />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {tr(locale, 'About ', 'Sobre o ')}
            Data<span className="text-gradient">Box</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-dark-300">
            {tr(
              locale,
              'DataBox is an interactive platform for learning the algorithms, data structures and distributed-systems patterns that power modern data engineering — by seeing them run, not just reading about them.',
              'O DataBox é uma plataforma interativa para aprender os algoritmos, estruturas de dados e padrões de sistemas distribuídos que sustentam a engenharia de dados moderna — vendo-os a correr, não apenas lendo sobre eles.'
            )}
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-primary-800/30 bg-linear-to-r from-primary-900/20 to-purple-900/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">{tr(locale, 'Our Mission', 'A Nossa Missão')}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-dark-300">
            {tr(
              locale,
              'Make abstract computer-science concepts tangible. Visual, interactive learning turns "I memorised it" into "I understand it".',
              'Tornar tangíveis os conceitos abstratos da ciência da computação. A aprendizagem visual e interativa transforma "decorei" em "percebi".'
            )}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass rounded-2xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-blue-500">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-dark-400">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <h2 className="mb-6 text-2xl font-bold text-white">{tr(locale, 'Built with', 'Construído com')}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {tech.map((t) => (
              <span key={t} className="rounded-full border border-dark-700 bg-dark-800 px-4 py-1.5 text-sm text-dark-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}/algorithms`}
            className="rounded-xl bg-linear-to-r from-primary-600 to-blue-600 px-7 py-3 text-center font-semibold text-white transition-all hover:scale-[1.02]"
          >
            {tr(locale, 'Explore Algorithms', 'Explorar Algoritmos')}
          </Link>
          <Link
            href={`/${locale}/data-structures`}
            className="rounded-xl border border-dark-600 px-7 py-3 text-center font-semibold text-dark-200 transition-colors hover:border-primary-500 hover:text-white"
          >
            {tr(locale, 'View Data Structures', 'Ver Estruturas de Dados')}
          </Link>
        </div>
      </div>

      <Footer locale={locale} />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { tr, type Locale } from '@/lib/i18n';

export default function Hero({ locale }: { locale: Locale }) {
  const stats = [
    { value: '28', label: tr(locale, 'Topics', 'Tópicos') },
    { value: '17', label: tr(locale, 'Live visualizers', 'Visualizadores') },
    { value: '2', label: tr(locale, 'Languages', 'Idiomas') },
  ];

  return (
    <section className="relative overflow-hidden bg-grid">
      {/* glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/15 blur-3xl animate-pulse-slow" />
        <div className="absolute right-1/4 top-32 h-96 w-96 translate-x-1/2 rounded-full bg-purple-500/15 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-700/50 bg-primary-900/20 px-4 py-1.5 text-sm text-primary-200"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {tr(locale, 'Interactive learning platform', 'Plataforma de aprendizagem interativa')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {tr(locale, 'Algorithms &', 'Algoritmos &')}{' '}
          <span className="text-gradient">{tr(locale, 'Data Engineering', 'Engenharia de Dados')}</span>
          <br />
          {tr(locale, 'made visual.', 'à vista.')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-dark-300 md:text-xl"
        >
          {tr(
            locale,
            'Watch sorting, graphs, hashing, MapReduce and streaming run step by step — with controls, code and complexity for every concept.',
            'Vê ordenação, grafos, hashing, MapReduce e streaming a correr passo a passo — com controlos, código e complexidade para cada conceito.'
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={`/${locale}/algorithms`}
            className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/40 transition-all hover:scale-[1.03] hover:from-primary-500 hover:to-blue-500"
          >
            <Play className="h-5 w-5" />
            {tr(locale, 'Explore Algorithms', 'Explorar Algoritmos')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/data-engineering`}
            className="inline-flex items-center gap-2 rounded-xl border border-dark-600 px-7 py-3.5 text-base font-semibold text-dark-200 transition-colors hover:border-primary-500 hover:text-white"
          >
            {tr(locale, 'Data Engineering', 'Engenharia de Dados')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-14 flex max-w-md justify-center gap-10"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-dark-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

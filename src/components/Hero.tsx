'use client';

import Link from 'next/link';
import { ArrowRight, Play, Code2, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { t, type Locale } from '@/lib/i18n';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-primary-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t(locale, 'home.title')}
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
          >
            {t(locale, 'home.subtitle')}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            {t(locale, 'home.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={`/${locale}/algorithms`}
              className="group bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>{t(locale, 'home.getStarted')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href={`/${locale}/about`}
              className="group border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2"
            >
              <span>{t(locale, 'home.learnMore')}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mt-20 max-w-4xl mx-auto"
        >
          <div className="gradient-border">
            <div className="p-6 h-full">
              <Code2 className="w-12 h-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'en' ? 'Interactive Algorithms' : 'Algoritmos Interativos'}
              </h3>
              <p className="text-gray-400">
                {locale === 'en' 
                  ? 'Visualize sorting, searching, and graph algorithms with real-time animations and step-by-step execution.'
                  : 'Visualize algoritmos de ordenação, busca e grafos com animações em tempo real e execução passo a passo.'
                }
              </p>
            </div>
          </div>
          
          <div className="gradient-border">
            <div className="p-6 h-full">
              <Database className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'en' ? 'Data Structures' : 'Estruturas de Dados'}
              </h3>
              <p className="text-gray-400">
                {locale === 'en'
                  ? 'Explore arrays, trees, graphs, and hash tables with interactive visualizations and complexity analysis.'
                  : 'Explore arrays, árvores, grafos e tabelas hash com visualizações interativas e análise de complexidade.'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
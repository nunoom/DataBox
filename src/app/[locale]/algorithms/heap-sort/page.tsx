import Navigation from '@/components/Navigation';
import { ArrowLeft, Clock, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface HeapSortPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HeapSortPage({ params }: HeapSortPageProps) {
  const { locale } = await params;
  const isPortuguese = locale === 'pt';

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href={`/${locale}/algorithms`} className="hover:text-white transition-colors">
            {isPortuguese ? 'Algoritmos' : 'Algorithms'}
          </Link>
          <span>/</span>
          <span className="text-white">Heap Sort</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/${locale}/algorithms`}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Heap Sort
            </h1>
          </div>
          
          <p className="text-xl text-gray-400 max-w-4xl">
            {isPortuguese 
              ? 'Um algoritmo de ordenação in-place que usa uma estrutura de heap binário.'
              : 'An in-place sorting algorithm that uses a binary heap data structure.'
            }
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-purple-800/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Em Desenvolvimento' : 'Coming Soon'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isPortuguese 
              ? 'A visualização do Heap Sort está sendo desenvolvida. Em breve você poderá ver como este algoritmo in-place funciona!'
              : 'The Heap Sort visualization is under development. Soon you will be able to see how this in-place algorithm works!'
            }
          </p>
          <Link
            href={`/${locale}/algorithms`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {isPortuguese ? 'Voltar aos Algoritmos' : 'Back to Algorithms'}
          </Link>
        </div>
      </div>
    </div>
  );
}
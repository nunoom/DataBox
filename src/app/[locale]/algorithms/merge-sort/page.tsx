import Navigation from '@/components/Navigation';
import { ArrowLeft, Clock, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface MergeSortPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function MergeSortPage({ params }: MergeSortPageProps) {
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
          <span className="text-white">Merge Sort</span>
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
              Merge Sort
            </h1>
          </div>
          
          <p className="text-xl text-gray-400 max-w-4xl">
            {isPortuguese 
              ? 'Um algoritmo de ordenação estável que usa a estratégia "dividir para conquistar".'
              : 'A stable sorting algorithm that uses the "divide and conquer" strategy.'
            }
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Em Desenvolvimento' : 'Coming Soon'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isPortuguese 
              ? 'A visualização do Merge Sort está sendo desenvolvida. Em breve você poderá ver como este algoritmo eficiente funciona!'
              : 'The Merge Sort visualization is under development. Soon you will be able to see how this efficient algorithm works!'
            }
          </p>
          <Link
            href={`/${locale}/algorithms`}
            className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {isPortuguese ? 'Voltar aos Algoritmos' : 'Back to Algorithms'}
          </Link>
        </div>
      </div>
    </div>
  );
}
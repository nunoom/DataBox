import Navigation from '@/components/Navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface LinkedListPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LinkedListPage({ params }: LinkedListPageProps) {
  const { locale } = await params;
  const isPortuguese = locale === 'pt';

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href={`/${locale}/data-structures`} className="hover:text-white transition-colors">
            {isPortuguese ? 'Estruturas de Dados' : 'Data Structures'}
          </Link>
          <span>/</span>
          <span className="text-white">Linked List</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/${locale}/data-structures`}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {isPortuguese ? 'Lista Ligada' : 'Linked List'}
            </h1>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-800/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Em Desenvolvimento' : 'Coming Soon'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isPortuguese 
              ? 'A visualização da Lista Ligada está sendo desenvolvida.'
              : 'The Linked List visualization is under development.'
            }
          </p>
          <Link
            href={`/${locale}/data-structures`}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {isPortuguese ? 'Voltar às Estruturas' : 'Back to Structures'}
          </Link>
        </div>
      </div>
    </div>
  );
}
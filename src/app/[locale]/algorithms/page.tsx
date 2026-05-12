import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, BarChart3, Search, GitBranch } from 'lucide-react';
import { t, type Locale } from '@/lib/i18n';

interface AlgorithmsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AlgorithmsPage({ params }: AlgorithmsPageProps) {
  const { locale } = await params;

  const algorithmCategories = [
    {
      title: t(locale as Locale, 'algorithms.sorting.title'),
      description: t(locale as Locale, 'algorithms.sorting.description'),
      icon: BarChart3,
      algorithms: [
        { name: t(locale as Locale, 'algorithms.sorting.bubbleSort'), slug: 'bubble-sort' },
        { name: t(locale as Locale, 'algorithms.sorting.quickSort'), slug: 'quick-sort' },
        { name: t(locale as Locale, 'algorithms.sorting.mergeSort'), slug: 'merge-sort' },
        { name: t(locale as Locale, 'algorithms.sorting.heapSort'), slug: 'heap-sort' },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t(locale as Locale, 'algorithms.search.title'),
      description: t(locale as Locale, 'algorithms.search.description'),
      icon: Search,
      algorithms: [
        { name: t(locale as Locale, 'algorithms.search.binarySearch'), slug: 'binary-search' },
        { name: t(locale as Locale, 'algorithms.search.linearSearch'), slug: 'linear-search' },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t(locale as Locale, 'algorithms.graph.title'),
      description: t(locale as Locale, 'algorithms.graph.description'),
      icon: GitBranch,
      algorithms: [
        { name: t(locale as Locale, 'algorithms.graph.bfs'), slug: 'bfs' },
        { name: t(locale as Locale, 'algorithms.graph.dfs'), slug: 'dfs' },
        { name: t(locale as Locale, 'algorithms.graph.dijkstra'), slug: 'dijkstra' },
      ],
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t(locale as Locale, 'algorithms.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore and visualize different algorithms with interactive demonstrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithmCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-dark-600 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {category.description}
                </p>
                
                <div className="space-y-2">
                  {category.algorithms.map((algorithm, algIndex) => (
                    <Link
                      key={algIndex}
                      href={`/${locale}/algorithms/${algorithm.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors group/item"
                    >
                      <span className="text-gray-300 group-hover/item:text-white">
                        {algorithm.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover/item:text-primary-400 group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Algorithm Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary-900/20 to-blue-900/20 rounded-xl p-8 border border-primary-800/30">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {locale === 'en' ? 'Start with Bubble Sort' : 'Comece com Bubble Sort'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {locale === 'en' 
                    ? 'Perfect for beginners! Bubble Sort is one of the simplest sorting algorithms to understand. Watch how elements "bubble" to their correct positions through step-by-step comparisons.'
                    : 'Perfeito para iniciantes! Bubble Sort é um dos algoritmos de ordenação mais simples de entender. Veja como os elementos "borbulham" para suas posições corretas através de comparações passo a passo.'
                  }
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Time: O(n²)' : 'Tempo: O(n²)'}
                  </span>
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Space: O(1)' : 'Espaço: O(1)'}
                  </span>
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Stable' : 'Estável'}
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/3 flex justify-center">
                <Link
                  href={`/${locale}/algorithms/bubble-sort`}
                  className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>{locale === 'en' ? 'Try It Now' : 'Experimente Agora'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
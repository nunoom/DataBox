import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, Database, Cloud, Zap, BarChart3, Hash, Filter } from 'lucide-react';
import { t, type Locale } from '@/lib/i18n';

interface DataEngineeringPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function DataEngineeringPage({ params }: DataEngineeringPageProps) {
  const { locale } = await params;

  const algorithmCategories = [
    {
      title: t(locale as Locale, 'dataEngineering.etl.title'),
      description: t(locale as Locale, 'dataEngineering.etl.description'),
      icon: Database,
      algorithms: [
        { 
          name: t(locale as Locale, 'dataEngineering.etl.mapReduce'), 
          slug: 'mapreduce',
          description: locale === 'en' 
            ? 'Distributed processing paradigm for big data'
            : 'Paradigma de processamento distribuído para big data'
        },
        { 
          name: t(locale as Locale, 'dataEngineering.etl.windowFunctions'), 
          slug: 'window-functions',
          description: locale === 'en'
            ? 'SQL analytical functions for data aggregation'
            : 'Funções analíticas SQL para agregação de dados'
        },
        { 
          name: t(locale as Locale, 'dataEngineering.etl.partitioning'), 
          slug: 'partitioning',
          description: locale === 'en'
            ? 'Algorithms to divide large datasets efficiently'
            : 'Algoritmos para dividir grandes datasets eficientemente'
        },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t(locale as Locale, 'dataEngineering.distributed.title'),
      description: t(locale as Locale, 'dataEngineering.distributed.description'),
      icon: Cloud,
      algorithms: [
        { 
          name: t(locale as Locale, 'dataEngineering.distributed.hashing'), 
          slug: 'consistent-hashing',
          description: locale === 'en'
            ? 'Distribute data across nodes with minimal reshuffling'
            : 'Distribui dados entre nós com mínima reorganização'
        },
        { 
          name: t(locale as Locale, 'dataEngineering.distributed.bloomFilter'), 
          slug: 'bloom-filter',
          description: locale === 'en'
            ? 'Probabilistic data structure for membership testing'
            : 'Estrutura probabilística para teste de pertencimento'
        },
        { 
          name: t(locale as Locale, 'dataEngineering.distributed.compression'), 
          slug: 'compression',
          description: locale === 'en'
            ? 'Algorithms to reduce data storage requirements'
            : 'Algoritmos para reduzir requisitos de armazenamento'
        },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t(locale as Locale, 'dataEngineering.streaming.title'),
      description: t(locale as Locale, 'dataEngineering.streaming.description'),
      icon: Zap,
      algorithms: [
        { 
          name: t(locale as Locale, 'dataEngineering.streaming.slidingWindow'), 
          slug: 'sliding-window',
          description: locale === 'en'
            ? 'Process continuous data streams with time windows'
            : 'Processa streams contínuos com janelas de tempo'
        },
        { 
          name: t(locale as Locale, 'dataEngineering.streaming.eventTime'), 
          slug: 'event-time',
          description: locale === 'en'
            ? 'Handle out-of-order events in streaming systems'
            : 'Lida com eventos fora de ordem em sistemas de streaming'
        },
        { 
          name: t(locale as Locale, 'dataEngineering.streaming.watermarks'), 
          slug: 'watermarks',
          description: locale === 'en'
            ? 'Track progress in event time for late data handling'
            : 'Rastreia progresso no tempo de evento para dados atrasados'
        },
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
            {t(locale as Locale, 'dataEngineering.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'en'
              ? 'Master the algorithms and patterns that power modern data engineering systems'
              : 'Domine os algoritmos e padrões que alimentam sistemas modernos de engenharia de dados'
            }
          </p>
        </div>

        <div className="space-y-12">
          {algorithmCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-dark-800 rounded-xl p-8 border border-dark-700">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                    <p className="text-gray-400">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.algorithms.map((algorithm, algIndex) => (
                    <Link
                      key={algIndex}
                      href={`/${locale}/data-engineering/${algorithm.slug}`}
                      className="group bg-dark-700 rounded-lg p-6 hover:bg-dark-600 transition-all duration-300 border border-dark-600 hover:border-dark-500"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                          {algorithm.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {algorithm.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Algorithm Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800/30">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {locale === 'en' ? 'Start with MapReduce' : 'Comece com MapReduce'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {locale === 'en' 
                    ? 'The foundation of big data processing! MapReduce is the paradigm that powers systems like Hadoop and Spark. Learn how to break down massive datasets into manageable chunks.'
                    : 'A base do processamento de big data! MapReduce é o paradigma que alimenta sistemas como Hadoop e Spark. Aprenda como dividir datasets massivos em partes gerenciáveis.'
                  }
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Distributed' : 'Distribuído'}
                  </span>
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Fault Tolerant' : 'Tolerante a Falhas'}
                  </span>
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Scalable' : 'Escalável'}
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/3 flex justify-center">
                <Link
                  href={`/${locale}/data-engineering/mapreduce`}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>{locale === 'en' ? 'Explore MapReduce' : 'Explorar MapReduce'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Data Engineering Concepts Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {locale === 'en' ? 'Core Data Engineering Concepts' : 'Conceitos Fundamentais de Engenharia de Dados'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: locale === 'en' ? 'ETL Pipelines' : 'Pipelines ETL',
                description: locale === 'en' 
                  ? 'Extract, Transform, Load data processing workflows'
                  : 'Fluxos de processamento Extract, Transform, Load'
              },
              {
                icon: Hash,
                title: locale === 'en' ? 'Data Partitioning' : 'Particionamento',
                description: locale === 'en'
                  ? 'Distribute data across multiple nodes efficiently'
                  : 'Distribui dados entre múltiplos nós eficientemente'
              },
              {
                icon: Filter,
                title: locale === 'en' ? 'Data Deduplication' : 'Deduplicação',
                description: locale === 'en'
                  ? 'Remove duplicate records from large datasets'
                  : 'Remove registros duplicados de grandes datasets'
              },
              {
                icon: Zap,
                title: locale === 'en' ? 'Stream Processing' : 'Stream Processing',
                description: locale === 'en'
                  ? 'Process data in real-time as it arrives'
                  : 'Processa dados em tempo real conforme chegam'
              },
            ].map((concept, index) => {
              const Icon = concept.icon;
              return (
                <div key={index} className="bg-dark-800 rounded-lg p-6 border border-dark-700 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{concept.title}</h3>
                  <p className="text-sm text-gray-400">{concept.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
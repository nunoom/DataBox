import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, List, GitBranch } from 'lucide-react';
import { t, type Locale } from '@/lib/i18n';

interface DataStructuresPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function DataStructuresPage({ params }: DataStructuresPageProps) {
  const { locale } = await params;

  const dataStructureCategories = [
    {
      title: t(locale as Locale, 'dataStructures.linear.title'),
      description: locale === 'en' 
        ? 'Data structures where elements are arranged in a sequential manner'
        : 'Estruturas onde os elementos são organizados de forma sequencial',
      icon: List,
      structures: [
        { name: t(locale as Locale, 'dataStructures.linear.array'), slug: 'array', description: locale === 'en' ? 'Fixed-size sequential collection' : 'Coleção sequencial de tamanho fixo' },
        { name: t(locale as Locale, 'dataStructures.linear.linkedList'), slug: 'linked-list', description: locale === 'en' ? 'Dynamic linear collection with pointers' : 'Coleção linear dinâmica com ponteiros' },
        { name: t(locale as Locale, 'dataStructures.linear.stack'), slug: 'stack', description: locale === 'en' ? 'LIFO (Last In, First Out) structure' : 'Estrutura LIFO (Último a Entrar, Primeiro a Sair)' },
        { name: t(locale as Locale, 'dataStructures.linear.queue'), slug: 'queue', description: locale === 'en' ? 'FIFO (First In, First Out) structure' : 'Estrutura FIFO (Primeiro a Entrar, Primeiro a Sair)' },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t(locale as Locale, 'dataStructures.nonLinear.title'),
      description: locale === 'en'
        ? 'Data structures where elements are not arranged sequentially'
        : 'Estruturas onde os elementos não são organizados sequencialmente',
      icon: GitBranch,
      structures: [
        { name: t(locale as Locale, 'dataStructures.nonLinear.tree'), slug: 'binary-tree', description: locale === 'en' ? 'Hierarchical structure with parent-child relationships' : 'Estrutura hierárquica com relações pai-filho' },
        { name: t(locale as Locale, 'dataStructures.nonLinear.heap'), slug: 'heap', description: locale === 'en' ? 'Complete binary tree with heap property' : 'Árvore binária completa com propriedade de heap' },
        { name: t(locale as Locale, 'dataStructures.nonLinear.graph'), slug: 'graph', description: locale === 'en' ? 'Collection of vertices connected by edges' : 'Coleção de vértices conectados por arestas' },
        { name: t(locale as Locale, 'dataStructures.nonLinear.hashTable'), slug: 'hash-table', description: locale === 'en' ? 'Key-value pairs with hash function mapping' : 'Pares chave-valor com mapeamento por função hash' },
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
            {t(locale as Locale, 'dataStructures.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'en'
              ? 'Explore fundamental data structures used in computer science and data engineering'
              : 'Explore estruturas de dados fundamentais usadas em ciência da computação e engenharia de dados'
            }
          </p>
        </div>

        <div className="space-y-12">
          {dataStructureCategories.map((category, index) => {
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
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.structures.map((structure, structIndex) => (
                    <Link
                      key={structIndex}
                      href={`/${locale}/data-structures/${structure.slug}`}
                      className="group bg-dark-700 rounded-lg p-6 hover:bg-dark-600 transition-all duration-300 border border-dark-600 hover:border-dark-500"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                          {structure.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {structure.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Data Structure Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-800/30">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {locale === 'en' ? 'Start with Arrays' : 'Comece com Arrays'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {locale === 'en' 
                    ? 'Arrays are the foundation of most data structures. Understanding how they work, their memory layout, and operations will help you grasp more complex structures.'
                    : 'Arrays são a base da maioria das estruturas de dados. Entender como funcionam, seu layout de memória e operações ajudará você a compreender estruturas mais complexas.'
                  }
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Access: O(1)' : 'Acesso: O(1)'}
                  </span>
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Search: O(n)' : 'Busca: O(n)'}
                  </span>
                  <span className="bg-dark-700 px-3 py-1 rounded-full">
                    {locale === 'en' ? 'Insert: O(n)' : 'Inserção: O(n)'}
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/3 flex justify-center">
                <Link
                  href={`/${locale}/data-structures/array`}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>{locale === 'en' ? 'Explore Arrays' : 'Explorar Arrays'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {locale === 'en' ? 'Data Structure Comparison' : 'Comparação de Estruturas de Dados'}
          </h2>
          <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      {locale === 'en' ? 'Structure' : 'Estrutura'}
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold">
                      {locale === 'en' ? 'Access' : 'Acesso'}
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold">
                      {locale === 'en' ? 'Search' : 'Busca'}
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold">
                      {locale === 'en' ? 'Insert' : 'Inserção'}
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold">
                      {locale === 'en' ? 'Delete' : 'Remoção'}
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold">
                      {locale === 'en' ? 'Space' : 'Espaço'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {[
                    { name: 'Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
                    { name: 'Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
                    { name: 'Stack', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
                    { name: 'Queue', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
                    { name: 'Binary Tree', access: 'O(n)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
                    { name: 'Hash Table', access: 'N/A', search: 'O(1)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-dark-700/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{row.name}</td>
                      <td className="px-6 py-4 text-center text-gray-300 font-mono">{row.access}</td>
                      <td className="px-6 py-4 text-center text-gray-300 font-mono">{row.search}</td>
                      <td className="px-6 py-4 text-center text-gray-300 font-mono">{row.insert}</td>
                      <td className="px-6 py-4 text-center text-gray-300 font-mono">{row.delete}</td>
                      <td className="px-6 py-4 text-center text-gray-300 font-mono">{row.space}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
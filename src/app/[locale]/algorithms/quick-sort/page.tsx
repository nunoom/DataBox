import Navigation from '@/components/Navigation';
import SortingVisualizer from '@/components/SortingVisualizer';
import { ArrowLeft, Clock, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface QuickSortPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function QuickSortPage({ params }: QuickSortPageProps) {
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
          <span className="text-white">Quick Sort</span>
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
              Quick Sort
            </h1>
          </div>
          
          <p className="text-xl text-gray-400 max-w-4xl">
            {isPortuguese 
              ? 'Um algoritmo de ordenação eficiente que usa a estratégia "dividir para conquistar" para ordenar elementos.'
              : 'An efficient sorting algorithm that uses the "divide and conquer" strategy to sort elements.'
            }
          </p>
        </div>

        {/* Algorithm Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Complexidade de Tempo' : 'Time Complexity'}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Melhor caso:' : 'Best case:'}</span>
                <span className="text-green-400 font-mono">O(n log n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Caso médio:' : 'Average case:'}</span>
                <span className="text-yellow-400 font-mono">O(n log n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Pior caso:' : 'Worst case:'}</span>
                <span className="text-red-400 font-mono">O(n²)</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Complexidade de Espaço' : 'Space Complexity'}
              </h3>
            </div>
            <div className="text-center">
              <span className="text-2xl font-mono text-blue-400">O(log n)</span>
              <p className="text-sm text-gray-400 mt-2">
                {isPortuguese ? 'Devido à recursão' : 'Due to recursion'}
              </p>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Características' : 'Properties'}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Não estável' : 'Not stable'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'In-place' : 'In-place'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Dividir e conquistar' : 'Divide and conquer'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <SortingVisualizer algorithm="quick" locale={locale as Locale} />

        {/* Algorithm Explanation */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isPortuguese ? 'Como Funciona' : 'How It Works'}
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </div>
                <p>
                  {isPortuguese 
                    ? 'Escolha um elemento como "pivot" (geralmente o último elemento).'
                    : 'Choose an element as "pivot" (usually the last element).'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <p>
                  {isPortuguese 
                    ? 'Particione o array: elementos menores que o pivot à esquerda, maiores à direita.'
                    : 'Partition the array: elements smaller than pivot on left, larger on right.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <p>
                  {isPortuguese 
                    ? 'Coloque o pivot em sua posição final correta.'
                    : 'Place the pivot in its correct final position.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  4
                </div>
                <p>
                  {isPortuguese 
                    ? 'Recursivamente aplique o mesmo processo aos sub-arrays.'
                    : 'Recursively apply the same process to the sub-arrays.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isPortuguese ? 'Código de Exemplo' : 'Example Code'}
            </h2>
            <div className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array
    const pi = partition(arr, low, high);
    
    // Recursively sort elements
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-8 bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Quando Usar' : 'When to Use'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                {isPortuguese ? 'Bom para:' : 'Good for:'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Arrays grandes' : 'Large arrays'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Uso geral (padrão em muitas linguagens)' : 'General purpose (default in many languages)'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Quando memória é limitada' : 'When memory is limited'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Performance média excelente' : 'Excellent average performance'}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                {isPortuguese ? 'Cuidado com:' : 'Be careful with:'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <span>{isPortuguese ? 'Arrays já ordenados (pior caso)' : 'Already sorted arrays (worst case)'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <span>{isPortuguese ? 'Muitos elementos duplicados' : 'Many duplicate elements'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <span>{isPortuguese ? 'Quando estabilidade é necessária' : 'When stability is required'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <span>{isPortuguese ? 'Stack overflow em arrays muito grandes' : 'Stack overflow on very large arrays'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optimization Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Dicas de Otimização' : 'Optimization Tips'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                {isPortuguese ? 'Escolha do Pivot' : 'Pivot Selection'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• {isPortuguese ? 'Mediana de três elementos' : 'Median-of-three'}</li>
                <li>• {isPortuguese ? 'Pivot aleatório' : 'Random pivot'}</li>
                <li>• {isPortuguese ? 'Evitar primeiro/último em dados ordenados' : 'Avoid first/last on sorted data'}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                {isPortuguese ? 'Melhorias' : 'Improvements'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• {isPortuguese ? 'Insertion sort para arrays pequenos' : 'Insertion sort for small arrays'}</li>
                <li>• {isPortuguese ? 'Versão iterativa para evitar recursão' : 'Iterative version to avoid recursion'}</li>
                <li>• {isPortuguese ? 'Particionamento de 3 vias' : '3-way partitioning'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
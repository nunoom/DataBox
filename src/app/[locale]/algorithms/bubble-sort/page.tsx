import Navigation from '@/components/Navigation';
import SortingVisualizer from '@/components/SortingVisualizer';
import { ArrowLeft, Clock, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface BubbleSortPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BubbleSortPage({ params }: BubbleSortPageProps) {
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
          <span className="text-white">Bubble Sort</span>
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
              Bubble Sort
            </h1>
          </div>
          
          <p className="text-xl text-gray-400 max-w-4xl">
            {isPortuguese 
              ? 'Um algoritmo de ordenação simples que compara repetidamente elementos adjacentes e os troca se estiverem na ordem errada.'
              : 'A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order.'
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
                <span className="text-green-400 font-mono">O(n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Caso médio:' : 'Average case:'}</span>
                <span className="text-yellow-400 font-mono">O(n²)</span>
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
              <span className="text-2xl font-mono text-blue-400">O(1)</span>
              <p className="text-sm text-gray-400 mt-2">
                {isPortuguese ? 'Espaço constante' : 'Constant space'}
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
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Estável' : 'Stable'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'In-place' : 'In-place'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Adaptativo' : 'Adaptive'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <SortingVisualizer algorithm="bubble" locale={locale as Locale} />

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
                    ? 'Compare elementos adjacentes no array, começando do primeiro elemento.'
                    : 'Compare adjacent elements in the array, starting from the first element.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <p>
                  {isPortuguese 
                    ? 'Se o primeiro elemento for maior que o segundo, troque-os de posição.'
                    : 'If the first element is greater than the second, swap their positions.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <p>
                  {isPortuguese 
                    ? 'Continue este processo para todos os pares adjacentes no array.'
                    : 'Continue this process for all adjacent pairs in the array.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  4
                </div>
                <p>
                  {isPortuguese 
                    ? 'Repita o processo até que nenhuma troca seja necessária.'
                    : 'Repeat the process until no swaps are needed.'
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
                <code>{`function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
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
                  <span>{isPortuguese ? 'Aprendizado e ensino' : 'Learning and teaching'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Arrays pequenos (< 50 elementos)' : 'Small arrays (< 50 elements)'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Quando simplicidade é prioridade' : 'When simplicity is priority'}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                {isPortuguese ? 'Evitar para:' : 'Avoid for:'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <span>{isPortuguese ? 'Arrays grandes' : 'Large arrays'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <span>{isPortuguese ? 'Aplicações críticas de performance' : 'Performance-critical applications'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <span>{isPortuguese ? 'Sistemas de produção' : 'Production systems'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
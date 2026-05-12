import Navigation from '@/components/Navigation';
import { ArrowLeft, Clock, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface ArrayPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ArrayPage({ params }: ArrayPageProps) {
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
          <span className="text-white">Array</span>
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
              Array
            </h1>
          </div>
          
          <p className="text-xl text-gray-400 max-w-4xl">
            {isPortuguese 
              ? 'Uma estrutura de dados fundamental que armazena elementos em posições contíguas de memória.'
              : 'A fundamental data structure that stores elements in contiguous memory locations.'
            }
          </p>
        </div>

        {/* Array Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Complexidade de Tempo' : 'Time Complexity'}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Acesso:' : 'Access:'}</span>
                <span className="text-green-400 font-mono">O(1)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Busca:' : 'Search:'}</span>
                <span className="text-yellow-400 font-mono">O(n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Inserção:' : 'Insertion:'}</span>
                <span className="text-red-400 font-mono">O(n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Remoção:' : 'Deletion:'}</span>
                <span className="text-red-400 font-mono">O(n)</span>
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
              <span className="text-2xl font-mono text-blue-400">O(n)</span>
              <p className="text-sm text-gray-400 mt-2">
                {isPortuguese ? 'Linear com o tamanho' : 'Linear with size'}
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
                <span className="text-gray-300">{isPortuguese ? 'Acesso direto' : 'Direct access'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Cache-friendly' : 'Cache-friendly'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Tamanho fixo' : 'Fixed size'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Representação Visual' : 'Visual Representation'}
          </h2>
          <div className="bg-dark-900 rounded-lg p-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[10, 25, 30, 45, 50].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                    {value}
                  </div>
                  <span className="text-xs text-gray-400">[{index}]</span>
                </div>
              ))}
            </div>
            <div className="text-center text-gray-400 text-sm">
              {isPortuguese ? 'Índices: 0, 1, 2, 3, 4' : 'Indices: 0, 1, 2, 3, 4'}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Exemplo de Código' : 'Code Example'}
          </h2>
          <div className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`// Creating an array
const numbers = [10, 25, 30, 45, 50];

// Accessing elements - O(1)
console.log(numbers[0]); // 10
console.log(numbers[2]); // 30

// Searching for an element - O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

// Inserting at the end - O(1) for dynamic arrays
numbers.push(60);

// Inserting at the beginning - O(n)
numbers.unshift(5);

// Removing from the end - O(1)
numbers.pop();

// Removing from the beginning - O(n)
numbers.shift();`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
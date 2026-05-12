import Navigation from '@/components/Navigation';
import MapReduceVisualizer from '@/components/MapReduceVisualizer';
import { ArrowLeft, Clock, Zap, CheckCircle, Database, Cloud } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface MapReducePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function MapReducePage({ params }: MapReducePageProps) {
  const { locale } = await params;
  const isPortuguese = locale === 'pt';

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href={`/${locale}/data-engineering`} className="hover:text-white transition-colors">
            {isPortuguese ? 'Engenharia de Dados' : 'Data Engineering'}
          </Link>
          <span>/</span>
          <span className="text-white">MapReduce</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/${locale}/data-engineering`}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              MapReduce
            </h1>
          </div>
          
          <p className="text-xl text-gray-400 max-w-4xl">
            {isPortuguese 
              ? 'Paradigma de programação para processamento distribuído de grandes volumes de dados em clusters de computadores.'
              : 'Programming paradigm for distributed processing of large datasets across clusters of computers.'
            }
          </p>
        </div>

        {/* Algorithm Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Complexidade' : 'Complexity'}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Map:' : 'Map:'}</span>
                <span className="text-green-400 font-mono">O(n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Reduce:' : 'Reduce:'}</span>
                <span className="text-blue-400 font-mono">O(k log k)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{isPortuguese ? 'Total:' : 'Total:'}</span>
                <span className="text-yellow-400 font-mono">O(n + k log k)</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Escalabilidade' : 'Scalability'}
              </h3>
            </div>
            <div className="text-center">
              <span className="text-2xl font-mono text-green-400">Horizontal</span>
              <p className="text-sm text-gray-400 mt-2">
                {isPortuguese ? 'Adicione mais nós' : 'Add more nodes'}
              </p>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                {isPortuguese ? 'Características' : 'Properties'}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Tolerante a falhas' : 'Fault tolerant'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Distribuído' : 'Distributed'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{isPortuguese ? 'Paralelo' : 'Parallel'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <MapReduceVisualizer locale={locale as Locale} />

        {/* Algorithm Explanation */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isPortuguese ? 'Como Funciona' : 'How It Works'}
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {isPortuguese ? 'Divisão (Split)' : 'Split'}
                  </h4>
                  <p className="text-sm">
                    {isPortuguese 
                      ? 'Os dados de entrada são divididos em chunks menores para processamento paralelo.'
                      : 'Input data is split into smaller chunks for parallel processing.'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {isPortuguese ? 'Mapeamento (Map)' : 'Map'}
                  </h4>
                  <p className="text-sm">
                    {isPortuguese 
                      ? 'Cada chunk é processado independentemente, gerando pares chave-valor.'
                      : 'Each chunk is processed independently, generating key-value pairs.'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {isPortuguese ? 'Embaralhamento (Shuffle)' : 'Shuffle'}
                  </h4>
                  <p className="text-sm">
                    {isPortuguese 
                      ? 'Os pares chave-valor são agrupados por chave e distribuídos para os reducers.'
                      : 'Key-value pairs are grouped by key and distributed to reducers.'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {isPortuguese ? 'Redução (Reduce)' : 'Reduce'}
                  </h4>
                  <p className="text-sm">
                    {isPortuguese 
                      ? 'Valores com a mesma chave são combinados para produzir o resultado final.'
                      : 'Values with the same key are combined to produce the final result.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isPortuguese ? 'Exemplo de Código' : 'Code Example'}
            </h2>
            <div className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`// Map function - Word Count
function map(document) {
  const words = document.split(' ');
  const results = [];
  
  words.forEach(word => {
    results.push({
      key: word.toLowerCase(),
      value: 1
    });
  });
  
  return results;
}

// Reduce function - Sum counts
function reduce(key, values) {
  let sum = 0;
  
  values.forEach(value => {
    sum += value;
  });
  
  return {
    key: key,
    value: sum
  };
}

// Example usage
const documents = [
  "hello world hello",
  "world of data",
  "hello data world"
];

// Map phase
const mapResults = documents
  .flatMap(doc => map(doc));

// Shuffle phase (group by key)
const grouped = groupByKey(mapResults);

// Reduce phase
const finalResults = Object.keys(grouped)
  .map(key => reduce(key, grouped[key]));`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-8 bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Casos de Uso em Data Engineering' : 'Data Engineering Use Cases'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                {isPortuguese ? 'Aplicações Comuns:' : 'Common Applications:'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Processamento de logs' : 'Log processing'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Agregações em larga escala' : 'Large-scale aggregations'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'ETL de big data' : 'Big data ETL'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span>{isPortuguese ? 'Análise de clickstream' : 'Clickstream analysis'}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                {isPortuguese ? 'Ferramentas que Usam:' : 'Tools That Use It:'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span>Apache Hadoop</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span>Apache Spark</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span>Google Cloud Dataflow</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <span>Amazon EMR</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isPortuguese ? 'Dicas de Otimização' : 'Optimization Tips'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                {isPortuguese ? 'Fase Map' : 'Map Phase'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• {isPortuguese ? 'Minimize I/O durante o mapeamento' : 'Minimize I/O during mapping'}</li>
                <li>• {isPortuguese ? 'Use combiners quando possível' : 'Use combiners when possible'}</li>
                <li>• {isPortuguese ? 'Otimize o tamanho dos chunks' : 'Optimize chunk size'}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                {isPortuguese ? 'Fase Reduce' : 'Reduce Phase'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• {isPortuguese ? 'Balance a carga entre reducers' : 'Balance load across reducers'}</li>
                <li>• {isPortuguese ? 'Use particionamento inteligente' : 'Use smart partitioning'}</li>
                <li>• {isPortuguese ? 'Considere múltiplos estágios' : 'Consider multiple stages'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
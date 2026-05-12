'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t, type Locale } from '@/lib/i18n';

interface MapReduceVisualizerProps {
  locale?: Locale;
}

interface DataChunk {
  id: number;
  data: string[];
  isProcessing?: boolean;
  isCompleted?: boolean;
}

interface MapResult {
  key: string;
  value: number;
  chunkId: number;
}

interface ReduceResult {
  key: string;
  totalCount: number;
}

export default function MapReduceVisualizer({ locale = 'en' }: MapReduceVisualizerProps) {
  const [inputData, setInputData] = useState<string[]>([]);
  const [chunks, setChunks] = useState<DataChunk[]>([]);
  const [mapResults, setMapResults] = useState<MapResult[]>([]);
  const [reduceResults, setReduceResults] = useState<ReduceResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'input' | 'map' | 'shuffle' | 'reduce' | 'complete'>('input');
  const [speed, setSpeed] = useState(50);

  // Sample data - word count example
  const sampleTexts = [
    "the quick brown fox jumps over the lazy dog",
    "hello world hello universe hello everyone",
    "data engineering is fun data science is cool",
    "apache spark apache hadoop apache kafka",
    "big data small data fast data slow data"
  ];

  const generateData = () => {
    const selectedTexts = sampleTexts.slice(0, 3);
    const allWords = selectedTexts.join(' ').split(' ');
    setInputData(allWords);
    
    // Split into chunks
    const chunkSize = Math.ceil(allWords.length / 3);
    const newChunks: DataChunk[] = [];
    for (let i = 0; i < allWords.length; i += chunkSize) {
      newChunks.push({
        id: newChunks.length,
        data: allWords.slice(i, i + chunkSize),
        isProcessing: false,
        isCompleted: false,
      });
    }
    setChunks(newChunks);
    setMapResults([]);
    setReduceResults([]);
    setCurrentPhase('input');
  };

  useEffect(() => {
    generateData();
  }, []);

  const runMapReduce = async () => {
    setIsPlaying(true);
    setCurrentPhase('map');

    // Map Phase
    const allMapResults: MapResult[] = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      // Mark chunk as processing
      setChunks(prev => prev.map(c => 
        c.id === chunk.id ? { ...c, isProcessing: true } : c
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1000 - speed * 18));
      
      // Process chunk (word count)
      const chunkResults: MapResult[] = [];
      chunk.data.forEach(word => {
        chunkResults.push({
          key: word,
          value: 1,
          chunkId: chunk.id
        });
      });
      
      allMapResults.push(...chunkResults);
      setMapResults([...allMapResults]);
      
      // Mark chunk as completed
      setChunks(prev => prev.map(c => 
        c.id === chunk.id ? { ...c, isProcessing: false, isCompleted: true } : c
      ));
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Shuffle Phase
    setCurrentPhase('shuffle');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Reduce Phase
    setCurrentPhase('reduce');
    
    // Group by key and sum values
    const grouped = allMapResults.reduce((acc, result) => {
      if (!acc[result.key]) {
        acc[result.key] = 0;
      }
      acc[result.key] += result.value;
      return acc;
    }, {} as Record<string, number>);

    const finalResults: ReduceResult[] = Object.entries(grouped).map(([key, count]) => ({
      key,
      totalCount: count
    }));

    setReduceResults(finalResults);
    setCurrentPhase('complete');
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    generateData();
  };

  const getPhaseDescription = () => {
    const descriptions = {
      input: locale === 'en' 
        ? 'Input data is split into chunks for parallel processing'
        : 'Dados de entrada são divididos em chunks para processamento paralelo',
      map: locale === 'en'
        ? 'Each chunk is processed independently to extract key-value pairs'
        : 'Cada chunk é processado independentemente para extrair pares chave-valor',
      shuffle: locale === 'en'
        ? 'Results are shuffled and grouped by key for the reduce phase'
        : 'Resultados são embaralhados e agrupados por chave para a fase reduce',
      reduce: locale === 'en'
        ? 'Values with the same key are combined to produce final results'
        : 'Valores com a mesma chave são combinados para produzir resultados finais',
      complete: locale === 'en'
        ? 'MapReduce job completed successfully!'
        : 'Job MapReduce completado com sucesso!'
    };
    return descriptions[currentPhase];
  };

  return (
    <div className="bg-dark-800 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">MapReduce - Word Count</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>{locale === 'en' ? 'Phase:' : 'Fase:'} <span className="text-primary-400 capitalize">{currentPhase}</span></span>
            <span>{locale === 'en' ? 'Input Size:' : 'Tamanho da Entrada:'} {inputData.length} words</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          <button
            onClick={runMapReduce}
            disabled={isPlaying || currentPhase === 'complete'}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{locale === 'en' ? 'Run MapReduce' : 'Executar MapReduce'}</span>
          </button>
          
          <button
            onClick={reset}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t(locale, 'visualization.reset')}</span>
          </button>
          
          <button
            onClick={generateData}
            disabled={isPlaying}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>{t(locale, 'visualization.generate')}</span>
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="flex items-center space-x-2 mb-6">
        <label className="text-sm text-gray-400">{t(locale, 'visualization.speed')}:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isPlaying}
          className="w-24"
        />
        <span className="text-sm text-gray-400 w-8">{speed}</span>
      </div>

      {/* Phase Description */}
      <div className="bg-dark-900 rounded-lg p-4 mb-6">
        <p className="text-gray-300 text-center">{getPhaseDescription()}</p>
      </div>

      {/* Visualization */}
      <div className="space-y-8">
        {/* Input Data */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {locale === 'en' ? 'Input Data' : 'Dados de Entrada'}
          </h3>
          <div className="bg-dark-900 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {inputData.slice(0, 20).map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
                >
                  {word}
                </span>
              ))}
              {inputData.length > 20 && (
                <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded text-sm">
                  +{inputData.length - 20} more...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Map Phase */}
        {chunks.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {locale === 'en' ? 'Map Phase - Data Chunks' : 'Fase Map - Chunks de Dados'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {chunks.map((chunk) => (
                <div
                  key={chunk.id}
                  className={`bg-dark-900 rounded-lg p-4 border-2 transition-all duration-300 ${
                    chunk.isProcessing
                      ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
                      : chunk.isCompleted
                      ? 'border-green-500 shadow-lg shadow-green-500/20'
                      : 'border-dark-700'
                  }`}
                >
                  <h4 className="text-white font-medium mb-2">Chunk {chunk.id + 1}</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {chunk.data.slice(0, 8).map((word, index) => (
                      <div key={index} className="text-sm text-gray-400">
                        {word} → ('{word}', 1)
                      </div>
                    ))}
                    {chunk.data.length > 8 && (
                      <div className="text-sm text-gray-500">
                        +{chunk.data.length - 8} more...
                      </div>
                    )}
                  </div>
                  {chunk.isProcessing && (
                    <div className="mt-2 text-yellow-400 text-sm animate-pulse">
                      {locale === 'en' ? 'Processing...' : 'Processando...'}
                    </div>
                  )}
                  {chunk.isCompleted && (
                    <div className="mt-2 text-green-400 text-sm">
                      ✓ {locale === 'en' ? 'Completed' : 'Concluído'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reduce Results */}
        {reduceResults.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {locale === 'en' ? 'Reduce Phase - Final Results' : 'Fase Reduce - Resultados Finais'}
            </h3>
            <div className="bg-dark-900 rounded-lg p-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {reduceResults
                  .sort((a, b) => b.totalCount - a.totalCount)
                  .map((result, index) => (
                    <div
                      key={result.key}
                      className="bg-dark-800 rounded-lg p-3 border border-dark-600 hover:border-primary-500 transition-colors"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeIn 0.5s ease-in-out forwards'
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium text-sm">'{result.key}'</span>
                        <span className="text-primary-400 font-bold text-lg">{result.totalCount}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-dark-700 rounded"></div>
          <span className="text-gray-400">{locale === 'en' ? 'Waiting' : 'Aguardando'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-yellow-500 rounded"></div>
          <span className="text-gray-400">{locale === 'en' ? 'Processing' : 'Processando'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
          <span className="text-gray-400">{locale === 'en' ? 'Completed' : 'Concluído'}</span>
        </div>
      </div>
    </div>
  );
}
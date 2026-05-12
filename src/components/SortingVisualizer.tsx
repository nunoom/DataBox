'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { t, type Locale } from '@/lib/i18n';

interface SortingVisualizerProps {
  algorithm: 'bubble' | 'quick' | 'merge' | 'heap';
  locale?: Locale;
}

interface ArrayElement {
  value: number;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
}

export default function SortingVisualizer({ algorithm, locale = 'en' }: SortingVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 400) + 10,
        isComparing: false,
        isSwapping: false,
        isSorted: false,
      });
    }
    setArray(newArray);
    setCurrentStep(0);
    setTotalSteps(0);
  }, [arraySize]);

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let steps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isPlaying) return;

        // Highlight comparing elements
        arr[j].isComparing = true;
        arr[j + 1].isComparing = true;
        setArray([...arr]);
        setCurrentStep(steps++);
        
        await new Promise(resolve => setTimeout(resolve, 1000 - speed * 9));

        if (arr[j].value > arr[j + 1].value) {
          // Highlight swapping elements
          arr[j].isSwapping = true;
          arr[j + 1].isSwapping = true;
          setArray([...arr]);
          
          await new Promise(resolve => setTimeout(resolve, 200));

          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }

        // Reset highlighting
        arr[j].isComparing = false;
        arr[j + 1].isComparing = false;
        arr[j].isSwapping = false;
        arr[j + 1].isSwapping = false;
        setArray([...arr]);
      }
      // Mark as sorted
      arr[n - 1 - i].isSorted = true;
    }
    arr[0].isSorted = true;
    setArray([...arr]);
    setTotalSteps(steps);
    setIsPlaying(false);
  };

  // Quick Sort Algorithm (simplified visualization)
  const quickSort = async () => {
    const arr = [...array];
    let steps = 0;

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high].value;
      let i = low - 1;

      arr[high].isComparing = true;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 1000 - speed * 9));

      for (let j = low; j < high; j++) {
        arr[j].isComparing = true;
        setArray([...arr]);
        setCurrentStep(steps++);
        await new Promise(resolve => setTimeout(resolve, 1000 - speed * 9));

        if (arr[j].value < pivot) {
          i++;
          if (i !== j) {
            arr[i].isSwapping = true;
            arr[j].isSwapping = true;
            setArray([...arr]);
            await new Promise(resolve => setTimeout(resolve, 200));
            
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }

        arr[j].isComparing = false;
        if (i >= 0) arr[i].isSwapping = false;
        arr[j].isSwapping = false;
        setArray([...arr]);
      }

      arr[high].isSwapping = true;
      arr[i + 1].isSwapping = true;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 200));

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      
      arr[high].isComparing = false;
      arr[i + 1].isSwapping = false;
      arr[high].isSwapping = false;
      arr[i + 1].isSorted = true;
      setArray([...arr]);

      return i + 1;
    };

    const quickSortHelper = async (low: number, high: number) => {
      if (low < high && isPlaying) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    
    // Mark all as sorted
    arr.forEach(element => element.isSorted = true);
    setArray([...arr]);
    setTotalSteps(steps);
    setIsPlaying(false);
  };

  const startSorting = () => {
    setIsPlaying(true);
    switch (algorithm) {
      case 'bubble':
        bubbleSort();
        break;
      case 'quick':
        quickSort();
        break;
      case 'merge':
        // Implement merge sort
        break;
      case 'heap':
        // Implement heap sort
        break;
    }
  };

  const pauseSorting = () => {
    setIsPlaying(false);
  };

  const resetArray = () => {
    setIsPlaying(false);
    generateArray();
  };

  const getAlgorithmName = () => {
    const names = {
      bubble: 'Bubble Sort',
      quick: 'Quick Sort',
      merge: 'Merge Sort',
      heap: 'Heap Sort',
    };
    return names[algorithm];
  };

  const getComplexity = () => {
    const complexities = {
      bubble: { time: 'O(n²)', space: 'O(1)' },
      quick: { time: 'O(n log n)', space: 'O(log n)' },
      merge: { time: 'O(n log n)', space: 'O(n)' },
      heap: { time: 'O(n log n)', space: 'O(1)' },
    };
    return complexities[algorithm];
  };

  return (
    <div className="bg-dark-800 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{getAlgorithmName()}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>{t(locale, 'visualization.complexity')}: {getComplexity().time}</span>
            <span>{t(locale, 'visualization.spaceComplexity')}: {getComplexity().space}</span>
            <span>Step: {currentStep}/{totalSteps || '?'}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          <button
            onClick={isPlaying ? pauseSorting : startSorting}
            disabled={array.every(el => el.isSorted)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? t(locale, 'visualization.pause') : t(locale, 'visualization.play')}</span>
          </button>
          
          <button
            onClick={resetArray}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t(locale, 'visualization.reset')}</span>
          </button>
          
          <button
            onClick={generateArray}
            disabled={isPlaying}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>{t(locale, 'visualization.generate')}</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2">
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
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-400">Size:</label>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isPlaying}
            className="w-24"
          />
          <span className="text-sm text-gray-400 w-8">{arraySize}</span>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="bg-dark-900 rounded-lg p-4 min-h-[400px] flex items-end justify-center overflow-x-auto">
        <div className="flex items-end space-x-1 min-w-full justify-center">
          {array.map((element, index) => (
            <div
              key={index}
              className={`transition-colors duration-200 rounded-t ${
                element.isSorted
                  ? 'bg-green-500'
                  : element.isSwapping
                  ? 'bg-red-500'
                  : element.isComparing
                  ? 'bg-yellow-500'
                  : 'bg-primary-500'
              }`}
              style={{
                height: `${Math.max(element.value, 20)}px`,
                width: `${Math.max(Math.floor(600 / arraySize), 4)}px`,
                minWidth: '4px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-500 rounded"></div>
          <span className="text-gray-400">Default</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-400">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-400">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-400">Sorted</span>
        </div>
      </div>
    </div>
  );
}
/**
 * Central, bilingual content registry.
 *
 * Every listing page and every detail page is generated from this data,
 * so there are no hand-written "coming soon" stubs and no broken links:
 * if a topic is listed, it has a page; if it has a `visualizer`, that page
 * renders a working interactive representation.
 */

export type Section = 'algorithms' | 'data-structures' | 'data-engineering';
export type Tone = 'good' | 'warn' | 'bad' | 'info';

export interface Bi {
  en: string;
  pt: string;
}

export interface ComplexityRow {
  label: Bi;
  value: string;
  tone?: Tone;
}

export interface Property {
  label: Bi;
  tone: Tone;
}

export interface Step {
  text: Bi;
}

export interface UseCaseList {
  title: Bi;
  tone: Tone;
  items: Bi[];
}

export interface Topic {
  slug: string;
  section: Section;
  category: string;
  icon: string;
  accent: string;
  title: Bi;
  tagline: Bi;
  description: Bi;
  /** id understood by the visualizer dispatcher, e.g. "sorting:bubble" */
  visualizer?: string;
  complexity: ComplexityRow[];
  space?: { value: string; note: Bi };
  properties: Property[];
  steps: Step[];
  code?: { lang: string; source: string };
  useCases?: UseCaseList[];
  applications?: Bi[];
}

export interface CategoryMeta {
  key: string;
  section: Section;
  title: Bi;
  description: Bi;
  icon: string;
  accent: string;
}

/* ------------------------------------------------------------------ */
/* Category metadata (used to group topics on the listing pages)       */
/* ------------------------------------------------------------------ */

export const categories: CategoryMeta[] = [
  {
    key: 'sorting',
    section: 'algorithms',
    title: { en: 'Sorting', pt: 'Ordenação' },
    description: {
      en: 'Arrange elements in order — the foundation of efficient querying.',
      pt: 'Organizar elementos em ordem — a base de consultas eficientes.',
    },
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    key: 'search',
    section: 'algorithms',
    title: { en: 'Searching', pt: 'Busca' },
    description: {
      en: 'Find elements inside a collection as fast as possible.',
      pt: 'Encontrar elementos numa coleção o mais rápido possível.',
    },
    icon: 'Search',
    accent: 'from-emerald-500 to-green-500',
  },
  {
    key: 'graph',
    section: 'algorithms',
    title: { en: 'Graphs', pt: 'Grafos' },
    description: {
      en: 'Traverse networks and find shortest paths between nodes.',
      pt: 'Percorrer redes e encontrar caminhos mais curtos entre nós.',
    },
    icon: 'GitBranch',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    key: 'linear',
    section: 'data-structures',
    title: { en: 'Linear Structures', pt: 'Estruturas Lineares' },
    description: {
      en: 'Elements arranged sequentially, one after another.',
      pt: 'Elementos organizados sequencialmente, um após o outro.',
    },
    icon: 'List',
    accent: 'from-sky-500 to-blue-500',
  },
  {
    key: 'non-linear',
    section: 'data-structures',
    title: { en: 'Non-Linear Structures', pt: 'Estruturas Não-Lineares' },
    description: {
      en: 'Hierarchical and networked layouts for fast lookups.',
      pt: 'Estruturas hierárquicas e em rede para buscas rápidas.',
    },
    icon: 'Network',
    accent: 'from-purple-500 to-pink-500',
  },
  {
    key: 'etl',
    section: 'data-engineering',
    title: { en: 'ETL & Processing', pt: 'ETL & Processamento' },
    description: {
      en: 'Extract, transform and load patterns at scale.',
      pt: 'Padrões de extração, transformação e carga em escala.',
    },
    icon: 'Database',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'distributed',
    section: 'data-engineering',
    title: { en: 'Distributed Systems', pt: 'Sistemas Distribuídos' },
    description: {
      en: 'Spread data across many machines reliably.',
      pt: 'Distribuir dados por muitas máquinas de forma fiável.',
    },
    icon: 'Cloud',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'streaming',
    section: 'data-engineering',
    title: { en: 'Stream Processing', pt: 'Processamento de Streams' },
    description: {
      en: 'Compute over unbounded, real-time data.',
      pt: 'Computar sobre dados ilimitados em tempo real.',
    },
    icon: 'Zap',
    accent: 'from-amber-500 to-orange-500',
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers to keep the topic list readable                       */
/* ------------------------------------------------------------------ */

const bestAvgWorst = (
  best: string,
  avg: string,
  worst: string
): ComplexityRow[] => [
  { label: { en: 'Best', pt: 'Melhor caso' }, value: best, tone: 'good' },
  { label: { en: 'Average', pt: 'Caso médio' }, value: avg, tone: 'warn' },
  { label: { en: 'Worst', pt: 'Pior caso' }, value: worst, tone: 'bad' },
];

/* ------------------------------------------------------------------ */
/* The topics                                                          */
/* ------------------------------------------------------------------ */

export const topics: Topic[] = [
  /* ============================ SORTING ============================ */
  {
    slug: 'bubble-sort',
    section: 'algorithms',
    category: 'sorting',
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
    title: { en: 'Bubble Sort', pt: 'Bubble Sort' },
    tagline: {
      en: 'Repeatedly swap adjacent out-of-order pairs.',
      pt: 'Troca repetidamente pares adjacentes fora de ordem.',
    },
    description: {
      en: 'A simple comparison sort that walks the array swapping neighbours until everything is in order. Great for teaching; poor for production.',
      pt: 'Uma ordenação por comparação simples que percorre o array trocando vizinhos até tudo ficar ordenado. Ótimo para ensinar; mau para produção.',
    },
    visualizer: 'sorting:bubble',
    complexity: bestAvgWorst('O(n)', 'O(n²)', 'O(n²)'),
    space: { value: 'O(1)', note: { en: 'In-place', pt: 'In-place' } },
    properties: [
      { label: { en: 'Stable', pt: 'Estável' }, tone: 'good' },
      { label: { en: 'In-place', pt: 'In-place' }, tone: 'good' },
      { label: { en: 'Adaptive', pt: 'Adaptativo' }, tone: 'warn' },
    ],
    steps: [
      { text: { en: 'Compare each pair of adjacent elements.', pt: 'Compara cada par de elementos adjacentes.' } },
      { text: { en: 'Swap them if the left one is larger.', pt: 'Troca-os se o da esquerda for maior.' } },
      { text: { en: 'After each pass the largest value "bubbles" to the end.', pt: 'A cada passagem o maior valor "borbulha" para o fim.' } },
      { text: { en: 'Stop early when a full pass makes no swaps.', pt: 'Para mais cedo quando uma passagem não faz trocas.' } },
    ],
    code: {
      lang: 'js',
      source: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted
  }
  return arr;
}`,
    },
    useCases: [
      {
        title: { en: 'Good for', pt: 'Bom para' },
        tone: 'good',
        items: [
          { en: 'Learning and teaching', pt: 'Aprendizagem e ensino' },
          { en: 'Tiny or nearly-sorted arrays', pt: 'Arrays minúsculos ou quase ordenados' },
        ],
      },
      {
        title: { en: 'Avoid for', pt: 'Evitar para' },
        tone: 'bad',
        items: [
          { en: 'Large datasets', pt: 'Conjuntos de dados grandes' },
          { en: 'Performance-critical code', pt: 'Código crítico de desempenho' },
        ],
      },
    ],
  },
  {
    slug: 'selection-sort',
    section: 'algorithms',
    category: 'sorting',
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
    title: { en: 'Selection Sort', pt: 'Selection Sort' },
    tagline: {
      en: 'Select the minimum and place it at the front.',
      pt: 'Seleciona o mínimo e coloca-o no início.',
    },
    description: {
      en: 'Finds the smallest remaining element and swaps it into place. Always O(n²) but performs the fewest swaps of the simple sorts.',
      pt: 'Encontra o menor elemento restante e troca-o para a posição. Sempre O(n²), mas faz o menor número de trocas entre os algoritmos simples.',
    },
    visualizer: 'sorting:selection',
    complexity: bestAvgWorst('O(n²)', 'O(n²)', 'O(n²)'),
    space: { value: 'O(1)', note: { en: 'In-place', pt: 'In-place' } },
    properties: [
      { label: { en: 'Not stable', pt: 'Não estável' }, tone: 'bad' },
      { label: { en: 'In-place', pt: 'In-place' }, tone: 'good' },
      { label: { en: 'Few swaps', pt: 'Poucas trocas' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Scan the unsorted part for the minimum value.', pt: 'Percorre a parte não ordenada à procura do mínimo.' } },
      { text: { en: 'Swap it with the first unsorted position.', pt: 'Troca-o com a primeira posição não ordenada.' } },
      { text: { en: 'Grow the sorted prefix by one and repeat.', pt: 'Aumenta o prefixo ordenado em um e repete.' } },
    ],
    code: {
      lang: 'js',
      source: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}`,
    },
  },
  {
    slug: 'insertion-sort',
    section: 'algorithms',
    category: 'sorting',
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
    title: { en: 'Insertion Sort', pt: 'Insertion Sort' },
    tagline: {
      en: 'Build a sorted prefix one card at a time.',
      pt: 'Constrói um prefixo ordenado carta a carta.',
    },
    description: {
      en: 'Inserts each element into its correct spot among the already-sorted ones, like sorting a hand of cards. Excellent on small or nearly-sorted data.',
      pt: 'Insere cada elemento na posição correta entre os já ordenados, como ordenar cartas na mão. Excelente em dados pequenos ou quase ordenados.',
    },
    visualizer: 'sorting:insertion',
    complexity: bestAvgWorst('O(n)', 'O(n²)', 'O(n²)'),
    space: { value: 'O(1)', note: { en: 'In-place', pt: 'In-place' } },
    properties: [
      { label: { en: 'Stable', pt: 'Estável' }, tone: 'good' },
      { label: { en: 'In-place', pt: 'In-place' }, tone: 'good' },
      { label: { en: 'Adaptive', pt: 'Adaptativo' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Take the next element (the "key").', pt: 'Pega no próximo elemento (a "chave").' } },
      { text: { en: 'Shift larger sorted elements one slot right.', pt: 'Desloca os elementos ordenados maiores uma posição à direita.' } },
      { text: { en: 'Drop the key into the gap that opened up.', pt: 'Coloca a chave no espaço aberto.' } },
    ],
    code: {
      lang: 'js',
      source: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    },
  },
  {
    slug: 'merge-sort',
    section: 'algorithms',
    category: 'sorting',
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
    title: { en: 'Merge Sort', pt: 'Merge Sort' },
    tagline: {
      en: 'Divide, sort halves, then merge them.',
      pt: 'Divide, ordena metades e depois junta-as.',
    },
    description: {
      en: 'A stable divide-and-conquer sort that splits the array, sorts each half, then merges them in linear time. Guaranteed O(n log n).',
      pt: 'Uma ordenação estável dividir-para-conquistar que parte o array, ordena cada metade e junta-as em tempo linear. Garante O(n log n).',
    },
    visualizer: 'sorting:merge',
    complexity: bestAvgWorst('O(n log n)', 'O(n log n)', 'O(n log n)'),
    space: { value: 'O(n)', note: { en: 'Needs auxiliary array', pt: 'Precisa de array auxiliar' } },
    properties: [
      { label: { en: 'Stable', pt: 'Estável' }, tone: 'good' },
      { label: { en: 'Not in-place', pt: 'Não in-place' }, tone: 'warn' },
      { label: { en: 'Divide & conquer', pt: 'Dividir e conquistar' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Split the array into two halves.', pt: 'Divide o array em duas metades.' } },
      { text: { en: 'Recursively sort each half.', pt: 'Ordena recursivamente cada metade.' } },
      { text: { en: 'Merge the two sorted halves into one.', pt: 'Junta as duas metades ordenadas numa só.' } },
    ],
    code: {
      lang: 'js',
      source: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}`,
    },
    useCases: [
      {
        title: { en: 'Good for', pt: 'Bom para' },
        tone: 'good',
        items: [
          { en: 'Stable sorting of large data', pt: 'Ordenação estável de grandes dados' },
          { en: 'Linked lists and external sorting', pt: 'Listas ligadas e ordenação externa' },
        ],
      },
      {
        title: { en: 'Watch out for', pt: 'Atenção a' },
        tone: 'warn',
        items: [{ en: 'Extra O(n) memory', pt: 'Memória extra O(n)' }],
      },
    ],
  },
  {
    slug: 'quick-sort',
    section: 'algorithms',
    category: 'sorting',
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
    title: { en: 'Quick Sort', pt: 'Quick Sort' },
    tagline: {
      en: 'Partition around a pivot, then recurse.',
      pt: 'Particiona à volta de um pivô e recorre.',
    },
    description: {
      en: 'Picks a pivot, partitions smaller/larger elements around it, and recurses. The default in-place sort in most standard libraries thanks to excellent average speed.',
      pt: 'Escolhe um pivô, particiona elementos menores/maiores à sua volta e recorre. É a ordenação padrão na maioria das bibliotecas pela excelente velocidade média.',
    },
    visualizer: 'sorting:quick',
    complexity: bestAvgWorst('O(n log n)', 'O(n log n)', 'O(n²)'),
    space: { value: 'O(log n)', note: { en: 'Recursion stack', pt: 'Pilha de recursão' } },
    properties: [
      { label: { en: 'Not stable', pt: 'Não estável' }, tone: 'bad' },
      { label: { en: 'In-place', pt: 'In-place' }, tone: 'good' },
      { label: { en: 'Divide & conquer', pt: 'Dividir e conquistar' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Choose a pivot (here, the last element).', pt: 'Escolhe um pivô (aqui, o último elemento).' } },
      { text: { en: 'Move smaller elements left, larger right.', pt: 'Move os menores para a esquerda, maiores para a direita.' } },
      { text: { en: 'Place the pivot in its final position.', pt: 'Coloca o pivô na posição final.' } },
      { text: { en: 'Recurse on the left and right partitions.', pt: 'Recorre nas partições esquerda e direita.' } },
    ],
    code: {
      lang: 'js',
      source: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
  }
  return arr;
}

function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return i + 1;
}`,
    },
    useCases: [
      {
        title: { en: 'Good for', pt: 'Bom para' },
        tone: 'good',
        items: [
          { en: 'General-purpose in-memory sorting', pt: 'Ordenação genérica em memória' },
          { en: 'When memory is constrained', pt: 'Quando a memória é limitada' },
        ],
      },
      {
        title: { en: 'Be careful with', pt: 'Cuidado com' },
        tone: 'warn',
        items: [
          { en: 'Already-sorted input (worst case)', pt: 'Entrada já ordenada (pior caso)' },
          { en: 'When stability is required', pt: 'Quando estabilidade é necessária' },
        ],
      },
    ],
  },
  {
    slug: 'heap-sort',
    section: 'algorithms',
    category: 'sorting',
    icon: 'BarChart3',
    accent: 'from-sky-500 to-cyan-500',
    title: { en: 'Heap Sort', pt: 'Heap Sort' },
    tagline: {
      en: 'Build a max-heap, then extract the max repeatedly.',
      pt: 'Constrói um max-heap e extrai o máximo repetidamente.',
    },
    description: {
      en: 'Turns the array into a binary max-heap, then repeatedly swaps the root to the end and re-heapifies. In-place with a guaranteed O(n log n) bound.',
      pt: 'Transforma o array num max-heap binário, depois troca repetidamente a raiz para o fim e refaz o heap. In-place com limite garantido de O(n log n).',
    },
    visualizer: 'sorting:heap',
    complexity: bestAvgWorst('O(n log n)', 'O(n log n)', 'O(n log n)'),
    space: { value: 'O(1)', note: { en: 'In-place', pt: 'In-place' } },
    properties: [
      { label: { en: 'Not stable', pt: 'Não estável' }, tone: 'bad' },
      { label: { en: 'In-place', pt: 'In-place' }, tone: 'good' },
      { label: { en: 'Guaranteed n log n', pt: 'Garante n log n' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Build a max-heap from the array.', pt: 'Constrói um max-heap a partir do array.' } },
      { text: { en: 'Swap the root (max) with the last element.', pt: 'Troca a raiz (máx) com o último elemento.' } },
      { text: { en: 'Shrink the heap and sift the new root down.', pt: 'Reduz o heap e faz o novo topo descer.' } },
      { text: { en: 'Repeat until the heap is empty.', pt: 'Repete até o heap ficar vazio.' } },
    ],
    code: {
      lang: 'js',
      source: `function heapSort(arr) {
  const n = arr.length;
  for (let i = (n >> 1) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(arr, end, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    },
  },

  /* ============================ SEARCH ============================ */
  {
    slug: 'linear-search',
    section: 'algorithms',
    category: 'search',
    icon: 'Search',
    accent: 'from-emerald-500 to-green-500',
    title: { en: 'Linear Search', pt: 'Busca Linear' },
    tagline: {
      en: 'Check every element until you find the target.',
      pt: 'Verifica cada elemento até encontrar o alvo.',
    },
    description: {
      en: 'Walks the collection from start to finish comparing each element. Works on any data, sorted or not.',
      pt: 'Percorre a coleção do início ao fim comparando cada elemento. Funciona com qualquer dado, ordenado ou não.',
    },
    visualizer: 'search:linear',
    complexity: bestAvgWorst('O(1)', 'O(n)', 'O(n)'),
    space: { value: 'O(1)', note: { en: 'Constant', pt: 'Constante' } },
    properties: [
      { label: { en: 'No sorting needed', pt: 'Não precisa ordenar' }, tone: 'good' },
      { label: { en: 'Works on any structure', pt: 'Funciona em qualquer estrutura' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Start at the first element.', pt: 'Começa no primeiro elemento.' } },
      { text: { en: 'Compare it with the target.', pt: 'Compara-o com o alvo.' } },
      { text: { en: 'Move forward until found or end reached.', pt: 'Avança até encontrar ou chegar ao fim.' } },
    ],
    code: {
      lang: 'js',
      source: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    },
  },
  {
    slug: 'binary-search',
    section: 'algorithms',
    category: 'search',
    icon: 'Search',
    accent: 'from-emerald-500 to-green-500',
    title: { en: 'Binary Search', pt: 'Busca Binária' },
    tagline: {
      en: 'Halve a sorted range each step.',
      pt: 'Reduz a metade um intervalo ordenado a cada passo.',
    },
    description: {
      en: 'On sorted data, compare the target to the middle element and discard half the range each time. Logarithmic and extremely fast.',
      pt: 'Em dados ordenados, compara o alvo com o elemento do meio e descarta metade do intervalo de cada vez. Logarítmica e extremamente rápida.',
    },
    visualizer: 'search:binary',
    complexity: bestAvgWorst('O(1)', 'O(log n)', 'O(log n)'),
    space: { value: 'O(1)', note: { en: 'Iterative', pt: 'Iterativa' } },
    properties: [
      { label: { en: 'Requires sorted data', pt: 'Exige dados ordenados' }, tone: 'warn' },
      { label: { en: 'Logarithmic', pt: 'Logarítmica' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Look at the middle of the range.', pt: 'Olha para o meio do intervalo.' } },
      { text: { en: 'If it matches, done.', pt: 'Se for igual, terminou.' } },
      { text: { en: 'If target is smaller, search the left half.', pt: 'Se o alvo for menor, procura na metade esquerda.' } },
      { text: { en: 'Otherwise search the right half.', pt: 'Caso contrário, procura na metade direita.' } },
    ],
    code: {
      lang: 'js',
      source: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    },
  },

  /* ============================ GRAPH ============================ */
  {
    slug: 'bfs',
    section: 'algorithms',
    category: 'graph',
    icon: 'GitBranch',
    accent: 'from-violet-500 to-fuchsia-500',
    title: { en: 'Breadth-First Search', pt: 'Busca em Largura (BFS)' },
    tagline: {
      en: 'Explore level by level using a queue.',
      pt: 'Explora nível a nível usando uma fila.',
    },
    description: {
      en: 'Visits all neighbours before going deeper, using a FIFO queue. Finds the shortest path in unweighted graphs.',
      pt: 'Visita todos os vizinhos antes de aprofundar, usando uma fila FIFO. Encontra o caminho mais curto em grafos não ponderados.',
    },
    visualizer: 'graph:bfs',
    complexity: [
      { label: { en: 'Time', pt: 'Tempo' }, value: 'O(V + E)', tone: 'good' },
    ],
    space: { value: 'O(V)', note: { en: 'Queue + visited set', pt: 'Fila + conjunto visitado' } },
    properties: [
      { label: { en: 'Shortest path (unweighted)', pt: 'Caminho mais curto (sem peso)' }, tone: 'good' },
      { label: { en: 'Uses a queue', pt: 'Usa uma fila' }, tone: 'info' },
    ],
    steps: [
      { text: { en: 'Enqueue the start node and mark it visited.', pt: 'Enfileira o nó inicial e marca-o como visitado.' } },
      { text: { en: 'Dequeue a node and visit its unvisited neighbours.', pt: 'Desenfileira um nó e visita os vizinhos não visitados.' } },
      { text: { en: 'Enqueue those neighbours.', pt: 'Enfileira esses vizinhos.' } },
      { text: { en: 'Repeat until the queue is empty.', pt: 'Repete até a fila ficar vazia.' } },
    ],
    code: {
      lang: 'js',
      source: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}`,
    },
  },
  {
    slug: 'dfs',
    section: 'algorithms',
    category: 'graph',
    icon: 'GitBranch',
    accent: 'from-violet-500 to-fuchsia-500',
    title: { en: 'Depth-First Search', pt: 'Busca em Profundidade (DFS)' },
    tagline: {
      en: 'Dive as deep as possible before backtracking.',
      pt: 'Mergulha o mais fundo possível antes de retroceder.',
    },
    description: {
      en: 'Follows one path to its end, then backtracks, using a stack (or recursion). Used for cycle detection, topological sort and connectivity.',
      pt: 'Segue um caminho até ao fim e depois retrocede, usando uma pilha (ou recursão). Usada para deteção de ciclos, ordenação topológica e conetividade.',
    },
    visualizer: 'graph:dfs',
    complexity: [
      { label: { en: 'Time', pt: 'Tempo' }, value: 'O(V + E)', tone: 'good' },
    ],
    space: { value: 'O(V)', note: { en: 'Stack + visited set', pt: 'Pilha + conjunto visitado' } },
    properties: [
      { label: { en: 'Uses a stack / recursion', pt: 'Usa pilha / recursão' }, tone: 'info' },
      { label: { en: 'Great for topology', pt: 'Ótima para topologia' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Push the start node and mark it visited.', pt: 'Empilha o nó inicial e marca-o como visitado.' } },
      { text: { en: 'Pop a node and explore one unvisited neighbour.', pt: 'Desempilha um nó e explora um vizinho não visitado.' } },
      { text: { en: 'Go deeper before backtracking.', pt: 'Aprofunda antes de retroceder.' } },
    ],
    code: {
      lang: 'js',
      source: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  for (const next of graph[start]) {
    if (!visited.has(next)) dfs(graph, next, visited, order);
  }
  return order;
}`,
    },
  },
  {
    slug: 'dijkstra',
    section: 'algorithms',
    category: 'graph',
    icon: 'GitBranch',
    accent: 'from-violet-500 to-fuchsia-500',
    title: { en: "Dijkstra's Algorithm", pt: 'Algoritmo de Dijkstra' },
    tagline: {
      en: 'Shortest paths in weighted graphs.',
      pt: 'Caminhos mais curtos em grafos ponderados.',
    },
    description: {
      en: 'Greedily expands the closest unvisited node, relaxing edges to keep the best known distance to each node. Requires non-negative weights.',
      pt: 'Expande gulosamente o nó não visitado mais próximo, relaxando arestas para manter a melhor distância conhecida a cada nó. Exige pesos não negativos.',
    },
    visualizer: 'graph:dijkstra',
    complexity: [
      { label: { en: 'With heap', pt: 'Com heap' }, value: 'O((V + E) log V)', tone: 'good' },
    ],
    space: { value: 'O(V)', note: { en: 'Distances + priority queue', pt: 'Distâncias + fila de prioridade' } },
    properties: [
      { label: { en: 'Non-negative weights', pt: 'Pesos não negativos' }, tone: 'warn' },
      { label: { en: 'Greedy', pt: 'Guloso' }, tone: 'info' },
    ],
    steps: [
      { text: { en: 'Set start distance to 0, all others to ∞.', pt: 'Define a distância inicial a 0 e as restantes a ∞.' } },
      { text: { en: 'Pick the unvisited node with the smallest distance.', pt: 'Escolhe o nó não visitado com menor distância.' } },
      { text: { en: 'Relax its edges, updating neighbour distances.', pt: 'Relaxa as suas arestas, atualizando distâncias dos vizinhos.' } },
      { text: { en: 'Mark it done and repeat.', pt: 'Marca-o como concluído e repete.' } },
    ],
    code: {
      lang: 'js',
      source: `function dijkstra(graph, start) {
  const dist = {};
  for (const node in graph) dist[node] = Infinity;
  dist[start] = 0;
  const pq = [[0, start]]; // [distance, node]
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    if (d > dist[node]) continue;
    for (const { to, weight } of graph[node]) {
      const nd = d + weight;
      if (nd < dist[to]) {
        dist[to] = nd;
        pq.push([nd, to]);
      }
    }
  }
  return dist;
}`,
    },
  },

  /* ===================== DATA STRUCTURES: LINEAR ===================== */
  {
    slug: 'array',
    section: 'data-structures',
    category: 'linear',
    icon: 'AlignJustify',
    accent: 'from-sky-500 to-blue-500',
    title: { en: 'Array', pt: 'Array' },
    tagline: {
      en: 'Contiguous, index-addressable memory.',
      pt: 'Memória contígua endereçável por índice.',
    },
    description: {
      en: 'The most fundamental structure: elements stored back-to-back so any index can be read in constant time. Insertions/removals in the middle shift everything after.',
      pt: 'A estrutura mais fundamental: elementos guardados lado a lado, de modo que qualquer índice é lido em tempo constante. Inserções/remoções no meio deslocam tudo o que vem a seguir.',
    },
    visualizer: 'array',
    complexity: [
      { label: { en: 'Access', pt: 'Acesso' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Search', pt: 'Busca' }, value: 'O(n)', tone: 'warn' },
      { label: { en: 'Insert / Delete', pt: 'Inserir / Remover' }, value: 'O(n)', tone: 'bad' },
    ],
    space: { value: 'O(n)', note: { en: 'Linear', pt: 'Linear' } },
    properties: [
      { label: { en: 'Direct access', pt: 'Acesso direto' }, tone: 'good' },
      { label: { en: 'Cache-friendly', pt: 'Amigo da cache' }, tone: 'good' },
      { label: { en: 'Costly mid-insert', pt: 'Inserção no meio cara' }, tone: 'warn' },
    ],
    steps: [
      { text: { en: 'Access reads any index instantly via base + i.', pt: 'O acesso lê qualquer índice instantaneamente via base + i.' } },
      { text: { en: 'Inserting in the middle shifts later elements right.', pt: 'Inserir no meio desloca os elementos seguintes à direita.' } },
      { text: { en: 'Removing shifts later elements left.', pt: 'Remover desloca os elementos seguintes à esquerda.' } },
    ],
    code: {
      lang: 'js',
      source: `const a = [10, 25, 30, 45, 50];
a[2];          // 30  -> O(1) access
a.push(60);    // append -> amortised O(1)
a.splice(1, 0, 15); // insert at index 1 -> O(n)
a.indexOf(45); // linear search -> O(n)`,
    },
    applications: [
      { en: 'Backing store for almost every other structure', pt: 'Base de quase todas as outras estruturas' },
      { en: 'Columnar storage in analytics engines', pt: 'Armazenamento colunar em motores analíticos' },
    ],
  },
  {
    slug: 'linked-list',
    section: 'data-structures',
    category: 'linear',
    icon: 'Link2',
    accent: 'from-sky-500 to-blue-500',
    title: { en: 'Linked List', pt: 'Lista Ligada' },
    tagline: {
      en: 'Nodes connected by pointers.',
      pt: 'Nós ligados por ponteiros.',
    },
    description: {
      en: 'Each node stores a value and a reference to the next node. Insertions and deletions are O(1) once you hold the node, but there is no random access.',
      pt: 'Cada nó guarda um valor e uma referência para o próximo. Inserções e remoções são O(1) quando se tem o nó, mas não há acesso aleatório.',
    },
    visualizer: 'linked-list',
    complexity: [
      { label: { en: 'Access', pt: 'Acesso' }, value: 'O(n)', tone: 'bad' },
      { label: { en: 'Search', pt: 'Busca' }, value: 'O(n)', tone: 'warn' },
      { label: { en: 'Insert / Delete (head)', pt: 'Inserir / Remover (início)' }, value: 'O(1)', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Extra pointer per node', pt: 'Ponteiro extra por nó' } },
    properties: [
      { label: { en: 'Dynamic size', pt: 'Tamanho dinâmico' }, tone: 'good' },
      { label: { en: 'O(1) head insert', pt: 'Inserção O(1) no início' }, tone: 'good' },
      { label: { en: 'No random access', pt: 'Sem acesso aleatório' }, tone: 'bad' },
    ],
    steps: [
      { text: { en: 'A head pointer references the first node.', pt: 'Um ponteiro "head" referencia o primeiro nó.' } },
      { text: { en: 'Each node points to the next (null at the tail).', pt: 'Cada nó aponta para o próximo (null no fim).' } },
      { text: { en: 'Insert/remove by rewiring pointers — no shifting.', pt: 'Inserir/remover religando ponteiros — sem deslocamentos.' } },
    ],
    code: {
      lang: 'js',
      source: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}

class LinkedList {
  constructor() { this.head = null; }
  prepend(value) {            // O(1)
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }
  find(value) {               // O(n)
    let cur = this.head;
    while (cur && cur.value !== value) cur = cur.next;
    return cur;
  }
}`,
    },
  },
  {
    slug: 'stack',
    section: 'data-structures',
    category: 'linear',
    icon: 'Layers',
    accent: 'from-sky-500 to-blue-500',
    title: { en: 'Stack', pt: 'Pilha (Stack)' },
    tagline: { en: 'Last in, first out (LIFO).', pt: 'Último a entrar, primeiro a sair (LIFO).' },
    description: {
      en: 'A collection where you only add and remove at one end (the top). Powers function calls, undo history and expression parsing.',
      pt: 'Uma coleção onde só se adiciona e remove num extremo (o topo). Suporta chamadas de função, histórico de "desfazer" e análise de expressões.',
    },
    visualizer: 'stack',
    complexity: [
      { label: { en: 'Push', pt: 'Push' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Pop', pt: 'Pop' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Peek', pt: 'Peek' }, value: 'O(1)', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Linear', pt: 'Linear' } },
    properties: [
      { label: { en: 'LIFO order', pt: 'Ordem LIFO' }, tone: 'info' },
      { label: { en: 'O(1) operations', pt: 'Operações O(1)' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Push adds an item on top.', pt: 'Push adiciona um item no topo.' } },
      { text: { en: 'Pop removes the top item.', pt: 'Pop remove o item do topo.' } },
      { text: { en: 'Peek reads the top without removing it.', pt: 'Peek lê o topo sem o remover.' } },
    ],
    code: {
      lang: 'js',
      source: `class Stack {
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }    // O(1)
  pop()    { return this.items.pop(); } // O(1)
  peek()   { return this.items.at(-1); }
  get isEmpty() { return this.items.length === 0; }
}`,
    },
    applications: [
      { en: 'Call stack & recursion', pt: 'Pilha de chamadas & recursão' },
      { en: 'Undo/redo, browser history', pt: 'Desfazer/refazer, histórico do navegador' },
    ],
  },
  {
    slug: 'queue',
    section: 'data-structures',
    category: 'linear',
    icon: 'ArrowRightLeft',
    accent: 'from-sky-500 to-blue-500',
    title: { en: 'Queue', pt: 'Fila (Queue)' },
    tagline: { en: 'First in, first out (FIFO).', pt: 'Primeiro a entrar, primeiro a sair (FIFO).' },
    description: {
      en: 'Items are added at the back and removed from the front. The backbone of task scheduling, buffering and message systems.',
      pt: 'Itens são adicionados ao fim e removidos do início. A espinha dorsal de escalonamento de tarefas, buffering e sistemas de mensagens.',
    },
    visualizer: 'queue',
    complexity: [
      { label: { en: 'Enqueue', pt: 'Enqueue' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Dequeue', pt: 'Dequeue' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Peek', pt: 'Peek' }, value: 'O(1)', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Linear', pt: 'Linear' } },
    properties: [
      { label: { en: 'FIFO order', pt: 'Ordem FIFO' }, tone: 'info' },
      { label: { en: 'O(1) operations', pt: 'Operações O(1)' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Enqueue adds to the back.', pt: 'Enqueue adiciona ao fim.' } },
      { text: { en: 'Dequeue removes from the front.', pt: 'Dequeue remove do início.' } },
      { text: { en: 'Order is strictly preserved.', pt: 'A ordem é estritamente preservada.' } },
    ],
    code: {
      lang: 'js',
      source: `class Queue {
  constructor() { this.items = []; this.head = 0; }
  enqueue(x) { this.items.push(x); }        // O(1)
  dequeue() { return this.items[this.head++]; } // amortised O(1)
  get front() { return this.items[this.head]; }
  get size() { return this.items.length - this.head; }
}`,
    },
    applications: [
      { en: 'Message queues (Kafka, RabbitMQ)', pt: 'Filas de mensagens (Kafka, RabbitMQ)' },
      { en: 'Task scheduling & BFS', pt: 'Escalonamento de tarefas & BFS' },
    ],
  },

  /* =================== DATA STRUCTURES: NON-LINEAR =================== */
  {
    slug: 'binary-tree',
    section: 'data-structures',
    category: 'non-linear',
    icon: 'Network',
    accent: 'from-purple-500 to-pink-500',
    title: { en: 'Binary Search Tree', pt: 'Árvore Binária de Busca' },
    tagline: { en: 'Ordered hierarchy for fast lookups.', pt: 'Hierarquia ordenada para buscas rápidas.' },
    description: {
      en: 'A binary tree where every left descendant is smaller and every right descendant is larger. Balanced, it gives O(log n) search, insert and delete.',
      pt: 'Uma árvore binária onde todo descendente à esquerda é menor e à direita é maior. Equilibrada, oferece busca, inserção e remoção em O(log n).',
    },
    visualizer: 'bst',
    complexity: [
      { label: { en: 'Search (balanced)', pt: 'Busca (equilibrada)' }, value: 'O(log n)', tone: 'good' },
      { label: { en: 'Insert (balanced)', pt: 'Inserir (equilibrada)' }, value: 'O(log n)', tone: 'good' },
      { label: { en: 'Worst (skewed)', pt: 'Pior (degenerada)' }, value: 'O(n)', tone: 'bad' },
    ],
    space: { value: 'O(n)', note: { en: 'One node per value', pt: 'Um nó por valor' } },
    properties: [
      { label: { en: 'Ordered traversal', pt: 'Percurso ordenado' }, tone: 'good' },
      { label: { en: 'Needs balancing', pt: 'Precisa de equilíbrio' }, tone: 'warn' },
    ],
    steps: [
      { text: { en: 'Compare the value with the current node.', pt: 'Compara o valor com o nó atual.' } },
      { text: { en: 'Go left if smaller, right if larger.', pt: 'Vai à esquerda se menor, à direita se maior.' } },
      { text: { en: 'Insert when you reach an empty spot.', pt: 'Insere ao chegar a um espaço vazio.' } },
      { text: { en: 'In-order traversal yields sorted output.', pt: 'O percurso in-order devolve a saída ordenada.' } },
    ],
    code: {
      lang: 'js',
      source: `class BST {
  insert(value, node = this.root) {
    if (!this.root) return (this.root = { value, left: null, right: null });
    if (value < node.value)
      node.left ? this.insert(value, node.left)
                : (node.left = { value, left: null, right: null });
    else
      node.right ? this.insert(value, node.right)
                 : (node.right = { value, left: null, right: null });
  }
}`,
    },
  },
  {
    slug: 'heap',
    section: 'data-structures',
    category: 'non-linear',
    icon: 'Triangle',
    accent: 'from-purple-500 to-pink-500',
    title: { en: 'Binary Heap', pt: 'Heap Binário' },
    tagline: { en: 'A priority queue as a complete tree.', pt: 'Uma fila de prioridade como árvore completa.' },
    description: {
      en: 'A complete binary tree where each parent is ≥ (max-heap) or ≤ (min-heap) its children. The root is always the extreme value — perfect for priority queues.',
      pt: 'Uma árvore binária completa onde cada pai é ≥ (max-heap) ou ≤ (min-heap) que os filhos. A raiz é sempre o valor extremo — ideal para filas de prioridade.',
    },
    visualizer: 'heap',
    complexity: [
      { label: { en: 'Peek min/max', pt: 'Consultar min/máx' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Insert', pt: 'Inserir' }, value: 'O(log n)', tone: 'good' },
      { label: { en: 'Extract', pt: 'Extrair' }, value: 'O(log n)', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Array-backed', pt: 'Baseado em array' } },
    properties: [
      { label: { en: 'Complete tree', pt: 'Árvore completa' }, tone: 'info' },
      { label: { en: 'O(1) top access', pt: 'Acesso O(1) ao topo' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Insert at the end, then sift up.', pt: 'Insere no fim e faz "sift up".' } },
      { text: { en: 'The largest/smallest bubbles to the root.', pt: 'O maior/menor sobe até à raiz.' } },
      { text: { en: 'Extract the root, move the last up, sift down.', pt: 'Extrai a raiz, sobe o último e faz "sift down".' } },
    ],
    code: {
      lang: 'js',
      source: `class MinHeap {
  constructor() { this.h = []; }
  push(x) {
    this.h.push(x);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  peek() { return this.h[0]; }
}`,
    },
    applications: [
      { en: 'Priority queues & schedulers', pt: 'Filas de prioridade & escalonadores' },
      { en: 'Dijkstra, top-K, heap sort', pt: 'Dijkstra, top-K, heap sort' },
    ],
  },
  {
    slug: 'graph',
    section: 'data-structures',
    category: 'non-linear',
    icon: 'Share2',
    accent: 'from-purple-500 to-pink-500',
    title: { en: 'Graph', pt: 'Grafo' },
    tagline: { en: 'Vertices connected by edges.', pt: 'Vértices ligados por arestas.' },
    description: {
      en: 'A set of vertices and the edges between them. Models social networks, maps, dependencies and data lineage. Stored as an adjacency list or matrix.',
      pt: 'Um conjunto de vértices e as arestas entre eles. Modela redes sociais, mapas, dependências e linhagem de dados. Guardado como lista ou matriz de adjacência.',
    },
    visualizer: 'graph:bfs',
    complexity: [
      { label: { en: 'Adjacency list space', pt: 'Espaço (lista de adjacência)' }, value: 'O(V + E)', tone: 'good' },
      { label: { en: 'Traversal', pt: 'Percurso' }, value: 'O(V + E)', tone: 'good' },
      { label: { en: 'Matrix space', pt: 'Espaço (matriz)' }, value: 'O(V²)', tone: 'warn' },
    ],
    space: { value: 'O(V + E)', note: { en: 'Adjacency list', pt: 'Lista de adjacência' } },
    properties: [
      { label: { en: 'Directed or undirected', pt: 'Dirigido ou não' }, tone: 'info' },
      { label: { en: 'Weighted or not', pt: 'Ponderado ou não' }, tone: 'info' },
    ],
    steps: [
      { text: { en: 'Represent neighbours in an adjacency list.', pt: 'Representa vizinhos numa lista de adjacência.' } },
      { text: { en: 'Traverse with BFS (queue) or DFS (stack).', pt: 'Percorre com BFS (fila) ou DFS (pilha).' } },
      { text: { en: 'Weighted edges enable shortest-path search.', pt: 'Arestas ponderadas permitem caminho mais curto.' } },
    ],
    code: {
      lang: 'js',
      source: `// Adjacency list
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C'],
};
// Edge exists?
graph['A'].includes('B'); // true`,
    },
    applications: [
      { en: 'Data lineage & DAG schedulers (Airflow)', pt: 'Linhagem de dados & DAGs (Airflow)' },
      { en: 'Recommendation & social graphs', pt: 'Recomendação & grafos sociais' },
    ],
  },
  {
    slug: 'hash-table',
    section: 'data-structures',
    category: 'non-linear',
    icon: 'Hash',
    accent: 'from-purple-500 to-pink-500',
    title: { en: 'Hash Table', pt: 'Tabela Hash' },
    tagline: { en: 'Key → bucket via a hash function.', pt: 'Chave → balde via função de hash.' },
    description: {
      en: 'Maps keys to array buckets using a hash function, giving average O(1) lookup. Collisions are handled by chaining or open addressing.',
      pt: 'Mapeia chaves para baldes de um array usando uma função de hash, dando busca média O(1). Colisões são tratadas por encadeamento ou endereçamento aberto.',
    },
    visualizer: 'hash-table',
    complexity: [
      { label: { en: 'Search (avg)', pt: 'Busca (média)' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Insert (avg)', pt: 'Inserir (média)' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Worst (all collide)', pt: 'Pior (tudo colide)' }, value: 'O(n)', tone: 'bad' },
    ],
    space: { value: 'O(n)', note: { en: 'Buckets + entries', pt: 'Baldes + entradas' } },
    properties: [
      { label: { en: 'Average O(1)', pt: 'Média O(1)' }, tone: 'good' },
      { label: { en: 'Unordered', pt: 'Não ordenada' }, tone: 'warn' },
      { label: { en: 'Collision handling', pt: 'Tratamento de colisões' }, tone: 'info' },
    ],
    steps: [
      { text: { en: 'Hash the key to a bucket index.', pt: 'Faz hash da chave para um índice de balde.' } },
      { text: { en: 'Store the entry in that bucket.', pt: 'Guarda a entrada nesse balde.' } },
      { text: { en: 'On collision, chain entries in the bucket.', pt: 'Em colisão, encadeia entradas no balde.' } },
      { text: { en: 'Resize when the load factor grows too high.', pt: 'Redimensiona quando o fator de carga cresce demasiado.' } },
    ],
    code: {
      lang: 'js',
      source: `class HashTable {
  constructor(size = 8) { this.buckets = Array.from({length: size}, () => []); }
  hash(key) {
    let h = 0;
    for (const ch of String(key)) h = (h * 31 + ch.charCodeAt(0)) % this.buckets.length;
    return h;
  }
  set(key, value) {
    const b = this.buckets[this.hash(key)];
    const found = b.find(e => e[0] === key);
    found ? (found[1] = value) : b.push([key, value]);
  }
  get(key) {
    return this.buckets[this.hash(key)].find(e => e[0] === key)?.[1];
  }
}`,
    },
    applications: [
      { en: 'Dictionaries, caches, deduplication', pt: 'Dicionários, caches, deduplicação' },
      { en: 'Database indexes & joins', pt: 'Índices e joins de bases de dados' },
    ],
  },

  /* ===================== DATA ENGINEERING: ETL ===================== */
  {
    slug: 'mapreduce',
    section: 'data-engineering',
    category: 'etl',
    icon: 'Database',
    accent: 'from-blue-500 to-cyan-500',
    title: { en: 'MapReduce', pt: 'MapReduce' },
    tagline: { en: 'Split → Map → Shuffle → Reduce.', pt: 'Dividir → Map → Shuffle → Reduce.' },
    description: {
      en: 'A paradigm for processing huge datasets across a cluster. Map emits key-value pairs in parallel, the framework groups by key, and Reduce aggregates each group.',
      pt: 'Um paradigma para processar grandes conjuntos de dados num cluster. O Map emite pares chave-valor em paralelo, o framework agrupa por chave e o Reduce agrega cada grupo.',
    },
    visualizer: 'mapreduce',
    complexity: [
      { label: { en: 'Map', pt: 'Map' }, value: 'O(n)', tone: 'good' },
      { label: { en: 'Reduce', pt: 'Reduce' }, value: 'O(k log k)', tone: 'good' },
      { label: { en: 'Scalability', pt: 'Escalabilidade' }, value: 'Horizontal', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Distributed across nodes', pt: 'Distribuído pelos nós' } },
    properties: [
      { label: { en: 'Fault tolerant', pt: 'Tolerante a falhas' }, tone: 'good' },
      { label: { en: 'Distributed & parallel', pt: 'Distribuído & paralelo' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Split: input is partitioned into chunks.', pt: 'Split: a entrada é particionada em chunks.' } },
      { text: { en: 'Map: each chunk emits key-value pairs in parallel.', pt: 'Map: cada chunk emite pares chave-valor em paralelo.' } },
      { text: { en: 'Shuffle: pairs are grouped by key.', pt: 'Shuffle: os pares são agrupados por chave.' } },
      { text: { en: 'Reduce: values per key are aggregated.', pt: 'Reduce: os valores por chave são agregados.' } },
    ],
    code: {
      lang: 'js',
      source: `// Word count
function map(line) {
  return line.toLowerCase().split(/\\s+/).map(w => [w, 1]);
}
function reduce(key, values) {
  return [key, values.reduce((a, b) => a + b, 0)];
}`,
    },
    applications: [
      { en: 'Apache Hadoop & Spark', pt: 'Apache Hadoop & Spark' },
      { en: 'Log processing & large aggregations', pt: 'Processamento de logs & grandes agregações' },
    ],
  },
  {
    slug: 'window-functions',
    section: 'data-engineering',
    category: 'etl',
    icon: 'TableProperties',
    accent: 'from-blue-500 to-cyan-500',
    title: { en: 'Window Functions', pt: 'Window Functions' },
    tagline: { en: 'Aggregate without collapsing rows.', pt: 'Agregar sem colapsar as linhas.' },
    description: {
      en: 'SQL analytics that compute a value over a "window" of related rows (running totals, rankings, moving averages) while keeping every row in the output.',
      pt: 'Análises SQL que calculam um valor sobre uma "janela" de linhas relacionadas (totais acumulados, rankings, médias móveis) mantendo todas as linhas na saída.',
    },
    visualizer: 'window-functions',
    complexity: [
      { label: { en: 'Sort + scan', pt: 'Ordenar + percorrer' }, value: 'O(n log n)', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Partition buffers', pt: 'Buffers de partição' } },
    properties: [
      { label: { en: 'Keeps all rows', pt: 'Mantém todas as linhas' }, tone: 'good' },
      { label: { en: 'PARTITION BY / ORDER BY', pt: 'PARTITION BY / ORDER BY' }, tone: 'info' },
    ],
    steps: [
      { text: { en: 'PARTITION BY divides rows into groups.', pt: 'PARTITION BY divide as linhas em grupos.' } },
      { text: { en: 'ORDER BY sets the order inside each partition.', pt: 'ORDER BY define a ordem dentro de cada partição.' } },
      { text: { en: 'The frame defines which rows are aggregated.', pt: 'A "frame" define quais linhas são agregadas.' } },
      { text: { en: 'The function (SUM, RANK…) runs per row.', pt: 'A função (SUM, RANK…) corre por linha.' } },
    ],
    code: {
      lang: 'sql',
      source: `SELECT
  user_id,
  event_day,
  amount,
  SUM(amount) OVER (
    PARTITION BY user_id
    ORDER BY event_day
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rnk
FROM events;`,
    },
    applications: [
      { en: 'Running totals & moving averages', pt: 'Totais acumulados & médias móveis' },
      { en: 'Top-N per group, sessionization', pt: 'Top-N por grupo, sessionização' },
    ],
  },
  {
    slug: 'partitioning',
    section: 'data-engineering',
    category: 'etl',
    icon: 'Grid3x3',
    accent: 'from-blue-500 to-cyan-500',
    title: { en: 'Partitioning', pt: 'Particionamento' },
    tagline: { en: 'Split data to parallelise work.', pt: 'Dividir dados para paralelizar o trabalho.' },
    description: {
      en: 'Divides a dataset into independent partitions so work can run in parallel and queries can skip irrelevant data. Common schemes: range, hash and round-robin.',
      pt: 'Divide um conjunto de dados em partições independentes para que o trabalho corra em paralelo e as consultas saltem dados irrelevantes. Esquemas comuns: range, hash e round-robin.',
    },
    visualizer: 'partitioning',
    complexity: [
      { label: { en: 'Hash assign', pt: 'Atribuição por hash' }, value: 'O(1)', tone: 'good' },
      { label: { en: 'Range assign', pt: 'Atribuição por range' }, value: 'O(log p)', tone: 'good' },
    ],
    space: { value: 'O(n)', note: { en: 'Same data, regrouped', pt: 'Mesmos dados, reagrupados' } },
    properties: [
      { label: { en: 'Enables parallelism', pt: 'Permite paralelismo' }, tone: 'good' },
      { label: { en: 'Risk of skew', pt: 'Risco de desequilíbrio' }, tone: 'warn' },
    ],
    steps: [
      { text: { en: 'Pick a partition key.', pt: 'Escolhe uma chave de partição.' } },
      { text: { en: 'Range: split by value ranges.', pt: 'Range: divide por intervalos de valor.' } },
      { text: { en: 'Hash: assign hash(key) % p.', pt: 'Hash: atribui hash(chave) % p.' } },
      { text: { en: 'Round-robin: spread evenly, ignoring key.', pt: 'Round-robin: distribui uniformemente, ignorando a chave.' } },
    ],
    code: {
      lang: 'js',
      source: `function partition(record, scheme, p) {
  switch (scheme) {
    case 'hash':  return hash(record.key) % p;
    case 'range': return Math.min(p - 1, Math.floor(record.key / RANGE));
    case 'round': return (counter++) % p;
  }
}`,
    },
    applications: [
      { en: 'Spark/Hive table partitions', pt: 'Partições de tabelas Spark/Hive' },
      { en: 'Sharded databases & Kafka topics', pt: 'Bases de dados em shards & tópicos Kafka' },
    ],
  },

  /* ================= DATA ENGINEERING: DISTRIBUTED ================= */
  {
    slug: 'consistent-hashing',
    section: 'data-engineering',
    category: 'distributed',
    icon: 'CircleDot',
    accent: 'from-emerald-500 to-teal-500',
    title: { en: 'Consistent Hashing', pt: 'Consistent Hashing' },
    tagline: { en: 'Add/remove nodes with minimal reshuffling.', pt: 'Adicionar/remover nós com mínima reorganização.' },
    description: {
      en: 'Places nodes and keys on a hash ring; each key belongs to the next node clockwise. Adding or removing a node only moves the keys near it — not everything.',
      pt: 'Coloca nós e chaves num anel de hash; cada chave pertence ao próximo nó no sentido horário. Adicionar ou remover um nó move apenas as chaves próximas — não tudo.',
    },
    visualizer: 'consistent-hashing',
    complexity: [
      { label: { en: 'Lookup', pt: 'Lookup' }, value: 'O(log n)', tone: 'good' },
      { label: { en: 'Keys moved on change', pt: 'Chaves movidas por alteração' }, value: 'O(k / n)', tone: 'good' },
    ],
    space: { value: 'O(n · v)', note: { en: 'n nodes × virtual nodes', pt: 'n nós × nós virtuais' } },
    properties: [
      { label: { en: 'Minimal reshuffle', pt: 'Reorganização mínima' }, tone: 'good' },
      { label: { en: 'Virtual nodes balance load', pt: 'Nós virtuais equilibram a carga' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Hash each node onto a circular ring.', pt: 'Faz hash de cada nó num anel circular.' } },
      { text: { en: 'Hash each key onto the same ring.', pt: 'Faz hash de cada chave no mesmo anel.' } },
      { text: { en: 'A key is owned by the next node clockwise.', pt: 'Uma chave pertence ao próximo nó no sentido horário.' } },
      { text: { en: 'Adding a node steals only its slice of keys.', pt: 'Adicionar um nó rouba apenas a sua fatia de chaves.' } },
    ],
    code: {
      lang: 'js',
      source: `class HashRing {
  constructor(vnodes = 100) { this.ring = new Map(); this.vnodes = vnodes; }
  addNode(node) {
    for (let i = 0; i < this.vnodes; i++)
      this.ring.set(hash(node + '#' + i), node);
  }
  getNode(key) {
    const points = [...this.ring.keys()].sort((a, b) => a - b);
    const h = hash(key);
    const p = points.find(x => x >= h) ?? points[0]; // wrap around
    return this.ring.get(p);
  }
}`,
    },
    applications: [
      { en: 'Distributed caches (Memcached, Redis)', pt: 'Caches distribuídas (Memcached, Redis)' },
      { en: 'Cassandra / DynamoDB partitioning', pt: 'Particionamento Cassandra / DynamoDB' },
    ],
  },
  {
    slug: 'bloom-filter',
    section: 'data-engineering',
    category: 'distributed',
    icon: 'Filter',
    accent: 'from-emerald-500 to-teal-500',
    title: { en: 'Bloom Filter', pt: 'Bloom Filter' },
    tagline: { en: 'Probabilistic membership in tiny space.', pt: 'Pertencimento probabilístico em pouco espaço.' },
    description: {
      en: 'A bit array plus k hash functions. "Definitely not present" or "possibly present" — never a false negative, occasionally a false positive, using a fraction of the memory of a real set.',
      pt: 'Um array de bits mais k funções de hash. "Definitivamente ausente" ou "possivelmente presente" — nunca um falso negativo, ocasionalmente um falso positivo, usando uma fração da memória de um conjunto real.',
    },
    visualizer: 'bloom-filter',
    complexity: [
      { label: { en: 'Insert', pt: 'Inserir' }, value: 'O(k)', tone: 'good' },
      { label: { en: 'Query', pt: 'Consultar' }, value: 'O(k)', tone: 'good' },
    ],
    space: { value: 'O(m) bits', note: { en: 'Far smaller than the set', pt: 'Muito menor que o conjunto' } },
    properties: [
      { label: { en: 'No false negatives', pt: 'Sem falsos negativos' }, tone: 'good' },
      { label: { en: 'Some false positives', pt: 'Alguns falsos positivos' }, tone: 'warn' },
      { label: { en: 'No deletion', pt: 'Sem remoção' }, tone: 'bad' },
    ],
    steps: [
      { text: { en: 'To add: set k bits given by k hashes of the item.', pt: 'Para adicionar: liga k bits dados por k hashes do item.' } },
      { text: { en: 'To query: check those same k bits.', pt: 'Para consultar: verifica esses mesmos k bits.' } },
      { text: { en: 'Any bit 0 ⇒ definitely not present.', pt: 'Qualquer bit a 0 ⇒ definitivamente ausente.' } },
      { text: { en: 'All bits 1 ⇒ probably present.', pt: 'Todos os bits a 1 ⇒ provavelmente presente.' } },
    ],
    code: {
      lang: 'js',
      source: `class BloomFilter {
  constructor(m = 64, k = 3) { this.bits = new Uint8Array(m); this.m = m; this.k = k; }
  add(item) {
    for (let i = 0; i < this.k; i++) this.bits[hash(item, i) % this.m] = 1;
  }
  mightContain(item) {
    for (let i = 0; i < this.k; i++)
      if (!this.bits[hash(item, i) % this.m]) return false; // certain
    return true; // probable
  }
}`,
    },
    applications: [
      { en: 'Skip disk reads in LSM databases', pt: 'Evitar leituras de disco em bases LSM' },
      { en: 'Cache filtering, crawler URL sets', pt: 'Filtragem de cache, conjuntos de URLs de crawlers' },
    ],
  },
  {
    slug: 'compression',
    section: 'data-engineering',
    category: 'distributed',
    icon: 'Archive',
    accent: 'from-emerald-500 to-teal-500',
    title: { en: 'Compression', pt: 'Compressão' },
    tagline: { en: 'Trade CPU for storage and bandwidth.', pt: 'Trocar CPU por armazenamento e largura de banda.' },
    description: {
      en: 'Encodes data more compactly. Run-length, dictionary (LZ77) and entropy coding (Huffman) underpin Snappy, Gzip and Parquet/ORC column encodings.',
      pt: 'Codifica dados de forma mais compacta. Run-length, dicionário (LZ77) e codificação de entropia (Huffman) sustentam Snappy, Gzip e as codificações colunares Parquet/ORC.',
    },
    visualizer: 'compression',
    complexity: [
      { label: { en: 'RLE encode', pt: 'Codificar RLE' }, value: 'O(n)', tone: 'good' },
      { label: { en: 'Decode', pt: 'Descodificar' }, value: 'O(n)', tone: 'good' },
    ],
    space: { value: '↓', note: { en: 'Depends on redundancy', pt: 'Depende da redundância' } },
    properties: [
      { label: { en: 'Lossless options', pt: 'Opções sem perdas' }, tone: 'good' },
      { label: { en: 'CPU vs size trade-off', pt: 'Compromisso CPU vs tamanho' }, tone: 'warn' },
    ],
    steps: [
      { text: { en: 'Find redundancy (repeats, patterns, skew).', pt: 'Encontra redundância (repetições, padrões, desvio).' } },
      { text: { en: 'Replace it with shorter codes.', pt: 'Substitui-a por códigos mais curtos.' } },
      { text: { en: 'Run-length: "AAAB" → "3A1B".', pt: 'Run-length: "AAAB" → "3A1B".' } },
      { text: { en: 'Columnar formats compress per column for big wins.', pt: 'Formatos colunares comprimem por coluna para grandes ganhos.' } },
    ],
    code: {
      lang: 'js',
      source: `// Run-Length Encoding
function rle(input) {
  let out = '';
  for (let i = 0; i < input.length; ) {
    let j = i;
    while (j < input.length && input[j] === input[i]) j++;
    out += (j - i) + input[i];
    i = j;
  }
  return out;
}
rle('AAAABBBCCDAA'); // "4A3B2C1D2A"`,
    },
    applications: [
      { en: 'Parquet / ORC column encodings', pt: 'Codificações colunares Parquet / ORC' },
      { en: 'Snappy, Gzip, Zstd on the wire', pt: 'Snappy, Gzip, Zstd na rede' },
    ],
  },

  /* ================= DATA ENGINEERING: STREAMING ================= */
  {
    slug: 'sliding-window',
    section: 'data-engineering',
    category: 'streaming',
    icon: 'GalleryHorizontal',
    accent: 'from-amber-500 to-orange-500',
    title: { en: 'Sliding Window', pt: 'Janela Deslizante' },
    tagline: { en: 'Aggregate the most recent N elements.', pt: 'Agregar os N elementos mais recentes.' },
    description: {
      en: 'Maintains a moving window over a stream, updating an aggregate incrementally as elements enter and leave — the basis of moving averages and rate limiting.',
      pt: 'Mantém uma janela móvel sobre um stream, atualizando uma agregação incrementalmente à medida que elementos entram e saem — base de médias móveis e limitação de taxa.',
    },
    visualizer: 'sliding-window',
    complexity: [
      { label: { en: 'Per element', pt: 'Por elemento' }, value: 'O(1)', tone: 'good' },
    ],
    space: { value: 'O(w)', note: { en: 'Window size', pt: 'Tamanho da janela' } },
    properties: [
      { label: { en: 'Incremental updates', pt: 'Atualizações incrementais' }, tone: 'good' },
      { label: { en: 'Bounded memory', pt: 'Memória limitada' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Add the new element to the aggregate.', pt: 'Adiciona o novo elemento à agregação.' } },
      { text: { en: 'If the window is full, subtract the oldest.', pt: 'Se a janela estiver cheia, subtrai o mais antigo.' } },
      { text: { en: 'Slide forward and repeat.', pt: 'Desliza para a frente e repete.' } },
    ],
    code: {
      lang: 'js',
      source: `function movingAverage(stream, w) {
  const buf = [];
  let sum = 0;
  return stream.map(x => {
    buf.push(x); sum += x;
    if (buf.length > w) sum -= buf.shift();
    return sum / buf.length;
  });
}`,
    },
    applications: [
      { en: 'Rolling metrics & moving averages', pt: 'Métricas contínuas & médias móveis' },
      { en: 'Rate limiting & anomaly detection', pt: 'Limitação de taxa & deteção de anomalias' },
    ],
  },
  {
    slug: 'event-time',
    section: 'data-engineering',
    category: 'streaming',
    icon: 'Clock',
    accent: 'from-amber-500 to-orange-500',
    title: { en: 'Event-Time Processing', pt: 'Processamento por Event-Time' },
    tagline: { en: 'Group by when it happened, not when it arrived.', pt: 'Agrupar por quando aconteceu, não por quando chegou.' },
    description: {
      en: 'Uses each event\'s own timestamp instead of processing time, so results stay correct even when events arrive late or out of order across the network.',
      pt: 'Usa o timestamp do próprio evento em vez do tempo de processamento, para que os resultados permaneçam corretos mesmo quando os eventos chegam atrasados ou fora de ordem.',
    },
    visualizer: 'event-time',
    complexity: [
      { label: { en: 'Per event', pt: 'Por evento' }, value: 'O(1)', tone: 'good' },
    ],
    space: { value: 'O(open windows)', note: { en: 'Buffered until closed', pt: 'Em buffer até fechar' } },
    properties: [
      { label: { en: 'Order-independent', pt: 'Independente da ordem' }, tone: 'good' },
      { label: { en: 'Needs buffering', pt: 'Precisa de buffering' }, tone: 'warn' },
    ],
    steps: [
      { text: { en: 'Read the timestamp embedded in each event.', pt: 'Lê o timestamp embutido em cada evento.' } },
      { text: { en: 'Assign it to a window by event time.', pt: 'Atribui-o a uma janela por event-time.' } },
      { text: { en: 'Late events still land in the right window.', pt: 'Eventos atrasados caem na janela correta.' } },
    ],
    code: {
      lang: 'js',
      source: `function windowFor(event, sizeMs) {
  // bucket by the event's own time, not arrival time
  const start = Math.floor(event.eventTime / sizeMs) * sizeMs;
  return { start, end: start + sizeMs };
}`,
    },
    applications: [
      { en: 'Flink / Spark Structured Streaming', pt: 'Flink / Spark Structured Streaming' },
      { en: 'IoT & mobile telemetry', pt: 'IoT & telemetria móvel' },
    ],
  },
  {
    slug: 'watermarks',
    section: 'data-engineering',
    category: 'streaming',
    icon: 'Waves',
    accent: 'from-amber-500 to-orange-500',
    title: { en: 'Watermarks', pt: 'Watermarks' },
    tagline: { en: 'Decide when a window is "complete".', pt: 'Decidir quando uma janela está "completa".' },
    description: {
      en: 'A watermark is a moving threshold asserting "no events older than T will arrive". When it passes a window\'s end, the engine emits the result and may drop later stragglers.',
      pt: 'Uma watermark é um limiar móvel que afirma "não chegarão eventos mais antigos que T". Quando passa o fim de uma janela, o motor emite o resultado e pode descartar atrasados.',
    },
    visualizer: 'watermarks',
    complexity: [
      { label: { en: 'Per event', pt: 'Por evento' }, value: 'O(1)', tone: 'good' },
    ],
    space: { value: 'O(open windows)', note: { en: 'Until watermark passes', pt: 'Até a watermark passar' } },
    properties: [
      { label: { en: 'Latency vs completeness', pt: 'Latência vs completude' }, tone: 'warn' },
      { label: { en: 'Handles late data', pt: 'Lida com dados atrasados' }, tone: 'good' },
    ],
    steps: [
      { text: { en: 'Track the max event time seen.', pt: 'Acompanha o maior event-time visto.' } },
      { text: { en: 'Watermark = maxSeen − allowed lateness.', pt: 'Watermark = máxVisto − atraso permitido.' } },
      { text: { en: 'When watermark ≥ window end, fire the result.', pt: 'Quando watermark ≥ fim da janela, dispara o resultado.' } },
      { text: { en: 'Events past the watermark are late/dropped.', pt: 'Eventos após a watermark são atrasados/descartados.' } },
    ],
    code: {
      lang: 'js',
      source: `let maxSeen = 0;
function onEvent(e, allowedLatenessMs) {
  maxSeen = Math.max(maxSeen, e.eventTime);
  const watermark = maxSeen - allowedLatenessMs;
  return watermark; // windows ending <= watermark can fire
}`,
    },
    applications: [
      { en: 'Triggering windowed aggregations', pt: 'Disparar agregações em janelas' },
      { en: 'Balancing latency and correctness', pt: 'Equilibrar latência e correção' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Lookup helpers                                                      */
/* ------------------------------------------------------------------ */

export function getTopic(section: Section, slug: string): Topic | undefined {
  return topics.find((t) => t.section === section && t.slug === slug);
}

export function getTopicsBySection(section: Section): Topic[] {
  return topics.filter((t) => t.section === section);
}

export function getCategoriesBySection(section: Section): CategoryMeta[] {
  return categories.filter((c) => c.section === section);
}

export function getTopicsByCategory(section: Section, category: string): Topic[] {
  return topics.filter((t) => t.section === section && t.category === category);
}

export const sectionMeta: Record<
  Section,
  { title: Bi; subtitle: Bi; icon: string }
> = {
  algorithms: {
    title: { en: 'Algorithms', pt: 'Algoritmos' },
    subtitle: {
      en: 'Sorting, searching and graph algorithms with live, step-by-step visualizations.',
      pt: 'Algoritmos de ordenação, busca e grafos com visualizações passo a passo ao vivo.',
    },
    icon: 'Code2',
  },
  'data-structures': {
    title: { en: 'Data Structures', pt: 'Estruturas de Dados' },
    subtitle: {
      en: 'The building blocks of computing — interact with each one directly.',
      pt: 'Os blocos de construção da computação — interage diretamente com cada um.',
    },
    icon: 'Database',
  },
  'data-engineering': {
    title: { en: 'Data Engineering', pt: 'Engenharia de Dados' },
    subtitle: {
      en: 'The algorithms and patterns behind modern distributed data systems.',
      pt: 'Os algoritmos e padrões por trás dos sistemas de dados distribuídos modernos.',
    },
    icon: 'Cloud',
  },
};

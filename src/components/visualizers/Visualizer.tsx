'use client';

import type { Locale } from '@/lib/i18n';
import SortingVisualizer, { type SortAlgo } from './SortingVisualizer';
import SearchVisualizer, { type SearchAlgo } from './SearchVisualizer';
import GraphVisualizer, { type GraphAlgo } from './GraphVisualizer';
import ArrayVisualizer from './ArrayVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';
import StackQueueVisualizer from './StackQueueVisualizer';
import TreeVisualizer from './TreeVisualizer';
import HashTableVisualizer from './HashTableVisualizer';
import MapReduceVisualizer from './MapReduceVisualizer';
import BloomFilterVisualizer from './BloomFilterVisualizer';
import ConsistentHashingVisualizer from './ConsistentHashingVisualizer';
import PartitioningVisualizer from './PartitioningVisualizer';
import WindowFunctionsVisualizer from './WindowFunctionsVisualizer';
import SlidingWindowVisualizer from './SlidingWindowVisualizer';
import StreamTimelineVisualizer from './StreamTimelineVisualizer';
import CompressionVisualizer from './CompressionVisualizer';

/**
 * Dispatch a content `visualizer` id (e.g. "sorting:bubble") to the right
 * interactive component. Server pages pass only the string id + locale.
 */
export default function Visualizer({ id, locale }: { id: string; locale: Locale }) {
  const [kind, variant] = id.split(':');

  switch (kind) {
    case 'sorting':
      return <SortingVisualizer algorithm={variant as SortAlgo} locale={locale} />;
    case 'search':
      return <SearchVisualizer algorithm={variant as SearchAlgo} locale={locale} />;
    case 'graph':
      return <GraphVisualizer algorithm={variant as GraphAlgo} locale={locale} />;
    case 'array':
      return <ArrayVisualizer locale={locale} />;
    case 'linked-list':
      return <LinkedListVisualizer locale={locale} />;
    case 'stack':
      return <StackQueueVisualizer mode="stack" locale={locale} />;
    case 'queue':
      return <StackQueueVisualizer mode="queue" locale={locale} />;
    case 'bst':
      return <TreeVisualizer mode="bst" locale={locale} />;
    case 'heap':
      return <TreeVisualizer mode="heap" locale={locale} />;
    case 'hash-table':
      return <HashTableVisualizer locale={locale} />;
    case 'mapreduce':
      return <MapReduceVisualizer locale={locale} />;
    case 'bloom-filter':
      return <BloomFilterVisualizer locale={locale} />;
    case 'consistent-hashing':
      return <ConsistentHashingVisualizer locale={locale} />;
    case 'partitioning':
      return <PartitioningVisualizer locale={locale} />;
    case 'window-functions':
      return <WindowFunctionsVisualizer locale={locale} />;
    case 'sliding-window':
      return <SlidingWindowVisualizer locale={locale} />;
    case 'event-time':
      return <StreamTimelineVisualizer mode="event-time" locale={locale} />;
    case 'watermarks':
      return <StreamTimelineVisualizer mode="watermarks" locale={locale} />;
    case 'compression':
      return <CompressionVisualizer locale={locale} />;
    default:
      return null;
  }
}

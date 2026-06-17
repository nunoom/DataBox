'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({ source, lang }: { source: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-dark-700 bg-dark-950">
      <div className="flex items-center justify-between border-b border-dark-700/70 bg-dark-900/60 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wide text-dark-400">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-dark-400 transition-colors hover:bg-dark-700 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-dark-200">
        <code>{source}</code>
      </pre>
    </div>
  );
}

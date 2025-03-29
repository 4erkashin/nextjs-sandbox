'use client';

import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlock({
  title,
  lang,
  code,
}: {
  title?: string;
  lang: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-[#282a36]">
      {/* Title - Ensure it matches the border-radius */}
      {title && (
        <div className="rounded-t-lg bg-[#1e1e2e] px-3 py-1 font-mono text-xs text-gray-100">
          {title}
        </div>
      )}

      {/* Copy Button */}
      <Button
        onClick={copyToClipboard}
        size="sm"
        className="absolute top-2 right-2 rounded-md bg-[#1e1e2e] text-white"
      >
        {copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
      </Button>

      {/* Code Block */}
      <SyntaxHighlighter
        language={lang}
        style={dracula}
        customStyle={{
          padding: '16px',
          margin: 0,
          backgroundColor: '#282a36',
          borderRadius: '0 0 8px 8px', // Only round bottom if title exists
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

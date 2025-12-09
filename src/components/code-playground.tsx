'use client';

import React, { useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode: string;
  language?: string;
}

export function CodePlayground({ initialCode, language = 'javascript' }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const executeCode = () => {
    setOutput([]);
    setError(null);

    const logs: any[] = [];
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    // Capture console methods
    const captureLog = (...args: any[]) => {
      logs.push({ type: 'log', content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') });
    };
    const captureError = (...args: any[]) => {
        logs.push({ type: 'error', content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') });
    };
    const captureWarn = (...args: any[]) => {
        logs.push({ type: 'warn', content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') });
    };

    try {
      // Create a sandbox function
      // eslint-disable-next-line no-new-func
      const runUserCode = new Function('console', code);

      // Safe console object
      const safeConsole = {
        log: captureLog,
        error: captureError,
        warn: captureWarn,
      };

      runUserCode(safeConsole);
      
      // If code didn't log anything, maybe it returned a value? 
      // This is harder to capture with just `new Function` without return, 
      // but users are often taught to console.log in these exercises.
      
      setOutput(logs);

    } catch (err: any) {
      setError(err.toString());
      setOutput(logs); // Show whatever logs happened before error
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
    setOutput([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-background shadow-sm">
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
        <div className="flex space-x-2">
          <Button size="sm" onClick={executeCode} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
            <Play className="h-4 w-4" /> Run Code
          </Button>
          <Button size="sm" variant="outline" onClick={resetCode} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
           JavaScript (V8)
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Editor Area */}
        <div className="flex-1 min-h-0 border-r md:border-r-0 md:border-b-0 border-b relative">
            <Editor
                height="100%"
                defaultLanguage={language}
                defaultValue={initialCode}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme="vs-dark" // We can toggle this based on system theme later
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>

        {/* Output Area */}
        <div className="flex-1 min-h-[200px] md:min-h-0 bg-[#1e1e1e] text-white p-4 font-mono text-sm overflow-auto">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 border-b border-gray-700 pb-1">Console Output</div>
          
          {output.length === 0 && !error && (
            <div className="text-gray-500 italic mt-2">Ready to execute. Click 'Run Code'.</div>
          )}

          {output.map((log, i) => (
             <div key={i} className={`mb-1 whitespace-pre-wrap ${log.type === 'error' ? 'text-red-400' : log.type === 'warn' ? 'text-yellow-400' : 'text-gray-300'}`}>
               {log.type !== 'log' && <span className="uppercase text-[10px] mr-2 opacity-70">[{log.type}]</span>}
               {log.content}
             </div>
          ))}

          {error && (
            <div className="mt-2 text-red-400 flex items-start gap-2 bg-red-900/20 p-2 rounded border border-red-900/50">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <div className="whitespace-pre-wrap font-semibold">{error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

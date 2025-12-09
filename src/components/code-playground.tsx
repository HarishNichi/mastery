'use client';

import React, { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, AlertTriangle, Maximize2, Minimize2, Terminal } from 'lucide-react';
import * as Babel from '@babel/standalone';
import ReactDOM from 'react-dom/client';

interface CodePlaygroundProps {
  initialCode: string;
  language?: string;
  isReact?: boolean; 
}

export function CodePlayground({ initialCode, language = 'javascript', isReact = false }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const editorRef = useRef<any>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const reactRootRef = useRef<any>(null);

  // Generate a safe unique ID for the root element to avoid collisions
  const uniqueId = React.useId().replace(/:/g, '');
  const rootId = `playground-root-${uniqueId}`;

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const executeCode = () => {
    setOutput([]);
    setError(null);

    // Clean up previous React root if it exists
    if (reactRootRef.current) {
        reactRootRef.current.unmount();
        reactRootRef.current = null;
    }
    
    // Clear the root div content safely
    const rootElement = document.getElementById(rootId);
    if (rootElement) {
        rootElement.innerHTML = '';
    }

    const logs: any[] = [];
    const captureLog = (...args: any[]) => {
      logs.push({ type: 'log', content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') });
      setOutput([...logs]); // Real-time update
    };
    const captureError = (...args: any[]) => {
        logs.push({ type: 'error', content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') });
        setOutput([...logs]);
    };
    const captureWarn = (...args: any[]) => {
        logs.push({ type: 'warn', content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') });
        setOutput([...logs]);
    };

    try {
      let codeToRun = code;

      // React / JSX Transformation
      if (isReact || code.includes('React') || code.includes('<')) {
         try {
             const transformed = Babel.transform(code, {
                 presets: ['react', 'es2015']
             }).code;
             codeToRun = transformed || code;
         } catch (babelErr: any) {
             throw new Error(`Syntax Error: ${babelErr.message}`);
         }
      }

      // Safe console object
      const safeConsole = {
        log: captureLog,
        error: captureError,
        warn: captureWarn,
      };

      // Create a function with dependencies injected
      // eslint-disable-next-line no-new-func
      const runUserCode = new Function('console', 'React', 'ReactDOM', 'rootElement', codeToRun);

      // Execute
      runUserCode(safeConsole, React, ReactDOM, rootElement);

    } catch (err: any) {
      setError(err.toString());
      setOutput(logs);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
    setOutput([]);
    setError(null);
     if (reactRootRef.current) {
        reactRootRef.current.unmount();
        reactRootRef.current = null;
    }
    const rootElement = document.getElementById(rootId);
    if (rootElement) rootElement.innerHTML = '';
  };

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, error]);

  return (
    <div className={`flex flex-col border rounded-lg overflow-hidden bg-background shadow-sm transition-all duration-300 ${isFullScreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)] shadow-2xl' : 'h-[600px]'}`}>
      
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between p-3 bg-muted/60 border-b backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Button size="sm" onClick={executeCode} className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm">
            <Play className="h-4 w-4 fill-current" /> Run Code
          </Button>
          <Button size="sm" variant="outline" onClick={resetCode} className="gap-2 hover:bg-muted/80">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
             <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded border">
                {isReact ? 'React (JSX Enabled)' : 'JavaScript (V8)'}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleFullScreen} title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}>
                {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
        </div>
      </div>

      {/* Main Content Area - Split Vertical */}
      <div className="flex-1 flex flex-col min-h-0">
        
        {/* Editor (Top ~70%) */}
        <div className="flex-[3] min-h-0 relative border-b">
            <Editor
                height="100%"
                defaultLanguage={language}
                defaultValue={initialCode}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                }}
            />
        </div>

        {/* Output / Console (Bottom ~30%) */}
        <div className="flex-1 min-h-[150px] bg-[#1e1e1e] text-slate-300 flex flex-col font-mono text-sm border-t-4 border-muted/20">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Terminal className="h-3 w-3" /> Console Output
                </span>
                {/* React Render Target */}
                 <div id={rootId} className="hidden"></div>
            </div>
            
            <div ref={outputRef} className="flex-1 p-4 overflow-auto space-y-2">
                {output.length === 0 && !error && (
                    <div className="text-slate-500 italic opacity-60">
                        {/* Output placeholder */}
                        // Output will appear here...<br/>
                        // For React: ReactDOM.createRoot(rootElement).render(&lt;App /&gt;);
                    </div>
                )}

                {output.map((log, i) => (
                    <div key={i} className={`font-mono leading-relaxed border-l-2 pl-3 py-1 ${log.type === 'error' ? 'text-red-400 border-red-500 bg-red-900/10' : log.type === 'warn' ? 'text-yellow-400 border-yellow-500' : 'text-slate-300 border-green-500/50'}`}>
                        {log.content}
                    </div>
                ))}

                {error && (
                    <div className="mt-2 text-red-400 flex items-start gap-2 bg-red-950/30 p-3 rounded border border-red-900/50">
                    <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-red-500" />
                    <div className="whitespace-pre-wrap font-semibold font-mono">{error}</div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

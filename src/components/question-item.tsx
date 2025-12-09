
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import type { Question } from '@/lib/types';

interface QuestionItemProps {
  question: Question;
  isCompleted: boolean;
  onToggle: (questionId: string, isCompleted: boolean) => void;
}

// ... imports

function renderAnswer(answer: string) {
    const codeBlockRegex = /```(javascript|js|typescript|ts|jsx|tsx|vue|html|css|bash|sql|json|yaml|dockerfile|makefile)?\s*([\s\S]*?)```/g;
    const parts = answer.split(codeBlockRegex);

    return parts.map((part, index) => {
        const isCode = index % 3 === 2;
        const lang = index % 3 === 1;

        if (isCode) {
            return (
                <div key={index} className="my-6 rounded-md border bg-muted/50 p-4 shadow-sm overflow-hidden">
                    <pre className="overflow-x-auto">
                        <code className="text-sm font-mono leading-relaxed block">{part.trim()}</code>
                    </pre>
                </div>
            );
        }
        
        if (lang) return null;

        return part.split('\n').map((line, lineIndex) => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                // Bold text
                const boldRegex = /\*\*(.*?)\*\*/g;
                let finalLine = trimmedLine.replace(boldRegex, '<strong class="font-semibold text-foreground">$1</strong>');
                
                // Inline code
                const inlineCodeRegex = /`([^`]+)`/g;
                finalLine = finalLine.replace(inlineCodeRegex, '<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">$1</code>');

                // List items (basic handling)
                if (finalLine.startsWith('- ')) {
                    finalLine = finalLine.substring(2);
                    return (
                        <li key={`${index}-${lineIndex}`} className="ml-4 list-disc pl-2 mb-2" dangerouslySetInnerHTML={{ __html: finalLine }} />
                    );
                }
                
                // Headers (basic handling) - though we primarily use lists in answers
                if (finalLine.startsWith('### ')) {
                     return <h3 key={`${index}-${lineIndex}`} className="mt-6 mb-2 text-xl font-semibold tracking-tight" dangerouslySetInnerHTML={{ __html: finalLine.substring(4) }} />;
                }

                return <p key={`${index}-${lineIndex}`} className="mb-4 text-base leading-7 text-foreground/90" dangerouslySetInnerHTML={{ __html: finalLine }} />;
            }
            return null;
        });
    });
}


import { CodePlayground } from './code-playground';
import { VISUALIZER_MAP } from './dsa/visualizer-map';

export function QuestionItem({
  question,
  isCompleted,
  onToggle,
  isCoding = false,
}: QuestionItemProps & { isCoding?: boolean }) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(question.id, !isCompleted);
  };

  const VisualizerComponent = VISUALIZER_MAP[question.id];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={question.id}
        className="border rounded-lg bg-card mb-4 shadow-sm overflow-hidden transition-all hover:shadow-md"
      >
        <div className="flex items-center p-5">
          <span onClick={handleCheckboxClick} className="flex h-6 items-center pr-5 cursor-pointer hover:opacity-70 transition-opacity">
            <Checkbox id={`check-${question.id}`} checked={isCompleted} className="h-5 w-5" />
          </span>
          <AccordionTrigger className="p-0 text-left hover:no-underline flex-1 py-1">
            <span className={`text-lg font-medium leading-relaxed ${isCompleted ? 'text-muted-foreground line-through decoration-primary/50' : 'text-card-foreground'}`}>
              {question.question}
            </span>
          </AccordionTrigger>
        </div>
        <AccordionContent className="bg-muted/5 p-6 pt-2 pl-[3.5rem] border-t border-muted/20">
          <div className="max-w-[75ch] mx-auto lg:mx-0">
            {VisualizerComponent && (
                <div className="mb-8 p-4 border rounded-lg bg-background">
                <VisualizerComponent />
                </div>
            )}
            
            {isCoding && (
              <div className="mb-8">
                <p className="mb-2 text-sm text-muted-foreground font-semibold uppercase tracking-wider">Playground</p>
                <CodePlayground 
                  initialCode="// Write your solution here\n// console.log('Hello World!');\n" 
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-[65ch] prose-p:leading-loose prose-li:leading-loose prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0">
                 {isCoding && <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Solution / Explanation</p>}
                {renderAnswer(question.answer)}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

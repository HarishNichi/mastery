
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

function renderAnswer(answer: string) {
    const codeBlockRegex = /```(javascript|jsx|vue|html|bash|json)?\s*([\s\S]*?)```/g;
    const parts = answer.split(codeBlockRegex);

    return parts.map((part, index) => {
        const isCode = index % 3 === 2;
        const isLang = index % 3 === 1;

        if (isCode) {
            return (
                <pre key={index}>
                    <code>{part.trim()}</code>
                </pre>
            );
        }
        
        if (isLang) return null;

        return part.split('\n').map((line, lineIndex) => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                 // Bold text between **
                const boldRegex = /\*\*(.*?)\*\*/g;
                const boldedLine = trimmedLine.replace(boldRegex, '<strong>$1</strong>');
                
                // Inline code between `
                const inlineCodeRegex = /`([^`]+)`/g;
                const finalLine = boldedLine.replace(inlineCodeRegex, '<code>$1</code>');

                return <p key={`${index}-${lineIndex}`} dangerouslySetInnerHTML={{ __html: finalLine }} />;
            }
            return null;
        });
    });
}


export function QuestionItem({
  question,
  isCompleted,
  onToggle,
}: QuestionItemProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(question.id, !isCompleted);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={question.id}
        className="border rounded-lg bg-card"
      >
        <div className="flex items-center p-4">
            <span onClick={handleCheckboxClick} className="flex h-6 items-center pr-4">
              <Checkbox id={`check-${question.id}`} checked={isCompleted} />
            </span>
            <AccordionTrigger className="p-0 text-left hover:no-underline flex-1">
                <span className="flex-1">{question.question}</span>
            </AccordionTrigger>
        </div>
        <AccordionContent className="p-4 pt-0 pl-14">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {renderAnswer(question.answer)}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

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

export function QuestionItem({
  question,
  isCompleted,
  onToggle,
}: QuestionItemProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(question.id, !isCompleted);
  };

  const codeBlockRegex = /```(javascript|jsx|vue|html|bash|json)?\s*([\s\S]*?)```/g;
  const parts = question.answer.split(codeBlockRegex);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={question.id}
        className="border rounded-lg bg-card"
      >
        <AccordionTrigger className="p-4 text-left hover:no-underline">
          <div className="flex items-start gap-4">
            <span onClick={handleCheckboxClick} className="flex h-6 items-center">
              <Checkbox id={`check-${question.id}`} checked={isCompleted} />
            </span>
            <span className="flex-1">{question.question}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {parts.map((part, index) => {
              if (index % 3 === 2) { // The captured code block
                return (
                  <pre key={index}>
                    <code>{part.trim()}</code>
                  </pre>
                );
              }
              if (index % 3 === 0) { // The text before/after code blocks
                return part.split('\n').map((line, lineIndex) => (
                    <p key={`${index}-${lineIndex}`}>{line.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>
                ));
              }
              return null; // The language part, which we ignore for now
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

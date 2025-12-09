import { notFound } from 'next/navigation';
import { allCodingChallenges } from '@/lib/data';
import { CodePlayground } from '@/components/code-playground';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, CheckCircle } from 'lucide-react';


function renderAnswer(answer: string) {
    const codeBlockRegex = /```(javascript|jsx|vue|html|bash|json)?\s*([\s\S]*?)```/g;
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

                return <p key={`${index}-${lineIndex}`} className="mb-4 text-base leading-7 text-foreground/90" dangerouslySetInnerHTML={{ __html: finalLine }} />;
            }
            return null;
        });
    });
}

export default function ChallengeDetailPage({
  params,
}: {
  params: { challengeId: string };
}) {
  const challenge = allCodingChallenges.find((c) => c.id === params.challengeId);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          {challenge.question}
        </h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Code Playground
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodePlayground 
            initialCode="// Write your solution here\n// console.log('Hello World!');\n" 
          />
        </CardContent>
      </Card>

      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Recommended Answer
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-[65ch] prose-p:leading-loose prose-li:leading-loose prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0">
            {renderAnswer(challenge.answer)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return allCodingChallenges.map((challenge) => ({
    challengeId: challenge.id,
  }));
}
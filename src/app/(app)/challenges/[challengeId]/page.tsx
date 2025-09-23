import { notFound } from 'next/navigation';
import { allCodingChallenges } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
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
            Your Solution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write your code here..."
            className="font-code h-64"
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
          <div className="prose prose-sm max-w-none dark:prose-invert">
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
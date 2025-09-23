import Link from 'next/link';
import { allCodingChallenges } from '@/lib/data';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ChallengesPage() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Code Challenges</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Apply your knowledge with hands-on coding exercises.
        </p>
      </header>
      <div className="space-y-4">
        {allCodingChallenges.map((challenge) => (
          <Link
            href={`/challenges/${challenge.id}`}
            key={challenge.id}
            className="block"
          >
            <Card className="transition-all hover:shadow-md hover:bg-primary/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{challenge.question.split('.')[0]}</CardTitle>
                  <CardDescription className="mt-1">
                    Click to view details and solution.
                  </CardDescription>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

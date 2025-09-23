import { TutorForm } from '@/components/tutor-form';
import { Bot } from 'lucide-react';

export default function TutorPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in-50">
      <header className="mb-8 text-center">
        <div className="inline-flex rounded-full bg-primary/10 p-4">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Personalized AI Tutor
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Assess your JavaScript weak areas and get tailored learning
          recommendations.
        </p>
      </header>
      <TutorForm />
    </div>
  );
}

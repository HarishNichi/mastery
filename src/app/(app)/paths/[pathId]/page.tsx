'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { learningPaths } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuestionItem } from '@/components/question-item';

const LOCAL_STORAGE_KEY_PREFIX = 'mastery_tracks_progress_';

export default function PathDetailPage({
  params,
}: {
  params: { pathId: string };
}) {
  const path = learningPaths.find((p) => p.id === params.pathId);

  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [isClient, setIsClient] = useState(false);

  const storageKey = `${LOCAL_STORAGE_KEY_PREFIX}${params.pathId}`;

  useEffect(() => {
    setIsClient(true);
    try {
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        setCompletedQuestions(new Set(JSON.parse(savedProgress)));
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage', error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify(Array.from(completedQuestions))
        );
      } catch (error) {
        console.error('Failed to save progress to localStorage', error);
      }
    }
  }, [completedQuestions, storageKey, isClient]);

  if (!path) {
    notFound();
  }

  const handleToggleQuestion = (questionId: string, isCompleted: boolean) => {
    setCompletedQuestions((prev) => {
      const newSet = new Set(prev);
      if (isCompleted) {
        newSet.add(questionId);
      } else {
        newSet.delete(questionId);
      }
      return newSet;
    });
  };

  const totalQuestions =
    path.topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  
  const progress =
    isClient && totalQuestions > 0 ? (completedQuestions.size / totalQuestions) * 100 : 0;

  const theoreticalQuestions =
    path.topics.find((t) => t.id.includes('theoretical'))?.questions || [];
  const codingQuestions =
    path.topics.find((t) => t.id.includes('coding'))?.questions || [];

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{path.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {path.description}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            {completedQuestions.size} of {totalQuestions} questions completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} />
        </CardContent>
      </Card>

      <Tabs defaultValue="theoretical">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theoretical" disabled={!theoreticalQuestions.length}>
            Theoretical
          </TabsTrigger>
          <TabsTrigger value="coding" disabled={!codingQuestions.length}>Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theoretical">
          <div className="space-y-4">
            {theoreticalQuestions.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                isCompleted={completedQuestions.has(q.id)}
                onToggle={handleToggleQuestion}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="coding">
          <div className="space-y-4">
            {codingQuestions.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                isCompleted={completedQuestions.has(q.id)}
                onToggle={handleToggleQuestion}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

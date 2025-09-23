'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getTutorResponse } from '@/app/tutor/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  userProfile: z
    .string()
    .min(10, 'Please describe your experience in at least 10 characters.')
    .max(500, 'Profile must be 500 characters or less.'),
  javascriptTopic: z
    .string()
    .min(2, 'Please specify a JavaScript topic.')
    .max(100, 'Topic must be 100 characters or less.'),
});

type TutorResult = {
  assessment: string;
  recommendations: string;
} | null;

export function TutorForm() {
  const [result, setResult] = useState<TutorResult>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userProfile: '',
      javascriptTopic: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const response = await getTutorResponse(values);

    setIsLoading(false);
    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error,
      });
    } else if (response.data) {
      setResult(response.data);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Beginner with some experience in React, looking to improve my core JS fundamentals."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your JS experience, goals, and learning style.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="javascriptTopic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JavaScript Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Closures, Promises, or React Hooks"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The specific topic you want to improve on.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Get My Learning Plan'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Our AI tutor is analyzing your request...
          </p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in-50">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span>Your Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.assessment}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                <span>Learning Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {result.recommendations}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

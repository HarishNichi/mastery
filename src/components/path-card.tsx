import React from 'react';
import Link from 'next/link';
import type { LearningPath } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PathCard({ path }: { path: LearningPath }) {
  const Icon = path.icon;

  return (
    <Card className="glass-card group h-full flex flex-col transition-all hover:bg-primary/5 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex-grow space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
            <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <CardTitle className="text-2xl group-hover:text-primary transition-colors">{path.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{path.description}</CardDescription>
        </div>
      </CardHeader>
      
      <CardFooter className="pt-4">
        <Button asChild className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border-0 py-6 text-lg transition-all group-hover:translate-x-1">
          <Link href={`/paths/${path.id}`} className="flex items-center justify-between">
            <span className="font-semibold">Start Path</span>
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

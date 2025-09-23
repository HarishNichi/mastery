import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface Question {
  id: string;
  type: 'theoretical' | 'coding';
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  questions: Question[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  topics: Topic[];
}

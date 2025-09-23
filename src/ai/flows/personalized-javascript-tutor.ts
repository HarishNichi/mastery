'use server';

/**
 * @fileOverview An AI tutor that assesses JavaScript weak areas and provides tailored learning recommendations.
 *
 * - personalizedJavascriptTutor - A function that handles the personalized tutoring process.
 * - PersonalizedJavascriptTutorInput - The input type for the personalizedJavascriptTutor function.
 * - PersonalizedJavascriptTutorOutput - The return type for the personalizedJavascriptTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedJavascriptTutorInputSchema = z.object({
  userProfile: z
    .string()
    .describe('Briefly describe your JavaScript experience level, goals, and preferred learning style.'),
  javascriptTopic: z
    .string()
    .describe('The specific JavaScript topic you want to improve on, e.g., Closures, Promises, or React Hooks.'),
});
export type PersonalizedJavascriptTutorInput = z.infer<typeof PersonalizedJavascriptTutorInputSchema>;

const PersonalizedJavascriptTutorOutputSchema = z.object({
  assessment: z
    .string()
    .describe('An assessment of the user\'s current understanding of the JavaScript topic.'),
  recommendations: z
    .string()
    .describe('Tailored learning resources and exercises to improve the user\'s skills in the specified topic.'),
});
export type PersonalizedJavascriptTutorOutput = z.infer<typeof PersonalizedJavascriptTutorOutputSchema>;

export async function personalizedJavascriptTutor(
  input: PersonalizedJavascriptTutorInput
): Promise<PersonalizedJavascriptTutorOutput> {
  return personalizedJavascriptTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedJavascriptTutorPrompt',
  input: {schema: PersonalizedJavascriptTutorInputSchema},
  output: {schema: PersonalizedJavascriptTutorOutputSchema},
  prompt: `You are a personalized JavaScript tutor. Your goal is to assess the user's weak areas in a specific JavaScript topic and provide tailored learning recommendations.

  First, consider the following information about the user:
  User profile: {{{userProfile}}}

  The user wants to improve on the following JavaScript topic:
  Topic: {{{javascriptTopic}}}

  Based on this information, provide an assessment of the user's current understanding and then offer tailored learning resources and exercises to improve their skills in the specified topic. Focus on practical exercises to develop proficiency.

  {{zodFormat instruction=true}}
  `, 
});

const personalizedJavascriptTutorFlow = ai.defineFlow(
  {
    name: 'personalizedJavascriptTutorFlow',
    inputSchema: PersonalizedJavascriptTutorInputSchema,
    outputSchema: PersonalizedJavascriptTutorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

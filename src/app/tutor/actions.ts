'use server';

import { personalizedJavascriptTutor as personalizedJavascriptTutorFlow } from '@/ai/flows/personalized-javascript-tutor';
import { z } from 'zod';

const PersonalizedJavascriptTutorInputSchema = z.object({
  userProfile: z.string(),
  javascriptTopic: z.string(),
});

export async function getTutorResponse(
  values: z.infer<typeof PersonalizedJavascriptTutorInputSchema>
) {
  const validatedFields = PersonalizedJavascriptTutorInputSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const result = await personalizedJavascriptTutorFlow(validatedFields.data);
    return { data: result };
  } catch (error) {
    console.error('AI Tutor Error:', error);
    return { error: 'An error occurred while generating your tutoring session. Please try again.' };
  }
}

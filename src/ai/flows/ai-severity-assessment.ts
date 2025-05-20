'use server';
/**
 * @fileOverview An AI agent that analyzes vulnerability reports and suggests severity levels.
 *
 * - assessSeverity - A function that handles the severity assessment process.
 * - AssessSeverityInput - The input type for the assessSeverity function.
 * - AssessSeverityOutput - The return type for the assessSeverity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessSeverityInputSchema = z.object({
  reportDetails: z
    .string()
    .describe('The detailed description of the vulnerability report.'),
});
export type AssessSeverityInput = z.infer<typeof AssessSeverityInputSchema>;

const AssessSeverityOutputSchema = z.object({
  suggestedSeverity: z
    .enum(['Critical', 'High', 'Medium', 'Low'])
    .describe('The suggested severity level for the vulnerability.'),
  justification: z
    .string()
    .describe('The justification for the suggested severity level.'),
});
export type AssessSeverityOutput = z.infer<typeof AssessSeverityOutputSchema>;

export async function assessSeverity(input: AssessSeverityInput): Promise<AssessSeverityOutput> {
  return assessSeverityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessSeverityPrompt',
  input: {schema: AssessSeverityInputSchema},
  output: {schema: AssessSeverityOutputSchema},
  prompt: `You are an AI assistant specialized in cybersecurity vulnerability assessment.

  Analyze the following vulnerability report details and suggest a severity level (Critical, High, Medium, or Low).
  Provide a brief justification for your assessment.

  Report Details: {{{reportDetails}}}
  \n  Ensure that the suggestedSeverity and justification are appropriate and accurate based on the provided report details.`,
});

const assessSeverityFlow = ai.defineFlow(
  {
    name: 'assessSeverityFlow',
    inputSchema: AssessSeverityInputSchema,
    outputSchema: AssessSeverityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

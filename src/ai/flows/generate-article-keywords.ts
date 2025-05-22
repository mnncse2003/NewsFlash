// This is an AI-powered code! Please review and test carefully.

'use server';

/**
 * @fileOverview A flow that generates keywords for a given article.
 *
 * - generateArticleKeywords - A function that generates keywords for a given article.
 * - GenerateArticleKeywordsInput - The input type for the generateArticleKeywords function.
 * - GenerateArticleKeywordsOutput - The return type for the generateArticleKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleKeywordsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the article for which keywords need to be generated.'),
});
export type GenerateArticleKeywordsInput = z.infer<
  typeof GenerateArticleKeywordsInputSchema
>;

const GenerateArticleKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of keywords generated for the article.'),
});
export type GenerateArticleKeywordsOutput = z.infer<
  typeof GenerateArticleKeywordsOutputSchema
>;

export async function generateArticleKeywords(
  input: GenerateArticleKeywordsInput
): Promise<GenerateArticleKeywordsOutput> {
  return generateArticleKeywordsFlow(input);
}

const generateArticleKeywordsPrompt = ai.definePrompt({
  name: 'generateArticleKeywordsPrompt',
  input: {schema: GenerateArticleKeywordsInputSchema},
  output: {schema: GenerateArticleKeywordsOutputSchema},
  prompt: `You are an expert in generating keywords for news articles.
  Given the content of the article, generate a list of keywords that are relevant to the article.
  The keywords should be specific and descriptive.
  Article Content: {{{articleContent}}}
  Keywords:`,
});

const generateArticleKeywordsFlow = ai.defineFlow(
  {
    name: 'generateArticleKeywordsFlow',
    inputSchema: GenerateArticleKeywordsInputSchema,
    outputSchema: GenerateArticleKeywordsOutputSchema,
  },
  async input => {
    const {output} = await generateArticleKeywordsPrompt(input);
    return output!;
  }
);

'use server';

import { summarizeArticle as summarizeArticleFlow } from '@/ai/flows/summarize-article';
import { generateArticleKeywords as generateKeywordsFlow } from '@/ai/flows/generate-article-keywords';
import { getMockArticleById, getMockArticles, getMockCategories } from '@/lib/mock-data';
import type { Article } from '@/types';

export async function fetchArticles(): Promise<Article[]> {
  return getMockArticles();
}

export async function fetchArticleById(id: string): Promise<Article | undefined> {
  return getMockArticleById(id);
}

export async function fetchCategories(): Promise<string[]> {
  return getMockCategories();
}

export async function summarizeArticleAction(
  articleContent: string
): Promise<{ summary?: string; error?: string }> {
  if (!articleContent.trim()) {
    return { error: 'Article content cannot be empty.' };
  }
  try {
    const result = await summarizeArticleFlow({ articleContent });
    return { summary: result.summary };
  } catch (error) {
    console.error('Error summarizing article:', error);
    return { error: 'Failed to summarize article. Please try again.' };
  }
}

export async function generateKeywordsAction(
  articleContent: string
): Promise<{ keywords?: string[]; error?: string }> {
  if (!articleContent.trim()) {
    return { error: 'Article content cannot be empty.' };
  }
  try {
    const result = await generateKeywordsFlow({ articleContent });
    return { keywords: result.keywords };
  } catch (error)
  {
    console.error('Error generating keywords:', error);
    return { error: 'Failed to generate keywords. Please try again.' };
  }
}

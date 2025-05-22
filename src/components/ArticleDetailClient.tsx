'use client';

import type { Article } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { summarizeArticleAction, generateKeywordsAction } from '@/actions/newsActions';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, BookOpenText, Brain, CalendarDays, Loader2, Tag, Tags, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ArticleDetailClientProps {
  article: Article;
}

export function ArticleDetailClient({ article }: ArticleDetailClientProps) {
  const [summary, setSummary] = useState<string | null>(article.summary || null);
  const [keywords, setKeywords] = useState<string[] | null>(article.keywords || null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary(null);
    const result = await summarizeArticleAction(article.content);
    if (result.summary) {
      setSummary(result.summary);
      toast({ title: 'Success', description: 'Article summarized successfully.' });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to summarize article.',
        variant: 'destructive',
      });
    }
    setIsSummarizing(false);
  };

  const handleGenerateKeywords = async () => {
    setIsGeneratingKeywords(true);
    setKeywords(null);
    const result = await generateKeywordsAction(article.content);
    if (result.keywords) {
      setKeywords(result.keywords);
      toast({ title: 'Success', description: 'Keywords generated successfully.' });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to generate keywords.',
        variant: 'destructive',
      });
    }
    setIsGeneratingKeywords(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden shadow-xl rounded-lg">
        <CardHeader className="p-0 relative">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint={article.dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-6">
            <Badge variant="secondary" className="mb-2 bg-opacity-80 backdrop-blur-sm">{article.category}</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white leading-tight shadow-text">
              {article.title}
            </CardTitle>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-200">
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-4 w-4" />
                <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <UserCircle className="h-4 w-4" />
                <span>{article.source}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Button onClick={handleSummarize} disabled={isSummarizing} className="w-full md:w-auto bg-primary hover:bg-primary/90">
              {isSummarizing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Brain className="mr-2 h-4 w-4" />
              )}
              {summary && !isSummarizing ? 'Re-Summarize with AI' : 'Summarize with AI'}
            </Button>
            <Button onClick={handleGenerateKeywords} disabled={isGeneratingKeywords} className="w-full md:w-auto bg-accent hover:bg-accent/90">
              {isGeneratingKeywords ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Tags className="mr-2 h-4 w-4" />
              )}
              {keywords && !isGeneratingKeywords ? 'Re-Generate Keywords' : 'Generate Keywords'}
            </Button>
          </div>

          {summary && (
            <Card className="mb-6 bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Generated Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">{summary}</p>
              </CardContent>
            </Card>
          )}
          {isSummarizing && !summary && (
             <Alert className="mb-6">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <AlertTitle>Summarizing...</AlertTitle>
                <AlertDescription>
                  Our AI is working hard to summarize this article for you. Please wait a moment.
                </AlertDescription>
              </Alert>
          )}

          {keywords && keywords.length > 0 && (
            <Card className="mb-6 bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Tags className="mr-2 h-5 w-5 text-accent" />
                  AI Generated Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-sm">{keyword}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
           {isGeneratingKeywords && !keywords && (
             <Alert className="mb-6">
                <Loader2 className="h-5 w-5 animate-spin text-accent" />
                <AlertTitle>Generating Keywords...</AlertTitle>
                <AlertDescription>
                  Our AI is extracting relevant keywords. This might take a few seconds.
                </AlertDescription>
              </Alert>
          )}


          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3 className="text-2xl font-semibold mb-3 flex items-center">
              <BookOpenText className="mr-2 h-6 w-6" />
              Full Article
            </h3>
            <p className="whitespace-pre-line text-foreground/90 leading-relaxed">{article.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

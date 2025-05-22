import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/types';
import { CalendarDays, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const snippetLength = 150;
  const summaryOrSnippet = article.summary || (article.content.length > snippetLength ? article.content.substring(0, snippetLength) + '...' : article.content);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <Link href={`/article/${article.id}`} aria-label={`Read more about ${article.title}`}>
          <div className="relative w-full h-48">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              data-ai-hint={article.dataAiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/article/${article.id}`} className="hover:underline">
          <CardTitle className="text-xl font-semibold mb-2 leading-tight">{article.title}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">
          {summaryOrSnippet}
        </p>
        
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Tag className="h-4 w-4" />
          <Badge variant="secondary" className="whitespace-nowrap">{article.category}</Badge>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

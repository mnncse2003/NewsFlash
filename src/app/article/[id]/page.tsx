import { fetchArticleById } from '@/actions/newsActions';
import { ArticleDetailClient } from '@/components/ArticleDetailClient';
import { Header } from '@/components/Header'; // Re-using header for consistent navigation
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticleById(params.id);

  if (!article) {
    notFound();
  }
  
  // A simple header for the article page, could be enhanced
  const SimpleHeader = () => (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-primary truncate hidden sm:block" style={{maxWidth: 'calc(100% - 150px)'}}>
          {article.title}
        </h1>
        <div /> {/* Spacer */}
      </div>
    </header>
  );


  return (
    <>
      <SimpleHeader />
      <ArticleDetailClient article={article} />
    </>
  );
}

export async function generateStaticParams() {
  // This is optional, but good for performance if you have a fixed set of articles
  // For dynamic content, you might not use this or fetch a limited set of recent/popular articles
  // For now, we'll keep it empty as mock data might change.
  // const articles = await fetchArticles();
  // return articles.map((article) => ({
  //   id: article.id,
  // }));
  return [];
}

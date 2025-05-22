'use client';

import { useState, useMemo, type ChangeEvent } from 'react';
import type { Article } from '@/types';
import { ArticleCard } from '@/components/ArticleCard';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface NewsFeedClientProps {
  initialArticles: Article[];
  categories: string[];
}

export function NewsFeedClient({ initialArticles, categories }: NewsFeedClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredArticles = useMemo(() => {
    return initialArticles
      .filter(article =>
        selectedCategory === 'All' || article.category === selectedCategory
      )
      .filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.keywords && article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())))
      );
  }, [initialArticles, searchTerm, selectedCategory]);

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Filter by Category</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}
      </main>
    </>
  );
}

import Link from 'next/link';
import { Newspaper, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ChangeEventHandler } from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Newspaper className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">NewsFlash</h1>
        </Link>
        <div className="relative w-full sm:w-auto max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={onSearchChange}
            aria-label="Search articles"
          />
        </div>
      </div>
    </header>
  );
}

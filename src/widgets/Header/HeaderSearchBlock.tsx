'use client';

import { Search } from 'lucide-react';

import { Input } from '@/shared/ui/input';

export default function HeaderSearchBlock() {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="검색..."
        className="w-64 pl-9 bg-background"
      />
    </div>
  );
}

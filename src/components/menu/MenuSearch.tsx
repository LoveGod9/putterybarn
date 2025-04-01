
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MenuSearchProps {
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuSearch = ({
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange
}: MenuSearchProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search menu items..." 
              className="pl-10"
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={category === activeCategory ? "default" : "outline"}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuSearch;

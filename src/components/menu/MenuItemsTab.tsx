
import React from 'react';
import { MenuItem } from '@/types/menu';
import MenuSearch from './MenuSearch';
import MenuItemsTable from './MenuItemsTable';

interface MenuItemsTabProps {
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  filteredMenuItems: MenuItem[];
  onCategoryChange: (category: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: (item: MenuItem) => void;
  onToggleDisable: (item: MenuItem) => void;
  loading: boolean;
}

const MenuItemsTab = ({ 
  categories,
  activeCategory,
  searchQuery,
  filteredMenuItems,
  onCategoryChange,
  onSearchChange,
  onEditClick,
  onToggleDisable,
  loading
}: MenuItemsTabProps) => {
  return (
    <div className="space-y-4 mt-6">
      {/* Search and Filter */}
      <MenuSearch 
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
      />
      
      {/* Menu Items Table */}
      <MenuItemsTable 
        filteredMenuItems={filteredMenuItems}
        onEditClick={onEditClick}
        onToggleDisable={onToggleDisable}
        loading={loading}
      />
    </div>
  );
};

export default MenuItemsTab;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface MenuHeaderProps {
  onAddClick: () => void;
}

const MenuHeader = ({ onAddClick }: MenuHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Menu Engineering</h1>
        <p className="text-gray-500 mt-2">Analyze and optimize your menu performance</p>
      </div>
      <Button onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" /> Add Menu Item
      </Button>
    </div>
  );
};

export default MenuHeader;

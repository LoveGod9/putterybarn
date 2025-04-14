
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileBarChart } from 'lucide-react';

interface MenuHeaderProps {
  onAddClick: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MenuHeader = ({ onAddClick, activeTab, setActiveTab }: MenuHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Menu Engineering</h1>
          <p className="text-gray-500 mt-2">Analyze and optimize your menu performance</p>
        </div>
        <Button onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Menu Item
        </Button>
      </div>
      
      <div className="flex space-x-2 border-b">
        <Button
          variant={activeTab === 'items' ? 'default' : 'ghost'}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2"
          data-state={activeTab === 'items' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('items')}
        >
          Menu Items
        </Button>
        <Button
          variant={activeTab === 'analysis' ? 'default' : 'ghost'}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2"
          data-state={activeTab === 'analysis' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('analysis')}
        >
          <FileBarChart className="mr-2 h-4 w-4" />
          Analysis
        </Button>
      </div>
    </div>
  );
};

export default MenuHeader;

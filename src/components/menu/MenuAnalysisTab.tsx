
import React from 'react';
import { MenuItem } from '@/types/menu';
import ProfitableItemsCard from './ProfitableItemsCard';
import PopularItemsCard from './PopularItemsCard';
import OptimizationSuggestions from './OptimizationSuggestions';

interface MenuAnalysisTabProps {
  menuItems: MenuItem[];
}

const MenuAnalysisTab = ({ menuItems }: MenuAnalysisTabProps) => {
  return (
    <div className="space-y-6 mt-6">
      {/* Profitability Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitableItemsCard menuItems={menuItems} />
        <PopularItemsCard menuItems={menuItems} />
      </div>
      
      {/* Menu Optimization Suggestions */}
      <OptimizationSuggestions menuItems={menuItems} />
    </div>
  );
};

export default MenuAnalysisTab;

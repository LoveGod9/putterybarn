
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MenuItem } from '@/types/menu';

interface ProfitableItemsCardProps {
  menuItems: MenuItem[];
}

const ProfitableItemsCard = ({ menuItems }: ProfitableItemsCardProps) => {
  const topProfitableItems = [...menuItems]
    .filter(item => !item.disabled)
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Profitable Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProfitableItems.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-green-600 font-medium">${item.profit.toFixed(2)}</span>
              </div>
              <Progress value={100 - (index * 15)} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitableItemsCard;

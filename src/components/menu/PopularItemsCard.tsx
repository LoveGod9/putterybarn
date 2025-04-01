
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MenuItem } from '@/types/menu';

interface PopularItemsCardProps {
  menuItems: MenuItem[];
}

const PopularItemsCard = ({ menuItems }: PopularItemsCardProps) => {
  const topPopularItems = [...menuItems]
    .filter(item => !item.disabled)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Popular Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPopularItems.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="font-medium">{item.sold} sold</span>
              </div>
              <Progress value={100 - (index * 15)} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularItemsCard;

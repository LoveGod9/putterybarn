
import React from 'react';
import { Edit, Ban, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItem } from '@/types/menu';

interface MenuItemsTableProps {
  filteredMenuItems: MenuItem[];
  onEditClick: (item: MenuItem) => void;
  onToggleDisable: (item: MenuItem) => void;
}

const MenuItemsTable = ({ 
  filteredMenuItems, 
  onEditClick, 
  onToggleDisable 
}: MenuItemsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Profit</th>
                <th className="px-4 py-3">Units Sold</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenuItems.map((item) => (
                <tr key={item.id} className={`bg-white border-b ${item.disabled ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">${item.cost.toFixed(2)}</td>
                  <td className="px-4 py-3">${item.profit.toFixed(2)} ({item.profitMargin.toFixed(1)}%)</td>
                  <td className="px-4 py-3">{item.sold}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEditClick(item)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={item.disabled ? "text-green-600" : "text-red-600"}
                        onClick={() => onToggleDisable(item)}
                      >
                        {item.disabled ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Enable
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Disable
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemsTable;

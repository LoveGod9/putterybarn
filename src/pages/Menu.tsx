
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Search, Edit, Ban, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

// Sample menu data
const initialMenuItems = [
  { 
    id: 1, 
    name: 'Signature Burger', 
    category: 'Main Course', 
    price: 16.99, 
    cost: 5.85,
    profit: 11.14, 
    profitMargin: 65.6,
    sold: 145,
    popularity: 85,
    disabled: false
  },
  { 
    id: 2, 
    name: 'Truffle Fries', 
    category: 'Sides', 
    price: 9.99, 
    cost: 3.85,
    profit: 6.14, 
    profitMargin: 61.5,
    sold: 120,
    popularity: 75,
    disabled: false
  },
  { 
    id: 3, 
    name: 'Classic Mojito', 
    category: 'Beverages', 
    price: 12.99, 
    cost: 3.99,
    profit: 9.00, 
    profitMargin: 69.3,
    sold: 98,
    popularity: 65,
    disabled: false
  },
  { 
    id: 4, 
    name: 'Chocolate Lava Cake', 
    category: 'Desserts', 
    price: 10.99, 
    cost: 2.99,
    profit: 8.00, 
    profitMargin: 72.8,
    sold: 75,
    popularity: 60,
    disabled: false
  },
  { 
    id: 5, 
    name: 'Caesar Salad', 
    category: 'Starters', 
    price: 12.99, 
    cost: 4.25,
    profit: 8.74, 
    profitMargin: 67.3,
    sold: 68,
    popularity: 55,
    disabled: false
  },
  { 
    id: 6, 
    name: 'Grilled Salmon', 
    category: 'Main Course', 
    price: 24.99, 
    cost: 9.75,
    profit: 15.24, 
    profitMargin: 61.0,
    sold: 60,
    popularity: 50,
    disabled: false
  },
];

// Categories
const categories = ['All', 'Main Course', 'Sides', 'Beverages', 'Desserts', 'Starters'];

interface MenuItem {
  id: number; 
  name: string; 
  category: string; 
  price: number; 
  cost: number;
  profit: number; 
  profitMargin: number;
  sold: number;
  popularity: number;
  disabled: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);
  const [itemToToggle, setItemToToggle] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  // Filtered menu items based on category and search
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingItem({...item});
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingItem) {
      // Calculate new profit and profit margin
      const profit = editingItem.price - editingItem.cost;
      const profitMargin = (profit / editingItem.price) * 100;
      
      const updatedItem = {
        ...editingItem,
        profit: parseFloat(profit.toFixed(2)),
        profitMargin: parseFloat(profitMargin.toFixed(1))
      };

      // Update the menu items
      setMenuItems(menuItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ));

      toast({
        title: "Item updated",
        description: `${updatedItem.name} has been updated successfully.`
      });

      setIsEditDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleToggleDisable = (item: MenuItem) => {
    setItemToToggle(item);
    setIsDisableDialogOpen(true);
  };

  const confirmToggleDisable = () => {
    if (itemToToggle) {
      const updatedItems = menuItems.map(item => 
        item.id === itemToToggle.id ? { ...item, disabled: !item.disabled } : item
      );
      
      setMenuItems(updatedItems);
      
      toast({
        title: itemToToggle.disabled ? "Item enabled" : "Item disabled",
        description: `${itemToToggle.name} has been ${itemToToggle.disabled ? "enabled" : "disabled"}.`
      });
      
      setIsDisableDialogOpen(false);
      setItemToToggle(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof MenuItem) => {
    if (editingItem) {
      const value = field === 'name' || field === 'category' 
        ? e.target.value 
        : parseFloat(e.target.value);
      
      setEditingItem({
        ...editingItem,
        [field]: value
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Menu Engineering</h1>
          <p className="text-gray-500 mt-2">Analyze and optimize your menu performance</p>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="items">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="analysis">Profitability Analysis</TabsTrigger>
          </TabsList>
          
          {/* Menu Items Tab */}
          <TabsContent value="items" className="space-y-4 mt-6">
            {/* Search and Filter */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search menu items..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                      <Button 
                        key={category} 
                        variant={category === activeCategory ? "default" : "outline"}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Menu Items Table */}
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
                                onClick={() => handleEditClick(item)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className={item.disabled ? "text-green-600" : "text-red-600"}
                                onClick={() => handleToggleDisable(item)}
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
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6 mt-6">
            {/* Profitability Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Profitable Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...menuItems]
                      .filter(item => !item.disabled)
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 5)
                      .map((item, index) => (
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...menuItems]
                      .filter(item => !item.disabled)
                      .sort((a, b) => b.sold - a.sold)
                      .slice(0, 5)
                      .map((item, index) => (
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
            </div>
            
            {/* Menu Optimization Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Optimization Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Highlight Signature Burger</h4>
                      <p className="text-muted-foreground text-sm">Your most popular and profitable item should be featured prominently on the menu.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Bundle Truffle Fries</h4>
                      <p className="text-muted-foreground text-sm">Create a combo deal with your popular sides to increase average order value.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Review Grilled Salmon pricing</h4>
                      <p className="text-muted-foreground text-sm">Consider adjusting the price to improve the profit margin while maintaining competitiveness.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Menu Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Make changes to the menu item. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          {editingItem && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    value={editingItem.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Input
                    id="category"
                    value={editingItem.category}
                    onChange={(e) => handleInputChange(e, 'category')}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="price">Price ($)</FormLabel>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingItem.price}
                      onChange={(e) => handleInputChange(e, 'price')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="cost">Cost ($)</FormLabel>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingItem.cost}
                      onChange={(e) => handleInputChange(e, 'cost')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="sold">Units Sold</FormLabel>
                  <Input
                    id="sold"
                    type="number"
                    min="0"
                    value={editingItem.sold}
                    onChange={(e) => handleInputChange(e, 'sold')}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disable/Enable Confirmation Dialog */}
      <Dialog open={isDisableDialogOpen} onOpenChange={setIsDisableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {itemToToggle?.disabled ? 'Enable Menu Item' : 'Disable Menu Item'}
            </DialogTitle>
            <DialogDescription>
              {itemToToggle?.disabled 
                ? `Are you sure you want to enable ${itemToToggle?.name}? It will be visible to customers again.`
                : `Are you sure you want to disable ${itemToToggle?.name}? It will be hidden from customers.`}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDisableDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmToggleDisable}
              variant={itemToToggle?.disabled ? "default" : "destructive"}
            >
              {itemToToggle?.disabled ? 'Enable' : 'Disable'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Menu;

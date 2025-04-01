import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { MenuItem } from '@/types/menu';
import MenuSearch from '@/components/menu/MenuSearch';
import MenuItemsTable from '@/components/menu/MenuItemsTable';
import EditMenuItemDialog from '@/components/menu/EditMenuItemDialog';
import DisableMenuItemDialog from '@/components/menu/DisableMenuItemDialog';
import ProfitableItemsCard from '@/components/menu/ProfitableItemsCard';
import PopularItemsCard from '@/components/menu/PopularItemsCard';
import OptimizationSuggestions from '@/components/menu/OptimizationSuggestions';

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
            <MenuSearch 
              categories={categories}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
            />
            
            {/* Menu Items Table */}
            <MenuItemsTable 
              filteredMenuItems={filteredMenuItems}
              onEditClick={handleEditClick}
              onToggleDisable={handleToggleDisable}
            />
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6 mt-6">
            {/* Profitability Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProfitableItemsCard menuItems={menuItems} />
              <PopularItemsCard menuItems={menuItems} />
            </div>
            
            {/* Menu Optimization Suggestions */}
            <OptimizationSuggestions />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Menu Item Dialog */}
      <EditMenuItemDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingItem={editingItem}
        onInputChange={handleInputChange}
        onSave={handleEditSave}
      />

      {/* Disable/Enable Confirmation Dialog */}
      <DisableMenuItemDialog 
        isOpen={isDisableDialogOpen}
        onOpenChange={setIsDisableDialogOpen}
        itemToToggle={itemToToggle}
        onConfirm={confirmToggleDisable}
      />
    </Layout>
  );
};

export default Menu;

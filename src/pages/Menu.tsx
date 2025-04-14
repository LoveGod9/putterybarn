
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import MenuSearch from '@/components/menu/MenuSearch';
import MenuItemsTable from '@/components/menu/MenuItemsTable';
import EditMenuItemDialog from '@/components/menu/EditMenuItemDialog';
import DisableMenuItemDialog from '@/components/menu/DisableMenuItemDialog';
import ProfitableItemsCard from '@/components/menu/ProfitableItemsCard';
import PopularItemsCard from '@/components/menu/PopularItemsCard';
import OptimizationSuggestions from '@/components/menu/OptimizationSuggestions';
import AddMenuItemDialog from '@/components/menu/AddMenuItemDialog';
import { useMenuItems } from '@/hooks/useMenuItems';

// Categories
const categories = ['All', 'Main Course', 'Sides', 'Beverages', 'Desserts', 'Starters'];

const Menu = () => {
  const { 
    menuItems, 
    loading, 
    addMenuItem, 
    updateMenuItem, 
    toggleDisableMenuItem 
  } = useMenuItems();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);
  const [itemToToggle, setItemToToggle] = useState<MenuItem | null>(null);

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

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditSave = async (data: any) => {
    if (editingItem) {
      await updateMenuItem(editingItem.id, {
        ...editingItem,
        ...data
      });
      setEditingItem(null);
    }
  };

  const handleAddSave = async (data: any) => {
    await addMenuItem(data);
  };

  const handleToggleDisable = (item: MenuItem) => {
    setItemToToggle(item);
    setIsDisableDialogOpen(true);
  };

  const confirmToggleDisable = async () => {
    if (itemToToggle) {
      await toggleDisableMenuItem(itemToToggle.id, itemToToggle.disabled);
      setIsDisableDialogOpen(false);
      setItemToToggle(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Menu Engineering</h1>
            <p className="text-gray-500 mt-2">Analyze and optimize your menu performance</p>
          </div>
          <Button onClick={handleAddClick}>
            <Plus className="mr-2 h-4 w-4" /> Add Menu Item
          </Button>
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
              loading={loading}
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

      {/* Add Menu Item Dialog */}
      <AddMenuItemDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddSave}
      />

      {/* Edit Menu Item Dialog */}
      <EditMenuItemDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingItem={editingItem}
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

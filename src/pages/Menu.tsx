
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItem } from '@/types/menu';
import AddMenuItemDialog from '@/components/menu/AddMenuItemDialog';
import EditMenuItemDialog from '@/components/menu/EditMenuItemDialog';
import DisableMenuItemDialog from '@/components/menu/DisableMenuItemDialog';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuItemsTab from '@/components/menu/MenuItemsTab';
import MenuAnalysisTab from '@/components/menu/MenuAnalysisTab';
import { useMenuPage } from '@/hooks/useMenuPage';

const Menu = () => {
  const {
    menuItems,
    filteredMenuItems,
    loading,
    activeCategory,
    searchQuery,
    editingItem,
    isEditDialogOpen,
    isAddDialogOpen,
    isDisableDialogOpen,
    itemToToggle,
    categories,
    
    handleCategoryChange,
    handleSearchChange,
    handleEditClick,
    handleAddClick,
    handleEditSave,
    handleAddSave,
    handleToggleDisable,
    confirmToggleDisable,
    setIsEditDialogOpen,
    setIsAddDialogOpen,
    setIsDisableDialogOpen
  } = useMenuPage();

  return (
    <Layout>
      <div className="space-y-6">
        <MenuHeader onAddClick={handleAddClick} />
        
        {/* Tabs for different views */}
        <Tabs defaultValue="items">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="analysis">Profitability Analysis</TabsTrigger>
          </TabsList>
          
          {/* Menu Items Tab */}
          <TabsContent value="items">
            <MenuItemsTab 
              categories={categories}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              filteredMenuItems={filteredMenuItems}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
              onEditClick={handleEditClick}
              onToggleDisable={handleToggleDisable}
              loading={loading}
            />
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <MenuAnalysisTab menuItems={menuItems} />
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

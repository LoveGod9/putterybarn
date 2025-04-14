
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuItemsTab from '@/components/menu/MenuItemsTab';
import MenuAnalysisTab from '@/components/menu/MenuAnalysisTab';
import AddMenuItemDialog from '@/components/menu/AddMenuItemDialog';
import EditMenuItemDialog from '@/components/menu/EditMenuItemDialog';
import DisableMenuItemDialog from '@/components/menu/DisableMenuItemDialog';
import { useMenuPage } from '@/hooks/useMenuPage';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('items');
  
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
      <MenuHeader 
        onAddClick={handleAddClick} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {activeTab === 'items' ? (
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
      ) : (
        <MenuAnalysisTab menuItems={menuItems} />
      )}
      
      {/* Dialogs */}
      <AddMenuItemDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddSave}
        categories={categories.filter(cat => cat !== 'All')}
      />
      
      <EditMenuItemDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        item={editingItem}
        onSave={handleEditSave}
        categories={categories.filter(cat => cat !== 'All')}
      />
      
      <DisableMenuItemDialog
        open={isDisableDialogOpen}
        onOpenChange={setIsDisableDialogOpen}
        item={itemToToggle}
        onConfirm={confirmToggleDisable}
      />
    </Layout>
  );
};

export default Menu;

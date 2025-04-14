
import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { useMenuItems } from '@/hooks/useMenuItems';

// Categories
const MENU_CATEGORIES = ['All', 'Main Course', 'Sides', 'Beverages', 'Desserts', 'Starters'];

export const useMenuPage = () => {
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

  return {
    // Data
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
    categories: MENU_CATEGORIES,
    
    // Methods
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
  };
};

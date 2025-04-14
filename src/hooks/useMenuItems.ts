
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MenuItem } from '@/types/menu';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          cost: Number(item.cost),
          profit: Number(item.profit),
          profitMargin: Number(item.profit_margin),
          sold: item.sold,
          popularity: item.popularity,
          disabled: item.disabled
        }));
        setMenuItems(formattedData);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({
        title: 'Error fetching menu items',
        description: 'There was an error fetching menu items. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'profit' | 'profitMargin' | 'popularity' | 'disabled'>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([{
          name: item.name,
          category: item.category,
          price: item.price,
          cost: item.cost,
          sold: item.sold,
          popularity: Math.min(100, item.sold)
        }])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        toast({
          title: 'Menu item added',
          description: `${item.name} has been added successfully.`
        });
        await fetchMenuItems();
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast({
        title: 'Error adding menu item',
        description: 'There was an error adding the menu item. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const updateMenuItem = async (id: string | number, item: Partial<MenuItem>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({
          name: item.name,
          category: item.category,
          price: item.price,
          cost: item.cost,
          sold: item.sold,
          popularity: Math.min(100, item.sold || 0)
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Menu item updated',
        description: `${item.name} has been updated successfully.`
      });
      await fetchMenuItems();
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast({
        title: 'Error updating menu item',
        description: 'There was an error updating the menu item. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const toggleDisableMenuItem = async (id: string | number, disabled: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ disabled: !disabled })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: disabled ? 'Menu item enabled' : 'Menu item disabled',
        description: `The menu item has been ${disabled ? 'enabled' : 'disabled'}.`
      });
      await fetchMenuItems();
    } catch (error) {
      console.error('Error toggling menu item status:', error);
      toast({
        title: 'Error updating menu item',
        description: 'There was an error updating the menu item. Please try again.',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    addMenuItem,
    updateMenuItem,
    toggleDisableMenuItem,
    refreshMenuItems: fetchMenuItems
  };
};

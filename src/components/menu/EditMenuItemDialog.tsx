
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { MenuItem } from '@/types/menu';

interface EditMenuItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: MenuItem | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof MenuItem) => void;
  onSave: () => void;
}

const EditMenuItemDialog = ({
  isOpen,
  onOpenChange,
  editingItem,
  onInputChange,
  onSave
}: EditMenuItemDialogProps) => {
  if (!editingItem) return null;

  // Create a form instance even though we're handling inputs manually
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      cost: 0,
      sold: 0
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogDescription>
            Make changes to the menu item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <FormProvider {...form}>
          <Form {...form}>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 gap-4">
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      value={editingItem.name}
                      onChange={(e) => onInputChange(e, 'name')}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormControl>
                    <Input
                      id="category"
                      value={editingItem.category}
                      onChange={(e) => onInputChange(e, 'category')}
                    />
                  </FormControl>
                </FormItem>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel htmlFor="price">Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingItem.price}
                        onChange={(e) => onInputChange(e, 'price')}
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel htmlFor="cost">Cost ($)</FormLabel>
                    <FormControl>
                      <Input
                        id="cost"
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingItem.cost}
                        onChange={(e) => onInputChange(e, 'cost')}
                      />
                    </FormControl>
                  </FormItem>
                </div>
                
                <FormItem>
                  <FormLabel htmlFor="sold">Units Sold</FormLabel>
                  <FormControl>
                    <Input
                      id="sold"
                      type="number"
                      min="0"
                      value={editingItem.sold}
                      onChange={(e) => onInputChange(e, 'sold')}
                    />
                  </FormControl>
                </FormItem>
              </div>
            </div>
          </Form>
        </FormProvider>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenuItemDialog;

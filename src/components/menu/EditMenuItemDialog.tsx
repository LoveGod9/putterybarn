
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogDescription>
            Make changes to the menu item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                value={editingItem.name}
                onChange={(e) => onInputChange(e, 'name')}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="category">Category</FormLabel>
              <Input
                id="category"
                value={editingItem.category}
                onChange={(e) => onInputChange(e, 'category')}
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
                  onChange={(e) => onInputChange(e, 'price')}
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
                  onChange={(e) => onInputChange(e, 'cost')}
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
                onChange={(e) => onInputChange(e, 'sold')}
              />
            </div>
          </div>
        </div>

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

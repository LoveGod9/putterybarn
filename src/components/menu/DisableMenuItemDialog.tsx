
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/types/menu';

interface DisableMenuItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemToToggle: MenuItem | null;
  onConfirm: () => void;
}

const DisableMenuItemDialog = ({
  isOpen,
  onOpenChange,
  itemToToggle,
  onConfirm
}: DisableMenuItemDialogProps) => {
  if (!itemToToggle) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {itemToToggle.disabled ? 'Enable Menu Item' : 'Disable Menu Item'}
          </DialogTitle>
          <DialogDescription>
            {itemToToggle.disabled 
              ? `Are you sure you want to enable ${itemToToggle.name}? It will be visible to customers again.`
              : `Are you sure you want to disable ${itemToToggle.name}? It will be hidden from customers.`}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            variant={itemToToggle.disabled ? "default" : "destructive"}
          >
            {itemToToggle.disabled ? 'Enable' : 'Disable'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisableMenuItemDialog;

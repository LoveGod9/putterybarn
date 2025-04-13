
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddStaffForm from './forms/AddStaffForm';

interface AddStaffDialogProps {
  onStaffAdded: () => void;
}

const AddStaffDialog = ({ onStaffAdded }: AddStaffDialogProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Staff</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <AddStaffForm
          onStaffAdded={onStaffAdded}
          onOpenChange={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffDialog;

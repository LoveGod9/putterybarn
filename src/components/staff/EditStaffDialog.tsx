
import React, { useEffect } from 'react';
import { StaffMember } from '@/types/staff';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import StaffForm from './forms/StaffForm';

interface EditStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffMember | null;
  onStaffUpdated: () => void;
}

const EditStaffDialog = ({ 
  open, 
  onOpenChange, 
  staff, 
  onStaffUpdated 
}: EditStaffDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
        </DialogHeader>
        <StaffForm 
          staff={staff} 
          onStaffUpdated={onStaffUpdated} 
          onOpenChange={onOpenChange} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditStaffDialog;

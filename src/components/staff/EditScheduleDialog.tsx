
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import EditScheduleForm from './forms/EditScheduleForm';

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId: string;
  dayOfWeek: string;
  onScheduleUpdated: () => void;
}

const EditScheduleDialog = ({ 
  open, 
  onOpenChange, 
  staffId, 
  dayOfWeek, 
  onScheduleUpdated 
}: EditScheduleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">Edit {dayOfWeek} Schedule</DialogTitle>
        </DialogHeader>
        <EditScheduleForm
          staffId={staffId}
          dayOfWeek={dayOfWeek}
          onScheduleUpdated={onScheduleUpdated}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditScheduleDialog;

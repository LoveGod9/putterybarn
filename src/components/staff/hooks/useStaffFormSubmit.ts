
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { staffSupabase } from "@/integrations/supabase/staffClient";
import { StaffMember } from '@/types/staff';
import { StaffFormValues } from '../validation/staffFormSchema';

interface UseStaffFormSubmitProps {
  staff: StaffMember | null;
  onSuccess: () => void;
  onClose: (open: boolean) => void;
}

export const useStaffFormSubmit = ({ staff, onSuccess, onClose }: UseStaffFormSubmitProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: StaffFormValues) => {
    if (!staff) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert monthly pay to hourly rate for database
      const hourlyRate = values.monthly_pay / 160; // Assuming 160 hours per month
      
      const { error } = await staffSupabase
        .from('staff_members')
        .update({
          name: values.name,
          position: values.position,
          department: values.department,
          hourly_rate: hourlyRate,
          status: values.status
        })
        .eq('id', staff.id);
      
      if (error) throw error;
      
      toast({
        title: "Staff Updated",
        description: "The staff member has been updated successfully."
      });
      
      onClose(false);
      onSuccess();
    } catch (error) {
      console.error('Error updating staff:', error);
      toast({
        title: "Error",
        description: "Failed to update staff member. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};

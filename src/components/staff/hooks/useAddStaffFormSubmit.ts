
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { staffSupabase } from "@/integrations/supabase/staffClient";
import { StaffFormValues } from '../validation/staffFormSchema';

interface UseAddStaffFormSubmitProps {
  onSuccess: () => void;
  onClose: (open: boolean) => void;
}

export const useAddStaffFormSubmit = ({ onSuccess, onClose }: UseAddStaffFormSubmitProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: StaffFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Convert monthly pay to hourly rate for database
      const hourlyRate = values.monthly_pay / 160; // Assuming 160 hours per month
      
      // Get the current user's ID
      const { data: { session } } = await staffSupabase.auth.getSession();
      const userId = session?.user?.id;
      
      const { error } = await staffSupabase
        .from('staff_members')
        .insert({
          name: values.name,
          position: values.position,
          department: values.department,
          hourly_rate: hourlyRate,
          status: values.status,
          user_id: userId // Add the user_id here
        });
      
      if (error) throw error;
      
      toast({
        title: "Staff Added",
        description: "The staff member has been added successfully."
      });
      
      onClose(false);
      onSuccess();
    } catch (error) {
      console.error('Error adding staff:', error);
      toast({
        title: "Error",
        description: "Failed to add staff member. Please try again.",
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

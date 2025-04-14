
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { staffSupabase } from "@/integrations/supabase/staffClient";

interface UseEditScheduleFormSubmitProps {
  onSuccess: () => void;
  onClose: (open: boolean) => void;
}

interface ScheduleFormValues {
  staffId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  scheduleId: string | null;
}

export const useEditScheduleFormSubmit = ({ onSuccess, onClose }: UseEditScheduleFormSubmitProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ScheduleFormValues) => {
    try {
      setLoading(true);
      
      const scheduleData = {
        staff_id: values.staffId,
        day_of_week: values.dayOfWeek,
        start_time: values.startTime || null,
        end_time: values.endTime || null
      };
      
      let result;
      
      if (values.scheduleId) {
        // Update existing schedule
        result = await staffSupabase
          .from('staff_schedules')
          .update(scheduleData)
          .eq('id', values.scheduleId);
      } else {
        // Create new schedule
        result = await staffSupabase
          .from('staff_schedules')
          .insert(scheduleData);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Schedule Updated",
        description: `Schedule for ${values.dayOfWeek} has been updated successfully.`
      });
      
      onClose(false);
      onSuccess();
    } catch (error) {
      console.error('Error updating schedule:', error);
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDayOff = async (values: ScheduleFormValues) => {
    try {
      setLoading(true);
      
      if (values.scheduleId) {
        const { error } = await staffSupabase
          .from('staff_schedules')
          .update({
            start_time: null,
            end_time: null
          })
          .eq('id', values.scheduleId);
          
        if (error) throw error;
        
        toast({
          title: "Day Off Set",
          description: `${values.dayOfWeek} has been set as a day off.`
        });
        
        onClose(false);
        onSuccess();
      } else {
        // If there's no existing schedule, just close the dialog
        onClose(false);
      }
    } catch (error) {
      console.error('Error setting day off:', error);
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleDayOff,
    loading
  };
};

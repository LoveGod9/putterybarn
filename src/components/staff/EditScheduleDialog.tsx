
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StaffSchedule } from '@/types/staff';

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
  const { toast } = useToast();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [scheduleId, setScheduleId] = useState<string | null>(null);

  useEffect(() => {
    if (open && staffId && dayOfWeek) {
      fetchExistingSchedule();
    }
  }, [open, staffId, dayOfWeek]);

  const fetchExistingSchedule = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('staff_schedules')
        .select('*')
        .eq('staff_id', staffId)
        .eq('day_of_week', dayOfWeek)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned"
        console.error('Error fetching schedule:', error);
        throw error;
      }
      
      if (data) {
        setScheduleId(data.id);
        setStartTime(data.start_time || '');
        setEndTime(data.end_time || '');
      } else {
        // No existing schedule, reset form
        setScheduleId(null);
        setStartTime('');
        setEndTime('');
      }
    } catch (error) {
      console.error('Error in fetchExistingSchedule:', error);
      toast({
        title: "Error",
        description: "Failed to load schedule. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const validDayOfWeek = dayOfWeek as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
      
      if (!['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(validDayOfWeek)) {
        throw new Error(`Invalid day of week: ${dayOfWeek}`);
      }
      
      const scheduleData = {
        staff_id: staffId,
        day_of_week: validDayOfWeek,
        start_time: startTime || null,
        end_time: endTime || null
      };
      
      let result;
      
      if (scheduleId) {
        // Update existing schedule
        result = await supabase
          .from('staff_schedules')
          .update(scheduleData)
          .eq('id', scheduleId);
      } else {
        // Create new schedule
        result = await supabase
          .from('staff_schedules')
          .insert(scheduleData);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Schedule Updated",
        description: `Schedule for ${dayOfWeek} has been updated successfully.`
      });
      
      onOpenChange(false);
      onScheduleUpdated();
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

  const handleDayOff = async () => {
    setStartTime('');
    setEndTime('');
    
    if (scheduleId) {
      try {
        setLoading(true);
        
        const { error } = await supabase
          .from('staff_schedules')
          .update({
            start_time: null,
            end_time: null
          })
          .eq('id', scheduleId);
          
        if (error) throw error;
        
        toast({
          title: "Day Off Set",
          description: `${dayOfWeek} has been set as a day off.`
        });
        
        onOpenChange(false);
        onScheduleUpdated();
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
    } else {
      // If there's no existing schedule, just close the dialog
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">Edit {dayOfWeek} Schedule</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleDayOff}
              disabled={loading}
            >
              Set as Day Off
            </Button>
            
            <div className="space-x-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Schedule"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditScheduleDialog;

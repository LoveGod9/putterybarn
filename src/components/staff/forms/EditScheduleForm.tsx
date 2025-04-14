
import React, { useState, useEffect } from 'react';
import { staffSupabase } from "@/integrations/supabase/staffClient";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { useEditScheduleFormSubmit } from '../hooks/useEditScheduleFormSubmit';

interface EditScheduleFormProps {
  staffId: string;
  dayOfWeek: string;
  onScheduleUpdated: () => void;
  onOpenChange: (open: boolean) => void;
}

const EditScheduleForm = ({ 
  staffId, 
  dayOfWeek, 
  onScheduleUpdated, 
  onOpenChange 
}: EditScheduleFormProps) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  
  const { handleSubmit, handleDayOff, loading } = useEditScheduleFormSubmit({
    onSuccess: onScheduleUpdated,
    onClose: onOpenChange
  });

  useEffect(() => {
    fetchExistingSchedule();
  }, [staffId, dayOfWeek]);

  const fetchExistingSchedule = async () => {
    try {
      const { data, error } = await staffSupabase
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
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({
      staffId,
      dayOfWeek,
      startTime,
      endTime,
      scheduleId
    });
  };

  const onDayOff = () => {
    setStartTime('');
    setEndTime('');
    handleDayOff({
      staffId,
      dayOfWeek,
      startTime: '',
      endTime: '',
      scheduleId
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          onClick={onDayOff}
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
  );
};

export default EditScheduleForm;

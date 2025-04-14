
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { staffSupabase } from "@/integrations/supabase/staffClient";
import { StaffMember, StaffWithSchedule } from '@/types/staff';

export const useStaffData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [staffWithSchedules, setStaffWithSchedules] = useState<StaffWithSchedule[]>([]);
  
  const fetchStaffData = async () => {
    try {
      setLoading(true);
      
      // Fetch staff members
      const { data: staffData, error: staffError } = await staffSupabase
        .from('staff_members')
        .select('*')
        .order('name');
        
      if (staffError) throw staffError;
      
      // Transform the data to match our StaffMember type
      const typedStaffData: StaffMember[] = staffData?.map(staff => ({
        id: staff.id,
        name: staff.name,
        position: staff.position,
        department: staff.department,
        monthly_pay: staff.hourly_rate * 160, // Converting hourly rate to monthly pay (assuming 160 hours/month)
        status: staff.status,
        created_at: staff.created_at,
        updated_at: staff.updated_at
      })) || [];
      
      setStaffMembers(typedStaffData);
      
      // Fetch staff with their schedules
      const { data: staffWithSchedulesData, error: schedulesError } = await staffSupabase
        .from('staff_members')
        .select(`
          *,
          schedules:staff_schedules(*)
        `)
        .order('name');
        
      if (schedulesError) throw schedulesError;
      
      // Process the data to ensure it matches our types
      const processedStaffWithSchedules: StaffWithSchedule[] = staffWithSchedulesData?.map(staff => {
        // Transform schedules to match our defined types
        const typedSchedules = staff.schedules?.map(schedule => ({
          ...schedule,
          day_of_week: schedule.day_of_week
        }));
        
        return {
          id: staff.id,
          name: staff.name,
          position: staff.position,
          department: staff.department,
          monthly_pay: staff.hourly_rate * 160, // Converting hourly rate to monthly pay
          status: staff.status,
          created_at: staff.created_at,
          updated_at: staff.updated_at,
          schedules: typedSchedules
        };
      }) || [];
      
      setStaffWithSchedules(processedStaffWithSchedules);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      toast({
        title: "Error",
        description: "Failed to load staff data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return {
    loading,
    staffMembers,
    staffWithSchedules,
    fetchStaffData
  };
};

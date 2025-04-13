
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StaffMember, StaffWithSchedule } from '@/types/staff';
import StaffList from '@/components/staff/StaffList';
import StaffSchedule from '@/components/staff/StaffSchedule';
import DepartmentSummary from '@/components/staff/DepartmentSummary';
import AddStaffDialog from '@/components/staff/AddStaffDialog';
import EditStaffDialog from '@/components/staff/EditStaffDialog';
import EditScheduleDialog from '@/components/staff/EditScheduleDialog';
import StaffDetails from '@/components/staff/StaffDetails';

const Staff = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [staffWithSchedules, setStaffWithSchedules] = useState<StaffWithSchedule[]>([]);
  
  // State for edit staff dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  
  // State for edit schedule dialog
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  
  // State for staff details sheet
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  
  useEffect(() => {
    fetchStaffData();
  }, []);
  
  const fetchStaffData = async () => {
    try {
      setLoading(true);
      
      // Fetch staff members
      const { data: staffData, error: staffError } = await supabase
        .from('staff_members')
        .select('*')
        .order('name');
        
      if (staffError) throw staffError;
      
      setStaffMembers(staffData || []);
      
      // Fetch staff with their schedules
      const { data: staffWithSchedulesData, error: schedulesError } = await supabase
        .from('staff_members')
        .select(`
          *,
          schedules:staff_schedules(*)
        `)
        .order('name');
        
      if (schedulesError) throw schedulesError;
      
      setStaffWithSchedules(staffWithSchedulesData || []);
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
  
  const handleEditStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setEditDialogOpen(true);
  };
  
  const handleViewStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setDetailsSheetOpen(true);
  };
  
  const handleEditSchedule = (staffId: string, day: string) => {
    setSelectedStaffId(staffId);
    setSelectedDay(day);
    setScheduleDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <p className="text-gray-500 mt-2">Manage staff schedules and performance</p>
          </div>
          <AddStaffDialog onStaffAdded={fetchStaffData} />
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="staff">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="staff">Staff List</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          {/* Staff List Tab */}
          <TabsContent value="staff" className="space-y-4 mt-6">
            {loading ? (
              <p className="text-center py-8">Loading staff data...</p>
            ) : (
              <>
                {/* Staff Members Table */}
                <StaffList 
                  staffMembers={staffMembers} 
                  onDataChange={fetchStaffData}
                  onEdit={handleEditStaff}
                  onView={handleViewStaff}
                />
                
                {/* Department Summary */}
                <DepartmentSummary staffMembers={staffMembers} />
              </>
            )}
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4 mt-6">
            {loading ? (
              <p className="text-center py-8">Loading schedule data...</p>
            ) : (
              <StaffSchedule 
                staff={staffWithSchedules} 
                onEdit={handleEditSchedule} 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialogs and Sheets */}
      <EditStaffDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
        staff={selectedStaff} 
        onStaffUpdated={fetchStaffData} 
      />
      
      <EditScheduleDialog 
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        staffId={selectedStaffId}
        dayOfWeek={selectedDay}
        onScheduleUpdated={fetchStaffData}
      />
      
      <StaffDetails 
        open={detailsSheetOpen}
        onOpenChange={setDetailsSheetOpen}
        staff={selectedStaff}
      />
    </Layout>
  );
};

export default Staff;


import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StaffMember } from '@/types/staff';
import StaffHeader from '@/components/staff/StaffHeader';
import StaffListTab from '@/components/staff/tabs/StaffListTab';
import ScheduleTab from '@/components/staff/tabs/ScheduleTab';
import EditStaffDialog from '@/components/staff/EditStaffDialog';
import EditScheduleDialog from '@/components/staff/EditScheduleDialog';
import StaffDetails from '@/components/staff/StaffDetails';
import { useStaffData } from '@/components/staff/hooks/useStaffData';

const Staff = () => {
  // Custom hook for staff data and loading state
  const { loading, staffMembers, staffWithSchedules, fetchStaffData } = useStaffData();
  
  // State for edit staff dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  
  // State for edit schedule dialog
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  
  // State for staff details sheet
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  
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
        <StaffHeader onStaffAdded={fetchStaffData} />
        
        {/* Tabs for different views */}
        <Tabs defaultValue="staff">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="staff">Staff List</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          {/* Staff List Tab */}
          <TabsContent value="staff">
            <StaffListTab
              loading={loading}
              staffMembers={staffMembers}
              staffWithSchedules={staffWithSchedules}
              onDataChange={fetchStaffData}
              onEdit={handleEditStaff}
              onView={handleViewStaff}
            />
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <ScheduleTab
              loading={loading}
              staff={staffWithSchedules}
              onEdit={handleEditSchedule}
            />
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

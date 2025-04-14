
import React from 'react';
import StaffSchedule from '@/components/staff/StaffSchedule';
import { StaffWithSchedule } from '@/types/staff';

interface ScheduleTabProps {
  loading: boolean;
  staff: StaffWithSchedule[];
  onEdit: (staffId: string, day: string) => void;
}

const ScheduleTab = ({ loading, staff, onEdit }: ScheduleTabProps) => {
  return (
    <div className="space-y-4 mt-6">
      {loading ? (
        <p className="text-center py-8">Loading schedule data...</p>
      ) : (
        <StaffSchedule 
          staff={staff} 
          onEdit={onEdit} 
        />
      )}
    </div>
  );
};

export default ScheduleTab;

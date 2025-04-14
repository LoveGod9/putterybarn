
import React from 'react';
import StaffList from '@/components/staff/StaffList';
import DepartmentSummary from '@/components/staff/DepartmentSummary';
import { StaffMember, StaffWithSchedule } from '@/types/staff';

interface StaffListTabProps {
  loading: boolean;
  staffMembers: StaffMember[];
  staffWithSchedules: StaffWithSchedule[];
  onDataChange: () => void;
  onEdit: (staff: StaffMember) => void;
  onView: (staff: StaffMember) => void;
}

const StaffListTab = ({
  loading,
  staffMembers,
  staffWithSchedules,
  onDataChange,
  onEdit,
  onView
}: StaffListTabProps) => {
  return (
    <div className="space-y-4 mt-6">
      {loading ? (
        <p className="text-center py-8">Loading staff data...</p>
      ) : (
        <>
          {/* Staff Members Table */}
          <StaffList 
            staffMembers={staffMembers} 
            onDataChange={onDataChange}
            onEdit={onEdit}
            onView={onView}
          />
          
          {/* Department Summary */}
          <DepartmentSummary staffMembers={staffWithSchedules} />
        </>
      )}
    </div>
  );
};

export default StaffListTab;

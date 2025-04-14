
import React from 'react';
import AddStaffDialog from './AddStaffDialog';

interface StaffHeaderProps {
  onStaffAdded: () => void;
}

const StaffHeader = ({ onStaffAdded }: StaffHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <p className="text-gray-500 mt-2">Manage staff schedules and performance</p>
      </div>
      <AddStaffDialog onStaffAdded={onStaffAdded} />
    </div>
  );
};

export default StaffHeader;

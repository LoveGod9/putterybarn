
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StaffMember } from '@/types/staff';

interface DepartmentSummaryProps {
  staffMembers: StaffMember[];
}

const DepartmentSummary = ({ staffMembers }: DepartmentSummaryProps) => {
  // Group staff by department
  const departmentData = staffMembers.reduce((acc, staff) => {
    if (!acc[staff.department]) {
      acc[staff.department] = {
        memberCount: 0,
        totalHours: 0
      };
    }
    
    acc[staff.department].memberCount += 1;
    // You would normally calculate this from actual time records
    // For now we'll use a placeholder based on status
    acc[staff.department].totalHours += staff.status === 'Full-time' ? 40 : 25;
    
    return acc;
  }, {} as Record<string, { memberCount: number, totalHours: number }>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(departmentData).map(([department, data]) => (
        <Card key={department}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{department} Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{data.memberCount}</p>
                <p className="text-sm text-gray-500">Members</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{data.totalHours}</p>
                <p className="text-sm text-gray-500">Hours this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentSummary;

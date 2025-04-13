
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StaffWithSchedule } from '@/types/staff';

interface DepartmentSummaryProps {
  staffMembers: StaffWithSchedule[];
}

const DepartmentSummary = ({ staffMembers }: DepartmentSummaryProps) => {
  // Group staff by department with scheduled hours
  const departmentData = staffMembers.reduce((acc, staff) => {
    if (!acc[staff.department]) {
      acc[staff.department] = {
        memberCount: 0,
        totalHours: 0,
        totalMonthlyPay: 0
      };
    }
    
    acc[staff.department].memberCount += 1;
    acc[staff.department].totalMonthlyPay += staff.monthly_pay;
    
    // Calculate total scheduled hours from staff schedules if available
    if (staff.schedules && staff.schedules.length > 0) {
      let scheduledHours = 0;
      
      staff.schedules.forEach(schedule => {
        if (schedule.start_time && schedule.end_time) {
          // Parse hours and minutes
          const startParts = schedule.start_time.split(':').map(Number);
          const endParts = schedule.end_time.split(':').map(Number);
          
          // Calculate hours difference (simplified - doesn't handle overnight shifts)
          const startHours = startParts[0] + startParts[1] / 60;
          const endHours = endParts[0] + endParts[1] / 60;
          
          // Add hours for this schedule
          scheduledHours += endHours - startHours;
        }
      });
      
      acc[staff.department].totalHours += scheduledHours;
    } else {
      // Fallback to estimate based on status if no schedules are available
      acc[staff.department].totalHours += staff.status === 'Full-time' ? 40 : 25;
    }
    
    return acc;
  }, {} as Record<string, { memberCount: number, totalHours: number, totalMonthlyPay: number }>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(departmentData).map(([department, data]) => (
        <Card key={department}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{department} Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{data.memberCount}</p>
                  <p className="text-sm text-gray-500">Members</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{data.totalHours.toFixed(1)}</p>
                  <p className="text-sm text-gray-500">Hours this week</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-500">Total Monthly Pay</p>
                <p className="text-2xl font-bold">${data.totalMonthlyPay.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentSummary;

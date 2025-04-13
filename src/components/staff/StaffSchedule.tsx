
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaffWithSchedule } from '@/types/staff';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface StaffScheduleProps {
  staff: StaffWithSchedule[];
  onEdit: (staffId: string, day: string) => void;
}

const StaffSchedule = ({ staff, onEdit }: StaffScheduleProps) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  const getScheduleForDay = (staffMember: StaffWithSchedule, day: string) => {
    if (!staffMember.schedules) return null;
    return staffMember.schedules.find(schedule => schedule.day_of_week === day);
  };
  
  const formatTimeDisplay = (schedule: any) => {
    if (!schedule || (!schedule.start_time && !schedule.end_time)) return 'Off';
    if (schedule.start_time && schedule.end_time) {
      return `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`;
    }
    return 'Partial Schedule';
  };
  
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    try {
      // Parse time string in format HH:MM:SS
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
      return `${displayHour}${minutes !== '00' ? `:${minutes}` : ''}${suffix}`;
    } catch (e) {
      console.error('Error formatting time:', e);
      return timeString;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Schedule</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous Week</Button>
          <Button variant="outline" size="sm">Next Week</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                {days.map(day => (
                  <TableHead key={day} className="capitalize">{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell className="font-medium">{staffMember.name}</TableCell>
                  {days.map(day => {
                    const schedule = getScheduleForDay(staffMember, day);
                    const displayText = formatTimeDisplay(schedule);
                    return (
                      <TableCell key={day} className="relative">
                        <span className={displayText === 'Off' ? "text-gray-400" : ""}>
                          {displayText}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity"
                          onClick={() => onEdit(staffMember.id, day)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffSchedule;

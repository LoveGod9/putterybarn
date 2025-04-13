
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaffWithSchedule, WeekRange } from '@/types/staff';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
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
  
  // State for tracking the current week
  const [currentWeek, setCurrentWeek] = useState<WeekRange>({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 })
  });
  
  // For formatting the week range display in the header
  const formatWeekRange = (weekRange: WeekRange) => {
    return `${format(weekRange.startDate, 'MMM d, yyyy')} - ${format(weekRange.endDate, 'MMM d, yyyy')}`;
  };
  
  // Navigate to the previous week
  const goToPreviousWeek = () => {
    setCurrentWeek({
      startDate: subWeeks(currentWeek.startDate, 1),
      endDate: subWeeks(currentWeek.endDate, 1)
    });
  };
  
  // Navigate to the next week
  const goToNextWeek = () => {
    setCurrentWeek({
      startDate: addWeeks(currentWeek.startDate, 1),
      endDate: addWeeks(currentWeek.endDate, 1)
    });
  };
  
  // Get the schedule for a specific day
  const getScheduleForDay = (staffMember: StaffWithSchedule, day: string) => {
    if (!staffMember.schedules) return null;
    return staffMember.schedules.find(schedule => 
      schedule.day_of_week === day
    );
  };
  
  // Format the time display
  const formatTimeDisplay = (schedule: any) => {
    if (!schedule || (!schedule.start_time && !schedule.end_time)) return 'Off';
    if (schedule.start_time && schedule.end_time) {
      return `${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`;
    }
    return 'Partial Schedule';
  };
  
  // Format time from 24h to 12h format
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
        <CardTitle>Weekly Schedule: {formatWeekRange(currentWeek)}</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToPreviousWeek}
          >
            Previous Week
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToNextWeek}
          >
            Next Week
          </Button>
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
                      <TableCell key={day} className="relative group">
                        <span className={displayText === 'Off' ? "text-gray-400" : ""}>
                          {displayText}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
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

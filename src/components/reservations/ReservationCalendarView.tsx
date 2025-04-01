
import React from 'react';
import { format, addHours, parseISO } from 'date-fns';
import { Reservation } from '@/types/reservation';

interface TimeSlot {
  time: string;
  displayTime: string;
}

interface ReservationCalendarViewProps {
  reservations: Reservation[];
  date: Date;
}

const TimelineSlot = ({ reservation }: { reservation: Reservation }) => {
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 border-yellow-400 text-yellow-800',
      confirmed: 'bg-green-100 border-green-400 text-green-800',
      seated: 'bg-blue-100 border-blue-400 text-blue-800',
      completed: 'bg-gray-100 border-gray-400 text-gray-800',
      cancelled: 'bg-red-100 border-red-400 text-red-800',
      no_show: 'bg-red-100 border-red-400 text-red-800',
    };
    
    return statusColors[status] || 'bg-gray-100 border-gray-400 text-gray-800';
  };

  return (
    <div 
      className={`p-2 rounded border ${getStatusColor(reservation.status)} text-sm mb-1`}
    >
      <div className="font-medium">{reservation.customer?.name || 'Unknown'}</div>
      <div className="text-xs flex justify-between">
        <span>{reservation.party_size} guests</span>
        <span>{format(new Date(`2000-01-01T${reservation.time}`), 'h:mm a')}</span>
      </div>
    </div>
  );
};

const ReservationCalendarView = ({ reservations, date }: ReservationCalendarViewProps) => {
  // Generate hourly time slots from 11 AM to 10 PM
  const timeSlots: TimeSlot[] = [];
  for (let hour = 11; hour <= 22; hour++) {
    const timeString = `${hour < 10 ? '0' : ''}${hour}:00:00`;
    timeSlots.push({
      time: timeString,
      displayTime: format(new Date(`2000-01-01T${timeString}`), 'h:mm a'),
    });
  }

  // Group reservations by hour
  const getReservationsForHour = (hour: number) => {
    const hourString = `${hour < 10 ? '0' : ''}${hour}`;
    return reservations.filter(res => {
      const resHour = res.time.substring(0, 2);
      return resHour === hourString;
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1 font-medium text-gray-500">Time</div>
          <div className="col-span-11 font-medium text-gray-500">Reservations</div>
        </div>
        
        {timeSlots.map((slot, index) => {
          const hour = parseInt(slot.time.substring(0, 2));
          const hourReservations = getReservationsForHour(hour);
          
          return (
            <div 
              key={slot.time} 
              className={`grid grid-cols-12 gap-2 py-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="col-span-1 text-sm font-medium">
                {slot.displayTime}
              </div>
              <div className="col-span-11">
                {hourReservations.length > 0 ? (
                  hourReservations.map(res => (
                    <TimelineSlot key={res.id} reservation={res} />
                  ))
                ) : (
                  <div className="text-sm text-gray-400 italic">No reservations</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReservationCalendarView;

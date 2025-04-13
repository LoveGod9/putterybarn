
export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  hourly_rate: number;
  status: 'Full-time' | 'Part-time';
  created_at?: string;
  updated_at?: string;
}

export interface StaffSchedule {
  id: string;
  staff_id: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  start_time: string | null;
  end_time: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TimeClock {
  id: string;
  staff_id: string;
  clock_in: string | null;
  clock_out: string | null;
  total_hours: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface StaffWithSchedule extends StaffMember {
  schedules?: StaffSchedule[];
  timeClocks?: TimeClock[];
}

// Add these interfaces for date handling
export interface WeekRange {
  startDate: Date;
  endDate: Date;
}


// Define types for staff management
export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  monthly_pay: number;
  status: 'Full-time' | 'Part-time' | string; // Added string to support database values
  created_at?: string;
  updated_at?: string;
}

export interface StaffSchedule {
  id: string;
  staff_id: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | string; // Added string to support database values
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

// Create Database types for Staff tables
export type StaffDatabase = {
  public: {
    Tables: {
      staff_members: {
        Row: {
          id: string;
          name: string;
          position: string;
          department: string;
          hourly_rate: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          position: string;
          department: string;
          hourly_rate?: number;
          status: string;
        };
        Update: Partial<{
          name: string;
          position: string;
          department: string;
          hourly_rate: number;
          status: string;
        }>;
      };
      staff_schedules: {
        Row: {
          id: string;
          staff_id: string;
          day_of_week: string;
          start_time: string | null;
          end_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          staff_id: string;
          day_of_week: string;
          start_time?: string | null;
          end_time?: string | null;
        };
        Update: Partial<{
          staff_id: string;
          day_of_week: string;
          start_time: string | null;
          end_time: string | null;
        }>;
      };
      time_clock: {
        Row: {
          id: string;
          staff_id: string;
          clock_in: string | null;
          clock_out: string | null;
          total_hours: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          staff_id: string;
          clock_in?: string | null;
          clock_out?: string | null;
          total_hours?: number | null;
        };
        Update: Partial<{
          staff_id: string;
          clock_in: string | null;
          clock_out: string | null;
          total_hours: number | null;
        }>;
      };
    };
  };
};

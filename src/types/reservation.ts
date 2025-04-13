
export interface RestaurantTable {
  id: string;
  table_number: number;
  capacity: number;
  section: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  customer_id: string;
  date: string;
  time: string;
  party_size: number;
  status: string;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
  // Joined data (optional)
  customer?: Customer;
  tables?: RestaurantTable[];
}

export interface ReservationHistory {
  id: string;
  reservation_id: string;
  action: string;
  notes: string | null;
  created_at: string;
  created_by: string | null;
}

export interface NewReservation {
  customer_id: string;
  date: string;
  time: string;
  party_size: number;
  special_requests?: string;
  status?: string;
  table_ids?: string[];
}

export interface NewCustomer {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

// Add this type to declare our database schema for TypeScript
export type Database = {
  public: {
    Tables: {
      customers: {
        Row: Customer;
        Insert: NewCustomer;
        Update: Partial<NewCustomer>;
      };
      reservations: {
        Row: Reservation;
        Insert: NewReservation;
        Update: Partial<NewReservation>;
      };
      restaurant_tables: {
        Row: RestaurantTable;
        Insert: Omit<RestaurantTable, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<RestaurantTable, 'id' | 'created_at' | 'updated_at'>>;
      };
      reservation_history: {
        Row: ReservationHistory;
        Insert: Omit<ReservationHistory, 'id' | 'created_at'>;
        Update: Partial<Omit<ReservationHistory, 'id' | 'created_at'>>;
      };
      reservation_tables: {
        Row: {
          id: string;
          reservation_id: string;
          table_id: string;
          created_at: string;
        };
        Insert: {
          reservation_id: string;
          table_id: string;
        };
        Update: Partial<{
          reservation_id: string;
          table_id: string;
        }>;
      };
    };
  };
};

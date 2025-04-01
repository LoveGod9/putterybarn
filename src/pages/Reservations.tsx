
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, startOfDay } from 'date-fns';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Reservation } from '@/types/reservation';
import ReservationList from '@/components/reservations/ReservationList';
import CreateReservationSheet from '@/components/reservations/CreateReservationSheet';
import ReservationCalendarView from '@/components/reservations/ReservationCalendarView';
import TableView from '@/components/reservations/TableView';

const Reservations = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreatingReservation, setIsCreatingReservation] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'tables'>('list');

  // Fetch reservations for the selected date
  const { data: reservations = [], isLoading, error, refetch } = useQuery({
    queryKey: ['reservations', format(selectedDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Fetch reservations with customer information
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          customer:customers(*)
        `)
        .eq('date', formattedDate)
        .order('time');
      
      if (error) throw error;
      
      return data as Reservation[];
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  const handleCreateReservation = async () => {
    setIsCreatingReservation(true);
  };

  const handleReservationCreated = () => {
    setIsCreatingReservation(false);
    refetch();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reservations</h1>
          <Button onClick={handleCreateReservation}>
            <Plus className="mr-1 h-4 w-4" /> New Reservation
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-lg shadow p-4 w-full lg:w-72 shrink-0">
            <h2 className="font-semibold mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
            
            <h3 className="font-semibold mt-6 mb-2">View Mode</h3>
            <Tabs defaultValue="list" value={viewMode} onValueChange={(val) => setViewMode(val as any)}>
              <TabsList className="grid grid-cols-3 w-full mb-4">
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="calendar">Timeline</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="w-full">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold mb-4">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')} Reservations
              </h2>
              
              {error ? (
                <div className="text-red-500">Failed to load reservations</div>
              ) : isLoading ? (
                <div className="p-10 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-greenery-600" />
                </div>
              ) : (
                <div>
                  {viewMode === 'list' && (
                    <ReservationList 
                      reservations={reservations} 
                      onReservationUpdated={refetch}
                    />
                  )}
                  {viewMode === 'calendar' && (
                    <ReservationCalendarView 
                      reservations={reservations} 
                      date={selectedDate}
                    />
                  )}
                  {viewMode === 'tables' && (
                    <TableView 
                      date={selectedDate} 
                      reservations={reservations}
                      onReservationUpdated={refetch}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <CreateReservationSheet 
        open={isCreatingReservation} 
        onClose={() => setIsCreatingReservation(false)}
        onReservationCreated={handleReservationCreated}
        selectedDate={selectedDate}
      />
    </Layout>
  );
};

export default Reservations;

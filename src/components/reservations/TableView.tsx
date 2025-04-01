
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Reservation, RestaurantTable } from '@/types/reservation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Info, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TableViewProps {
  date: Date;
  reservations: Reservation[];
  onReservationUpdated: () => void;
}

const TableView = ({ date, reservations, onReservationUpdated }: TableViewProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>("all");
  const formattedDate = format(date, 'yyyy-MM-dd');

  // Fetch all tables
  const { data: tables = [], isLoading } = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurant_tables')
        .select('*')
        .order('table_number');
        
      if (error) throw error;
      return data as RestaurantTable[];
    },
  });

  // Get reservations for a specific table
  const getTableReservations = (tableId: string) => {
    const tableReservations: Reservation[] = [];
    
    for (const reservation of reservations) {
      // For simplicity, we're not querying reservation_tables here
      // In a real implementation, you would do a join query to get the actual table assignments
      // For now, we'll simulate this to show the concept
      if (reservation.party_size <= 2 && [1, 2].map(n => tables[n-1]?.id).includes(tableId)) {
        tableReservations.push(reservation);
      } else if (reservation.party_size <= 4 && [3, 4].map(n => tables[n-1]?.id).includes(tableId)) {
        tableReservations.push(reservation);
      } else if (reservation.party_size <= 6 && tableId === tables[4]?.id) {
        tableReservations.push(reservation);
      } else if (reservation.party_size <= 8 && tableId === tables[5]?.id) {
        tableReservations.push(reservation);
      } else if (tableId === tables[6]?.id) {
        tableReservations.push(reservation);
      }
    }
    
    return tableReservations;
  };

  // Get all unique sections
  const sections = ["all", ...new Set(tables.map(table => table.section || 'Other').filter(Boolean))];

  const filteredTables = activeSection === "all"
    ? tables
    : tables.filter(table => table.section === activeSection);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-greenery-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section filter */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="mb-4">
          {sections.map(section => (
            <TabsTrigger key={section} value={section} className="capitalize">
              {section}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {/* Table grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTables.map(table => {
          const tableReservations = getTableReservations(table.id);
          const isAvailable = tableReservations.length === 0;
          
          return (
            <Card key={table.id} className={`overflow-hidden ${isAvailable ? 'border-green-200' : 'border-amber-200'}`}>
              <CardHeader className={`${isAvailable ? 'bg-green-50' : 'bg-amber-50'} py-3`}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Table {table.table_number}</CardTitle>
                  <Badge variant={isAvailable ? 'outline' : 'default'}>
                    {isAvailable ? 'Available' : 'Reserved'}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Capacity: {table.capacity}</span>
                  </div>
                  {table.section && (
                    <div className="text-sm text-muted-foreground">
                      Section: {table.section}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4">
                {tableReservations.length > 0 ? (
                  <div className="space-y-3">
                    {tableReservations.map(reservation => (
                      <div 
                        key={reservation.id} 
                        className="p-3 bg-white rounded border text-sm"
                      >
                        <div className="font-medium">{reservation.customer?.name}</div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>{format(new Date(`2000-01-01T${reservation.time}`), 'h:mm a')}</span>
                          <span>{reservation.party_size} guests</span>
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            {reservation.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-gray-500">
                    <Info className="h-8 w-8 mb-2" />
                    <p className="text-center">No reservations for this table today</p>
                  </div>
                )}
              </CardContent>
              
              {tableReservations.length > 0 && (
                <CardFooter className="flex justify-between bg-gray-50 py-3">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Reservations
                  </Button>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
      
      {filteredTables.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tables found in this section
        </div>
      )}
    </div>
  );
};

export default TableView;

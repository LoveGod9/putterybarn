
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { staffSupabase } from "@/integrations/supabase/staffClient";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaffMember, TimeClock } from '@/types/staff';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface StaffDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffMember | null;
}

const StaffDetails = ({ open, onOpenChange, staff }: StaffDetailsProps) => {
  const { toast } = useToast();
  const [timeClockEntries, setTimeClockEntries] = useState<TimeClock[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && staff) {
      fetchTimeClockData();
    }
  }, [open, staff]);

  const fetchTimeClockData = async () => {
    if (!staff) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await staffSupabase
        .from('time_clock')
        .select('*')
        .eq('staff_id', staff.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      
      setTimeClockEntries(data || []);
    } catch (error) {
      console.error('Error fetching time clock data:', error);
      toast({
        title: "Error",
        description: "Failed to load staff details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  if (!staff) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Staff Details</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Staff Summary */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-greenery-200 flex items-center justify-center">
                <span className="font-medium text-greenery-700">
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{staff.name}</h3>
                <p className="text-sm text-gray-500">{staff.position}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{staff.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge variant={staff.status === 'Full-time' ? "default" : "secondary"}>
                  {staff.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Pay</p>
                <p className="font-medium">${staff.monthly_pay?.toFixed(2) || '0.00'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Started</p>
                <p className="font-medium">
                  {staff.created_at ? new Date(staff.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Recent Time Clock Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Time Clock Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4">Loading...</p>
              ) : timeClockEntries.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No time clock entries found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Clock In</TableHead>
                      <TableHead>Clock Out</TableHead>
                      <TableHead>Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeClockEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          {entry.clock_in 
                            ? new Date(entry.clock_in).toLocaleDateString() 
                            : 'N/A'}
                        </TableCell>
                        <TableCell>{formatDateTime(entry.clock_in)}</TableCell>
                        <TableCell>{formatDateTime(entry.clock_out)}</TableCell>
                        <TableCell>
                          {entry.total_hours !== null 
                            ? entry.total_hours.toFixed(2) 
                            : 'Active'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StaffDetails;

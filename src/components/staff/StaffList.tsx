
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaffMember } from '@/types/staff';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { staffSupabase } from "@/integrations/supabase/staffClient";

interface StaffListProps {
  staffMembers: StaffMember[];
  onDataChange: () => void;
  onEdit: (staff: StaffMember) => void;
  onView: (staff: StaffMember) => void;
}

const StaffList = ({ staffMembers, onDataChange, onEdit, onView }: StaffListProps) => {
  const { toast } = useToast();

  const handleClockInOut = async (staffId: string, action: 'in' | 'out') => {
    try {
      // Get the current user's ID
      const { data: { session } } = await staffSupabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (action === 'in') {
        // Check if there's an open time clock entry
        const { data: existingEntry } = await staffSupabase
          .from('time_clock')
          .select('*')
          .eq('staff_id', staffId)
          .is('clock_out', null)
          .single();
          
        if (existingEntry) {
          toast({
            title: "Already Clocked In",
            description: "This staff member is already clocked in.",
            variant: "destructive"
          });
          return;
        }
        
        await staffSupabase
          .from('time_clock')
          .insert({
            staff_id: staffId,
            clock_in: new Date().toISOString(),
            user_id: userId // Add the user_id here
          });
          
        toast({
          title: "Clocked In",
          description: "Staff member has been clocked in successfully."
        });
      } else {
        // Find the open time clock entry
        const { data: openEntry } = await staffSupabase
          .from('time_clock')
          .select('*')
          .eq('staff_id', staffId)
          .is('clock_out', null)
          .single();
          
        if (!openEntry) {
          toast({
            title: "Not Clocked In",
            description: "This staff member is not currently clocked in.",
            variant: "destructive"
          });
          return;
        }
        
        await staffSupabase
          .from('time_clock')
          .update({
            clock_out: new Date().toISOString(),
            user_id: userId // Add the user_id here
          })
          .eq('id', openEntry.id);
          
        toast({
          title: "Clocked Out",
          description: "Staff member has been clocked out successfully."
        });
      }
      
      onDataChange();
    } catch (error) {
      console.error('Error with clock in/out:', error);
      toast({
        title: "Error",
        description: `Failed to clock ${action}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Monthly Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>${staff.monthly_pay?.toLocaleString() || '0'}</TableCell>
                  <TableCell>
                    <Badge variant={staff.status === 'Full-time' ? "default" : "secondary"}>
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleClockInOut(staff.id, 'in')}
                      >
                        Clock In
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleClockInOut(staff.id, 'out')}
                      >
                        Clock Out
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onEdit(staff)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onView(staff)}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffList;

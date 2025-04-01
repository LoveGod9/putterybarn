
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { 
  ChevronsUpDown, 
  Users, 
  CalendarClock, 
  Check, 
  X, 
  AlertCircle,
  MoreHorizontal,
  Trash, 
  Phone, 
  Mail,
  Edit,
  Clock
} from 'lucide-react';
import { Reservation } from '@/types/reservation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ReservationListProps {
  reservations: Reservation[];
  onReservationUpdated: () => void;
}

const ReservationList = ({ reservations, onReservationUpdated }: ReservationListProps) => {
  const { toast } = useToast();
  const [expandedReservation, setExpandedReservation] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<Reservation | null>(null);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
      pending: { variant: 'secondary', label: 'Pending' },
      confirmed: { variant: 'default', label: 'Confirmed' },
      seated: { variant: 'outline', label: 'Seated' },
      completed: { variant: 'outline', label: 'Completed' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
      no_show: { variant: 'destructive', label: 'No Show' },
    };
    
    const config = statusMap[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      // Add to reservation history
      await supabase.from('reservation_history').insert({
        reservation_id: id,
        action: `Status updated to ${status}`,
        created_by: 'Admin'
      });
      
      toast({
        title: 'Reservation Updated',
        description: `Status changed to ${status}`,
      });
      
      onReservationUpdated();
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update the reservation status.',
        variant: 'destructive',
      });
    }
  };

  const deleteReservation = async () => {
    if (!isDeleting) return;
    
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', isDeleting.id);
      
      if (error) throw error;
      
      toast({
        title: 'Reservation Deleted',
        description: 'The reservation has been deleted successfully.'
      });
      
      setIsDeleting(null);
      onReservationUpdated();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast({
        title: 'Delete Failed',
        description: 'Could not delete the reservation.',
        variant: 'destructive',
      });
    }
  };

  const handleStatusChange = async (reservation: Reservation, newStatus: string) => {
    if (reservation.status === newStatus) return;
    
    await updateReservationStatus(reservation.id, newStatus);
  };

  return (
    <div>
      {reservations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reservations found for this date
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Time</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Party Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <React.Fragment key={reservation.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {format(new Date(`2000-01-01T${reservation.time}`), 'h:mm a')}
                    </TableCell>
                    <TableCell>
                      {reservation.customer?.name || 'Unknown Guest'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {reservation.party_size}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(reservation.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedReservation(
                            expandedReservation === reservation.id ? null : reservation.id
                          )}
                        >
                          <ChevronsUpDown className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(reservation, 'confirmed')}
                              disabled={reservation.status === 'confirmed'}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Confirm
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(reservation, 'seated')}
                              disabled={reservation.status === 'seated'}
                            >
                              <CalendarClock className="mr-2 h-4 w-4" />
                              Mark as Seated
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(reservation, 'completed')}
                              disabled={reservation.status === 'completed'}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(reservation, 'cancelled')}
                              disabled={reservation.status === 'cancelled'}
                              className="text-red-600"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(reservation, 'no_show')}
                              disabled={reservation.status === 'no_show'}
                              className="text-red-600"
                            >
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Mark as No-Show
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem
                              onClick={() => setIsDeleting(reservation)}
                              className="text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedReservation === reservation.id && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <div className="bg-muted/50 p-4 rounded-md mt-1 text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Guest Information</h4>
                              <p className="font-medium">{reservation.customer?.name}</p>
                              
                              {reservation.customer?.phone && (
                                <div className="flex items-center mt-1">
                                  <Phone className="h-4 w-4 mr-2" />
                                  <a 
                                    href={`tel:${reservation.customer.phone}`}
                                    className="text-greenery-600 hover:underline"
                                  >
                                    {reservation.customer.phone}
                                  </a>
                                </div>
                              )}
                              
                              {reservation.customer?.email && (
                                <div className="flex items-center mt-1">
                                  <Mail className="h-4 w-4 mr-2" />
                                  <a 
                                    href={`mailto:${reservation.customer.email}`}
                                    className="text-greenery-600 hover:underline"
                                  >
                                    {reservation.customer.email}
                                  </a>
                                </div>
                              )}
                              
                              {reservation.customer?.notes && (
                                <div className="mt-2">
                                  <p className="text-gray-500">
                                    <span className="font-medium">Notes:</span> {reservation.customer.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Reservation Details</h4>
                              <div className="flex items-center mb-1">
                                <CalendarClock className="h-4 w-4 mr-2" />
                                <span>{format(parseISO(reservation.date), 'EEE, MMM d, yyyy')} at {format(new Date(`2000-01-01T${reservation.time}`), 'h:mm a')}</span>
                              </div>
                              <div className="flex items-center mb-1">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{reservation.party_size} {reservation.party_size === 1 ? 'guest' : 'guests'}</span>
                              </div>
                              <div className="flex items-center mb-1">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>Created: {format(new Date(reservation.created_at), 'MMM d, yyyy, h:mm a')}</span>
                              </div>
                              
                              {reservation.special_requests && (
                                <div className="mt-2">
                                  <p className="text-gray-500">
                                    <span className="font-medium">Special Requests:</span> {reservation.special_requests}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDeleting !== null} onOpenChange={(open) => !open && setIsDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the reservation for{' '}
              <span className="font-semibold">{isDeleting?.customer?.name}</span> on{' '}
              {isDeleting && format(parseISO(isDeleting.date), 'MMMM d, yyyy')} at{' '}
              {isDeleting && format(new Date(`2000-01-01T${isDeleting.time}`), 'h:mm a')}?
              <br /><br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteReservation}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationList;

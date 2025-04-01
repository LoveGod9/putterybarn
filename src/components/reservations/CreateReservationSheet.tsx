
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { NewReservation, NewCustomer, RestaurantTable } from '@/types/reservation';

const timeSlots = [
  '11:00:00', '11:15:00', '11:30:00', '11:45:00',
  '12:00:00', '12:15:00', '12:30:00', '12:45:00',
  '13:00:00', '13:15:00', '13:30:00', '13:45:00',
  '14:00:00', '14:15:00', '14:30:00', '14:45:00',
  '17:00:00', '17:15:00', '17:30:00', '17:45:00',
  '18:00:00', '18:15:00', '18:30:00', '18:45:00',
  '19:00:00', '19:15:00', '19:30:00', '19:45:00',
  '20:00:00', '20:15:00', '20:30:00', '20:45:00',
  '21:00:00', '21:15:00', '21:30:00', '21:45:00',
];

interface CreateReservationSheetProps {
  open: boolean;
  onClose: () => void;
  onReservationCreated: () => void;
  selectedDate: Date;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }).optional().or(z.literal('')),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string({ required_error: 'Please select a time' }),
  party_size: z.coerce.number().min(1).max(20),
  special_requests: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateReservationSheet = ({ open, onClose, onReservationCreated, selectedDate }: CreateReservationSheetProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: selectedDate,
      party_size: 2,
      special_requests: '',
      notes: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // 1. Create or find customer
      let customerId: string;
      
      const customerData: NewCustomer = {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        notes: data.notes || null,
      };
      
      // Check if customer exists
      let { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('name', customerData.name)
        .eq('email', customerData.email || '')
        .eq('phone', customerData.phone || '')
        .maybeSingle();
      
      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        // Create new customer
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert(customerData)
          .select('id')
          .single();
        
        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }
      
      // 2. Create reservation
      const reservationData: NewReservation = {
        customer_id: customerId,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        party_size: data.party_size,
        special_requests: data.special_requests || null,
        status: 'pending',
      };
      
      const { data: newReservation, error: reservationError } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select('id')
        .single();
      
      if (reservationError) throw reservationError;
      
      // 3. Add entry to reservation history
      await supabase
        .from('reservation_history')
        .insert({
          reservation_id: newReservation.id,
          action: 'created',
          created_by: 'Admin',
        });
      
      toast({
        title: 'Reservation Created',
        description: `Reservation for ${data.name} created successfully`,
      });
      
      form.reset();
      onReservationCreated();
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: 'Error',
        description: 'Failed to create reservation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when date changes
  React.useEffect(() => {
    if (open) {
      form.setValue('date', selectedDate);
    }
  }, [selectedDate, form, open]);

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Reservation</SheetTitle>
          <SheetDescription>
            Create a new reservation for a guest.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-md font-medium">Guest Information</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Guest name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any notes about this customer" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <h3 className="text-md font-medium mb-4">Reservation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time">
                                  {field.value ? (
                                    <div className="flex items-center">
                                      <Clock className="mr-2 h-4 w-4" />
                                      {format(new Date(`2000-01-01T${field.value}`), 'h:mm a')}
                                    </div>
                                  ) : (
                                    "Select a time"
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="max-h-[300px] overflow-y-auto">
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                                  </SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="party_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Party Size</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Number of guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[...Array(20)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="special_requests"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Special Requests (optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special requests for this reservation" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center p-4 mt-4 bg-amber-50 rounded-md border border-amber-200">
                    <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      Tables will be assigned automatically based on party size and availability.
                    </p>
                  </div>
                </div>
              </div>
              
              <SheetFooter>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Creating...' : 'Create Reservation'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateReservationSheet;


import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { StaffMember } from '@/types/staff';
import { staffFormSchema, StaffFormValues } from '../validation/staffFormSchema';
import StaffFormFields from './StaffFormFields';
import { useStaffFormSubmit } from '../hooks/useStaffFormSubmit';

interface StaffFormProps {
  staff: StaffMember | null;
  onStaffUpdated: () => void;
  onOpenChange: (open: boolean) => void;
}

const StaffForm = ({ staff, onStaffUpdated, onOpenChange }: StaffFormProps) => {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: staff?.name || "",
      position: staff?.position || "",
      department: staff?.department || "",
      monthly_pay: staff?.monthly_pay || 0,
      status: (staff?.status as "Full-time" | "Part-time") || "Full-time",
    },
  });

  const { handleSubmit, isSubmitting } = useStaffFormSubmit({
    staff,
    onSuccess: onStaffUpdated,
    onClose: onOpenChange
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <StaffFormFields />
          
          <div className="flex justify-end space-x-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Staff"}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default StaffForm;

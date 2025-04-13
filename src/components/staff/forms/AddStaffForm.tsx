
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { staffFormSchema, StaffFormValues } from '../validation/staffFormSchema';
import StaffFormFields from './StaffFormFields';
import { useAddStaffFormSubmit } from '../hooks/useAddStaffFormSubmit';

interface AddStaffFormProps {
  onStaffAdded: () => void;
  onOpenChange: (open: boolean) => void;
}

const AddStaffForm = ({ onStaffAdded, onOpenChange }: AddStaffFormProps) => {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      position: "",
      department: "",
      monthly_pay: 3000,
      status: "Full-time",
    },
  });

  const { handleSubmit, isSubmitting } = useAddStaffFormSubmit({
    onSuccess: onStaffAdded,
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
              {isSubmitting ? "Adding..." : "Add Staff"}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default AddStaffForm;

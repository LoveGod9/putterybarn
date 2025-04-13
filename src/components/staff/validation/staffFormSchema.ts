
import { z } from "zod";

export const staffFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  position: z.string().min(2, { message: "Position is required." }),
  department: z.string().min(2, { message: "Department is required." }),
  monthly_pay: z.coerce.number().positive({ message: "Monthly pay must be positive." }),
  status: z.enum(["Full-time", "Part-time"]),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  firstName: z.string().min(2, "First name must be atleast 2 characters long."),
  lastName: z.string().min(2, "Last name should be atleast 2 characters long."),
  message: z
    .string()
    .min(20, "Your message should be atleast 20 characters long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  firstName: z.string().min(2, "First name must be atleast 2 characters long."),
  lastName: z.string().min(2, "Last name should be atleast 2 characters long."),
  business: z
    .string()
    .min(2, "Business name must be at least 2 characters long.")
    .optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Phone number must be in E.164 format (e.g., +1234567890).",
  }),
  message: z
    .string()
    .min(20, "Your message should be at least 20 characters long.")
    .max(500, "Your message should not exceed 500 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

import { z } from "zod";

export const contactUsSchema = z.object({
    fullname: z
        .string()
        .min(3, { message: "Please enter fullname" })
        .max(25, { message: "Fullname must contain at most 25 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter phone number" }),
    destination: z.string().min(2, { message: "Please select a destination" }),
    package: z.string().min(2, { message: "Please select a package" }),
    message: z
        .string()
        .min(1, { message: "Please enter a message" })
        .max(500, { message: "Message must contain at most 500 characters" }),
    origin: z.string().optional(),
});

export const packageFormSchema = contactUsSchema
    .extend({
        travelDate: z.date({ message: "Please select a date" }),
    })
    .omit({ destination: true });

export const packageConsultationSchema = z.object({
    fullname: z
        .string()
        .min(3, { message: "Please enter fullname" })
        .max(25, { message: "Fullname must contain at most 25 characters" }),
    phone: z.string().min(10, { message: "Please enter phone number" }),
    date: z.string({ message: "Please select a date" }),
    package: z.string().min(2, { message: "Please select a package" }),
    origin: z.string().optional(),
});

export const consultationSchema = packageConsultationSchema.extend({
    destination: z.string().min(2),
});

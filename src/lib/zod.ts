import { z } from "zod";

export const contactUsSchema = z.object({
    fullname: z.string().min(3).max(25),
    email: z.string().email(),
    phone: z.string().min(10),
    destination: z.string().min(2),
    package: z.string().min(2),
    message: z.string().min(1).max(500),
    origin: z.string().optional(),
});

export const packageConsultationSchema = z.object({
    fullname: z.string().min(3).max(25),
    phone: z.string().min(10),
    date: z.string().min(10).max(10),
    package: z.string().min(2),
    origin: z.string().optional(),
});

export const consultationSchema = packageConsultationSchema.extend({
    destination: z.string().min(2),
});

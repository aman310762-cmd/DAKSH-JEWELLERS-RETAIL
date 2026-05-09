import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address is too long'),
  city: z
    .string()
    .min(2, 'City is required')
    .max(100, 'City name is too long'),
  pincode: z
    .string()
    .regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  landmark: z
    .string()
    .max(200, 'Landmark is too long')
    .optional()
    .or(z.literal('')),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

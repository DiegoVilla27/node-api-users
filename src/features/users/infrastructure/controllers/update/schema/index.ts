import { z } from 'zod';

export const UserIdParamSchema = z.object({
  id: z.string(),
});

export const UserCreateSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  age: z.number().int('Age must be an integer').positive('Age must be positive').max(120, 'Age is too high'),
  address: z.object({
    country: z.string().min(2, 'Country name is too short'),
  }),
  avatar: z.string().url('Avatar must be a valid URL').optional().or(z.literal('')),
});
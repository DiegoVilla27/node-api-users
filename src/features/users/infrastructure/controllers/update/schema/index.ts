import { z } from 'zod';

export const UserIdParamSchema = z.object({
  id: z.string(),
});

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/; // Format yyyy-MM-dd

export const UserCreateSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender must be male, female or other' })
  }),
  birthDate: z
    .string()
    .regex(DATE_REGEX, 'Birth date must be in format yyyy-MM-dd')
    .refine(
      (val) => !isNaN(Date.parse(val)),
      'Birth date must be a valid date'
    ),
  age: z.number()
    .int('Age must be an integer')
    .positive('Age must be positive')
    .max(120, 'Age is too high'),
  email: z.string().email('Email must be a valid email address'),
  phoneNumber: z.string().min(6, 'Phone number is too short'),
  address: z.object({
    country: z.string().min(2, 'Country name is too short'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(3, 'Postal code is too short'),
  }),
  avatar: z.string().url('Avatar must be a valid URL').optional().or(z.literal('')),
  emailVerified: z.boolean()
});
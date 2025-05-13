import { z } from 'zod';

/**
 * Regular expression to validate the date format "yyyy-MM-dd".
 * This regex ensures that the date string follows the correct structure 
 * but doesn't guarantee the validity of the date itself.
 */
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Schema for validating user creation data using Zod.
 *
 * This schema defines the structure and validation rules for user input 
 * during the user creation process. It ensures that the input adheres to 
 * the expected types and formats, as well as providing error messages 
 * for invalid or missing fields.
 * 
 * **Keys:**
 * - `id`: Optional user ID (typically used for updates or when the ID is auto-generated).
 * - `firstName`: Required field for the user's first name. Must be a non-empty string.
 * - `lastName`: Required field for the user's last name. Must be a non-empty string.
 * - `gender`: Enum field representing the user's gender. Must be one of: 'male', 'female', or 'other'.
 * - `birthDate`: Date string in the format `yyyy-MM-dd`. Must be a valid date.
 * - `age`: Integer representing the user's age. Must be positive and no greater than 120.
 * - `email`: Required field for the user's email. Must be a valid email address.
 * - `phoneNumber`: Required field for the user's phone number. Must have at least 6 characters.
 * - `address`: Nested object representing the user's address, containing:
 *   - `country`: Required field for the country. Must be a string with at least 2 characters.
 *   - `city`: Required field for the city. Must be a string with at least 1 character.
 *   - `postalCode`: Required field for the postal code. Must be a string with at least 3 characters.
 * - `role`: Enum field representing the user's role. Must be one of: 'admin' or 'guest'.
 * - `avatar`: Optional field for the user's avatar. Must be a valid URL or an empty string.
 */
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
  role: z.enum(['admin', 'guest'], {
    errorMap: () => ({ message: 'Role must be admin or guest' })
  }),
  avatar: z.string().url('Avatar must be a valid URL').optional().or(z.literal(''))
});
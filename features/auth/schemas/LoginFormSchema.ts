import { passwordRegex } from '@/utils/validation';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .refine((password) => passwordRegex.uppercase.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => passwordRegex.number.test(password), {
      message: 'Password must contain at least one number',
    })
    .refine((password) => passwordRegex.specialChar.test(password), {
      message: 'Password must contain at least one special character (!@#$%^&*)',
    }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

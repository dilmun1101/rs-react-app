import { z } from 'zod';
import { COUNTRIES } from '../ui/country-autocomplete/constants/countries';

const MESSAGES = {
  name: {
    required: 'Name is required',
    uppercase: 'First letter must be uppercase',
  },
  age: {
    required: 'Age is required',
    positive: 'Age must be positive',
    integer: 'Age must be an integer',
  },
  email: {
    required: 'Email is required',
    invalid: 'Invalid email',
  },
  gender: {
    required: 'Gender is required',
  },
  terms: {
    required: 'Accept terms',
  },
  password: {
    required: 'Password is required',
    uppercase: 'Must contain at least 1 uppercase letter',
    lowercase: 'Must contain at least 1 lowercase letter',
    digit: 'Must contain at least 1 number',
    special: 'Must contain at least 1 special character',
  },
  confirmPassword: {
    required: 'Please confirm your password',
    mismatch: 'Passwords do not match',
  },
  country: {
    required: 'Please select a valid country',
  },
  avatar: {
    required: 'Avatar is required',
    type: 'Only PNG and JPEG are allowed',
    size: 'File size must be less than 2MB',
  },
};

export const zodSchema = z.object({
  name: z
    .string({ error: MESSAGES.name.required })
    .trim()
    .min(1, { error: MESSAGES.name.required })
    .regex(/^[A-Z]/, { error: MESSAGES.name.uppercase }),

  age: z.coerce
    .number({ error: MESSAGES.age.required })
    .min(0, { error: MESSAGES.age.positive })
    .int({ error: MESSAGES.age.integer }),

  email: z
    .string()
    .trim()
    .min(1, { error: MESSAGES.email.required })
    .pipe(z.email({ error: MESSAGES.email.invalid })),

  gender: z.enum(['male', 'female'], {
    error: MESSAGES.gender.required,
  }),

  terms: z.literal(true, {
    error: MESSAGES.terms.required,
  }),

  password: z
    .string({ error: MESSAGES.password.required })
    .min(1, { error: MESSAGES.password.required })
    .regex(/[A-Z]/, { error: MESSAGES.password.uppercase })
    .regex(/[a-z]/, { error: MESSAGES.password.lowercase })
    .regex(/[0-9]/, { error: MESSAGES.password.digit })
    .regex(/[^A-Za-z0-9]/, { error: MESSAGES.password.special }),

  confirmPassword: z
    .string({ error: MESSAGES.confirmPassword.required })
    .min(1, { error: MESSAGES.confirmPassword.required }),

  country: z.enum(COUNTRIES, {
    error: MESSAGES.country.required,
  }),

  avatar: z
    .instanceof(FileList, { error: MESSAGES.avatar.required })
    .refine((files) => files.length > 0, { error: MESSAGES.avatar.required })
    .refine((files) => ['image/png', 'image/jpeg'].includes(files[0].type), {
      error: MESSAGES.avatar.type,
    })
    .refine((files) => files[0].size <= 2 * 1024 * 1024, {
      error: MESSAGES.avatar.size,
    }),
});

export type FormSchema = z.output<typeof zodSchema>;
export type FormSchemaInput = z.input<typeof zodSchema>;

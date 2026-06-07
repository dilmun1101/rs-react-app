import { z } from 'zod';

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
});

export type FormSchema = z.infer<typeof zodSchema>;

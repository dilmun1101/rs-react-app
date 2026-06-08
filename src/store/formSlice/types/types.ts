import type { FormSchema } from '@/shared/zod-schema/zodSchema';

export interface FormSubmitData {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  imageBase64: string | null;
  source: 'uncontrolled' | 'rhf';
}

export interface FormProps extends FormSubmitData {
  id: string;
  isNew: boolean;
}

export type FormFieldErrors = Partial<Record<keyof FormSchema, string>>;

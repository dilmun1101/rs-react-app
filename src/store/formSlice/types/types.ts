export interface FormSubmitData {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  imageBase64: string | null;
  source: 'uncontrolled' | 'rhf';
}

export interface FormProps extends FormSubmitData {
  id: string;
  isNew: boolean;
}

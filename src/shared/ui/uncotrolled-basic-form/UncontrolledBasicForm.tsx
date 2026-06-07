import { useRef, useState } from 'react';
import Button from '@/shared/ui/button/Button';
import BasicFormFields from '@/shared/ui/basic-form-fields/BasicFormFields';
import { BUTTON_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';
import { zodSchema } from '@/shared/zod-schema/zodSchema';
import { useAppDispatch } from '@/store/hooks/hooks';
import { addRecord } from '@/store/formSlice/formSlice';

interface Props {
  onClose: () => void;
}

function UncontrolledBasicForm({ onClose }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const parsedData = {
      name: formData.get(FORM.FIELDS.NAME),
      age: formData.get(FORM.FIELDS.AGE),
      email: formData.get(FORM.FIELDS.EMAIL),
      gender: formData.get(FORM.FIELDS.GENDER),
      terms: formData.get(FORM.FIELDS.TERMS) === 'on',
    };

    const result = zodSchema.safeParse(parsedData);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (typeof fieldName === 'string') {
          nextErrors[fieldName] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    setErrors({});

    dispatch(
      addRecord({
        name: result.data.name,
        age: result.data.age,
        email: result.data.email,
        gender: result.data.gender,
        country: '',
        password: '',
        imageBase64: null,
        source: 'uncontrolled',
      })
    );

    form.reset();
    onClose();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <BasicFormFields errors={errors} />

      <Button type={BUTTON_TYPES.SUBMIT}>{FORM.LABELS.SUBMIT}</Button>
    </form>
  );
}

export default UncontrolledBasicForm;

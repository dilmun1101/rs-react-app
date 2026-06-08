import { useRef, useState } from 'react';
import Button from '@/shared/ui/button/Button';
import BasicFormFields from '@/shared/ui/basic-form-fields/BasicFormFields';
import AdvancedFormFields from '@/shared/ui/advanced-form-fields/AdvancedFormFields';
import { BUTTON_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';
import { zodSchema } from '@/shared/zod-schema/zodSchema';
import { useAppDispatch } from '@/store/hooks/hooks';
import { addRecord } from '@/store/formSlice/formSlice';
import { convertFileToBase64 } from '@/shared/utils/covert-file-to-base64';
import type { FormFieldErrors } from '@/store/formSlice/types/types';
import type { FormSchema } from '@/shared/zod-schema/zodSchema';

interface Props {
  onClose: () => void;
}

const getString = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
};

function UncontrolledForm({ onClose }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const avatarInput = form.elements.namedItem(
      FORM.FIELDS.AVATAR
    ) as HTMLInputElement | null;

    const parsedData = {
      name: getString(formData, FORM.FIELDS.NAME),
      age: Number(getString(formData, FORM.FIELDS.AGE)),
      email: getString(formData, FORM.FIELDS.EMAIL),
      gender: getString(formData, FORM.FIELDS.GENDER),
      terms: formData.get(FORM.FIELDS.TERMS) === 'on',
      password: getString(formData, FORM.FIELDS.PASSWORD),
      confirmPassword: getString(formData, FORM.FIELDS.CONFIRM_PASSWORD),
      country: getString(formData, FORM.FIELDS.COUNTRY),
      avatar: avatarInput?.files,
    };

    const result = zodSchema.safeParse(parsedData);

    if (!result.success) {
      const nextErrors: FormFieldErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (typeof fieldName === 'string') {
          nextErrors[fieldName as keyof FormSchema] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    const avatarFile = result.data.avatar;

    if (!avatarFile) {
      return;
    }

    const imageBase64 = await convertFileToBase64(avatarFile);

    dispatch(
      addRecord({
        name: result.data.name,
        age: result.data.age,
        email: result.data.email,
        gender: result.data.gender,
        country: result.data.country,
        imageBase64,
        source: 'uncontrolled',
      })
    );

    setErrors({});
    setPasswordValue('');
    form.reset();
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { target } = event;

    if (
      target instanceof HTMLInputElement &&
      target.name === FORM.FIELDS.PASSWORD
    ) {
      setPasswordValue(target.value);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      onChange={handleChange}
      noValidate
    >
      <BasicFormFields errors={errors} />
      <AdvancedFormFields errors={errors} passwordValue={passwordValue} />

      <Button type={BUTTON_TYPES.SUBMIT}>{FORM.LABELS.SUBMIT}</Button>
    </form>
  );
}

export default UncontrolledForm;

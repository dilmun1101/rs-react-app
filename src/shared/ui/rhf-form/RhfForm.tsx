import { useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/shared/ui/button/Button';
import BasicFormFields from '@/shared/ui/basic-form-fields/BasicFormFields';
import AdvancedFormFields from '@/shared/ui/advanced-form-fields/AdvancedFormFields';
import { zodSchema } from '@/shared/zod-schema/zodSchema';
import type { FormSchemaInput } from '@/shared/zod-schema/zodSchema';
import { useAppDispatch } from '@/store/hooks/hooks';
import { addRecord } from '@/store/formSlice/formSlice';
import { BUTTON_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';
import { convertFileToBase64 } from '@/shared/utils/covert-file-to-base64';
import type { FormFieldErrors } from '@/store/formSlice/types/types';

interface Props {
  onClose: () => void;
}

function mapRHFErrors(errors: FieldErrors<FormSchemaInput>): FormFieldErrors {
  return {
    name: errors.name?.message,
    age: errors.age?.message,
    email: errors.email?.message,
    gender: errors.gender?.message,
    terms: errors.terms?.message,
    password: errors.password?.message,
    confirmPassword: errors.confirmPassword?.message,
    country: errors.country?.message,
    avatar: errors.avatar?.message,
  };
}

function RHFForm({ onClose }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormSchemaInput>({
    resolver: zodResolver(zodSchema),
    mode: 'onChange',
  });

  const mappedErrors = mapRHFErrors(errors);

  const onSubmit: SubmitHandler<FormSchemaInput> = async (data) => {
    const parsedData = zodSchema.parse(data);
    const avatarFile = parsedData.avatar;

    if (!avatarFile) {
      return;
    }

    const imageBase64 = await convertFileToBase64(avatarFile);

    dispatch(
      addRecord({
        name: parsedData.name,
        age: parsedData.age,
        email: parsedData.email,
        gender: parsedData.gender,
        country: parsedData.country,
        imageBase64,
        source: 'rhf',
      })
    );

    reset();
    onClose();
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      noValidate
    >
      <BasicFormFields errors={mappedErrors} register={register} />

      <AdvancedFormFields
        errors={mappedErrors}
        register={register}
        watchFormField={watch}
      />

      <Button type={BUTTON_TYPES.SUBMIT} disabled={!isValid}>
        {FORM.LABELS.SUBMIT}
      </Button>
    </form>
  );
}

export default RHFForm;

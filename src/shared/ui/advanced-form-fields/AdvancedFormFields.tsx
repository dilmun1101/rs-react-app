import Input from '@/shared/ui/input/Input';
import CountryAutocomplete from '../country-autocomplete/CountryAutocomplete';
import PasswordStrength from '../password-strength/PasswordStrength';
import { INPUT_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';
import type { FormFieldErrors } from '@/store/formSlice/types/types';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { FormSchemaInput } from '@/shared/zod-schema/zodSchema';

interface Props {
  errors?: FormFieldErrors;
  register?: UseFormRegister<FormSchemaInput>;
  watchFormField?: UseFormWatch<FormSchemaInput>;
  passwordValue?: string;
}

function AdvancedFormFields({
  errors = {},
  register,
  watchFormField,
  passwordValue = '',
}: Props) {
  const registerField = (name: keyof FormSchemaInput) =>
    register ? register(name) : { name };

  const watchedPassword = watchFormField?.(FORM.FIELDS.PASSWORD);
  const currentPassword =
    typeof watchedPassword === 'string' ? watchedPassword : passwordValue;

  return (
    <>
      <Input
        id="password"
        type={INPUT_TYPES.PASSWORD}
        label={FORM.LABELS.PASSWORD}
        error={errors.password}
        {...registerField(FORM.FIELDS.PASSWORD)}
      />

      <PasswordStrength password={currentPassword} />

      <Input
        id="confirm-password"
        type={INPUT_TYPES.PASSWORD}
        label={FORM.LABELS.CONFIRM_PASSWORD}
        error={errors.confirmPassword}
        {...registerField(FORM.FIELDS.CONFIRM_PASSWORD)}
      />

      <Input
        id="avatar"
        type={INPUT_TYPES.FILE}
        label={FORM.LABELS.AVATAR}
        accept="image/png, image/jpeg"
        error={errors.avatar}
        {...registerField(FORM.FIELDS.AVATAR)}
      />

      <CountryAutocomplete
        id="country"
        label={FORM.LABELS.COUNTRY}
        error={errors.country}
        {...registerField(FORM.FIELDS.COUNTRY)}
      />
    </>
  );
}

export default AdvancedFormFields;

import Input from '@/shared/ui/input/Input';
import { INPUT_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';
import type { FormFieldErrors } from '@/store/formSlice/types/types';
import type { UseFormRegister } from 'react-hook-form';
import type { FormSchemaInput } from '@/shared/zod-schema/zodSchema';

interface Props {
  errors?: FormFieldErrors;
  register?: UseFormRegister<FormSchemaInput>;
}

function BasicFormFields({ errors = {}, register }: Props) {
  const registerField = (name: keyof FormSchemaInput) =>
    register ? register(name) : { name };

  const registerAgeField = register
    ? register(FORM.FIELDS.AGE, { valueAsNumber: true })
    : { name: FORM.FIELDS.AGE };

  return (
    <>
      <Input
        id="name"
        {...registerField(FORM.FIELDS.NAME)}
        label={FORM.LABELS.NAME}
        error={errors.name}
      />
      <Input
        id="age"
        {...registerAgeField}
        label={FORM.LABELS.AGE}
        type={INPUT_TYPES.NUMBER}
        error={errors.age}
      />
      <Input
        id="email"
        {...registerField(FORM.FIELDS.EMAIL)}
        label={FORM.LABELS.EMAIL}
        type={INPUT_TYPES.EMAIL}
        error={errors.email}
      />

      <fieldset>
        <legend>{FORM.LABELS.GENDER}</legend>
        <Input
          type={INPUT_TYPES.RADIO}
          {...registerField(FORM.FIELDS.GENDER)}
          value={FORM.FIELDS.GENDER_VALUES.MALE}
          label={FORM.LABELS.MALE}
          id="gender-male"
        />
        <Input
          type={INPUT_TYPES.RADIO}
          {...registerField(FORM.FIELDS.GENDER)}
          value={FORM.FIELDS.GENDER_VALUES.FEMALE}
          label={FORM.LABELS.FEMALE}
          id="gender-female"
        />
      </fieldset>

      <Input
        type={INPUT_TYPES.CHECKBOX}
        {...registerField(FORM.FIELDS.TERMS)}
        label={FORM.LABELS.TERMS}
        id="terms"
        error={errors.terms}
      />
    </>
  );
}

export default BasicFormFields;

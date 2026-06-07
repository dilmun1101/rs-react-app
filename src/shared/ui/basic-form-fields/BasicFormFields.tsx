import Input from '@/shared/ui/input/Input';
import { INPUT_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';

interface Props {
  errors?: Record<string, string>;
}

function BasicFormFields({ errors = {} }: Props) {
  return (
    <>
      <Input
        id="name"
        name={FORM.FIELDS.NAME}
        label={FORM.LABELS.NAME}
        error={errors.name}
      />
      <Input
        id="age"
        name={FORM.FIELDS.AGE}
        label={FORM.LABELS.AGE}
        type={INPUT_TYPES.NUMBER}
        error={errors.age}
      />
      <Input
        id="email"
        name={FORM.FIELDS.EMAIL}
        label={FORM.LABELS.EMAIL}
        type={INPUT_TYPES.EMAIL}
        error={errors.email}
      />

      <fieldset>
        <legend>{FORM.LABELS.GENDER}</legend>
        <Input
          type={INPUT_TYPES.RADIO}
          name={FORM.FIELDS.GENDER}
          value={FORM.FIELDS.GENDER_VALUES.MALE}
          label={FORM.LABELS.MALE}
          id="gender-male"
        />
        <Input
          type={INPUT_TYPES.RADIO}
          name={FORM.FIELDS.GENDER}
          value={FORM.FIELDS.GENDER_VALUES.FEMALE}
          label={FORM.LABELS.FEMALE}
          id="gender-female"
        />
      </fieldset>

      <Input
        type={INPUT_TYPES.CHECKBOX}
        name={FORM.FIELDS.TERMS}
        label={FORM.LABELS.TERMS}
        id="terms"
        error={errors.terms}
      />
    </>
  );
}

export default BasicFormFields;

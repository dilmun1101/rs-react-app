import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import { INPUT_TYPES, BUTTON_TYPES } from '@/shared/constants/enums';
import { FORM } from '@/shared/constants/constants';

function BasicForm() {
  return (
    <form>
      <Input name={FORM.FIELDS.NAME} label={FORM.LABELS.NAME} />
      <Input
        name={FORM.FIELDS.AGE}
        label={FORM.LABELS.AGE}
        type={INPUT_TYPES.NUMBER}
      />
      <Input
        name={FORM.FIELDS.EMAIL}
        label={FORM.LABELS.EMAIL}
        type={INPUT_TYPES.EMAIL}
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
      />

      <Button type={BUTTON_TYPES.SUBMIT}>{FORM.LABELS.SUBMIT}</Button>
    </form>
  );
}

export default BasicForm;

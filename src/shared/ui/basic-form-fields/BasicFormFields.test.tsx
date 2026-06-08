import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import BasicFormFields from './BasicFormFields';
import { FORM } from '@/shared/constants/constants';
import { INPUT_TYPES } from '@/shared/constants/enums';

describe('BasicFormFields', () => {
  it('renders text, number and email fields', () => {
    const { getByLabelText } = render(<BasicFormFields />);

    const nameInput = getByLabelText(FORM.LABELS.NAME) as HTMLInputElement;
    const ageInput = getByLabelText(FORM.LABELS.AGE) as HTMLInputElement;
    const emailInput = getByLabelText(FORM.LABELS.EMAIL) as HTMLInputElement;

    expect(nameInput).toBeTruthy();
    expect(nameInput.id).toBe('name');

    expect(ageInput).toBeTruthy();
    expect(ageInput.id).toBe('age');
    expect(ageInput.type).toBe(INPUT_TYPES.NUMBER);

    expect(emailInput).toBeTruthy();
    expect(emailInput.id).toBe('email');
    expect(emailInput.type).toBe(INPUT_TYPES.EMAIL);
  });

  it('renders gender radio buttons and terms checkbox', () => {
    const { getByLabelText } = render(<BasicFormFields />);

    const maleRadio = getByLabelText(FORM.LABELS.MALE) as HTMLInputElement;
    const femaleRadio = getByLabelText(FORM.LABELS.FEMALE) as HTMLInputElement;
    const termsCheckbox = getByLabelText(FORM.LABELS.TERMS) as HTMLInputElement;

    expect(maleRadio).toBeTruthy();
    expect(maleRadio.type).toBe(INPUT_TYPES.RADIO);
    expect(maleRadio.value).toBe(FORM.FIELDS.GENDER_VALUES.MALE);

    expect(femaleRadio).toBeTruthy();
    expect(femaleRadio.type).toBe(INPUT_TYPES.RADIO);
    expect(femaleRadio.value).toBe(FORM.FIELDS.GENDER_VALUES.FEMALE);

    expect(termsCheckbox).toBeTruthy();
    expect(termsCheckbox.type).toBe(INPUT_TYPES.CHECKBOX);
    expect(termsCheckbox.id).toBe('terms');
  });

  it('renders error messages', () => {
    const { container } = render(
      <BasicFormFields
        errors={{
          name: 'Name is required',
          age: 'Age is required',
          email: 'Email is invalid',
          terms: 'Accept terms',
        }}
      />
    );

    const text = container.textContent;

    expect(text.includes('Name is required')).toBe(true);
    expect(text.includes('Age is required')).toBe(true);
    expect(text.includes('Email is invalid')).toBe(true);
    expect(text.includes('Accept terms')).toBe(true);
  });

  it('calls register for all fields when register prop is passed', () => {
    const register = vi.fn((name: string) => ({ name }));

    render(<BasicFormFields register={register as never} />);

    expect(register).toHaveBeenCalledWith(FORM.FIELDS.NAME);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.EMAIL);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.GENDER);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.GENDER);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.TERMS);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.AGE, {
      valueAsNumber: true,
    });
  });
});

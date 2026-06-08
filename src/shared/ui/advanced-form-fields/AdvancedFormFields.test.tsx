import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import AdvancedFormFields from './AdvancedFormFields';
import { FORM } from '@/shared/constants/constants';
import { INPUT_TYPES } from '@/shared/constants/enums';

vi.mock('../country-autocomplete/CountryAutocomplete', () => ({
  default: ({
    id,
    label,
    error,
    ...rest
  }: {
    id?: string;
    label?: string;
    error?: string;
    [key: string]: unknown;
  }) => (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} data-testid="country-autocomplete" {...rest} />
      <span>{error ?? ' '}</span>
    </div>
  ),
}));

vi.mock('../password-strength/PasswordStrength', () => ({
  default: ({ password }: { password: string }) => (
    <div data-testid="password-strength">{password}</div>
  ),
}));

describe('AdvancedFormFields', () => {
  it('renders password, confirm password, avatar and country fields', () => {
    const { getByLabelText } = render(<AdvancedFormFields />);

    const passwordInput = getByLabelText(
      FORM.LABELS.PASSWORD
    ) as HTMLInputElement;
    const confirmPasswordInput = getByLabelText(
      FORM.LABELS.CONFIRM_PASSWORD
    ) as HTMLInputElement;
    const avatarInput = getByLabelText(FORM.LABELS.AVATAR) as HTMLInputElement;
    const countryInput = getByLabelText(
      FORM.LABELS.COUNTRY
    ) as HTMLInputElement;

    expect(passwordInput).toBeTruthy();
    expect(passwordInput.id).toBe('password');
    expect(passwordInput.type).toBe(INPUT_TYPES.PASSWORD);

    expect(confirmPasswordInput).toBeTruthy();
    expect(confirmPasswordInput.id).toBe('confirm-password');
    expect(confirmPasswordInput.type).toBe(INPUT_TYPES.PASSWORD);

    expect(avatarInput).toBeTruthy();
    expect(avatarInput.id).toBe('avatar');
    expect(avatarInput.type).toBe(INPUT_TYPES.FILE);
    expect(avatarInput.accept).toBe('image/png, image/jpeg');

    expect(countryInput).toBeTruthy();
    expect(countryInput.id).toBe('country');
  });

  it('renders error messages', () => {
    const { getByText } = render(
      <AdvancedFormFields
        errors={{
          password: 'Password is required',
          confirmPassword: 'Passwords do not match',
          avatar: 'Avatar is required',
          country: 'Country is required',
        }}
      />
    );

    [
      'Password is required',
      'Passwords do not match',
      'Avatar is required',
      'Country is required',
    ].forEach((message) => {
      expect(getByText(message)).toBeTruthy();
    });
  });

  it('calls register for all fields when register prop is passed', () => {
    const register = vi.fn((name: string) => ({ name }));

    render(<AdvancedFormFields register={register as never} />);

    expect(register).toHaveBeenCalledWith(FORM.FIELDS.PASSWORD);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.CONFIRM_PASSWORD);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.AVATAR);
    expect(register).toHaveBeenCalledWith(FORM.FIELDS.COUNTRY);
  });

  it('passes watched password to PasswordStrength', () => {
    const watchFormField = vi.fn((fieldName: string) =>
      fieldName === FORM.FIELDS.PASSWORD ? 'StrongPass123!' : ''
    );

    const { getByTestId } = render(
      <AdvancedFormFields watchFormField={watchFormField as never} />
    );

    expect(watchFormField).toHaveBeenCalledWith(FORM.FIELDS.PASSWORD);
    expect(getByTestId('password-strength').textContent).toBe('StrongPass123!');
  });

  it('uses passwordValue fallback when watchFormField is not provided', () => {
    const { getByTestId } = render(
      <AdvancedFormFields passwordValue="FallbackPass123!" />
    );

    expect(getByTestId('password-strength').textContent).toBe(
      'FallbackPass123!'
    );
  });
});

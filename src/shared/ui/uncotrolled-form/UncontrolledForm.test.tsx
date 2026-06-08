import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import UncontrolledForm from './UncontrolledForm';
import { useAppDispatch } from '@/store/hooks/hooks';
import { addRecord } from '@/store/formSlice/formSlice';
import { convertFileToBase64 } from '@/shared/utils/covert-file-to-base64';
import { FORM } from '@/shared/constants/constants';

interface AddRecordPayload {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  imageBase64: string;
  source: 'uncontrolled';
}

const { safeParseMock } = vi.hoisted(() => ({
  safeParseMock: vi.fn(),
}));

vi.mock('@/store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/store/formSlice/formSlice', () => ({
  addRecord: vi.fn<
    (payload: AddRecordPayload) => { type: string; payload: AddRecordPayload }
  >((payload: AddRecordPayload) => ({
    type: 'form/addRecord',
    payload,
  })),
}));

vi.mock('@/shared/utils/covert-file-to-base64', () => ({
  convertFileToBase64: vi.fn<(file: File) => Promise<string>>(),
}));

vi.mock('@/shared/zod-schema/zodSchema', () => ({
  zodSchema: {
    safeParse: safeParseMock,
  },
}));

vi.mock('@/shared/ui/basic-form-fields/BasicFormFields', () => ({
  default: ({ errors }: { errors?: Record<string, string | undefined> }) => (
    <div>
      <input name={FORM.FIELDS.NAME} aria-label={FORM.LABELS.NAME} />
      <input name={FORM.FIELDS.AGE} aria-label={FORM.LABELS.AGE} />
      <input name={FORM.FIELDS.EMAIL} aria-label={FORM.LABELS.EMAIL} />
      <input
        type="radio"
        name={FORM.FIELDS.GENDER}
        value="male"
        aria-label={FORM.LABELS.MALE}
      />
      <input
        type="radio"
        name={FORM.FIELDS.GENDER}
        value="female"
        aria-label={FORM.LABELS.FEMALE}
      />
      <input
        type="checkbox"
        name={FORM.FIELDS.TERMS}
        aria-label={FORM.LABELS.TERMS}
      />

      {errors?.name ? <span>{errors.name}</span> : null}
      {errors?.age ? <span>{errors.age}</span> : null}
      {errors?.email ? <span>{errors.email}</span> : null}
      {errors?.gender ? <span>{errors.gender}</span> : null}
      {errors?.terms ? <span>{errors.terms}</span> : null}
    </div>
  ),
}));

vi.mock('@/shared/ui/advanced-form-fields/AdvancedFormFields', () => ({
  default: ({
    errors,
    passwordValue,
  }: {
    errors?: Record<string, string | undefined>;
    passwordValue?: string;
  }) => (
    <div>
      <input name={FORM.FIELDS.PASSWORD} aria-label={FORM.LABELS.PASSWORD} />
      <input
        name={FORM.FIELDS.CONFIRM_PASSWORD}
        aria-label={FORM.LABELS.CONFIRM_PASSWORD}
      />
      <input
        type="file"
        name={FORM.FIELDS.AVATAR}
        aria-label={FORM.LABELS.AVATAR}
      />
      <input name={FORM.FIELDS.COUNTRY} aria-label={FORM.LABELS.COUNTRY} />

      {passwordValue ? <div>{passwordValue}</div> : null}

      {errors?.password ? <span>{errors.password}</span> : null}
      {errors?.confirmPassword ? <span>{errors.confirmPassword}</span> : null}
      {errors?.country ? <span>{errors.country}</span> : null}
      {errors?.avatar ? <span>{errors.avatar}</span> : null}
    </div>
  ),
}));

describe('UncontrolledForm', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(
      dispatch as ReturnType<typeof useAppDispatch>
    );
  });

  it('renders form fields and submit button', () => {
    render(<UncontrolledForm onClose={vi.fn()} />);

    expect(screen.getByLabelText(FORM.LABELS.NAME)).toBeTruthy();
    expect(screen.getByLabelText(FORM.LABELS.AGE)).toBeTruthy();
    expect(screen.getByLabelText(FORM.LABELS.EMAIL)).toBeTruthy();
    expect(screen.getByLabelText(FORM.LABELS.PASSWORD)).toBeTruthy();
    expect(screen.getByLabelText(FORM.LABELS.CONFIRM_PASSWORD)).toBeTruthy();
    expect(screen.getByLabelText(FORM.LABELS.AVATAR)).toBeTruthy();
    expect(screen.getByLabelText(FORM.LABELS.COUNTRY)).toBeTruthy();
    expect(
      screen.getByRole('button', { name: FORM.LABELS.SUBMIT })
    ).toBeTruthy();
  });

  it('updates passwordValue on password input change', async () => {
    const user = userEvent.setup();

    render(<UncontrolledForm onClose={vi.fn()} />);

    const passwordInput = screen.getByLabelText(FORM.LABELS.PASSWORD);

    await user.type(passwordInput, 'StrongPass123!');

    expect(screen.getByText('StrongPass123!')).toBeTruthy();
  });

  it('shows validation errors when form is invalid', async () => {
    const user = userEvent.setup();

    safeParseMock.mockReturnValue({
      success: false,
      error: {
        issues: [
          { path: ['name'], message: 'Name is required' },
          { path: ['age'], message: 'Age must be positive' },
          { path: ['email'], message: 'Email is required' },
          { path: ['gender'], message: 'Gender is required' },
          { path: ['terms'], message: 'Accept terms' },
          { path: ['password'], message: 'Password is required' },
          {
            path: ['confirmPassword'],
            message: 'Please confirm your password',
          },
          {
            path: ['country'],
            message: 'Please select a valid country',
          },
          { path: ['avatar'], message: 'Avatar is required' },
        ],
      },
    });

    render(<UncontrolledForm onClose={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: FORM.LABELS.SUBMIT }));

    expect(screen.getByText('Name is required')).toBeTruthy();
    expect(screen.getByText('Age must be positive')).toBeTruthy();
    expect(screen.getByText('Email is required')).toBeTruthy();
    expect(screen.getByText('Gender is required')).toBeTruthy();
    expect(screen.getByText('Accept terms')).toBeTruthy();
    expect(screen.getByText('Password is required')).toBeTruthy();
    expect(screen.getByText('Please confirm your password')).toBeTruthy();
    expect(screen.getByText('Please select a valid country')).toBeTruthy();
    expect(screen.getByText('Avatar is required')).toBeTruthy();

    expect(convertFileToBase64).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('submits valid form, dispatches addRecord and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const file = new File(['test'], 'avatar.png', { type: 'image/png' });

    vi.mocked(convertFileToBase64).mockResolvedValue('base64-test');

    safeParseMock.mockReturnValue({
      success: true,
      data: {
        name: 'Test',
        age: 30,
        email: 'test@test.com',
        gender: 'male',
        terms: true,
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
        country: 'Kazakhstan',
        avatar: file,
      },
    });

    render(<UncontrolledForm onClose={onClose} />);

    await user.type(screen.getByLabelText(FORM.LABELS.NAME), 'Test');
    await user.type(screen.getByLabelText(FORM.LABELS.AGE), '30');
    await user.type(screen.getByLabelText(FORM.LABELS.EMAIL), 'test@test.com');
    await user.click(screen.getByLabelText(FORM.LABELS.MALE));
    await user.click(screen.getByLabelText(FORM.LABELS.TERMS));
    await user.type(
      screen.getByLabelText(FORM.LABELS.PASSWORD),
      'StrongPass1!'
    );
    await user.type(
      screen.getByLabelText(FORM.LABELS.CONFIRM_PASSWORD),
      'StrongPass1!'
    );
    await user.type(screen.getByLabelText(FORM.LABELS.COUNTRY), 'Kazakhstan');
    await user.upload(screen.getByLabelText(FORM.LABELS.AVATAR), file);

    await user.click(screen.getByRole('button', { name: FORM.LABELS.SUBMIT }));

    await waitFor(() => {
      expect(convertFileToBase64).toHaveBeenCalledWith(file);
    });

    expect(addRecord).toHaveBeenCalledWith({
      name: 'Test',
      age: 30,
      email: 'test@test.com',
      gender: 'male',
      country: 'Kazakhstan',
      imageBase64: 'base64-test',
      source: 'uncontrolled',
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'form/addRecord',
      payload: {
        name: 'Test',
        age: 30,
        email: 'test@test.com',
        gender: 'male',
        country: 'Kazakhstan',
        imageBase64: 'base64-test',
        source: 'uncontrolled',
      },
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clears previous errors after successful submit', async () => {
    const user = userEvent.setup();
    const file = new File(['test'], 'avatar.png', { type: 'image/png' });

    vi.mocked(convertFileToBase64).mockResolvedValue('base64-test');

    safeParseMock
      .mockReturnValueOnce({
        success: false,
        error: {
          issues: [{ path: ['name'], message: 'Name is required' }],
        },
      })
      .mockReturnValueOnce({
        success: true,
        data: {
          name: 'Test',
          age: 30,
          email: 'test@test.com',
          gender: 'male',
          terms: true,
          password: 'StrongPass1!',
          confirmPassword: 'StrongPass1!',
          country: 'Kazakhstan',
          avatar: [file],
        },
      });

    render(<UncontrolledForm onClose={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: FORM.LABELS.SUBMIT }));
    expect(screen.getByText('Name is required')).toBeTruthy();

    await user.type(screen.getByLabelText(FORM.LABELS.NAME), 'Test');
    await user.type(screen.getByLabelText(FORM.LABELS.AGE), '30');
    await user.type(screen.getByLabelText(FORM.LABELS.EMAIL), 'test@test.com');
    await user.click(screen.getByLabelText(FORM.LABELS.MALE));
    await user.click(screen.getByLabelText(FORM.LABELS.TERMS));
    await user.type(
      screen.getByLabelText(FORM.LABELS.PASSWORD),
      'StrongPass1!'
    );
    await user.type(
      screen.getByLabelText(FORM.LABELS.CONFIRM_PASSWORD),
      'StrongPass1!'
    );
    await user.type(screen.getByLabelText(FORM.LABELS.COUNTRY), 'Kazakhstan');
    await user.upload(screen.getByLabelText(FORM.LABELS.AVATAR), file);

    await user.click(screen.getByRole('button', { name: FORM.LABELS.SUBMIT }));

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).toBeNull();
    });
  });
});

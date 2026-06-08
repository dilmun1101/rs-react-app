import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import RHFForm from './RhfForm';
import { useAppDispatch } from '@/store/hooks/hooks';
import { addRecord } from '@/store/formSlice/formSlice';
import { convertFileToBase64 } from '@/shared/utils/covert-file-to-base64';
import { FORM } from '@/shared/constants/constants';
import type {
  FormSchema,
  FormSchemaInput,
} from '@/shared/zod-schema/zodSchema';

interface AddRecordPayload {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  imageBase64: string;
  source: 'rhf';
}

type SubmitFn = (data: FormSchemaInput) => Promise<void> | void;
type SubmitHandlerFactory = (
  onSubmit: SubmitFn
) => (event?: { preventDefault?: () => void }) => Promise<void> | void;

const { parseMock } = vi.hoisted(() => ({
  parseMock: vi.fn(),
}));

const mockHandleSubmit = vi.fn<SubmitHandlerFactory>();
const mockRegister = vi.fn<(name: string) => { name: string }>(
  (name: string) => ({
    name,
  })
);
const mockWatch = vi.fn<(name?: string) => string | undefined>();
const mockReset = vi.fn<() => void>();

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => vi.fn()),
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
    parse: parseMock,
  },
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: mockRegister,
    watch: mockWatch,
    handleSubmit: mockHandleSubmit,
    reset: mockReset,
    formState: {
      errors: {},
      isValid: true,
    },
  })),
}));

vi.mock('@/shared/ui/basic-form-fields/BasicFormFields', () => ({
  default: () => <div>BasicFormFields</div>,
}));

vi.mock('@/shared/ui/advanced-form-fields/AdvancedFormFields', () => ({
  default: () => <div>AdvancedFormFields</div>,
}));

describe('RHFForm', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(
      dispatch as ReturnType<typeof useAppDispatch>
    );
  });

  it('renders form fields sections and submit button', () => {
    mockHandleSubmit.mockImplementation(() => () => Promise.resolve());

    const { getByText } = render(<RHFForm onClose={vi.fn()} />);

    expect(getByText('BasicFormFields')).toBeTruthy();
    expect(getByText('AdvancedFormFields')).toBeTruthy();
    expect(getByText(FORM.LABELS.SUBMIT)).toBeTruthy();
  });

  it('passes submit event into handleSubmit wrapper', async () => {
    const user = userEvent.setup();
    const submittedHandler =
      vi.fn<(event?: { preventDefault?: () => void }) => void>();

    mockHandleSubmit.mockImplementation(() => submittedHandler);

    const { getByRole } = render(<RHFForm onClose={vi.fn()} />);
    const submitButton = getByRole('button', { name: FORM.LABELS.SUBMIT });

    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(submittedHandler).toHaveBeenCalled();
  });

  it('parses data, converts avatar, dispatches addRecord, resets form and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    const formData: FormSchemaInput = {
      name: 'Test',
      age: 30,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      password: 'StrongPass1!',
      confirmPassword: 'StrongPass1!',
      country: 'Kazakhstan',
      avatar: file,
    };

    const parsedData: FormSchema = {
      name: 'Test',
      age: 30,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      password: 'StrongPass1!',
      confirmPassword: 'StrongPass1!',
      country: 'Kazakhstan',
      avatar: file,
    };

    mockHandleSubmit.mockImplementation((onSubmit) => {
      return async (event) => {
        event?.preventDefault?.();
        await onSubmit(formData);
      };
    });

    parseMock.mockReturnValue(parsedData);
    vi.mocked(convertFileToBase64).mockResolvedValue('base64-test');

    const { getByRole } = render(<RHFForm onClose={onClose} />);

    await user.click(getByRole('button', { name: FORM.LABELS.SUBMIT }));

    await waitFor(() => {
      expect(parseMock).toHaveBeenCalledWith(formData);
    });

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
      source: 'rhf',
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
        source: 'rhf',
      },
    });

    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

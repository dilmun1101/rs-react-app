import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import FormModalActions from './FormModalActions';

describe('FormModalActions', () => {
  it('renders both action buttons', () => {
    const { getByRole } = render(
      <FormModalActions
        onOpenUncontrolledForm={vi.fn()}
        onOpenRHFForm={vi.fn()}
      />
    );

    const uncontrolledButton = getByRole('button', {
      name: /uncontrolled form/i,
    });
    const rhfButton = getByRole('button', {
      name: /react hook form/i,
    });

    expect(uncontrolledButton).toBeTruthy();
    expect(rhfButton).toBeTruthy();
  });

  it('calls onOpenUncontrolledForm when "Uncontrolled Form" button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenUncontrolledForm = vi.fn();
    const onOpenRHFForm = vi.fn();

    const { getByRole } = render(
      <FormModalActions
        onOpenUncontrolledForm={onOpenUncontrolledForm}
        onOpenRHFForm={onOpenRHFForm}
      />
    );

    const uncontrolledButton = getByRole('button', {
      name: /uncontrolled form/i,
    });

    await user.click(uncontrolledButton);

    expect(onOpenUncontrolledForm).toHaveBeenCalledTimes(1);
    expect(onOpenRHFForm).not.toHaveBeenCalled();
  });

  it('calls onOpenRHFForm when "React Hook Form" button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenUncontrolledForm = vi.fn();
    const onOpenRHFForm = vi.fn();

    const { getByRole } = render(
      <FormModalActions
        onOpenUncontrolledForm={onOpenUncontrolledForm}
        onOpenRHFForm={onOpenRHFForm}
      />
    );

    const rhfButton = getByRole('button', {
      name: /react hook form/i,
    });

    await user.click(rhfButton);

    expect(onOpenRHFForm).toHaveBeenCalledTimes(1);
    expect(onOpenUncontrolledForm).not.toHaveBeenCalled();
  });
});

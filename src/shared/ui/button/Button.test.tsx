import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Button from './Button';

describe('Button', () => {
  it('renders children text', () => {
    const { getByRole } = render(<Button>Submit</Button>);

    const button = getByRole('button', { name: /submit/i });

    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Submit');
  });

  it('renders with default type="button"', () => {
    const { getByRole } = render(<Button>Submit</Button>);

    const button = getByRole('button', { name: /submit/i });

    expect(button.getAttribute('type')).toBe('button');
  });

  it('renders with custom type', () => {
    const { getByRole } = render(<Button type="submit">Submit</Button>);

    const button = getByRole('button', { name: /submit/i });

    expect(button.getAttribute('type')).toBe('submit');
  });

  it('calls onClick on click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { getByRole } = render(
      <Button onClick={handleClick}>Click me</Button>
    );

    const button = getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    const button = getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <Button className="extra-class">Click me</Button>
    );

    const button = getByRole('button', { name: /click me/i });

    expect(button.classList.contains('extra-class')).toBe(true);
  });

  it('passes through native button props', () => {
    const { getByTestId } = render(
      <Button data-testid="my-btn">Click me</Button>
    );

    const button = getByTestId('my-btn');

    expect(button).toBeTruthy();
    expect(button.getAttribute('data-testid')).toBe('my-btn');
  });
});

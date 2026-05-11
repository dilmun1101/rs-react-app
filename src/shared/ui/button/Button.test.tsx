import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button onClick={vi.fn()}>Click</Button>);

    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole('button', { name: 'Click' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

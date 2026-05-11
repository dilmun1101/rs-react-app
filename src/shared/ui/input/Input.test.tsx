import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';
import userEvent from '@testing-library/user-event';
import styles from './input.module.scss';

describe('Input', () => {
  it('renders label text when label prop is provided', () => {
    render(<Input id="name" label="Name" onChange={vi.fn()} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('associates input with label text', () => {
    render(<Input id="name" label="Name" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('does not render label when label prop is not provided', () => {
    render(<Input id="name" onChange={vi.fn()} />);

    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('renders input when label prop is not provided', () => {
    render(<Input id="name" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input id="name" label="Name" onChange={handleChange} />);

    const input = screen.getByLabelText('Name');
    await user.type(input, 'Eve');

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies hideLabel class when hideLabel is true', () => {
    render(<Input id="name" label="Name" hideLabel onChange={vi.fn()} />);

    const label = screen.getByText('Name');
    expect(label).toHaveClass(styles.hideLabel);
  });
});

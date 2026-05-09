import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('displays label and responds to input change', () => {
    const handleChange = vi.fn();

    render(<Input id="name" label="Name" onChange={handleChange} />);

    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Eve' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

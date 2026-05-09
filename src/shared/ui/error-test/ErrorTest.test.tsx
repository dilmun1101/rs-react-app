import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorTest from './ErrorTest';

describe('ErrorTest', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders test error button', () => {
    render(<ErrorTest />);

    expect(
      screen.getByRole('button', { name: 'Test Error' })
    ).toBeInTheDocument();
  });

  it('throws error after button click', () => {
    render(<ErrorTest />);

    const button = screen.getByRole('button', { name: 'Test Error' });

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test error');
  });
});

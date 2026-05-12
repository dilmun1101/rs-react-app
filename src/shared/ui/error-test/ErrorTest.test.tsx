import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorTest from './ErrorTest';
import { UI_MESSAGES } from '../../constants/messages';

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
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_TEST_ERROR })
    ).toBeInTheDocument();
  });
});

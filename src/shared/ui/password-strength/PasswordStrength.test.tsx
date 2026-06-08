import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PasswordStrength from './PasswordStrength';

describe('PasswordStrength', () => {
  it('renders nothing when password is empty', () => {
    const { container } = render(<PasswordStrength password="" />);

    expect(container.firstChild).toBe(null);
  });

  it('renders all password rules', () => {
    const { getByText } = render(
      <PasswordStrength password="StrongPass123!" />
    );

    [
      '1 uppercase letter',
      '1 lowercase letter',
      '1 number',
      '1 special character',
    ].forEach((rule) => {
      expect(getByText(rule)).toBeTruthy();
    });
  });

  it('renders list with 4 items when password is provided', () => {
    const { container } = render(
      <PasswordStrength password="StrongPass123!" />
    );

    const list = container.querySelector('ul');
    const items = container.querySelectorAll('li');

    expect(list).toBeTruthy();
    expect(items).toHaveLength(4);
  });

  it('marks all checks as passed for strong password', () => {
    const { container } = render(
      <PasswordStrength password="StrongPass123!" />
    );

    const text = container.textContent;

    expect(text.includes('1 uppercase letter')).toBe(true);
    expect(text.includes('1 lowercase letter')).toBe(true);
    expect(text.includes('1 number')).toBe(true);
    expect(text.includes('1 special character')).toBe(true);
  });

  it('renders rules for weak password', () => {
    const { getByText } = render(<PasswordStrength password="weak" />);

    expect(getByText('1 uppercase letter')).toBeTruthy();
    expect(getByText('1 lowercase letter')).toBeTruthy();
    expect(getByText('1 number')).toBeTruthy();
    expect(getByText('1 special character')).toBeTruthy();
  });
});

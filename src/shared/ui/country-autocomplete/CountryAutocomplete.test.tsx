import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import CountryAutocomplete from './CountryAutocomplete';
import { useAppSelector } from '@/store/hooks/hooks';

vi.mock('@/store/hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('CountryAutocomplete', () => {
  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue([
      'Kazakhstan',
      'Germany',
      'Sweden',
    ]);
  });

  it('renders input with label', () => {
    const { getByLabelText } = render(
      <CountryAutocomplete id="country" label="Country" />
    );

    const input = getByLabelText('Country') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.id).toBe('country');
    expect(input.getAttribute('list')).toBe('country-list');
    expect(input.autocomplete).toBe('off');
  });

  it('renders datalist options from store', () => {
    const { container } = render(
      <CountryAutocomplete id="country" label="Country" />
    );

    const datalist = container.querySelector('datalist');
    const options = Array.from(container.querySelectorAll('option'));

    expect(datalist).toBeTruthy();
    expect(datalist?.getAttribute('id')).toBe('country-list');
    expect(options).toHaveLength(3);
    expect(options.map((option) => option.getAttribute('value'))).toEqual([
      'Kazakhstan',
      'Germany',
      'Sweden',
    ]);
  });

  it('renders error text and alert role when error is passed', () => {
    const { container } = render(
      <CountryAutocomplete
        id="country"
        label="Country"
        error="Country is required"
      />
    );

    const error = container.querySelector('span');

    expect(error).toBeTruthy();
    expect(error?.textContent).toBe('Country is required');
    expect(error?.getAttribute('id')).toBe('country-error');
    expect(error?.getAttribute('role')).toBe('alert');
  });

  it('renders empty error placeholder when error is not passed', () => {
    const { container } = render(
      <CountryAutocomplete id="country" label="Country" />
    );

    const error = container.querySelector('span');

    expect(error).toBeTruthy();
    expect(error?.textContent).toBe(' ');
    expect(error?.getAttribute('id')).toBe('country-error');
    expect(error?.getAttribute('role')).toBe(null);
  });

  it('passes native input props', () => {
    const { getByDisplayValue } = render(
      <CountryAutocomplete defaultValue="Kazakhstan" readOnly />
    );

    const input = getByDisplayValue('Kazakhstan') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.readOnly).toBe(true);
    expect(input.value).toBe('Kazakhstan');
  });

  it('uses fallback datalist id when id is not passed', () => {
    const { container } = render(<CountryAutocomplete />);

    const input = container.querySelector('input');
    const datalist = container.querySelector('datalist');

    expect(input).toBeTruthy();
    expect(input?.getAttribute('list')).toBe('country-list');
    expect(datalist).toBeTruthy();
    expect(datalist?.getAttribute('id')).toBe('country-list');
  });
});

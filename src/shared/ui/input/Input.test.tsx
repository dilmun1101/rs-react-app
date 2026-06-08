import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Input from './Input';

describe('Input', () => {
  it('renders input with label', () => {
    const { getByLabelText } = render(<Input id="name" label="Name" />);

    const input = getByLabelText('Name');

    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).id).toBe('name');
  });

  it('passes value and onChange props', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { getByLabelText } = render(
      <Input id="email" label="Email" onChange={handleChange} />
    );

    const input = getByLabelText('Email') as HTMLInputElement;
    await user.type(input, 'test@mail.com');

    expect(handleChange).toHaveBeenCalled();
    expect(input.value).toBe('test@mail.com');
  });

  it('renders error text', () => {
    const { container } = render(
      <Input id="email" label="Email" error="Email is required" />
    );

    const error = container.querySelector('span');

    expect(error).toBeTruthy();
    expect(error?.textContent).toBe('Email is required');
    expect(error?.getAttribute('id')).toBe('email-error');
  });

  it('renders empty error placeholder when error is not passed', () => {
    const { container } = render(<Input id="email" label="Email" />);

    const error = container.querySelector('span');

    expect(error).toBeTruthy();
    expect(error?.textContent).toBe(' ');
    expect(error?.getAttribute('id')).toBe('email-error');
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <Input id="email" label="Email" className="extra-class" />
    );

    const wrapper = container.firstElementChild;

    expect(wrapper).toBeTruthy();
    expect(wrapper?.classList.contains('extra-class')).toBe(true);
  });

  it('passes native input props', () => {
    const { getByDisplayValue } = render(
      <Input defaultValue="hello" readOnly />
    );

    const input = getByDisplayValue('hello') as HTMLInputElement;

    expect(input.readOnly).toBe(true);
    expect(input.value).toBe('hello');
  });

  it('renders hidden label text when hideLabel is true', () => {
    const { getByLabelText, container } = render(
      <Input id="password" label="Password" hideLabel />
    );

    const input = getByLabelText('Password');
    const label = container.querySelector('label');

    expect(input).toBeTruthy();
    expect(label?.textContent).toBe('Password');
  });
});

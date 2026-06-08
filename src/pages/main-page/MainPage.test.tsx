import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import MainPage from './MainPage';

vi.mock('@/shared/ui/modal/Modal', () => ({
  default: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div>
      <div>Modal</div>
      <button onClick={onClose}>Close modal</button>
      {children}
    </div>
  ),
}));

vi.mock('@/shared/ui/uncotrolled-form/UncontrolledForm', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <div>UncontrolledForm</div>
      <button onClick={onClose}>Close uncontrolled form</button>
    </div>
  ),
}));

vi.mock('@/shared/ui/rhf-form/RhfForm', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <div>RHFForm</div>
      <button onClick={onClose}>Close rhf form</button>
    </div>
  ),
}));

vi.mock('@/shared/ui/record-list/RecordsList', () => ({
  default: () => <div>RecordsList</div>,
}));

describe('MainPage', () => {
  it('renders page buttons and records list', () => {
    render(<MainPage />);

    expect(
      screen.getByRole('button', { name: 'Uncontrolled Form' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'React Hook Form' })
    ).toBeInTheDocument();
    expect(screen.getByText('Submitted data')).toBeInTheDocument();
    expect(screen.getByText('RecordsList')).toBeInTheDocument();
  });

  it('opens uncontrolled form inside modal', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    expect(screen.queryByText('Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('UncontrolledForm')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));

    expect(screen.getByText('Modal')).toBeInTheDocument();
    expect(screen.getByText('UncontrolledForm')).toBeInTheDocument();
    expect(screen.queryByText('RHFForm')).not.toBeInTheDocument();
  });

  it('opens react hook form inside modal', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));

    expect(screen.getByText('Modal')).toBeInTheDocument();
    expect(screen.getByText('RHFForm')).toBeInTheDocument();
    expect(screen.queryByText('UncontrolledForm')).not.toBeInTheDocument();
  });

  it('closes modal when modal close button is clicked', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));

    expect(screen.getByText('Modal')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(screen.queryByText('Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('UncontrolledForm')).not.toBeInTheDocument();
  });

  it('passes onClose to uncontrolled form', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));

    expect(screen.getByText('UncontrolledForm')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Close uncontrolled form' })
    );

    expect(screen.queryByText('Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('UncontrolledForm')).not.toBeInTheDocument();
  });

  it('passes onClose to RHF form', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'React Hook Form' }));

    expect(screen.getByText('RHFForm')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close rhf form' }));

    expect(screen.queryByText('Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('RHFForm')).not.toBeInTheDocument();
  });
});

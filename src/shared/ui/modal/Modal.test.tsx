import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../button/Button', () => ({
  default: ({
    children,
    onClick,
    type,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
  }) => (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

vi.mock('lucide-react', () => ({
  X: () => <span>Close icon</span>,
}));

describe('Modal', () => {
  const showModalMock = vi.fn();
  const originalShowModalDescriptor = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    'showModal'
  );

  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '<div id="modal-root"></div>';
    showModalMock.mockReset();

    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: showModalMock,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();

    if (originalShowModalDescriptor) {
      Object.defineProperty(
        HTMLDialogElement.prototype,
        'showModal',
        originalShowModalDescriptor
      );
    }
  });

  it('renders children inside modal portal', async () => {
    const { default: Modal } = await import('./Modal');

    render(
      <Modal onClose={vi.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeTruthy();
  });

  it('calls showModal on mount', async () => {
    const { default: Modal } = await import('./Modal');

    render(
      <Modal onClose={vi.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    expect(showModalMock).toHaveBeenCalled();
  });

  it('calls onClose when dialog overlay is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { default: Modal } = await import('./Modal');

    render(
      <Modal onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = document.querySelector('dialog');

    expect(dialog).toBeTruthy();

    if (!(dialog instanceof HTMLDialogElement)) {
      throw new Error('Dialog was not rendered');
    }

    await user.click(dialog);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on cancel event', async () => {
    const onClose = vi.fn();
    const { default: Modal } = await import('./Modal');

    render(
      <Modal onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = document.querySelector('dialog');

    expect(dialog).toBeTruthy();

    if (!(dialog instanceof HTMLDialogElement)) {
      throw new Error('Dialog was not rendered');
    }

    const event = new Event('cancel', {
      bubbles: true,
      cancelable: true,
    });

    dialog.dispatchEvent(event);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('returns null when modal root does not exist', async () => {
    document.body.innerHTML = '';
    vi.resetModules();

    const { default: Modal } = await import('./Modal');

    const { container } = render(
      <Modal onClose={vi.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    expect(container.firstChild).toBeNull();
  });
});

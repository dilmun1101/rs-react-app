import { Component } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorTest from '../error-test/ErrorTest';
import { UI_MESSAGES } from '../../constants/messages';
import userEvent from '@testing-library/user-event';

class WorkingComponent extends Component {
  render() {
    return <div>Everything is fine</div>;
  }
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when everything is fine', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('shows fallback UI when ErrorTest throws error after click', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorTest />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test Error' }));

    expect(
      screen.getByText(UI_MESSAGES.ERROR_BOUNDARY_FALLBACK)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_GO_BACK })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_RELOAD_APP })
    ).toBeInTheDocument();
  });

  it('calls console.error when error occurs', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorTest />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test Error' }));

    expect(console.error).toHaveBeenCalled();
  });

  it('resets error state when "Go Back" button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorTest />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test Error' }));
    expect(
      screen.getByText(UI_MESSAGES.ERROR_BOUNDARY_FALLBACK)
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_GO_BACK })
    );

    expect(
      screen.queryByText(UI_MESSAGES.ERROR_BOUNDARY_FALLBACK)
    ).not.toBeInTheDocument();
  });

  it('calls window.location.reload when "Reload" button is clicked', async () => {
    const user = userEvent.setup();
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ErrorTest />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test Error' }));
    await user.click(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_RELOAD_APP })
    );

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});

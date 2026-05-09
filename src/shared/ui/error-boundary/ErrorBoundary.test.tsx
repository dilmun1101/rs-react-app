import { Component } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorTest from '../error-test/ErrorTest';
import { UI_MESSAGES } from '../../constants/messages';

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

  it('shows fallback UI when ErrorTest throws error after click', () => {
    render(
      <ErrorBoundary>
        <ErrorTest />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Test Error' }));

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
});

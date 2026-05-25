import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThemeProvider from './ThemeContext';
import { useTheme } from './hooks/use-theme';

function TestConsumer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span>{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('provides dark theme by default', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('sets data-theme attribute on document element on mount', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('toggles theme from dark to light', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(screen.getByText('light')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('toggles theme from light back to dark', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Toggle theme' });

    await user.click(button);
    await user.click(button);

    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});

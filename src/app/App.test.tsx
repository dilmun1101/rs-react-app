import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import App from './App';

vi.mock('@/pages/main-page/MainPage', () => ({
  default: () => <div>MainPage</div>,
}));

describe('App', () => {
  it('renders MainPage', () => {
    render(<App />);

    expect(screen.getByText('MainPage')).toBeTruthy();
  });
});

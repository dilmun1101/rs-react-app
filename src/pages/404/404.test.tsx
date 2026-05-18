import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import PageNotFound from './404';

const renderPageNotFound = () =>
  render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );

describe('PageNotFound', () => {
  it('renders 404 code', () => {
    renderPageNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders not found message', () => {
    renderPageNotFound();

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders link to main page', () => {
    renderPageNotFound();

    expect(
      screen.getByRole('link', { name: 'Return to main page' })
    ).toBeInTheDocument();
  });

  it('has correct link href', () => {
    renderPageNotFound();

    expect(
      screen.getByRole('link', { name: 'Return to main page' })
    ).toHaveAttribute('href', '/');
  });
});

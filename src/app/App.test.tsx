import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MainPage inside App', () => {
  render(<App />);

  expect(screen.getByRole('main')).toBeInTheDocument();
});

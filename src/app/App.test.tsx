import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeProvider from '@/shared/context/ThemeContext';

test('renders MainPage inside App', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByRole('main')).toBeInTheDocument();
});

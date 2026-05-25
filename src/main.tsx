import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './shared/ui/error-boundary/ErrorBoundary';
import './shared/styles/global.scss';
import { store } from './store/store';
import { Provider } from 'react-redux';
import ThemeProvider from './shared/context/ThemeContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './shared/ui/error-boundary/ErrorBoundary';
import './shared/styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

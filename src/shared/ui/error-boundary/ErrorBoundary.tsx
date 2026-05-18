import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../button/Button';
import styles from './error-boundary.module.scss';
import { UI_MESSAGES } from '../../constants/messages';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.main}>
          <p>{UI_MESSAGES.ERROR_BOUNDARY_FALLBACK}</p>
          <Button onClick={this.handleReset}>
            {UI_MESSAGES.BUTTON_GO_BACK}
          </Button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

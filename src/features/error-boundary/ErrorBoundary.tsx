import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../../shared/ui/button/Button';

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

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <p>Something went wrong</p>
          <Button onClick={this.handleReset}>Go back</Button>
          <Button onClick={this.handleReload}>Reload the application</Button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

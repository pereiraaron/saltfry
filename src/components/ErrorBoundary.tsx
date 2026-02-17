import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Replace with an error reporting service (e.g. Sentry) in production
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <main className="page-100 flex items-center justify-center">
          <div className="text-center">
            <h1>Something went wrong</h1>
            <p>An unexpected error occurred. Please try again.</p>
            <Link to="/" className="btn" onClick={() => this.setState({ hasError: false })}>
              go back home
            </Link>
          </div>
        </main>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

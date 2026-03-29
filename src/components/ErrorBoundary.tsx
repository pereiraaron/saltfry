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
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <main className="page-100 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-6xl font-bold text-primary-9 mb-4">Oops</p>
            <h2 className="mb-3">Something went wrong</h2>
            <p className="text-grey-5 mb-8">An unexpected error occurred. Please try again.</p>
            <Link
              to="/"
              className="btn py-2.5 px-6"
              onClick={() => this.setState({ hasError: false })}
            >
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

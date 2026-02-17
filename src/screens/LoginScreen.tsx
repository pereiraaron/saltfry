import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import { useAuthStore } from '@stores';
import { Message } from '@components';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, loading, error, passkeyLoading, passkeyError, login, loginWithPasskey } =
    useAuthStore();

  const rawRedirect = new URLSearchParams(location.search).get('redirect') || '/';
  const redirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect, error]);

  const clearFieldError = useCallback((field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      login(email, password);
    }
  };

  const handlePasskeyLogin = () => {
    loginWithPasskey(email || undefined);
  };

  const inputBase =
    'w-full h-11 px-3 rounded-lg border bg-white text-sm outline-none transition-colors';

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-grey-5 text-sm">Sign in to your account to continue</p>
        </div>

        <div className="border border-grey-8 rounded-lg p-6 sm:p-8">
          {error && (
            <div className="mb-4">
              <Message type="error">{error}</Message>
            </div>
          )}
          {passkeyError && (
            <div className="mb-4">
              <Message type="error">{passkeyError}</Message>
            </div>
          )}

          <form onSubmit={handleSignIn} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`${inputBase} ${fieldErrors.email ? 'border-red-dark focus:border-red-dark' : 'border-grey-8 focus:border-primary-5'}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                }}
              />
              {fieldErrors.email && (
                <p className="text-red-dark text-xs mt-1 mb-0">{fieldErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`${inputBase} ${fieldErrors.password ? 'border-red-dark focus:border-red-dark' : 'border-grey-8 focus:border-primary-5'}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError('password');
                }}
              />
              {fieldErrors.password && (
                <p className="text-red-dark text-xs mt-1 mb-0">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary-5 text-white rounded-lg text-sm font-semibold border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center my-5 text-grey-6 text-xs">
            <span className="flex-1 border-b border-grey-8" />
            <span className="px-3">or</span>
            <span className="flex-1 border-b border-grey-8" />
          </div>

          <button
            type="button"
            onClick={handlePasskeyLogin}
            disabled={passkeyLoading}
            className="w-full h-11 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 bg-white border border-grey-8 text-grey-3 hover:border-grey-5 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <FaKey className="text-xs" />
            {passkeyLoading ? 'Waiting for Passkey...' : 'Sign in with Passkey'}
          </button>
        </div>

        <p className="text-center text-sm text-grey-5 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
            className="text-primary-5 font-medium hover:underline"
            to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import { useAuthStore } from '@stores';
import { Message } from '@components';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
}

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();
  const location = useLocation();

  const {
    userInfo,
    registrationLoading: loading,
    registrationError: error,
    registrationComplete,
    passkeyLoading,
    passkeyError,
    register,
    registerPasskey,
    logout,
  } = useAuthStore();

  const rawRedirect = new URLSearchParams(location.search).get('redirect') || '/';
  const redirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

  useEffect(() => {
    if (userInfo && !registrationComplete) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect, registrationComplete]);

  const clearFieldError = useCallback((field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const getErrors = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < MIN_PASSWORD_LENGTH)
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    if (!confirmpassword) errors.confirmpassword = 'Please confirm your password';
    else if (password && confirmpassword !== password)
      errors.confirmpassword = 'Passwords do not match';
    return errors;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = getErrors();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      register(name, email, password);
    }
  };

  const handleSetupPasskey = async () => {
    await registerPasskey();
    const { passkeyError: err } = useAuthStore.getState();
    if (!err) {
      await logout();
      navigate('/login');
    }
  };

  const handleSkipPasskey = async () => {
    await logout();
    navigate('/login');
  };

  // Passkey setup prompt after registration
  if (userInfo && registrationComplete) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary-5/10 text-primary-5 flex items-center justify-center mx-auto mb-4">
              <FaKey className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Set Up a Passkey</h1>
            <p className="text-grey-5 text-sm">
              Passkeys let you sign in securely without a password. Set one up now?
            </p>
          </div>

          <div className="border border-grey-8 rounded-lg p-6 sm:p-8">
            {passkeyError && (
              <div className="mb-4">
                <Message type="error">{passkeyError}</Message>
              </div>
            )}
            <button
              type="button"
              onClick={handleSetupPasskey}
              disabled={passkeyLoading}
              className="w-full h-11 bg-primary-5 text-white rounded-lg text-sm font-semibold border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity mb-3"
            >
              {passkeyLoading ? 'Setting up...' : 'Set Up Passkey'}
            </button>
            <button
              type="button"
              onClick={handleSkipPasskey}
              disabled={passkeyLoading}
              className="w-full h-11 rounded-lg text-sm font-semibold cursor-pointer bg-white border border-grey-8 text-grey-5 hover:border-grey-5 hover:text-grey-3 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full h-11 px-3 rounded-lg border bg-white text-sm outline-none transition-colors';

  const inputClass = (field: keyof FieldErrors) =>
    `${inputBase} ${fieldErrors[field] ? 'border-red-dark focus:border-red-dark' : 'border-grey-8 focus:border-primary-5'}`;

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Create an account</h1>
          <p className="text-grey-5 text-sm">Sign up to get started</p>
        </div>

        <div className="border border-grey-8 rounded-lg p-6 sm:p-8">
          {error && (
            <div className="mb-4">
              <Message type="error">{error}</Message>
            </div>
          )}

          <form onSubmit={handleRegister} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className={inputClass('name')}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearFieldError('name');
                }}
              />
              {fieldErrors.name && (
                <p className="text-red-dark text-xs mt-1 mb-0">{fieldErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="reg-email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                className={inputClass('email')}
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

            <div className="mb-4">
              <label htmlFor="reg-password" className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                placeholder="Create a password"
                className={inputClass('password')}
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

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className={inputClass('confirmpassword')}
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearFieldError('confirmpassword');
                }}
              />
              {fieldErrors.confirmpassword && (
                <p className="text-red-dark text-xs mt-1 mb-0">{fieldErrors.confirmpassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary-5 text-white rounded-lg text-sm font-semibold border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-grey-5 mt-6">
          Already have an account?{' '}
          <Link
            onClick={() => {
              setEmail('');
              setPassword('');
              setName('');
              setConfirmPassword('');
            }}
            className="text-primary-5 font-medium hover:underline"
            to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;

import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import Footer from '../../components/Footer.js/Footer';
import Message from '../../components/Message/Message';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, loading, error, passkeyLoading, passkeyError, login, loginWithPasskey } =
    useAuthStore();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect, error]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handlePasskeyLogin = () => {
    loginWithPasskey(email || undefined);
  };

  return (
    <>
      <div className="signupScreen">
        <form onSubmit={handleSignIn} className="login-form">
          <h1>Sign In</h1>
          {error && <Message type="error">{error}</Message>}
          {passkeyError && <Message type="error">{passkeyError}</Message>}
          <input
            type="email"
            placeholder="Email address"
            className="inputfield"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputfield"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">{loading ? 'Logging In, Please Wait...' : 'Sign In'}</button>
          <div className="divider">
            <span>or</span>
          </div>
          <button
            type="button"
            className="passkey-btn"
            onClick={handlePasskeyLogin}
            disabled={passkeyLoading}
          >
            {passkeyLoading ? 'Waiting for Passkey...' : 'Sign in with Passkey'}
          </button>
          <div className="text-container">
            <span>Don&apos;t have an account?</span>{' '}
            <Link
              onClick={() => {
                setEmail('');
                setPassword('');
              }}
              style={{ color: '#795744' }}
              to={redirect ? `/register?redirect=${redirect}` : '/redirect'}
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
      <div style={{ position: 'fixed', width: '100% ', bottom: 0 }}>
        <Footer />
      </div>
    </>
  );
};

export default LoginScreen;

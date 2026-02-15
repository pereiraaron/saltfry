import React, { useState, useEffect } from 'react';
import './RegisterScreen.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import Footer from '../../components/Footer.js/Footer';
import Message from '../../components/Message/Message';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errortype, setErrorType] = useState('');
  const [errormsg, setErrorMsg] = useState('');
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

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo && !registrationComplete) {
      navigate(redirect);
    }
    if (error) {
      setErrorMsg(error);
      setErrorType('error');
    }
  }, [navigate, userInfo, redirect, error, registrationComplete]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      name.replace(/\s/g, '').length <= 0 ||
      email.replace(/\s/g, '').length <= 0 ||
      password.replace(/\s/g, '').length <= 0 ||
      confirmpassword.replace(/\s/g, '').length <= 0
    ) {
      setErrorType('validation');
      setErrorMsg("Fields can't be empty");
    } else if (password !== confirmpassword) {
      setErrorType('error');
      setErrorMsg('Passwords do not match!');
    } else {
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

  // Show passkey setup prompt after successful registration
  if (userInfo && registrationComplete) {
    return (
      <>
        <div className="registerScreen">
          <div className="register-form">
            <h1>Set Up a Passkey</h1>
            <p style={{ color: '#ccc', marginBottom: '1rem' }}>
              Passkeys let you sign in securely without a password. Set one up now?
            </p>
            {passkeyError && <Message type="error">{passkeyError}</Message>}
            <button type="button" onClick={handleSetupPasskey} disabled={passkeyLoading}>
              {passkeyLoading ? 'Setting up...' : 'Set Up Passkey'}
            </button>
            <button
              type="button"
              className="skip-btn"
              onClick={handleSkipPasskey}
              disabled={passkeyLoading}
            >
              Skip for now
            </button>
          </div>
        </div>
        <div style={{ position: 'fixed', width: '100% ', bottom: 0 }}>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="registerScreen">
        <form onSubmit={handleRegister} className="register-form">
          <h1>Sign Up</h1>
          <Message type={errortype}>{errormsg}</Message>
          <input
            type="text"
            placeholder="Enter Name"
            className="inputfield"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
            placeholder="Enter Password"
            className="inputfield"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="inputfield"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button type="submit">{loading ? 'Please wait...' : 'Sign Up'}</button>
          <div className="text-container">
            <span> Have an account?</span>{' '}
            <Link
              onClick={() => {
                setEmail('');
                setPassword('');
                setName('');
                setConfirmPassword('');
              }}
              style={{ color: '#795744' }}
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Log In
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

export default RegisterScreen;

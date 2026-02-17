import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@stores';
import { Message } from '@components';

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

  const rawRedirect = new URLSearchParams(location.search).get('redirect') || '/';
  const redirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

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

  // Show passkey setup prompt after registration
  if (userInfo && registrationComplete) {
    return (
      <>
        <div
          className="max-w-112.5 p-17.5 mx-auto
            bg-[rgba(0,0,0,0.85)] mt-16 rounded-[5px]"
        >
          <div className="grid">
            <h1
              className="text-left mb-6.25 text-white
                text-[32px] font-medium tracking-normal normal-case"
            >
              Set Up a Passkey
            </h1>
            <p className="text-[#ccc] mb-4">
              Passkeys let you sign in securely without a password. Set one up now?
            </p>
            {passkeyError && <Message type="error">{passkeyError}</Message>}
            <button
              type="button"
              className="py-4 px-5 text-base text-white
                rounded-[5px] bg-[#795744] font-semibold
                border-none cursor-pointer mt-5
                disabled:opacity-60
                disabled:cursor-not-allowed"
              onClick={handleSetupPasskey}
              disabled={passkeyLoading}
            >
              {passkeyLoading ? 'Setting up...' : 'Set Up Passkey'}
            </button>
            <button
              type="button"
              className="py-4 px-5 text-base
                rounded-[5px] font-semibold
                cursor-pointer mt-2.5
                bg-transparent! text-[#737373]!
                border border-[#737373]!
                hover:text-white! hover:border-white!
                disabled:opacity-60
                disabled:cursor-not-allowed"
              onClick={handleSkipPasskey}
              disabled={passkeyLoading}
            >
              Skip for now
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="max-w-112.5 p-17.5 mx-auto
          bg-[rgba(0,0,0,0.85)] mt-16 rounded-[5px]"
      >
        <form onSubmit={handleRegister} className="grid">
          <h1
            className="text-left mb-6.25 text-white
              text-[32px] font-medium tracking-normal normal-case"
          >
            Sign Up
          </h1>
          <Message type={errortype}>{errormsg}</Message>
          <input
            type="text"
            placeholder="Enter Name"
            className="outline-0 h-10 mb-3.5
              rounded-[5px] border-none px-3.75 py-1.25 bg-white"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email address"
            className="outline-0 h-10 mb-3.5
              rounded-[5px] border-none px-3.75 py-1.25 bg-white"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="outline-0 h-10 mb-3.5
              rounded-[5px] border-none px-3.75 py-1.25 bg-white"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="outline-0 h-10 mb-3.5
              rounded-[5px] border-none px-3.75 py-1.25 bg-white"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="py-4 px-5 text-base text-white
              rounded-[5px] bg-[#795744] font-semibold
              border-none cursor-pointer mt-5
              disabled:opacity-60
              disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : 'Sign Up'}
          </button>
          <div className="text-[#737373] mt-4">
            <span className="text-white"> Have an account?</span>{' '}
            <Link
              onClick={() => {
                setEmail('');
                setPassword('');
                setName('');
                setConfirmPassword('');
              }}
              className="text-[#795744]"
              to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;

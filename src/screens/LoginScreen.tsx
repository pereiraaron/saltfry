import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import { useAuthStore } from '@stores';
import { Message } from '@components';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handlePasskeyLogin = () => {
    loginWithPasskey(email || undefined);
  };

  return (
    <div
      className="max-w-112.5 p-17.5 mx-auto
        bg-[rgba(0,0,0,0.85)] mt-16 rounded-[5px]"
    >
      <form onSubmit={handleSignIn} className="grid">
        <h1
          className="text-left mb-6.25 text-white
              text-[32px] font-medium tracking-normal normal-case"
        >
          Sign In
        </h1>
        {error && <Message type="error">{error}</Message>}
        {passkeyError && <Message type="error">{passkeyError}</Message>}
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
          placeholder="Password"
          className="outline-0 h-10 mb-3.5
              rounded-[5px] border-none px-3.75 py-1.25 bg-white"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="py-4 px-5 text-base text-white
              rounded-[5px] bg-[#795744] font-semibold
              border-none cursor-pointer mt-5"
        >
          {loading ? 'Logging In, Please Wait...' : 'Sign In'}
        </button>
        <div
          className="flex items-center my-4
              text-[#737373]
              before:content-[''] before:flex-1
              before:border-b before:border-[#737373]
              after:content-[''] after:flex-1
              after:border-b after:border-[#737373]"
        >
          <span className="px-3 text-[0.85rem]">or</span>
        </div>
        <button
          type="button"
          className="py-4 px-5 text-base text-white
              rounded-[5px] bg-[rgba(255,255,255,0.08)] font-semibold
              border border-[rgba(255,255,255,0.2)] cursor-pointer
              hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.35)]
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2.5
              transition-all duration-200"
          onClick={handlePasskeyLogin}
          disabled={passkeyLoading}
        >
          <FaKey className="text-sm" />
          {passkeyLoading ? 'Waiting for Passkey...' : 'Sign in with Passkey'}
        </button>
        <div className="text-[#737373] mt-4">
          <span className="text-white">Don&apos;t have an account?</span>{' '}
          <Link
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
            className="text-[#795744]"
            to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
          >
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;

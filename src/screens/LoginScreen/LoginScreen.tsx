import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../actions/userActions';
import Footer from '../../components/Footer.js/Footer';
import Message from '../../components/Message/Message';
import { RootState } from '../../types';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect, error]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password) as $TSFixMe);
  };

  return (
    <>
      <div className="signupScreen">
        <form onSubmit={handleSignIn} className="login-form">
          <h1>Sign In</h1>
          {error && <Message type="error">Inavlid Credentials</Message>}
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
          <button type="submit">{loading ? 'Logging In,Please Wait.....' : 'Sign In'}</button>
          <div className="text-container">
            <span>Don't have an account?</span>{' '}
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

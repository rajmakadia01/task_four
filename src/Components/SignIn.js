import React, { useState } from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    const dummyEmail = 'raj@gmail.com';
    const dummyPassword = 'Raj123';
  
    try {
      if (email === dummyEmail && password === dummyPassword) {
        setSuccessMessage('Sign-in successful!');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during sign-in. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Link to='/home'>
        <button type="submit" disabled={loading || !email || !password}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        </Link>
      </form>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default SignIn;

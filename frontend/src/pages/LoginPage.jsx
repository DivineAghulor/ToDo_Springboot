import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await login(credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      // In a real app, you'd likely have a global state/context for the user
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your username and password.';
      setError(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm formType="Login" onSubmit={handleLogin} isLoading={isLoading} />
      {error && <p className="error-message">{error}</p>}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../services/api';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (credentials) => {
    setIsLoading(true);
    setError('');
    try {
      await api.register(credentials);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm formType="Register" onSubmit={handleRegister} isLoading={isLoading} />
      {error && <p className="error-message">{error}</p>}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterPage;


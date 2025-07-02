import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AuthForm.css';

const AuthForm = ({ formType, onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const isRegister = formType === 'Register';

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = isRegister ? { username, password, email } : { username, password };
    onSubmit(credentials);
  };

  return (
    <motion.div
      className="glass-card auth-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{formType}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <motion.button
          type="submit"
          className="auth-button"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Processing...' : formType}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AuthForm;


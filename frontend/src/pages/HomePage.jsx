import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import TodoList from '../components/TodoList';

const HomePage = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Assuming your JWT payload has userId

    return (
      <>
        <motion.header
          className="app-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1>My Tasks</h1>
          <p>A beautiful and fluid to-do experience.</p>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <TodoList userId={userId} />
        </motion.main>
      </>
    );
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default HomePage;
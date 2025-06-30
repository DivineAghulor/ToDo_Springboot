import React from 'react';
import { motion } from 'framer-motion';
import TodoList from './TodoList.jsx';

// In a real app, you would use React Router to show this page or an AuthPage
// For this example, we'll render the TodoList directly.

function App() {
  return (
    <div className="app-container">
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
        {/* We will build out the authentication flow later.
            For now, let's assume a user is logged in with ID 1. */}
        <TodoList userId={1} />
      </motion.main>
    </div>
  );
}

export default App;


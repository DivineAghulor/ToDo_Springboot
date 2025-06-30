import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TaskItem from './TaskItem';
// import { getTasksForUser, createTask } from '../services/api'; // We'll wire this up next

// Mock data until we wire up the API
const mockTasks = [
  { taskId: 1, title: 'Design the UI concept', description: 'Use Figma to create mockups', completed: true },
  { taskId: 2, title: 'Develop the frontend', description: 'Use React and Framer Motion', completed: false },
  { taskId: 3, title: 'Connect to the backend API', description: 'Wire up all the endpoints', completed: false },
];

const TodoList = ({ userId }) => {
  const [tasks, setTasks] = useState(mockTasks);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getTasksForUser(userId)
  //     .then(response => setTasks(response.data))
  //     .catch(error => console.error("Error fetching tasks:", error))
  //     .finally(() => setIsLoading(false));
  // }, [userId]);

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.taskId === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="todo-list-container">
      {/* We will add a form for new tasks here */}
      <motion.ul style={{ listStyle: 'none', padding: 0 }}>
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem key={task.taskId} task={task} onToggle={handleToggleComplete} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default TodoList;


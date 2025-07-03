import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TaskItem from './TaskItem';
import { getTasksForUser, createTask, updateTask, deleteTask } from '../services/api';

const TodoList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchTasks = useCallback(() => {
    setIsLoading(true);
    getTasksForUser(userId)
      .then(response => {
        // Assuming the API returns tasks with `_id`, let's map it to `taskId`
        const formattedTasks = response.data.map(task => ({...task, taskId: task._id}));
        setTasks(formattedTasks);
      })
      .catch(error => console.error("Error fetching tasks:", error))
      .finally(() => setIsLoading(false));
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) return;

    const originalTasks = [...tasks];
    const updatedTask = { ...task, completed: !task.completed };

    // Optimistic update
    setTasks(tasks.map(t => (t.taskId === taskId ? updatedTask : t)));

    try {
      await updateTask(taskId, { completed: updatedTask.completed });
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks(originalTasks); // Revert on error
    }
  };

  const handleDelete = async (taskId) => {
    const originalTasks = tasks;
    // Optimistic update
    setTasks(tasks.filter(task => task.taskId !== taskId));
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      setTasks(originalTasks); // Revert on error
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await createTask({
        title: newTaskTitle,
        userId: userId,
      });
      // Assuming the new task object from API has `_id`
      const newTask = {...response.data, taskId: response.data._id};
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="todo-list-container">
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add Task</button>
      </form>
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

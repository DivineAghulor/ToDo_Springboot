import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <motion.li
      className="glass-card"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      style={{
        marginBottom: '1rem',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px 0 rgba(138, 154, 241, 0.3)' }}
    >
      <div onClick={() => onToggle(task.taskId)} style={{ flexGrow: 1 }}>
        <h3 style={{ margin: 0, textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.5 : 1 }}>
          {task.title}
        </h3>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', opacity: task.completed ? 0.4 : 0.7 }}>
          {task.description}
        </p>
      </div>
      <motion.button
        onClick={() => onDelete(task.taskId)}
        style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', marginLeft: '1rem', color: '#ff6b6b' }}
        whileHover={{ scale: 1.2, color: '#e03131' }}
        aria-label="Delete task"
      >
        &#x2715;
      </motion.button>
    </motion.li>
  );
};

export default TaskItem;


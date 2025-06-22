package com.divine.todo_ai.service;

import com.divine.todo_ai.exception.TaskNotFoundException;
import com.divine.todo_ai.exception.UnauthorizedAccessException;
import com.divine.todo_ai.model.Task;
import com.divine.todo_ai.model.User;
import com.divine.todo_ai.repository.TaskRepository;
import com.divine.todo_ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Transactional
    public Task createTask(Long userId, Task task, String authenticatedUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedAccessException("User not found or unauthorized"));
        if (!user.getUsername().equals(authenticatedUsername)) {
            throw new UnauthorizedAccessException("You are not allowed to create tasks for this user");
        }
        task.setUser(user);
        Task saved = taskRepository.save(task);
        log.info("Task created for user {}: {}", user.getUsername(), task.getTitle());
        return saved;
    }

    public List<Task> getTasksByUserId(Long userId, String authenticatedUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedAccessException("User not found or unauthorized"));
        if (!user.getUsername().equals(authenticatedUsername)) {
            throw new UnauthorizedAccessException("You are not allowed to view tasks for this user");
        }
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getTasksByUserIdAndCompleted(Long userId, boolean completed, String authenticatedUsername) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedAccessException("User not found or unauthorized"));
        if (!user.getUsername().equals(authenticatedUsername)) {
            throw new UnauthorizedAccessException("You are not allowed to view tasks for this user");
        }
        return taskRepository.findByUserIdAndCompleted(userId, completed);
    }

    public Task getTaskById(Long userId, Long taskId, String authenticatedUsername) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + taskId));
        if (!task.getUser().getId().equals(userId) || !task.getUser().getUsername().equals(authenticatedUsername)) {
            throw new UnauthorizedAccessException("You are not allowed to access this task");
        }
        return task;
    }

    @Transactional
    public Task updateTask(Long userId, Long taskId, Task updatedTask, String authenticatedUsername) {
        Task task = getTaskById(userId, taskId, authenticatedUsername);
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setCompleted(updatedTask.isCompleted());
        task.setDueDate(updatedTask.getDueDate());
        log.info("Task updated for user {}: {}", authenticatedUsername, task.getTitle());
        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(Long userId, Long taskId, String authenticatedUsername) {
        Task task = getTaskById(userId, taskId, authenticatedUsername);
        taskRepository.delete(task);
        log.info("Task deleted for user {}: {}", authenticatedUsername, task.getTitle());
    }
}

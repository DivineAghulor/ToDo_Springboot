package com.divine.todo_ai.repository;

import com.divine.todo_ai.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndCompleted(Long userId, boolean completed);
}

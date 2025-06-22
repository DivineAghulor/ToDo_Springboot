package com.divine.todo_ai.controller;

import com.divine.todo_ai.dto.TaskCreationDto;
import com.divine.todo_ai.dto.TaskResponseDto;
import com.divine.todo_ai.dto.TaskUpdateDto;
import com.divine.todo_ai.model.Task;
import com.divine.todo_ai.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/{userId}/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDto> createTask(@PathVariable Long userId,
                                                      @Valid @RequestBody TaskCreationDto dto,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .build();
        Task saved = taskService.createTask(userId, task, userDetails.getUsername());
        TaskResponseDto response = mapToResponseDto(saved);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getTasks(@PathVariable Long userId,
                                                          @RequestParam(required = false) Boolean completed,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        List<Task> tasks;
        if (completed != null) {
            tasks = taskService.getTasksByUserIdAndCompleted(userId, completed, userDetails.getUsername());
        } else {
            tasks = taskService.getTasksByUserId(userId, userDetails.getUsername());
        }
        List<TaskResponseDto> response = tasks.stream().map(this::mapToResponseDto).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponseDto> getTask(@PathVariable Long userId,
                                                   @PathVariable Long taskId,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        Task task = taskService.getTaskById(userId, taskId, userDetails.getUsername());
        return ResponseEntity.ok(mapToResponseDto(task));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long userId,
                                                     @PathVariable Long taskId,
                                                     @Valid @RequestBody TaskUpdateDto dto,
                                                     @AuthenticationPrincipal UserDetails userDetails) {
        Task updated = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .completed(dto.isCompleted())
                .build();
        Task saved = taskService.updateTask(userId, taskId, updated, userDetails.getUsername());
        return ResponseEntity.ok(mapToResponseDto(saved));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long userId,
                                           @PathVariable Long taskId,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        taskService.deleteTask(userId, taskId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    private TaskResponseDto mapToResponseDto(Task task) {
        TaskResponseDto dto = new TaskResponseDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setCompleted(task.isCompleted());
        dto.setDueDate(task.getDueDate());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        return dto;
    }
}

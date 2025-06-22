package com.divine.todo_ai.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

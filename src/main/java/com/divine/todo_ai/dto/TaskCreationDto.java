package com.divine.todo_ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskCreationDto {
    @NotBlank
    @Size(min = 1, max = 255)
    private String title;
    private String description;
    private LocalDate dueDate;
}

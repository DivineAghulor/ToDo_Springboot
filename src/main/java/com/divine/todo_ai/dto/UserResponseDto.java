package com.divine.todo_ai.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

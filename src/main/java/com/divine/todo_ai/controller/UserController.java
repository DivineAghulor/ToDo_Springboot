package com.divine.todo_ai.controller;

import com.divine.todo_ai.dto.UserRegistrationDto;
import com.divine.todo_ai.dto.UserResponseDto;
import com.divine.todo_ai.model.User;
import com.divine.todo_ai.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody UserRegistrationDto dto) {
        User user = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .build();
        User saved = userService.createUser(user);
        UserResponseDto response = new UserResponseDto();
        response.setId(saved.getId());
        response.setUsername(saved.getUsername());
        response.setEmail(saved.getEmail());
        response.setCreatedAt(saved.getCreatedAt());
        response.setUpdatedAt(saved.getUpdatedAt());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserRegistrationDto dto) {
        User updated = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .build();
        User saved = userService.updateUser(id, updated);
        UserResponseDto response = new UserResponseDto();
        response.setId(saved.getId());
        response.setUsername(saved.getUsername());
        response.setEmail(saved.getEmail());
        response.setCreatedAt(saved.getCreatedAt());
        response.setUpdatedAt(saved.getUpdatedAt());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

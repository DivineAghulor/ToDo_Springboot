package com.divine.todo_ai.service;

import com.divine.todo_ai.exception.UserNotFoundException;
import com.divine.todo_ai.model.User;
import com.divine.todo_ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        log.info("User registered: {}", saved.getUsername());
        return saved;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    @Transactional
    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        log.info("User updated: {}", user.getUsername());
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
        log.info("User deleted: {}", user.getUsername());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

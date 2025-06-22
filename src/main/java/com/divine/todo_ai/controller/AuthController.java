package com.divine.todo_ai.controller;

import com.divine.todo_ai.dto.LoginRequestDto;
import com.divine.todo_ai.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok().body("{\"token\":\"" + token + "\"}");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}

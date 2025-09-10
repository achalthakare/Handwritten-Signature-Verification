package com.example.demo.auth.controllers;

import com.example.demo.auth.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String response = authService.registerUser(
            request.get("name"),
            request.get("email"),
        
        
            request.get("mobile"),
            request.getOrDefault("department", null),
            request.getOrDefault("year", null),
            request.get("password"),
            request.get("category")
        );
        return ResponseEntity.ok(Map.of("message", response));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        Map<String, String> userData = authService.getUserDetails(request.get("email"), request.get("password"));
        
        if (userData != null) {
            return ResponseEntity.ok(userData);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid Credentials"));
        }
    }
}

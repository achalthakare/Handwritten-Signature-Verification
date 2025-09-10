package com.example.demo.auth.services;

import com.example.demo.auth.models.User;
import com.example.demo.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(String name, String email, String mobile, String department, String year, String password, String category) {
        if (userRepository.findByEmail(email).isPresent()) {
            return "User already exists!";
        }

        User newUser = new User(name, email, mobile, department, year, passwordEncoder.encode(password), category);
        userRepository.save(newUser);
        return "User registered successfully!";
    }

    public Map<String, String> getUserDetails(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get();
            Map<String, String> userData = new HashMap<>();
            userData.put("email", user.getEmail());
            userData.put("category", user.getCategory());
            System.out.println(userData);
            return userData;
        }
        return null; // Return null if credentials are invalid
    }
}

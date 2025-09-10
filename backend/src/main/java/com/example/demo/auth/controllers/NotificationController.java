package com.example.demo.auth.controllers;

import com.example.demo.auth.services.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Get all notifications for HOD
    @GetMapping("/hod")
    public List<String> getHODNotifications() {
        return notificationService.getHODNotifications();
    }

    // Get notifications for a specific student
    @GetMapping("/student/{email}")
    public List<String> getStudentNotifications(@PathVariable String email) {
        return notificationService.getStudentNotifications(email);
    }
}

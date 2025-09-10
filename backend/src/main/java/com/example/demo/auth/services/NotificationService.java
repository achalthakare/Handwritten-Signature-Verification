package com.example.demo.auth.services;

import com.example.demo.auth.models.LeaveRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final List<String> notifications = new ArrayList<>();

    // Add notification when leave request is updated
    public void notifyHOD(String studentEmail, String decision) {
        String message = "Leave request for " + studentEmail + " has been " + decision.toLowerCase() + ".";
        notifications.add(message);
    }

    // Fetch all notifications for HOD
    public List<String> getHODNotifications() {
        return new ArrayList<>(notifications);
    }

    // Fetch notifications related to a specific student
    public List<String> getStudentNotifications(String studentEmail) {
        return notifications.stream()
                .filter(notification -> notification.contains(studentEmail))
                .collect(Collectors.toList());
    }
}

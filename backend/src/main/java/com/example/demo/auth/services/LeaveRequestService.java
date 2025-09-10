package com.example.demo.auth.services;

import com.example.demo.auth.models.LeaveRequest;
import com.example.demo.auth.models.LeaveRequestResponse;
import com.example.demo.auth.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmailService gmailService; // Inject Gmail Service for email sending

    private static final List<String> RECIPIENT_EMAILS = List.of(
    "rutujasangole36@gmail.com", 
    "rutujasangole72@gmail.com", 
    "rutujasangole11@gmail.com"
);

    private static final Logger logger = Logger.getLogger(LeaveRequestService.class.getName());
    // ✅ Update leave status or create a new one if it doesn't exist
    @Transactional
    public LeaveRequest updateLeaveStatus(String studentEmail, String status) {
        if (studentEmail == null || studentEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("❌ Student email cannot be null or empty!");
        }

        Optional<LeaveRequest> optionalRequest = leaveRequestRepository.findByStudentEmail(studentEmail);

        LeaveRequest leaveRequest;
        if (optionalRequest.isPresent()) {
            leaveRequest = optionalRequest.get();
            leaveRequest.setStatus(status);
        } else {
            // 👇 If not found, create a new request
            leaveRequest = new LeaveRequest();
            leaveRequest.setStudentEmail(studentEmail);
            leaveRequest.setStatus(status);
        }

        LeaveRequest savedRequest = leaveRequestRepository.save(leaveRequest);
        logger.info("✅ Leave request saved/updated: " + studentEmail + " | Status: " + status);

        // 🔔 Send email to HOD if DENIED
        if ("DENIED".equalsIgnoreCase(status)) {
            sendEmailToHOD(studentEmail);
        }

        return savedRequest;
    }

    // ✅ Get leave request by student email
    public Optional<LeaveRequest> getLeaveRequest(String studentEmail) {
        return leaveRequestRepository.findByStudentEmail(studentEmail);
    }

    // ✅ Get all leave requests with student details (Fix: Safe type casting)
    public List<LeaveRequestResponse> getAllLeaveRequests() {
        return leaveRequestRepository.findAllWithStudentDetails()
            .stream()
            .filter(obj -> obj.length >= 5) // Ensures we don't get IndexOutOfBoundsException
            .map(obj -> new LeaveRequestResponse(
                (String) obj[0],  // Student Email
                (String) obj[1],  // Student Name
                (String) obj[2],  // Department
                (String) obj[3],  // Year (Now correctly treated as String)
                (String) obj[4]   // Status
            ))
            .collect(Collectors.toList());
    }

    // ✅ Send Email Notification to HOD when Leave is DENIED
    public void sendEmailToHOD(String studentEmail) {
        if (studentEmail == null || studentEmail.trim().isEmpty()) {
            logger.warning("❌ Cannot send email: Student email is empty!");
            return;
        }
    
        String subject = "🚨 Leave Request Denied Notification";
        String message = "Dear HOD,\n\nA leave request from " + studentEmail + " has been DENIED.\n\nPlease take necessary action.\n\nRegards,\nHostel Management System";
    
        for (String recipient : RECIPIENT_EMAILS) {
            try {
                gmailService.sendEmail(recipient, subject, message);
                logger.info("✅ Email sent to: " + recipient + " about denied leave request from: " + studentEmail);
            } catch (Exception e) {
                logger.severe("❌ Failed to send email to " + recipient + ": " + e.getMessage());
            }
        }
    }
}    
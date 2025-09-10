package com.example.demo.auth.controllers;

import com.example.demo.auth.models.LeaveRequest;
import com.example.demo.auth.models.LeaveRequestResponse;
import com.example.demo.auth.services.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/leave")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    private static final Logger logger = Logger.getLogger(LeaveRequestController.class.getName());

    // ✅ Update leave status (Approve/Deny) & notify HOD if DENIED
    @PostMapping("/decision")
    public ResponseEntity<?> updateLeaveStatus(@RequestBody LeaveRequest request) {
        try {
            if (request.getStudentEmail() == null || request.getStatus() == null) {
                return ResponseEntity.badRequest().body("❌ Student email & status are required!");
            }

            // ✅ Call service to update leave request
            LeaveRequest updatedRequest = leaveRequestService.updateLeaveStatus(request.getStudentEmail(), request.getStatus());

            if (updatedRequest == null) {
                return ResponseEntity.status(404).body("⚠ Leave request not found for student: " + request.getStudentEmail());
            }

            // ✅ Notify HOD via email if status is DENIED
            if ("DENIED".equalsIgnoreCase(request.getStatus())) {
                return ResponseEntity.ok("🚨 Leave request denied. HOD has been notified via email.");
            }

            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            logger.severe("❌ Error updating leave status: " + e.getMessage());
            return ResponseEntity.internalServerError().body("⚠ Something went wrong while updating leave status.");
        }
    }

    // ✅ Get leave status by student email
    @GetMapping("/status/{studentEmail}")
    public ResponseEntity<?> getLeaveStatus(@PathVariable String studentEmail) {
        Optional<LeaveRequest> leaveRequest = leaveRequestService.getLeaveRequest(studentEmail);

        if (leaveRequest.isPresent()) {
            return ResponseEntity.ok(leaveRequest.get());
        } else {
            return ResponseEntity.status(404).body("⚠ No leave request found for student email: " + studentEmail);
        }
    }

    // ✅ Get all leave requests with student details
    @GetMapping("/all")
    public ResponseEntity<?> getAllLeaveRequests() {
        try {
            List<LeaveRequestResponse> leaveRequests = leaveRequestService.getAllLeaveRequests();

            if (leaveRequests.isEmpty()) {
                return ResponseEntity.status(404).body("ℹ No leave requests found.");
            }

            return ResponseEntity.ok(leaveRequests);
        } catch (Exception e) {
            logger.severe("❌ Error fetching all leave requests: " + e.getMessage());
            return ResponseEntity.internalServerError().body("⚠ Something went wrong while fetching leave requests.");
        }
    }
}

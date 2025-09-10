package com.example.demo.auth.models;

import jakarta.persistence.*;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String studentEmail;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, DENIED

    public LeaveRequest() {}

    public LeaveRequest(String studentEmail, String status) {
        this.studentEmail = studentEmail;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

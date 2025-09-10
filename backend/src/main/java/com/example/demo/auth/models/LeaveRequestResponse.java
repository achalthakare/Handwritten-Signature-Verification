package com.example.demo.auth.models;

public class LeaveRequestResponse {
    private String studentEmail;
    private String studentName;
    private String department;
    private String year;  // Changed from int to String
    private String status;

    public LeaveRequestResponse(String studentEmail, String studentName, String department, String year, String status) {
        this.studentEmail = studentEmail;
        this.studentName = studentName;
        this.department = department;
        this.year = year;
        this.status = status;
    }
    
    // ✅ Getters and Setters
    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

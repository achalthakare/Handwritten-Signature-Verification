package com.example.demo.auth.repository;

import com.example.demo.auth.models.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    Optional<LeaveRequest> findByStudentEmail(String studentEmail);

    // ✅ Fixed query - Ensured correct field names and type handling
    @Query("SELECT l.studentEmail, u.name, u.department, u.year, l.status FROM LeaveRequest l JOIN User u ON l.studentEmail = u.email")
    List<Object[]> findAllWithStudentDetails();
}

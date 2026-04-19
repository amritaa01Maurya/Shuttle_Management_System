package com.campus.transit.repository;

import com.campus.transit.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    // query to fetch the newest logs first for admin

    List<AuditLog> findAllByOrderByTimestampDesc();
}

package com.campus.transit.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action; // "RIDE_BOOKED"

    @Column(nullable = false, length = 500)
    private String details; // student id 5 booked ride from stop 2 to 5

    @Column(nullable = false)
    private String performedBy;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    // accurate time (time data saved on db)
    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}

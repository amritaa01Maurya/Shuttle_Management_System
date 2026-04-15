package com.campus.transit.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Data
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // many trips to one student
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "start_stop_id", nullable = false)
    private Stop startStop;

    @ManyToOne
    @JoinColumn(name = "end_stop_id", nullable = false)
    private Stop endStop;

    @Column(nullable = false)
    private Double distanceKm;

    @Column(nullable = false)
    private Integer fareDeducted;

    @Column(nullable = false)
    private LocalDateTime bookingTime = LocalDateTime.now();
}

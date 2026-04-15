package com.campus.transit.repository;

import com.campus.transit.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    //    auto generates sql query to find trips by student id, sorted newest 1st
    List<Trip> findByStudentIdOrderByBookingTimeDesc(Long studentId);
}

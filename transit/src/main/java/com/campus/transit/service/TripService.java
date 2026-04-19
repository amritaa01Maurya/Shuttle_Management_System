package com.campus.transit.service;

import com.campus.transit.entity.AuditLog;
import com.campus.transit.entity.Stop;
import com.campus.transit.entity.Student;
import com.campus.transit.entity.Trip;
import com.campus.transit.repository.AuditLogRepository;
import com.campus.transit.repository.StopRepository;
import com.campus.transit.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class TripService {
    @Autowired
    private RouteOptimizationService routeService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private StopRepository stopRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Transactional // if wallet deduction fails, this trip will not be saved
    public Trip bookRide(Long studentId, Long startStopId, Long endStopId){

        Map<String, Object> estimation = routeService.findBestRouteAndFare(startStopId, endStopId);
        double distance = (double) estimation.get("distanceKm");
        int fare = (int) estimation.get("farePoints");

        // deduct the fare
        Student student = studentService.deductFare(studentId, fare);

        // fetch stop details to save in history
        Stop startStop = stopRepository.findById(startStopId)
                .orElseThrow(() -> new RuntimeException("Start stop not found"));

        Stop endStop = stopRepository.findById(endStopId)
                .orElseThrow(() -> new RuntimeException("End stop not found"));

        // create and save trip details
        Trip trip = new Trip();
        trip.setStudent(student);
        trip.setStartStop(startStop);
        trip.setEndStop(endStop);
        trip.setDistanceKm(distance);
        trip.setFareDeducted(fare);

        Trip saveTrip = tripRepository.save(trip);

        // save log
        AuditLog log = new AuditLog();
        log.setAction("RIDE_BOOKED");
        log.setDetails("Student " + studentId + " traveled from " + startStopId + " to " + endStopId);
        log.setPerformedBy(student.getEmail());
        auditLogRepository.save(log);

        return saveTrip;

    }

    // to view history (students)
    public List<Trip> getStudentRideHistory(Long studentId) {
        return tripRepository.findByStudentIdOrderByBookingTimeDesc(studentId);
    }



}

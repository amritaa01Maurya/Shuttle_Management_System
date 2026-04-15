package com.campus.transit.controller;

import com.campus.transit.entity.Trip;
import com.campus.transit.repository.RouteRepository;
import com.campus.transit.service.RouteOptimizationService;
import com.campus.transit.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student/booking")
public class BookingController {

    @Autowired
    private RouteOptimizationService routeService;

    @GetMapping("/estimate")
    public Map<String, Object> estimateFare(@RequestParam Long startId, @RequestParam Long endId) {
        return routeService.findBestRouteAndFare(startId, endId);
    }

    @Autowired
    private TripService tripService;

    @PostMapping("/book") // to book the ride
    public Trip bookRide(@RequestParam Long studentId, @RequestParam Long startId, @RequestParam Long endId){
        return tripService.bookRide(studentId, startId, endId);
    }

    @GetMapping("/history") // view ride history
    public List<Trip> getRideHistory(@RequestParam Long studentId) {
        return tripService.getStudentRideHistory(studentId);
    }
}

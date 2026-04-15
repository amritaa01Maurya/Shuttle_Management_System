package com.campus.transit.service;

import com.campus.transit.entity.Stop;
import com.campus.transit.repository.StopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StopService {

    @Autowired
    private StopRepository stopRepository;

    // create
    public Stop saveStop(Stop stop) {
        return stopRepository.save(stop);
    }

    // read All
    public List<Stop> getAllStops() {
        return stopRepository.findAll();
    }

    // read One
    public Stop getStopById(Long id) {
        return stopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stop not found"));
    }

    // delete
    public void deleteStop(Long id) {
        stopRepository.deleteById(id);
    }
}

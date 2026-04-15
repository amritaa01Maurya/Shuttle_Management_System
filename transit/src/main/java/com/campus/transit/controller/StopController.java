package com.campus.transit.controller;


import com.campus.transit.entity.Stop;
import com.campus.transit.service.StopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/stops")
public class StopController {

    @Autowired
    private StopService stopService;

    @PostMapping
    public Stop createStop(@RequestBody Stop stop) {
        return stopService.saveStop(stop);
    }

    @GetMapping
    public List<Stop> getAllStops() {
        return stopService.getAllStops();
    }

    @DeleteMapping("/{id}")
    public String deleteStop(@PathVariable Long id) {
        stopService.deleteStop(id);
        return "Stop " + id + " deleted successfully";
    }
}

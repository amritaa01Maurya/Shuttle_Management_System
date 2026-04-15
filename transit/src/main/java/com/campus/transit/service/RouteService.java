package com.campus.transit.service;

import com.campus.transit.entity.Route;
import com.campus.transit.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        // it will automatically fetch the related stops via manytomany link
        return routeRepository.findAll();
    }
}

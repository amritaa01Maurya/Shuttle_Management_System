package com.campus.transit.service;

import com.campus.transit.entity.Route;
import com.campus.transit.entity.Stop;
import com.campus.transit.repository.RouteRepository;
import com.campus.transit.repository.StopRepository;
import com.campus.transit.util.DistanceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteOptimizationService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private StopRepository stopRepository;

    class Edge{
        Long targetStopId;
        double distance;

        public Edge(long targetStopId, double distance){
            this.targetStopId = targetStopId;
            this.distance = distance;
        }
    }


    class Node implements  Comparable<Node>{
        Long stopId;
        double distanceFromStart;

        public Node(Long stopId, double distanceFromStart){
            this.stopId = stopId;
            this.distanceFromStart = distanceFromStart;
        }

        @Override
        public int compareTo(Node other) {
            return Double.compare(this.distanceFromStart, other.distanceFromStart);
        }
    }

//    Dijkstra
    public Map<String, Object> findBestRouteAndFare(Long startStopId, Long endStopId) {
        List<Route> allRoutes = routeRepository.findAll();
        Map<Long, List<Edge>> graph = new HashMap<>();

        // build the graph mapping out all possible bus transfers
        for (Route route : allRoutes) {
            List<Stop> stops = route.getStops();
            for (int i = 0; i < stops.size() - 1; i++) {
                Stop current = stops.get(i);
                Stop next = stops.get(i + 1);

                double dist = DistanceUtils.calculateDistance(
                        current.getLatitude(), current.getLongitude(),
                        next.getLatitude(), next.getLongitude()
                );

                graph.putIfAbsent(current.getId(), new ArrayList<>());
                graph.putIfAbsent(next.getId(), new ArrayList<>());

                // assuming shuttles run both directions on a route
                graph.get(current.getId()).add(new Edge(next.getId(), dist));
                graph.get(next.getId()).add(new Edge(current.getId(), dist));
            }
        }

        PriorityQueue<Node> pq = new PriorityQueue<>();
        Map<Long, Double> minDistMap = new HashMap<>();

        pq.add(new Node(startStopId, 0.0));
        minDistMap.put(startStopId, 0.0);

        while(!pq.isEmpty()){
            Node curr = pq.poll();

            // found the path
            if(curr.stopId.equals((endStopId))){
                break;
            }

            if(curr.distanceFromStart > minDistMap.getOrDefault(curr.stopId, Double.MAX_VALUE)){
                continue;
            }

            if (graph.containsKey(curr.stopId)) {
                for (Edge neigh : graph.get(curr.stopId)) {
                    double newDist = curr.distanceFromStart + neigh.distance;
//                  relaxation step
                    if (newDist < minDistMap.getOrDefault(neigh.targetStopId, Double.MAX_VALUE)) {
                        minDistMap.put(neigh.targetStopId, newDist);
                        pq.add(new Node(neigh.targetStopId, newDist));
                    }
                }
            }
        }

        double totDistKM = minDistMap.getOrDefault(endStopId, -1.0);

        if(totDistKM == -1.0){
            throw new RuntimeException("No valid route exists between these stops.");
        }

//        base fare of 2 points + 1 point per km
        int farePoints = (int) Math.round(2 + totDistKM);

        Map<String, Object> result = new HashMap<>();
        result.put("distanceKm", totDistKM);
        result.put("farePoints", farePoints);
        return result;

    }
}

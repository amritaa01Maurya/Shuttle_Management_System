package com.campus.transit.controller;

import com.campus.transit.entity.Student;
import com.campus.transit.security.JwtUtil;
import com.campus.transit.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController // tells spring it is json APIs
@RequestMapping("/api/students") // base url
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login") // login student
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // authenticates
        Student student = studentService.authenticateStudent(email, password);

        // generates
        String token = jwtUtil.generateToken(student.getEmail(), student.getRole());

        // return token and user data to client
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("student", student);

        return response;
    }

    @PutMapping("/{id}/deduct") // deduct fare
    public Student payForRide(@PathVariable Long id, @RequestParam int amount) {
        return studentService.deductFare(id, amount);
    }

}

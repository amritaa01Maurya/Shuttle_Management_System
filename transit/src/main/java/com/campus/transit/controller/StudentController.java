package com.campus.transit.controller;

import com.campus.transit.entity.Student;
import com.campus.transit.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // tells spring it is json APIs
@RequestMapping("/api/students") // base url
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create") // create ne student
    public Student registerStudent(@RequestBody Student student){
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}/deduct") // deduct fare
    public Student payForRide(@PathVariable Long id, @RequestParam int amount) {
        return studentService.deductFare(id, amount);
    }

}

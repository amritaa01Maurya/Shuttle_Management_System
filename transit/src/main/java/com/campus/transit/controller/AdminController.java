package com.campus.transit.controller;

import com.campus.transit.entity.Student;
import com.campus.transit.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/students")
public class AdminController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public Student provisionStudent(@RequestBody Student student) {
        return studentService.createStudentByAdmin(student);
    }

    @DeleteMapping("/{id}")
    public String removeStudent(@PathVariable Long id) {
        studentService.deleteStudentByAdmin(id);
        return "student removed successfully.";
    }

    @PostMapping("/wallet/update")
    public Student updateStudentWallet(@RequestParam Long studentId, @RequestParam Integer amount) {
        // amount can be positive (recharge) or negative (penalty/correction)
        return studentService.updateWalletBalance(studentId, amount);
    }
}
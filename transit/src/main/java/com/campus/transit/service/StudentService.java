package com.campus.transit.service;

import com.campus.transit.entity.Student;
import com.campus.transit.exception.InsufficientFundsException;
import com.campus.transit.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired // auto injects db repo
    private StudentRepository studentRepository;

    public Student createStudent(Student student){
        // save to db
        return studentRepository.save(student);
    }

    @Transactional // locks the db to prevent race condition(ACID )
    public Student deductFare(Long studentId, int fareAmount){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if(student.getWalletBalance() < fareAmount){
            throw new InsufficientFundsException("Trip costs " + fareAmount + " points, but you only have " + student.getWalletBalance() + ". Please recharge.");
        }

        // deduct the fare and save
        student.setWalletBalance(student.getWalletBalance() - fareAmount);

        return studentRepository.save(student);
    }
}

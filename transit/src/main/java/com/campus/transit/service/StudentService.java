package com.campus.transit.service;

import com.campus.transit.entity.Student;
import com.campus.transit.exception.InsufficientFundsException;
import com.campus.transit.exception.ResourceNotFoundException;
import com.campus.transit.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired // auto injects db repo
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String ALLOWED_DOMAIN = "@gla.ac.in";
    private static final int INITIAL_WALLET_POINTS = 500;


    public Student createStudentByAdmin(Student student){
        if (!student.getEmail().toLowerCase().endsWith(ALLOWED_DOMAIN)) {
            throw new IllegalArgumentException("invalid domain. must use " + ALLOWED_DOMAIN);
        }

        if (studentRepository.findByEmail(student.getEmail()) != null) {
            throw new IllegalArgumentException("student already exists.");
        }

        // assign initial welcome points
        student.setWalletBalance(INITIAL_WALLET_POINTS);

        //hash the password
        String hashedPassword = passwordEncoder.encode(student.getPassword());
        student.setPassword(hashedPassword);

        // save to db
        return studentRepository.save(student);
    }


    public void deleteStudentByAdmin(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("student not found...");
        }
        studentRepository.deleteById(id);
    }

    // authenticates student and returns their profile
    public Student authenticateStudent(String email, String password) {
        Student student = studentRepository.findByEmail(email);

        // checks if student exists and passwords match
        if (student == null || !passwordEncoder.matches(password, student.getPassword())) {
            throw new IllegalArgumentException("invalid email or password.");
        }

        return student;
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

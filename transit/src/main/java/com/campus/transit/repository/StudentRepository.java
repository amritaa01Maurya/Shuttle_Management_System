package com.campus.transit.repository;

import com.campus.transit.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository gives save, findAll, findById, deleteById

    Student findByEmail(String email);

}

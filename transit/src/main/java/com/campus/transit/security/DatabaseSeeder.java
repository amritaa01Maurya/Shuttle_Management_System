package com.campus.transit.security;


import com.campus.transit.entity.Student;
import com.campus.transit.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${ADMIN_PASSWORD:admin123}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        // check if the super admin already exists to prevent duplicate entries
        if (studentRepository.findByEmail("admin@gla.ac.in") == null) {
            Student superAdmin = new Student();
            superAdmin.setName("Super Admin");
            superAdmin.setEmail("admin@gla.ac.in");
            superAdmin.setPassword(passwordEncoder.encode(adminPassword));
            superAdmin.setRole("ADMIN");
            superAdmin.setWalletBalance(9999);

            studentRepository.save(superAdmin);
            System.out.println("Super Admin Account Created");
        }
    }
}

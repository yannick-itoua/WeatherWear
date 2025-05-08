package com.weatherwear.repository;

import com.weatherwear.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods here, e.g.:
    User findByUsername(String username);
}

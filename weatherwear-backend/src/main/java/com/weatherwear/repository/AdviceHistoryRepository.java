package com.weatherwear.repository;

import com.weatherwear.model.AdviceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AdviceHistoryRepository extends JpaRepository<AdviceHistory, Long> {
    List<AdviceHistory> findByUsername(String username);
    List<AdviceHistory> findByUsernameAndDate(String username, LocalDate date);
}

package com.weatherwear.service;

import com.weatherwear.model.AdviceHistory;
import com.weatherwear.repository.AdviceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdviceHistoryService {

    private final AdviceHistoryRepository adviceHistoryRepository;

    @Autowired
    public AdviceHistoryService(AdviceHistoryRepository adviceHistoryRepository) {
        this.adviceHistoryRepository = adviceHistoryRepository;
    }

    public AdviceHistory saveAdvice(AdviceHistory adviceHistory) {
        return adviceHistoryRepository.save(adviceHistory);
    }

    public List<AdviceHistory> getAdviceByUsername(String username) {
        return adviceHistoryRepository.findByUsername(username);
    }

    public List<AdviceHistory> getAdviceByUsernameAndDate(String username, LocalDate date) {
        return adviceHistoryRepository.findByUsernameAndDate(username, date);
    }
}

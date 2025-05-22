package com.weatherwear.controller;

import com.weatherwear.model.AdviceHistory;
import com.weatherwear.service.AdviceHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/advice-history")
public class AdviceHistoryController {

    private final AdviceHistoryService adviceHistoryService;

    @Autowired
    public AdviceHistoryController(AdviceHistoryService adviceHistoryService) {
        this.adviceHistoryService = adviceHistoryService;
    }

    @PostMapping
    public AdviceHistory saveAdvice(@RequestBody AdviceHistory adviceHistory) {
        return adviceHistoryService.saveAdvice(adviceHistory);
    }

    @GetMapping("/{username}")
    public List<AdviceHistory> getAdviceByUsername(@PathVariable String username) {
        return adviceHistoryService.getAdviceByUsername(username);
    }

    @GetMapping("/{username}/{date}")
    public List<AdviceHistory> getAdviceByUsernameAndDate(@PathVariable String username, @PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return adviceHistoryService.getAdviceByUsernameAndDate(username, localDate);
    }
}

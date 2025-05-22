package com.weatherwear.controller;

import com.weatherwear.model.WeatherRequest;
import com.weatherwear.model.ClothingSuggestion;
import com.weatherwear.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    @Autowired
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @PostMapping("/suggest")
    public ClothingSuggestion getClothingSuggestion(@RequestBody WeatherRequest request) {
        return weatherService.getClothingSuggestion(request);
    }

    @GetMapping("/realtime")
    public ClothingSuggestion getRealtimeClothingSuggestion(@RequestParam String city) {
        WeatherRequest request = new WeatherRequest();
        request.setLocation(city);
        return weatherService.getClothingSuggestion(request);
    }
}
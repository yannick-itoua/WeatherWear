package com.weatherwear.service;

import com.weatherwear.model.WeatherRequest;
import com.weatherwear.model.ClothingSuggestion;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {

    public ClothingSuggestion getClothingSuggestion(WeatherRequest request) {
        // Simple logic example based on weatherType (expand as needed)
        ClothingSuggestion suggestion = new ClothingSuggestion();
        suggestion.setWeatherCondition(request.getWeatherType());
        if ("rain".equalsIgnoreCase(request.getWeatherType())) {
            suggestion.setClothingType("Raincoat, Umbrella");
        } else if ("snow".equalsIgnoreCase(request.getWeatherType())) {
            suggestion.setClothingType("Winter Coat, Scarf, Boots");
        } else {
            suggestion.setClothingType("Jacket");
        }
        suggestion.setTemperatureRange("5-15°C");
        suggestion.setHumidityLevel("Medium");
        suggestion.setWindSpeed("10 km/h");
        suggestion.setPrecipitationChance("20%");
        return suggestion;
    }
}

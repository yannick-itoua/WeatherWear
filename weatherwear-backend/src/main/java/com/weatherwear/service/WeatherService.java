package com.weatherwear.service;

import com.weatherwear.model.WeatherRequest;
import com.weatherwear.model.ClothingSuggestion;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class WeatherService {

    @Value("${weather.api.key:}")
    private String apiKey;

    private final String apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    private final Random random = new Random();

    public ClothingSuggestion getClothingSuggestion(WeatherRequest request) {
        // Try to fetch real weather if city is provided and API key is set
        if (request.getLocation() != null && !request.getLocation().isEmpty() && apiKey != null && !apiKey.isEmpty()) {
            try {
                RestTemplate restTemplate = new RestTemplate();
                String url = apiUrl + "?q=" + request.getLocation() + "&appid=" + apiKey + "&units=metric";
                String response = restTemplate.getForObject(url, String.class);
                JSONObject json = new JSONObject(response);

                double temp = json.getJSONObject("main").getDouble("temp");
                boolean rain = json.has("rain");
                double wind = json.getJSONObject("wind").getDouble("speed");

                return generateRandomSuggestion(temp, rain, wind);
            } catch (Exception e) {
                // Fallback to manual logic if API fails
            }
        }

        // Fallback: use manual weatherType logic with random suggestion
        return generateRandomSuggestionByType(request.getWeatherType());
    }

    private ClothingSuggestion generateRandomSuggestion(double temp, boolean rain, double wind) {
        List<String> coldOptions = Arrays.asList("Winter Coat, Scarf, Boots", "Puffer Jacket, Gloves", "Heavy Parka, Beanie");
        List<String> mildOptions = Arrays.asList("Jacket, Sneakers", "Sweater, Jeans", "Windbreaker, Scarf");
        List<String> warmOptions = Arrays.asList("T-shirt, Shorts", "Light Jacket, Cap", "Polo, Chinos");
        List<String> rainOptions = Arrays.asList("Raincoat, Umbrella", "Waterproof Jacket, Boots", "Poncho, Waterproof Shoes");

        ClothingSuggestion suggestion = new ClothingSuggestion();

        if (rain) {
            suggestion.setClothingType(rainOptions.get(random.nextInt(rainOptions.size())));
            suggestion.setWeatherCondition("Rain");
            suggestion.setPrecipitationChance("High");
        } else if (temp < 5) {
            suggestion.setClothingType(coldOptions.get(random.nextInt(coldOptions.size())));
            suggestion.setWeatherCondition("Cold");
            suggestion.setPrecipitationChance("Low");
        } else if (temp < 15) {
            suggestion.setClothingType(mildOptions.get(random.nextInt(mildOptions.size())));
            suggestion.setWeatherCondition("Mild");
            suggestion.setPrecipitationChance("Low");
        } else {
            suggestion.setClothingType(warmOptions.get(random.nextInt(warmOptions.size())));
            suggestion.setWeatherCondition("Warm");
            suggestion.setPrecipitationChance("Low");
        }

        suggestion.setTemperatureRange(temp + "°C");
        suggestion.setHumidityLevel("Unknown");
        suggestion.setWindSpeed(wind + " m/s");
        return suggestion;
    }

    private ClothingSuggestion generateRandomSuggestionByType(String weatherType) {
        List<String> rainOptions = Arrays.asList("Raincoat, Umbrella", "Waterproof Jacket, Boots", "Poncho, Waterproof Shoes");
        List<String> snowOptions = Arrays.asList("Winter Coat, Scarf, Boots", "Puffer Jacket, Gloves", "Heavy Parka, Beanie");
        List<String> defaultOptions = Arrays.asList("Jacket", "Sweater, Jeans", "T-shirt, Light Jacket");

        ClothingSuggestion suggestion = new ClothingSuggestion();
        suggestion.setWeatherCondition(weatherType);

        if ("rain".equalsIgnoreCase(weatherType)) {
            suggestion.setClothingType(rainOptions.get(random.nextInt(rainOptions.size())));
        } else if ("snow".equalsIgnoreCase(weatherType)) {
            suggestion.setClothingType(snowOptions.get(random.nextInt(snowOptions.size())));
        } else {
            suggestion.setClothingType(defaultOptions.get(random.nextInt(defaultOptions.size())));
        }

        suggestion.setTemperatureRange("5-15°C");
        suggestion.setHumidityLevel("Medium");
        suggestion.setWindSpeed("10 km/h");
        suggestion.setPrecipitationChance("20%");
        return suggestion;
    }
}

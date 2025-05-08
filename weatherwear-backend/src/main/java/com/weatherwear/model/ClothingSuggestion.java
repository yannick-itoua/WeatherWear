package com.weatherwear.model;

import java.io.Serializable;

/**
 * DTO for clothing suggestions based on weather conditions.
 */
public class ClothingSuggestion implements Serializable {
    private String weatherCondition;
    private String clothingType;
    private String temperatureRange;
    private String humidityLevel;
    private String windSpeed;
    private String precipitationChance;

    public ClothingSuggestion() {} // No-args constructor

    public ClothingSuggestion(String weatherCondition, String clothingType, String temperatureRange, String humidityLevel, String windSpeed, String precipitationChance) {
        this.weatherCondition = weatherCondition;
        this.clothingType = clothingType;
        this.temperatureRange = temperatureRange;
        this.humidityLevel = humidityLevel;
        this.windSpeed = windSpeed;
        this.precipitationChance = precipitationChance;
    }

    public String getWeatherCondition() {
        return weatherCondition;
    }

    public void setWeatherCondition(String weatherCondition) {
        this.weatherCondition = weatherCondition;
    }

    public String getClothingType() {
        return clothingType;
    }

    public void setClothingType(String clothingType) {
        this.clothingType = clothingType;
    }

    public String getTemperatureRange() {
        return temperatureRange;
    }

    public void setTemperatureRange(String temperatureRange) {
        this.temperatureRange = temperatureRange;
    }

    public String getHumidityLevel() {
        return humidityLevel;
    }

    public void setHumidityLevel(String humidityLevel) {
        this.humidityLevel = humidityLevel;
    }

    public String getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(String windSpeed) {
        this.windSpeed = windSpeed;
    }

    public String getPrecipitationChance() {
        return precipitationChance;
    }

    public void setPrecipitationChance(String precipitationChance) {
        this.precipitationChance = precipitationChance;
    }
}

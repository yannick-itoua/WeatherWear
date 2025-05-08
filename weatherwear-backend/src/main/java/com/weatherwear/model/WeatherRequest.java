package com.weatherwear.model;

import java.io.Serializable;

/**
 * DTO for weather input requests.
 */
public class WeatherRequest implements Serializable {
    private String location;
    private String date;
    private String time;
    private String weatherType;

    public WeatherRequest() {} // No-args constructor

    public WeatherRequest(String location, String date, String time, String weatherType) {
        this.location = location;
        this.date = date;
        this.time = time;
        this.weatherType = weatherType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getWeatherType() {
        return weatherType;
    }

    public void setWeatherType(String weatherType) {
        this.weatherType = weatherType;
    }
}

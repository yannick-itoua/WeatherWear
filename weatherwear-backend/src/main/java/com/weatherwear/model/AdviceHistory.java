package com.weatherwear.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "advice_history")
public class AdviceHistory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // Or use @ManyToOne User if you want a relation

    private LocalDate date;

    private String weatherSummary;

    private String clothingSuggestion;

    public AdviceHistory() {}

    public AdviceHistory(String username, LocalDate date, String weatherSummary, String clothingSuggestion) {
        this.username = username;
        this.date = date;
        this.weatherSummary = weatherSummary;
        this.clothingSuggestion = clothingSuggestion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getWeatherSummary() {
        return weatherSummary;
    }

    public void setWeatherSummary(String weatherSummary) {
        this.weatherSummary = weatherSummary;
    }

    public String getClothingSuggestion() {
        return clothingSuggestion;
    }

    public void setClothingSuggestion(String clothingSuggestion) {
        this.clothingSuggestion = clothingSuggestion;
    }
}

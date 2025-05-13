export interface User {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  clothingPreference: string;
}

export interface WeatherRequest {
  location?: string;
  weatherType?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface AdviceHistory {
  username: string;
  date: string;
  weatherSummary: string;
  clothingSuggestion: string;
}

export interface ClothingSuggestion {
  weatherCondition: string;
  clothingType: string;
  temperatureRange: string;
  humidityLevel: string;
  windSpeed: string;
  precipitationChance: string;
}
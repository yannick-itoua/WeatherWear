import React from "react";
import { ClothingSuggestion } from "../types";

interface SuggestionDisplayProps {
  suggestion: ClothingSuggestion | null;
}

const SuggestionDisplay: React.FC<SuggestionDisplayProps> = ({ suggestion }) => {
  if (!suggestion) {
    return <div className="text-gray-500">No suggestion available.</div>;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Clothing Suggestion</h3>
      <ul className="space-y-1">
        <li>
          <strong>Weather:</strong> {suggestion.weatherCondition}
        </li>
        <li>
          <strong>Clothing:</strong> {suggestion.clothingType}
        </li>
        <li>
          <strong>Temperature:</strong> {suggestion.temperatureRange}
        </li>
        <li>
          <strong>Humidity:</strong> {suggestion.humidityLevel}
        </li>
        <li>
          <strong>Wind:</strong> {suggestion.windSpeed}
        </li>
        <li>
          <strong>Precipitation:</strong> {suggestion.precipitationChance}
        </li>
      </ul>
    </div>
  );
};

export default SuggestionDisplay;
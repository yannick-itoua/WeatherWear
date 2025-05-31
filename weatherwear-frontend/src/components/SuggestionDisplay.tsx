import React from "react";
import { ClothingSuggestion } from "../types";

interface SuggestionDisplayProps {
  suggestion: ClothingSuggestion | null;
}

const SuggestionDisplay: React.FC<SuggestionDisplayProps> = ({ suggestion }) => {
  if (!suggestion) {
    return (
      <div className="text-center p-8 bg-gray-50 border border-gray-200 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No suggestion available
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Enter location or weather details to get clothing recommendations.
        </p>
      </div>
    );
  }

  // Get weather icon based on condition
  const getWeatherIcon = () => {
    const condition = suggestion.weatherCondition.toLowerCase();
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("sun") || condition.includes("clear")) return "☀️";
    if (condition.includes("wind")) return "💨";
    if (condition.includes("fog") || condition.includes("mist")) return "🌫️";
    if (condition.includes("thunder") || condition.includes("storm")) return "⛈️";
    return "🌡️"; // Default
  };

  // Get clothing icon based on suggestion
  const getClothingIcon = () => {
    const clothing = suggestion.clothingType.toLowerCase();
    if (clothing.includes("jacket") || clothing.includes("coat")) return "🧥";
    if (clothing.includes("shirt")) return "👕";
    if (clothing.includes("t-shirt")) return "👕";
    if (clothing.includes("sweater") || clothing.includes("sweatshirt"))
      return "🧶";
    if (clothing.includes("shorts")) return "🩳";
    if (clothing.includes("pants") || clothing.includes("jeans")) return "👖";
    if (clothing.includes("dress")) return "👗";
    if (clothing.includes("skirt")) return "👗";
    if (clothing.includes("umbrella")) return "☂️";
    if (clothing.includes("boots")) return "👢";
    if (clothing.includes("hat") || clothing.includes("cap")) return "🧢";
    if (clothing.includes("scarf")) return "🧣";
    if (clothing.includes("gloves") || clothing.includes("mittens")) return "🧤";
    return "👚"; // Default
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md overflow-hidden border border-blue-100 animate-fadeIn">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Today&apos;s Outfit Suggestion</h2>
        <span className="text-3xl" role="img" aria-label="Weather icon">
          {getWeatherIcon()}
        </span>
      </div>

      {/* Main content */}
      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Weather conditions */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Weather Conditions
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="font-medium text-gray-800">
                  {suggestion.weatherCondition}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Temperature</span>
                <span className="font-medium text-gray-800">
                  {suggestion.temperatureRange}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Humidity</span>
                <span className="font-medium text-gray-800">
                  {suggestion.humidityLevel}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Wind</span>
                <span className="font-medium text-gray-800">
                  {suggestion.windSpeed}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Precipitation</span>
                <span className="font-medium text-gray-800">
                  {suggestion.precipitationChance}
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Clothing suggestion */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Recommended Outfit
            </h3>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-50 flex flex-col items-center">
              <span
                className="text-6xl mb-4"
                role="img"
                aria-label="Clothing icon"
              >
                {getClothingIcon()}
              </span>

              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {suggestion.clothingType}
                </p>
                <p className="text-sm text-gray-600">
                  Perfect for {suggestion.temperatureRange} with{" "}
                  {suggestion.weatherCondition.toLowerCase()} conditions
                </p>
              </div>
            </div>

            {/* Additional advice */}
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    Don&apos;t forget an umbrella if precipitation is over 50%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save or share button */}
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save Suggestion
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionDisplay;
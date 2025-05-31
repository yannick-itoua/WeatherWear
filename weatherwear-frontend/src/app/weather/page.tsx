"use client";
import React, { useState, useEffect } from "react";
import WeatherForm from "../../components/WeatherForm";
import SuggestionDisplay from "../../components/SuggestionDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";
import { getClothingSuggestion, getRealtimeClothingSuggestion } from "../../api/backend";
import { WeatherRequest, ClothingSuggestion } from "../../types";

const WeatherPage: React.FC = () => {
  const [suggestion, setSuggestion] = useState<ClothingSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState("");
  
  // Load recent cities from localStorage on component mount
  useEffect(() => {
    const savedCities = localStorage.getItem("weatherwear-recent-cities");
    if (savedCities) {
      try {
        setRecentCities(JSON.parse(savedCities).slice(0, 5));
      } catch (err) {
        console.error("Error parsing recent cities:", err);
      }
    }
  }, []);

  // Save a city to recent searches
  const saveToRecentCities = (city: string) => {
    const updatedCities = [
      city, 
      ...recentCities.filter(c => c.toLowerCase() !== city.toLowerCase())
    ].slice(0, 5);
    
    setRecentCities(updatedCities);
    localStorage.setItem("weatherwear-recent-cities", JSON.stringify(updatedCities));
  };

  const handleManualSubmit = async (data: WeatherRequest) => {
    setLoading(true);
    setError(null);
    setSuggestion(null);
    
    try {
      const result = await getClothingSuggestion(data);
      setSuggestion(result);
      if (data.location) {
        saveToRecentCities(data.location);
      }
    } catch (err) {
      console.error("Error getting clothing suggestion:", err);
      setError("Failed to get suggestion. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRealtimeSubmit = async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    setSuggestion(null);
    
    try {
      const result = await getRealtimeClothingSuggestion(city);
      setSuggestion(result);
      saveToRecentCities(city);
      setCityInput("");
    } catch (err) {
      console.error("Error getting real-time suggestion:", err);
      setError(`Failed to get real-time suggestion for "${city}". Please check the city name and try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">WeatherWear Assistant</h1>
      
      {/* City search with improved styling */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg shadow-sm border border-blue-100 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-blue-800">Get Real-Time Suggestion</h2>
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={event => {
            event.preventDefault();
            handleRealtimeSubmit(cityInput);
          }}
        >
          <input
            type="text"
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
            className="border border-blue-200 px-4 py-2 rounded-md flex-grow focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter city name (e.g., Toronto)"
            aria-label="City name"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading || !cityInput.trim()}
          >
            {loading ? 'Searching...' : 'Get Suggestion'}
          </button>
        </form>
        
        {/* Recent cities */}
        {recentCities.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {recentCities.map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setCityInput(city);
                    handleRealtimeSubmit(city);
                  }}
                  className="text-xs bg-white px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="my-6 flex items-center">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-4 text-gray-500 font-medium">or customize weather parameters</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
      
      {/* Manual weather form */}
      <div className="bg-white p-5 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-semibold mb-3">Custom Weather Parameters</h2>
        <WeatherForm
          onSubmit={handleManualSubmit}
          loading={loading}
        />
      </div>

      {/* Status indicators */}
      {loading && (
        <div className="my-8 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      
      {error && (
        <div className="my-4 animate-fadeIn">
          <ErrorAlert message={error} onClose={() => setError(null)} />
        </div>
      )}
      
      {/* Results */}
      <div className={`my-6 transition-opacity duration-300 ${suggestion ? 'opacity-100' : 'opacity-0'}`}>
        <SuggestionDisplay suggestion={suggestion} />
      </div>
      
      {/* Info footer */}
      {!suggestion && !loading && !error && (
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Get personalized clothing suggestions based on weather conditions.</p>
          <p className="mt-1">Enter a city name or use custom parameters above.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
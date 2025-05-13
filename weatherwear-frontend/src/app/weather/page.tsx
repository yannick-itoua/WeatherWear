"use client";
import React, { useState } from "react";
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

  const handleManualSubmit = async (data: WeatherRequest) => {
    setLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await getClothingSuggestion(data);
      setSuggestion(result);
    } catch {
      setError("Failed to get suggestion.");
    }
    setLoading(false);
  };

  const handleRealtimeSubmit = async (city: string) => {
    setLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await getRealtimeClothingSuggestion(city);
      setSuggestion(result);
    } catch {
      setError("Failed to get real-time suggestion.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Clothing Suggestion</h1>
      <WeatherForm
        onSubmit={handleManualSubmit}
        loading={loading}
      />
      <div className="my-4 text-center">
        <span className="text-gray-500">or</span>
      </div>
      <form
        className="flex gap-2 mb-4"
        onSubmit={event => {
          event.preventDefault();
          const city = (event.currentTarget.elements.namedItem("city") as HTMLInputElement).value;
          if (city) handleRealtimeSubmit(city);
        }}
      >
        <input
          type="text"
          name="city"
          className="border px-3 py-2 rounded w-full"
          placeholder="Get real-time suggestion by city"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          Real-Time
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <SuggestionDisplay suggestion={suggestion} />
    </div>
  );
};

export default WeatherPage;
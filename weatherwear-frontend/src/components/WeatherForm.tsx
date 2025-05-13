import React, { useState } from "react";
import { WeatherRequest } from "../types";

interface WeatherFormProps {
  onSubmit: (data: WeatherRequest) => Promise<void>;
  loading?: boolean;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit, loading }) => {
  const [location, setLocation] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [latitude, setLatitude] = useState<number | "">("");
  const [longitude, setLongitude] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      location: location || undefined,
      weatherType: weatherType || undefined,
      latitude: latitude === "" ? undefined : Number(latitude),
      longitude: longitude === "" ? undefined : Number(longitude),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Get Clothing Suggestion</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">City</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter city name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Weather Type</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={weatherType}
          onChange={e => setWeatherType(e.target.value)}
        >
          <option value="">Select type (optional)</option>
          <option value="rain">Rain</option>
          <option value="snow">Snow</option>
          <option value="clear">Clear</option>
          <option value="windy">Windy</option>
        </select>
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Latitude</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={latitude}
            onChange={e => setLatitude(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="e.g. 39.7392"
            step="any"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Longitude</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={longitude}
            onChange={e => setLongitude(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="e.g. -104.9903"
            step="any"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Suggestion"}
      </button>
    </form>
  );
};

export default WeatherForm;
import React, { useState } from "react";
import { AdviceHistory } from "../types";

interface AdviceHistoryListProps {
  history: AdviceHistory[];
}

const AdviceHistoryList: React.FC<AdviceHistoryListProps> = ({ history }) => {
  const [sortField, setSortField] = useState<keyof AdviceHistory>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Handle empty state with better UI
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No advice history</h3>
        <p className="mt-1 text-sm text-gray-500">
          Your clothing recommendations will appear here.
        </p>
      </div>
    );
  }

  // Sort the history data
  const sortedHistory = [...history].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sort change
  const handleSort = (field: keyof AdviceHistory) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get weather icon based on weather summary
  const getWeatherIcon = (weather: string): string => {
    const lowerWeather = weather.toLowerCase();
    if (lowerWeather.includes("rain")) return "🌧️";
    if (lowerWeather.includes("cloud")) return "☁️";
    if (lowerWeather.includes("snow")) return "❄️";
    if (lowerWeather.includes("sun") || lowerWeather.includes("clear")) return "☀️";
    if (lowerWeather.includes("wind")) return "💨";
    if (lowerWeather.includes("fog") || lowerWeather.includes("mist")) return "🌫️";
    if (lowerWeather.includes("thunder") || lowerWeather.includes("storm")) return "⛈️";
    return "🌡️"; // Default
  };

  // Format date from ISO string to readable format
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortField === "date" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("weatherSummary")}
              >
                <div className="flex items-center">
                  Weather
                  {sortField === "weatherSummary" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("clothingSuggestion")}
              >
                <div className="flex items-center">
                  Suggestion
                  {sortField === "clothingSuggestion" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedHistory.map((item, idx) => (
              <tr 
                key={`${item.username}-${item.date}-${idx}`} 
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg mr-2" aria-hidden="true">
                      {getWeatherIcon(item.weatherSummary)}
                    </span>
                    <span className="text-sm text-gray-900">{item.weatherSummary}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.clothingSuggestion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{history.length}</span> results
        </div>
      </div>
    </div>
  );
};

export default AdviceHistoryList;
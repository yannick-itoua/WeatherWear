"use client";
import React, { useState, useEffect } from "react";
import { AdviceHistory } from "../../types";
import { getAdviceHistory } from "../../api/backend"; // Removed unused import
import AdviceHistoryList from "../../components/AdviceHistoryList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";
// Removed unused date-fns import

const HistoryPage: React.FC = () => {
  // State management
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState<AdviceHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterActive, setFilterActive] = useState(false);

  // Load saved username on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("weatherwear-username");
    if (savedUsername) setUsername(savedUsername);
  }, []);

  // Summary statistics
  const mostFrequentCondition = getMostFrequent(history.map(h => h.weatherSummary));
  const mostFrequentClothing = getMostFrequent(history.map(h => h.clothingSuggestion));

  // Handler functions
  const fetchHistory = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setFilterActive(false);
    localStorage.setItem("weatherwear-username", username);
    
    try {
      const data = await getAdviceHistory(username);
      setHistory(data);
    } catch (err) {
      setError("Failed to fetch advice history.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const filterByDateRange = async () => {
    if (!username || !startDate) return;
    setLoading(true);
    setError(null);
    setFilterActive(true);
    
    try {
      // If using a date range, we'd implement this in the backend
      // For now, we'll fetch all and filter client-side
      const allData = await getAdviceHistory(username);
      const filtered = allData.filter(item => {
        const itemDate = new Date(item.date);
        return (!startDate || itemDate >= new Date(startDate)) && 
               (!endDate || itemDate <= new Date(endDate));
      });
      setHistory(filtered);
    } catch (err) {
      setError("Failed to filter advice history.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchHistory();
    }
  };
  
  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilterActive(false);
    fetchHistory();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Clothing Advice History</h1>
      
      {/* Search bar */}
      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <div className="flex gap-2">
          <input
            id="username"
            type="text"
            className="border px-3 py-2 rounded w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={fetchHistory}
            disabled={loading || !username}
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Date filter */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
        <h2 className="font-semibold mb-2">Filter by Date</h2>
        <div className="flex flex-wrap gap-2">
          <div>
            <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
              From
            </label>
            <input
              id="start-date"
              type="date"
              className="border px-3 py-2 rounded shadow-sm"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
              To
            </label>
            <input
              id="end-date"
              type="date"
              className="border px-3 py-2 rounded shadow-sm"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <div className="self-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={filterByDateRange}
              disabled={loading || !username || !startDate}
            >
              Apply Filter
            </button>
            {filterActive && (
              <button
                className="ml-2 text-sm text-blue-600 hover:underline"
                onClick={clearFilters}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Status indicators */}
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      
      {/* Stats summary */}
      {!loading && !error && history.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800">Most Common Weather</h3>
            <p className="text-xl font-semibold mt-1">{mostFrequentCondition || "N/A"}</p>
            <p className="text-sm text-gray-500 mt-1">Based on your history</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800">Most Suggested Clothing</h3>
            <p className="text-xl font-semibold mt-1">{mostFrequentClothing || "N/A"}</p>
            <p className="text-sm text-gray-500 mt-1">Based on your history</p>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {!loading && !error && history.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No history found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {username ? `No records found for "${username}"` : "Enter a username to search for clothing history"}
          </p>
        </div>
      )}
      
      {/* History list */}
      <AdviceHistoryList history={history} />
    </div>
  );
};

// Helper function to find most frequent item in an array
function getMostFrequent(arr: string[]): string | null {
  if (!arr.length) return null;
  
  const counts = arr.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0][0];
}

export default HistoryPage;
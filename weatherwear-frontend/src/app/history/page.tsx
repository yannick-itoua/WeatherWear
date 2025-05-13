"use client";
import React, { useState } from "react";
import { AdviceHistory } from "../../types";
import { getAdviceHistory } from "../../api/backend";
import AdviceHistoryList from "../../components/AdviceHistoryList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

const HistoryPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState<AdviceHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAdviceHistory(username);
      setHistory(data);
    } catch {
      setError("Failed to fetch advice history.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Advice History</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={fetchHistory}
          disabled={loading || !username}
        >
          Search
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <AdviceHistoryList history={history} />
    </div>
  );
};

export default HistoryPage;
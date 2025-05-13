import React from "react";
import { AdviceHistory } from "../types";

interface AdviceHistoryListProps {
  history: AdviceHistory[];
}

const AdviceHistoryList: React.FC<AdviceHistoryListProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return <div className="text-gray-500">No advice history found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Weather</th>
            <th className="px-4 py-2 text-left">Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{item.date}</td>
              <td className="px-4 py-2">{item.weatherSummary}</td>
              <td className="px-4 py-2">{item.clothingSuggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdviceHistoryList;
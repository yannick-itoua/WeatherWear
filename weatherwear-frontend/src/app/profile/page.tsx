"use client";
import React, { useState } from "react";
import { User } from "../../types";
import { getUserProfile, updateClothingPreference } from "../../api/backend";
import UserProfileForm from "../../components/UserProfileForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProfile(username);
      setUser(data);
    } catch {
      setError("Failed to fetch user profile.");
    }
    setLoading(false);
  };

  const handleSave = async (updatedUser: User) => {
    setLoading(true);
    setError(null);
    try {
      await updateClothingPreference(updatedUser.username, updatedUser.clothingPreference);
      setUser(updatedUser);
    } catch {
      setError("Failed to update clothing preference.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
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
          onClick={fetchProfile}
          disabled={loading || !username}
        >
          Search
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {user && <UserProfileForm user={user} onSave={handleSave} />}
    </div>
  );
};

export default ProfilePage;
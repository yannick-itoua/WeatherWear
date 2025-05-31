"use client";
import React, { useState, useEffect } from "react";
import { User } from "../../types";
import { getUserProfile, updateClothingPreference } from "../../api/backend";
import UserProfileForm from "../../components/UserProfileForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

const ProfilePage: React.FC = () => {
  // State management
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load saved username from localStorage when component mounts
  useEffect(() => {
    const savedUsername = localStorage.getItem("weatherwear-username");
    if (savedUsername) {
      setUsername(savedUsername);
      // Optionally auto-fetch the profile
      fetchProfile(savedUsername);
    }
  }, []);

  // Fetch user profile data
  const fetchProfile = async (name: string = username) => {
    if (!name) return;
    
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      const data = await getUserProfile(name);
      setUser(data);
      localStorage.setItem("weatherwear-username", name);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch user profile. Please check the username and try again.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchProfile();
    }
  };

  // Save user preference changes
  const handleSave = async (updatedUser: User) => {
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      await updateClothingPreference(updatedUser.username, updatedUser.clothingPreference);
      setUser(updatedUser);
      setSaveSuccess(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating preference:", err);
      setError("Failed to update clothing preference. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>
      
      {/* Search bar with improved styling */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Find your profile
        </label>
        <div className="flex gap-2">
          <input
            id="username"
            type="text"
            className="border px-3 py-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Username"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 transition-colors"
            onClick={() => fetchProfile()}
            disabled={loading || !username}
            aria-label="Search Profile"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Status messages */}
      {loading && (
        <div className="flex justify-center my-6">
          <LoadingSpinner />
        </div>
      )}
      
      {error && (
        <div className="animate-fadeIn">
          <ErrorAlert message={error} onClose={() => setError(null)} />
        </div>
      )}
      
      {saveSuccess && (
        <div 
          className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-4 animate-fadeIn"
        >
          <div className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}

      {/* User profile form or empty state */}
      {!loading && !user && !error && (
        <div className="text-center py-10 bg-gray-50 rounded-lg border">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No profile loaded</h3>
          <p className="mt-1 text-sm text-gray-500">
            Search for your username to view and edit your profile.
          </p>
        </div>
      )}

      {user && (
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-fadeIn">
          <UserProfileForm user={user} onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
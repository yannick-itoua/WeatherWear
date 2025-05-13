import React, { useState } from "react";
import { User } from "../types";

interface UserProfileFormProps {
  user: User;
  onSave: (user: User) => Promise<void>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user, onSave }) => {
  const [form, setForm] = useState<User>({ ...user });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Clothing Preference</label>
        <select
          name="clothingPreference"
          value={form.clothingPreference}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select preference</option>
          <option value="cold-sensitive">Cold Sensitive</option>
          <option value="heat-tolerant">Heat Tolerant</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
      {success && <div className="text-green-600 mt-3 text-center">Profile updated!</div>}
    </form>
  );
};

export default UserProfileForm;
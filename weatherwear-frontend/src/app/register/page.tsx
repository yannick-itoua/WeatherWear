"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../api/backend";
import { User } from "../../types";
import ErrorAlert from "../../components/ErrorAlert";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<User>({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    clothingPreference: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerUser(form);
      router.push("/login");
    } catch {
      setError("Registration failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
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
            required
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onLogin(username, password);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
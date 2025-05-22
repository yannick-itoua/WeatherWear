"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/LoginForm";
import { useUser } from "../../context/UserContext";
import { getUserProfile } from "../../api/backend";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setError(null);
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    try {
      // Replace with real authentication logic as needed
      const user = await getUserProfile(username);
      if (user && user.password === password) {
        setUser(user);
        router.push("/");
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Login failed.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow mt-8">
      <LoginForm onLogin={handleLogin} error={error || undefined} />
    </div>
  );
};

export default LoginPage;
"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "../context/UserContext";

const Navbar: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <nav className="w-full bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow">
      <div className="font-bold text-lg">
        <Link href="/">WeatherWear</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link href="/weather" className="hover:underline">
          Weather
        </Link>
        <Link href="/history" className="hover:underline">
          History
        </Link>
        {user ? (
          <>
            <span className="font-semibold">{user.username}</span>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
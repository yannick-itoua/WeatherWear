import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => (
  <nav className="w-full bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow">
    <div className="font-bold text-lg">
      <Link href="/">WeatherWear</Link>
    </div>
    <div className="space-x-4">
      <Link href="/weather" className="hover:underline">
        Weather
      </Link>
      <Link href="/history" className="hover:underline">
        History
      </Link>
      <Link href="/profile" className="hover:underline">
        Profile
      </Link>
      <Link href="/register" className="hover:underline">
        Register
      </Link>
      <Link href="/login" className="hover:underline">
        Login
      </Link>
    </div>
  </nav>
);

export default Navbar;
import React from "react";

const HomePage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to WeatherWear</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Get personalized clothing suggestions based on the weather in your city or location.
        Register, set your preferences, and view your daily advice history!
      </p>
      <div className="flex gap-4">
        <a
          href="/weather"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Get Suggestion
        </a>
        <a
          href="/register"
          className="bg-gray-200 text-blue-700 px-6 py-3 rounded shadow hover:bg-gray-300 transition"
        >
          Register
        </a>
      </div>
    </main>
  </div>
);

export default HomePage;
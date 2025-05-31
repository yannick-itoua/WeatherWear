import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} WeatherWear. All rights reserved.</p>
          <p className="text-sm mt-2">Weather data provided by OpenWeather API</p>
        </div>
      </footer>
);

export default Footer;
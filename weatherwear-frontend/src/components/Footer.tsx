import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full py-4 bg-gray-100 text-center text-gray-600 mt-8 border-t">
    <span>
      &copy; {new Date().getFullYear()} WeatherWear. All rights reserved.
    </span>
  </footer>
);

export default Footer;
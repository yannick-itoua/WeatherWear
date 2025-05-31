"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState("sunny");
  
  // Cycle through weather animations
  useEffect(() => {
    const weatherTypes = ["sunny", "rainy", "snowy", "cloudy"];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % weatherTypes.length;
      setCurrentWeather(weatherTypes[index]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-700 leading-tight">
                Dress for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">weather</span>, not the season
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Get personalized clothing suggestions based on real-time weather conditions in your city. 
                Never be over or underdressed again!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/weather" 
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg font-medium"
                >
                  Get Suggestion
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-blue-700 border-2 border-blue-600 px-8 py-3 rounded-lg shadow hover:bg-blue-50 transition-all transform hover:-translate-y-0.5 text-lg font-medium"
                >
                  Create Account
                </Link>
              </div>
              
              <div className="mt-8 flex items-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Real-time weather</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Personalized advice</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className={`relative h-80 w-80 p-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl transform transition-all duration-700 ${currentWeather === 'sunny' ? 'scale-100' : 'scale-95 opacity-80'}`}>
                {/* Weather animation placeholder - would be even better with actual illustrations */}
                <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-700 ${currentWeather === 'sunny' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-6xl">☀️</div>
                </div>
                <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-700 ${currentWeather === 'rainy' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-6xl">🌧️</div>
                </div>
                <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-700 ${currentWeather === 'snowy' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-6xl">❄️</div>
                </div>
                <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-700 ${currentWeather === 'cloudy' ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-6xl">☁️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How WeatherWear Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="text-blue-600 mb-4 flex justify-center">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Check Your Location</h3>
                <p className="text-gray-600 text-center">Enter your city or location to get accurate weather data and clothing recommendations.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="text-blue-600 mb-4 flex justify-center">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Set Preferences</h3>
                <p className="text-gray-600 text-center">Customize your clothing preferences based on your comfort level and style preferences.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="text-blue-600 mb-4 flex justify-center">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Get Daily Suggestions</h3>
                <p className="text-gray-600 text-center">Receive personalized clothing suggestions based on current and forecasted weather conditions.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/weather" className="text-blue-600 font-medium text-lg hover:underline">
                Try it now →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Testimonial/CTA Section */}
        <div className="bg-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to dress weather-smart?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join WeatherWear today and never worry about being unprepared for weather changes again.
            </p>
            <Link 
              href="/register" 
              className="bg-white text-blue-700 px-8 py-3 rounded-lg shadow hover:shadow-lg transition-all transform hover:-translate-y-1 text-lg font-medium inline-block"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
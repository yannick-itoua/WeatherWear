import "../styles/globals.css";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "WeatherWear",
  description: "Personalized clothing suggestions based on the weather.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
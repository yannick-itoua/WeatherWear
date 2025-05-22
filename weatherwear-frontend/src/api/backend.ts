import { User, WeatherRequest, AdviceHistory, ClothingSuggestion } from "../types";

// User API
export async function registerUser(user: User): Promise<User> {
  const res = await fetch(`/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function getUserProfile(username: string): Promise<User> {
  const res = await fetch(`/api/users/${username}`);
  return res.json();
}

export async function updateClothingPreference(username: string, clothingPreference: string): Promise<User> {
  const res = await fetch(`/api/users/${username}/preference`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: clothingPreference,
  });
  return res.json();
}

// Weather API
export async function getClothingSuggestion(data: WeatherRequest): Promise<ClothingSuggestion> {
  const res = await fetch(`/api/weather/suggest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getRealtimeClothingSuggestion(city: string): Promise<ClothingSuggestion> {
  // Already using Next.js API route
  const res = await fetch(`/api/weather/realtime?city=${encodeURIComponent(city)}`);
  return res.json();
}

// Advice History API
export async function saveAdviceHistory(advice: AdviceHistory): Promise<AdviceHistory> {
  const res = await fetch(`/api/advice-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(advice),
  });
  return res.json();
}

export async function getAdviceHistory(username: string): Promise<AdviceHistory[]> {
  const res = await fetch(`/api/advice-history/${username}`);
  return res.json();
}

export async function getAdviceHistoryByDate(username: string, date: string): Promise<AdviceHistory[]> {
  const res = await fetch(`/api/advice-history/${username}/${date}`);
  return res.json();
}
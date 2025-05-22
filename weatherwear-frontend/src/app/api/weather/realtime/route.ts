import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");
  
  // This uses the container name from your docker-compose.yml
  const backendRes = await fetch(`http://backend:8080/api/weather/realtime?city=${city}`);
  const data = await backendRes.json();
  
  return NextResponse.json(data);
}
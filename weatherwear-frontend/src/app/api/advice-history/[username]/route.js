import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const username = params.username;
    
    const backendRes = await fetch(`http://backend:8080/api/advice-history/${username}`);
    
    if (!backendRes.ok) {
      return NextResponse.json(
        { error: `Backend returned ${backendRes.status}` },
        { status: backendRes.status }
      );
    }
    
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching advice history for user ${params.username}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch advice history" },
      { status: 500 }
    );
  }
}
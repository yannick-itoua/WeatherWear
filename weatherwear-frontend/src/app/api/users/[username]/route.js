import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const username = params.username;
    
    const backendRes = await fetch(`http://backend:8080/api/users/${username}`);
    
    if (!backendRes.ok) {
      return NextResponse.json(
        { error: `Backend returned ${backendRes.status}` },
        { status: backendRes.status }
      );
    }
    
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching user profile:`, error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
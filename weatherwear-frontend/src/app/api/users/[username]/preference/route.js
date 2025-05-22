import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const username = params.username;
    const preference = await req.text();
    
    const backendRes = await fetch(`http://backend:8080/api/users/${username}/preference`, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: preference
    });
    
    if (!backendRes.ok) {
      return NextResponse.json(
        { error: `Backend returned ${backendRes.status}` },
        { status: backendRes.status }
      );
    }
    
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error updating preference for user:`, error);
    return NextResponse.json(
      { error: "Failed to update clothing preference" },
      { status: 500 }
    );
  }
}
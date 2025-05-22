import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    
    const backendRes = await fetch(`http://backend:8080/api/advice-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
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
    console.error("Error saving advice history:", error);
    return NextResponse.json(
      { error: "Failed to save advice history" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const { username, date } = context.params;
    
    const backendRes = await fetch(`http://backend:8080/api/advice-history/${username}/${date}`);
    
    if (!backendRes.ok) {
      const errorText = await backendRes.text();
      console.error(`Backend error: ${backendRes.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Backend request failed with status ${backendRes.status}.` },
        { status: backendRes.status }
      );
    }
    
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in GET /api/advice-history route:`, error);
    return NextResponse.json(
      { error: "Internal server error while fetching advice history." },
      { status: 500 }
    );
  }
}
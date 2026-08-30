import { NextResponse } from "next/server";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("session_token", "", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return withCors(response);
}

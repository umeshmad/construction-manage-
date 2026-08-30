import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request){
    try{
        const token=request.cookies.get("session_token")?.value;

        if(!token){
            return withCors(
                NextResponse.json({ error: "Not authenticated" }, { status: 401 })
            );
        }
        const decode=verifyToken(token);
        if(!decode){
            return withCors(
                NextResponse.json({ error: "Invalid or expired session" }, { status: 401 })
            );
        }

        const [rows]=await pool.execute(
            "SELECT id, name, email, role FROM users WHERE id = ?",[decode.id]
        );

        if(rows.length===0){
            return withCors(
                NextResponse.json({ error: "User not found" }, { status: 404 })
            );
        }
        return withCors(NextResponse.json(rows[0]))
    }catch(err){
        console.error("Me route error:", err);
        return withCors(
        NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
        );
    }
}
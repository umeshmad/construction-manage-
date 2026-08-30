import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyPassword, createToken } from "@/lib/auth";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS(){
    return new NextResponse(null,{status: 204, headers: corsHeaders() });
}

export async function POST(request) {
    try{
        const{email,password}=await request.json();

        if(!email || !password){
            return withCors(
                NextResponse.json(
                    { error: "email and password are required" },
                    { status: 400 }
                )
            );
        }

        const [rows]=await pool.execute(
            "SELECT  id, name, email, password_hash, role FROM users WHERE email=?",[email]
        );

        if(rows.length === 0){
            return withCors(
                NextResponse.json(
                    { error: "Invalid email or password" }, { status: 401 }
                )
            );
        }

        const user=rows[0];
        const passwordMatch=await verifyPassword(password,user.password_hash);

        if(!passwordMatch){
            return withCors(
                NextResponse.json(
                    { error: "Invalid email or password" }, { status: 401 }
                )
            );
        }

        const token=createToken({ id: user.id, email: user.email, role: user.role });

        const response=NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

        response.cookies.set("session_token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        });

        return withCors(response);
    }catch(err){
        console.error("Login error:", err);
        return withCors(
        NextResponse.json({ error: "Login failed" }, { status: 500 })
    );
    }
    
}
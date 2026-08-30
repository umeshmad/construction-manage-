import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, createToken } from "@/lib/auth";
import { withCors, corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
    return new NextResponse(null,{ status: 204, headers: corsHeaders() });
}

export async function POST(request){
    const conn=await pool.getConnection();
    try{
        const {name,email,password,phone}=await request.json();
        if(!name || !email || !password){
            return withCors(
                NextResponse.json(
                    { error: "name, email, and password are required" },
                    { status: 400 }
                )
            );

        }

        const[existing]=await conn.execute(
            "SELECT id FROM users WHERE email=?",[email]
        );
        if(existing.length>0){
            return withCors(
                NextResponse.json({ error: "Email already registered" }, { status: 409 })
            );
        }

        const passwordHash=await hashPassword(password);
        await conn.beginTransaction();

        const [userResult]=await conn.execute(
            "INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, 'customer')",
            [name, email, passwordHash, phone || null]
        );
        const userId = userResult.insertId;

        await conn.execute(
            "INSERT INTO customers (user_id) VALUES (?)",
            [userId]
        );

        await conn.commit();

        const token=createToken({id:userId,email,role:"customer"});

        const response=NextResponse.json(
            { id: userId, name, email, role: "customer" },
            { status: 201 }
        );

        response.cookies.set("session_token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });
        return withCors(response);
    }catch(err){
        await conn.rollback();
        console.error("Register error:", err);
        return withCors(
        NextResponse.json({ error: "Registration failed" }, { status: 500 })
        );
    } finally {
        conn.release();
    }
}
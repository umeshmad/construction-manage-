import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCorsHeaders } from "@/lib/cors";

export async function OPTIONS(request) {
    const origin = request.headers.get("origin");
    return new NextResponse(null, { status: 204, headers: getCorsHeaders(origin) });
}

export async function GET(request,) {
    const origin = request.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category");
        let query = "SELECT Id, name, description, category FROM services ";
        const params = [];
        if (category) {
            query += "WHERE category =? "
            params.push(category);
        }

        query += "ORDER BY category, name";

        const [rows] = await pool.query(query, params);

        return NextResponse.json({ services: rows }, { headers: corsHeaders });
    } catch (err) {
        console.error("Get services error:", err);
        return NextResponse.json(
            { error: "failed to fetch services" },
            { status: 500, headers: corsHeaders }
        )
    }

}
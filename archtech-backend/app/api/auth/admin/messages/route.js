import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCorsHeaders } from "@/lib/cors";
import { getSessionUser } from "@/lib/requireAuth";

export async function OPTIONS(request){
    const origin=request.headers.get("origin");
    return new NextResponse(null,{status:204,headers:getCorsHeaders(origin)});
}

export async function GET(request){
    const origin=request.headers.get("origin");
    const corsHeaders=getCorsHeaders(origin);
    try{
        const sessionUser=await getSessionUser();
        if(!sessionUser||sessionUser.role!=="admin"){
            return NextResponse.json(
                {error:"Admin access required."},
                {status:401,headers:corsHeaders}
            );
        }

        // get all unique customer threads with latest message
        const [threads]=await pool.query(
            `SELECT m.customer_id,u.name AS customer_name,
                    m.content AS last_message,m.sent_at,m.sent_by,
                    SUM(CASE WHEN m.is_read=0 THEN 1 ELSE 0 END) AS unread_count
             FROM messages m
             JOIN customers c ON m.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             GROUP BY m.customer_id,u.name
             ORDER BY m.sent_at DESC`
        );

        return NextResponse.json({threads},{headers:corsHeaders});
    }catch(err){
        console.error("Admin messages error:",err);
        return NextResponse.json(
            {error:"Failed to load messages."},
            {status:500,headers:corsHeaders}
        );
    }
}

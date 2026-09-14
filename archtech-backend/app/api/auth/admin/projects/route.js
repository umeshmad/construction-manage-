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

        const [projects]=await pool.query(
            `SELECT p.Id,p.name,p.location,p.start_date,p.end_date,
                    p.budget_allocated,p.status,p.progress,
                    u.name AS customer_name
             FROM projects p
             JOIN customers c ON p.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             ORDER BY p.created_at DESC`
        );

        return NextResponse.json({projects},{headers:corsHeaders});
    }catch(err){
        console.error("Admin projects error:",err);
        return NextResponse.json(
            {error:"Failed to load projects."},
            {status:500,headers:corsHeaders}
        );
    }
}

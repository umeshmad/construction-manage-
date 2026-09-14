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

        const [[totalPaid]]=await pool.query("SELECT SUM(amount) AS total FROM payments WHERE status='paid'");
        const [[totalPending]]=await pool.query("SELECT SUM(amount) AS total FROM payments WHERE status='pending'");
        const [[overdueCount]]=await pool.query("SELECT COUNT(*) AS count FROM payments WHERE status='overdue'");

        const [payments]=await pool.query(
            `SELECT pay.Id,pay.amount,pay.method,pay.status,pay.date,pay.receipt_ref,
                    u.name AS customer_name,p.name AS project_name
             FROM payments pay
             JOIN customers c ON pay.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             JOIN projects p ON pay.project_id=p.Id
             ORDER BY pay.date DESC`
        );

        return NextResponse.json({
            stats:{
                totalPaid:totalPaid.total||0,
                totalPending:totalPending.total||0,
                overdueCount:overdueCount.count,
            },
            payments,
        },{headers:corsHeaders});
    }catch(err){
        console.error("Admin payments error:",err);
        return NextResponse.json(
            {error:"Failed to load payments."},
            {status:500,headers:corsHeaders}
        );
    }
}

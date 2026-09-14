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
        if(!sessionUser||sessionUser.role!=="customer"){
            return NextResponse.json(
                {error:"You must be logged in as a customer to view this."},
                {status:401,headers:corsHeaders}
            );
        }

        const [customerRows]=await pool.query(
            "SELECT Id FROM customers WHERE user_id=?",[sessionUser.id]
        );
        if(customerRows.length===0){
            return NextResponse.json(
                {error:"No customer profile found."},
                {status:404,headers:corsHeaders}
            );
        }
        const customerId=customerRows[0].Id;

        const [[totalPaidRow]]=await pool.query(
            "SELECT SUM(amount) AS total FROM payments WHERE customer_id=? AND status='paid'",[customerId]
        );
        const [[totalPendingRow]]=await pool.query(
            "SELECT SUM(amount) AS total FROM payments WHERE customer_id=? AND status='pending'",[customerId]
        );

        const [payments]=await pool.query(
            `SELECT pay.Id,pay.amount,pay.method,pay.status,pay.date,pay.receipt_ref,
                    p.name AS project_name
             FROM payments pay
             JOIN projects p ON pay.project_id=p.Id
             WHERE pay.customer_id=?
             ORDER BY pay.date DESC`,
            [customerId]
        );

        return NextResponse.json({
            stats:{
                totalPaid:totalPaidRow.total||0,
                totalPending:totalPendingRow.total||0,
            },
            payments,
        },{headers:corsHeaders});
    }catch(err){
        console.error("Client payments error:",err);
        return NextResponse.json(
            {error:"Failed to load payments."},
            {status:500,headers:corsHeaders}
        );
    }
}

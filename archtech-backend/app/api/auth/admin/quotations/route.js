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

        // pending requests that need a quotation
        const [pendingRequests]=await pool.query(
            `SELECT pr.Id,pr.title,pr.description,pr.estimated_budget,pr.submitted_at,
                    u.name AS customer_name
             FROM project_requests pr
             JOIN customers c ON pr.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             WHERE pr.status='pending'
             AND pr.Id NOT IN (SELECT request_id FROM quotations)
             ORDER BY pr.submitted_at DESC`
        );

        // all sent quotations
        const [quotations]=await pool.query(
            `SELECT q.Id,q.total_amount,q.status,q.sent_date,
                    pr.title AS project_title,u.name AS customer_name
             FROM quotations q
             JOIN project_requests pr ON q.request_id=pr.Id
             JOIN customers c ON pr.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             ORDER BY q.sent_date DESC`
        );

        return NextResponse.json({pendingRequests,quotations},{headers:corsHeaders});
    }catch(err){
        console.error("Admin quotations error:",err);
        return NextResponse.json(
            {error:"Failed to load quotations."},
            {status:500,headers:corsHeaders}
        );
    }
}

export async function POST(request){
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

        const {requestId,items}=await request.json();
        if(!requestId||!items||items.length===0){
            return NextResponse.json(
                {error:"requestId and items are required."},
                {status:400,headers:corsHeaders}
            );
        }

        const totalAmount=items.reduce((sum,item)=>sum+parseFloat(item.amount),0);

        const conn=await pool.getConnection();
        try{
            await conn.beginTransaction();

            const [qResult]=await conn.query(
                "INSERT INTO quotations(request_id,total_amount,status) VALUES(?,?,'pending')",
                [requestId,totalAmount]
            );
            const quotationId=qResult.insertId;

            for(const item of items){
                await conn.query(
                    "INSERT INTO quotation_items(quotation_id,description,amount) VALUES(?,?,?)",
                    [quotationId,item.desc,item.amount]
                );
            }

            await conn.commit();
            return NextResponse.json(
                {message:"Quotation sent successfully.",quotationId},
                {status:201,headers:corsHeaders}
            );
        }catch(err){
            await conn.rollback();
            throw err;
        }finally{
            conn.release();
        }
    }catch(err){
        console.error("Send quotation error:",err);
        return NextResponse.json(
            {error:"Failed to send quotation."},
            {status:500,headers:corsHeaders}
        );
    }
}

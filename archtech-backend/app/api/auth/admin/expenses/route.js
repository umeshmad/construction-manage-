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

        const [[totalMTD]]=await pool.query("SELECT SUM(amount) AS total FROM expenses");
        const [[pendingCount]]=await pool.query("SELECT COUNT(*) AS count FROM expenses WHERE status='pending'");

        const [expenses]=await pool.query(
            `SELECT e.Id,e.category,e.amount,e.status,e.date,
                    p.name AS project_name,w.name AS worker_name
             FROM expenses e
             JOIN projects p ON e.project_id=p.Id
             LEFT JOIN workers w ON e.submitted_by=w.Id
             ORDER BY e.date DESC`
        );

        return NextResponse.json({
            stats:{
                totalMTD:totalMTD.total||0,
                pendingCount:pendingCount.count,
            },
            expenses,
        },{headers:corsHeaders});
    }catch(err){
        console.error("Admin expenses error:",err);
        return NextResponse.json(
            {error:"Failed to load expenses."},
            {status:500,headers:corsHeaders}
        );
    }
}

export async function PATCH(request){
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

        const {id,status}=await request.json();
        if(!id||!status){
            return NextResponse.json(
                {error:"id and status are required."},
                {status:400,headers:corsHeaders}
            );
        }

        await pool.query("UPDATE expenses SET status=? WHERE Id=?",[status,id]);
        return NextResponse.json({message:"Expense updated."},{ headers:corsHeaders});
    }catch(err){
        console.error("Update expense error:",err);
        return NextResponse.json(
            {error:"Failed to update expense."},
            {status:500,headers:corsHeaders}
        );
    }
}

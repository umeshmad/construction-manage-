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

        const [quotations]=await pool.query(
            `SELECT q.Id,q.total_amount,q.status,q.sent_date,q.responded_date,
                    pr.title AS project_title
             FROM quotations q
             JOIN project_requests pr ON q.request_id=pr.Id
             WHERE pr.customer_id=?
             ORDER BY q.sent_date DESC`,
            [customerId]
        );

        // get items for each quotation
        for(const q of quotations){
            const [items]=await pool.query(
                "SELECT description,amount FROM quotation_items WHERE quotation_id=?",[q.Id]
            );
            q.items=items;
        }

        return NextResponse.json({quotations},{headers:corsHeaders});
    }catch(err){
        console.error("Client quotations error:",err);
        return NextResponse.json(
            {error:"Failed to load quotations."},
            {status:500,headers:corsHeaders}
        );
    }
}

export async function PATCH(request){
    const origin=request.headers.get("origin");
    const corsHeaders=getCorsHeaders(origin);
    try{
        const sessionUser=await getSessionUser();
        if(!sessionUser||sessionUser.role!=="customer"){
            return NextResponse.json(
                {error:"You must be logged in as a customer."},
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

        await pool.query(
            "UPDATE quotations SET status=?,responded_date=NOW() WHERE Id=?",[status,id]
        );
        return NextResponse.json({message:"Quotation updated."},{headers:corsHeaders});
    }catch(err){
        console.error("Update quotation error:",err);
        return NextResponse.json(
            {error:"Failed to update quotation."},
            {status:500,headers:corsHeaders}
        );
    }
}

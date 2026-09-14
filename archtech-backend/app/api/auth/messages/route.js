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

        const [messages]=await pool.query(
            `SELECT m.Id,m.content,m.sent_by,m.is_read,m.sent_at,
                    w.name AS staff_name
             FROM messages m
             LEFT JOIN workers w ON m.staff_id=w.Id
             WHERE m.customer_id=?
             ORDER BY m.sent_at ASC`,
            [customerId]
        );

        return NextResponse.json({messages},{headers:corsHeaders});
    }catch(err){
        console.error("Client messages error:",err);
        return NextResponse.json(
            {error:"Failed to load messages."},
            {status:500,headers:corsHeaders}
        );
    }
}

export async function POST(request){
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

        const {content}=await request.json();
        if(!content){
            return NextResponse.json(
                {error:"Message content is required."},
                {status:400,headers:corsHeaders}
            );
        }

        // use staff_id 3 as default (Chandana Ratnayake - Project Manager)
        await pool.query(
            "INSERT INTO messages(customer_id,staff_id,content,sent_by,is_read) VALUES(?,3,?,'customer',0)",
            [customerId,content]
        );

        return NextResponse.json(
            {message:"Message sent."},
            {status:201,headers:corsHeaders}
        );
    }catch(err){
        console.error("Send message error:",err);
        return NextResponse.json(
            {error:"Failed to send message."},
            {status:500,headers:corsHeaders}
        );
    }
}

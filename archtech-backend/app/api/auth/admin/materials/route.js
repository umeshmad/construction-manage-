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

        const {searchParams}=new URL(request.url);
        const tab=searchParams.get("tab");

        if(tab==="suppliers"){
            const [suppliers]=await pool.query("SELECT Id,name,contact_info FROM suppliers ORDER BY name");
            return NextResponse.json({suppliers},{headers:corsHeaders});
        }

        // default: materials
        const [materials]=await pool.query(
            "SELECT Id,name,unit,unit_cost,stock_quantity,reorder_threshold FROM materials ORDER BY name"
        );

        return NextResponse.json({materials},{headers:corsHeaders});
    }catch(err){
        console.error("Admin materials error:",err);
        return NextResponse.json(
            {error:"Failed to load materials."},
            {status:500,headers:corsHeaders}
        );
    }
}

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
        const projectFilter=searchParams.get("project_id");
        const statusFilter=searchParams.get("status");

        let query=`SELECT t.Id,t.title,t.status,t.priority,t.due_date,
                          p.name AS project_name,w.name AS worker_name
                   FROM tasks t
                   JOIN projects p ON t.project_id=p.Id
                   LEFT JOIN workers w ON t.assigned_worker_id=w.Id
                   WHERE 1=1`;
        const params=[];

        if(projectFilter){
            query+=" AND t.project_id=?";
            params.push(projectFilter);
        }
        if(statusFilter){
            query+=" AND t.status=?";
            params.push(statusFilter);
        }
        query+=" ORDER BY t.due_date ASC";

        const [tasks]=await pool.query(query,params);

        return NextResponse.json({tasks},{headers:corsHeaders});
    }catch(err){
        console.error("Admin tasks error:",err);
        return NextResponse.json(
            {error:"Failed to load tasks."},
            {status:500,headers:corsHeaders}
        );
    }
}

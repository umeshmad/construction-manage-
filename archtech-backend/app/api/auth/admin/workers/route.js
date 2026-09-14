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

        const [workers]=await pool.query(
            "SELECT Id,name,role,contact_info,hire_date FROM workers ORDER BY name"
        );

        const [assignments]=await pool.query(
            `SELECT pa.worker_id,p.name AS project_name
             FROM project_assignments pa
             JOIN projects p ON pa.project_id=p.Id`
        );

        const projectsByWorker={};
        for(const row of assignments){
            if(!projectsByWorker[row.worker_id])projectsByWorker[row.worker_id]=[];
            projectsByWorker[row.worker_id].push(row.project_name);
        }

        const result=workers.map(w=>({
            ...w,
            projects:projectsByWorker[w.Id]||[]
        }));

        return NextResponse.json({workers:result},{headers:corsHeaders});
    }catch(err){
        console.error("Admin workers error:",err);
        return NextResponse.json(
            {error:"Failed to load workers."},
            {status:500,headers:corsHeaders}
        );
    }
}

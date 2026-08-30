import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCorsHeaders } from "@/lib/cors";
import { getSessionUser } from "@/lib/requireAuth";

export async function OPTIONS(request) {
    const origin = request.headers.get("origin");
    return new NextResponse(null, { status: 204, headers: getCorsHeaders(origin) });
}

function formatstatus(status){
    const map={
        active:"active",
        on_hold:"On_hold",
        completed:"completed"
    }
    return map[status] || status;
}

export async function GET(request) {
    const origin = request.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);
    try {
        const sessionuser=await getSessionUser();
        if(!sessionuser||sessionuser.role!=="customer"){
            return NextResponse.json(
                {error:"You must be logged in as a customer to view this."},
                {status:401, headers: corsHeaders}
            )
        }

        const[customerRows]=await pool.query(
            "SELECT Id FROM customers WHERE user_id=?",
            [sessionuser.userId]
        )
        if(customerRows.length==0){
            return NextResponse.json(
                {error:"No customer profile found for this account."},
                {status:404, headers: corsHeaders}
            )
        }
        const customerId=customerRows[0].Id;

        const [[activeCountRow]]=await pool.query(
            "SELECT COUNT(*) AS count FROM projects  WHEWRE customer_id=? AND status='active'",[customerId] 
        );

        const [[completeCountRow]]=await pool.query(
            "SELECT COUNT(*) AS count FROM projects WHERE customer_id=? AND status='complete' ",[customerId]
        );

        const [[pendingCountRow]]=await pool.query(
            "SELECT COUNT(*) AS count FROM projects WHERE customer_id=? AND status='pending'",[customerId]
        );

        const [projectRow]=await pool.query(
            `SELECT Id, name AS title, location, start_date, end_date, status, progress FROM project WHERE customer_id=? ORDER BY created_at DESC`,[customerId]
        );

        const[assignmentsRow]=await pool.query(
            `SELECT pa.project_id,w.ID as worker_id,w.name,w.role FROM project_assignments pa JOIN workers w ON pa.worker_id=w.id WHERE pa.project_id IN(SELECT Id FROM projects WHERE customer_id=?)`,[customerId]
        )

        const teamByProject={};
        for(const row of assignmentsRow){
            if(!teamByProject[row.project_id])teamByProject[row.project_id]=[];
            teamByProject[row.project_id].push({id: row.worker_id, name: row.name, role: row.role});
        }

        const activeProjects=projectRow.map((p)=>({
            id: p.Id,
            title: p.title,
            startDate: p.start_date,
            estCompletion: p.end_date,
            status: formatStatus(p.status),
            progress: p.progress,
            team: teamByProject[p.Id] || [],
        }));

        const [pendingRows] = await pool.query(
            `SELECT Id, title FROM project_requests
            WHERE customer_id = ? AND status = 'pending'
            ORDER BY submitted_at DESC`,
            [customerId]
        );

        const pendingProjects = pendingRows.map((r) => ({
            id: null, 
            requestId: r.Id,  
            title: r.title,
            startDate: "TBD",
            estCompletion: "TBD",
            status: "Pending Approval",
            progress: 0,
            team: [],
        }));

        return NextResponse.json(
            {
                stats: {
                active: activeCountRow.count,
                completed: completedCountRow.count,
                pending: pendingCountRow.count,
                },
                projects: [...activeProjects, ...pendingProjects],
            },
        { headers: corsHeaders }
        );
    } catch (err) {
        console.error("Get public projects error:", err);
        return NextResponse.json(
            { error: "Failed to load projects." },
            { status: 500, headers: corsHeaders }
        );
    }
}
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

        const [[projectsRow]]=await pool.query("SELECT COUNT(*) AS count FROM projects");
        const [[workersRow]]=await pool.query("SELECT COUNT(*) AS count FROM workers");
        const [[tasksRow]]=await pool.query("SELECT COUNT(*) AS count FROM tasks");
        const [[revenueRow]]=await pool.query("SELECT SUM(amount) AS total FROM payments WHERE status='paid'");
        const [[expensesRow]]=await pool.query("SELECT SUM(amount) AS total FROM expenses WHERE status='approved'");

        const [projectStatuses]=await pool.query(
            "SELECT status,COUNT(*) AS count FROM projects GROUP BY status"
        );
        const [expenseByCategory]=await pool.query(
            "SELECT category,SUM(amount) AS total FROM expenses GROUP BY category"
        );

        return NextResponse.json({
            summary:{
                totalProjects:projectsRow.count,
                totalWorkers:workersRow.count,
                totalTasks:tasksRow.count,
                totalRevenue:revenueRow.total||0,
                totalExpenses:expensesRow.total||0,
            },
            projectStatuses,
            expenseByCategory,
        },{headers:corsHeaders});
    }catch(err){
        console.error("Admin reports error:",err);
        return NextResponse.json(
            {error:"Failed to load reports."},
            {status:500,headers:corsHeaders}
        );
    }
}

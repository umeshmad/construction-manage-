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

        const [[activeRow]]=await pool.query("SELECT COUNT(*) AS count FROM projects WHERE status='active'");
        const [[pendingRow]]=await pool.query("SELECT COUNT(*) AS count FROM project_requests WHERE status='pending'");
        const [[overdueRow]]=await pool.query("SELECT COUNT(*) AS count FROM payments WHERE status='overdue'");
        const [[safetyRow]]=await pool.query("SELECT COUNT(*) AS count FROM safety_reports WHERE status='open'");

        const [[revenueRow]]=await pool.query("SELECT SUM(amount) AS total FROM payments WHERE status='paid'");
        
        const [monthlyRevenue]=await pool.query(`
            SELECT DATE_FORMAT(date, '%b') AS month, SUM(amount) AS revenue 
            FROM payments 
            WHERE status='paid' 
            GROUP BY DATE_FORMAT(date, '%b'), MONTH(date)
            ORDER BY MONTH(date) ASC
            LIMIT 6
        `);

        const [recentMessages]=await pool.query(
            `SELECT m.Id,m.content,m.sent_at,m.sent_by,u.name AS customer_name
             FROM messages m
             JOIN customers c ON m.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             ORDER BY m.sent_at DESC LIMIT 5`
        );

        const [upcomingAppointments]=await pool.query(
            `SELECT a.Id,a.appointment_date,a.appointment_time,a.type,u.name AS customer_name
             FROM appointments a
             JOIN customers c ON a.customer_id=c.Id
             JOIN users u ON c.user_id=u.Id
             WHERE a.status='confirmed'
             ORDER BY a.appointment_date ASC LIMIT 5`
        );

        return NextResponse.json({
            stats:{
                activeProjects:activeRow.count,
                pendingRequests:pendingRow.count,
                overduePayments:overdueRow.count,
                openSafetyIssues:safetyRow.count,
                totalRevenue:revenueRow.total||0,
            },
            monthlyRevenue,
            recentMessages,
            upcomingAppointments,
        },{headers:corsHeaders});
    }catch(err){
        console.error("Admin dashboard error:",err);
        return NextResponse.json(
            {error:"Failed to load dashboard."},
            {status:500,headers:corsHeaders}
        );
    }
}

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

        const [upcoming]=await pool.query(
            `SELECT a.Id,a.appointment_date,a.appointment_time,a.type,a.status,
                    p.name AS project_name
             FROM appointments a
             LEFT JOIN projects p ON a.project_id=p.Id
             WHERE a.customer_id=? AND a.status IN ('requested','confirmed')
             ORDER BY a.appointment_date ASC`,
            [customerId]
        );

        const [past]=await pool.query(
            `SELECT a.Id,a.appointment_date,a.appointment_time,a.type,a.status
             FROM appointments a
             WHERE a.customer_id=? AND a.status IN ('completed','cancelled')
             ORDER BY a.appointment_date DESC LIMIT 10`,
            [customerId]
        );

        return NextResponse.json({upcoming,past},{headers:corsHeaders});
    }catch(err){
        console.error("Client appointments error:",err);
        return NextResponse.json(
            {error:"Failed to load appointments."},
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

        const {type,appointmentDate,appointmentTime}=await request.json();
        if(!type||!appointmentDate||!appointmentTime){
            return NextResponse.json(
                {error:"type, appointmentDate, and appointmentTime are required."},
                {status:400,headers:corsHeaders}
            );
        }

        const [result]=await pool.query(
            "INSERT INTO appointments(customer_id,appointment_date,appointment_time,type,status) VALUES(?,?,?,?,'requested')",
            [customerId,appointmentDate,appointmentTime,type]
        );

        return NextResponse.json(
            {message:"Appointment requested.",id:result.insertId},
            {status:201,headers:corsHeaders}
        );
    }catch(err){
        console.error("Request appointment error:",err);
        return NextResponse.json(
            {error:"Failed to request appointment."},
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

        // support both cancel (status) and reschedule (date+time)
        const body=await request.json();
        const {id,status,appointment_date,appointment_time}=body;
        if(!id){
            return NextResponse.json(
                {error:"id is required."},
                {status:400,headers:corsHeaders}
            );
        }

        if(status){
            // cancel or other status change
            await pool.query("UPDATE appointments SET status=? WHERE Id=?",[status,id]);
        } else if(appointment_date && appointment_time){
            // reschedule - update date and time, reset to requested
            await pool.query(
                "UPDATE appointments SET appointment_date=?,appointment_time=?,status='requested' WHERE Id=?",
                [appointment_date,appointment_time,id]
            );
        } else {
            return NextResponse.json(
                {error:"Provide status OR appointment_date+appointment_time."},
                {status:400,headers:corsHeaders}
            );
        }

        return NextResponse.json({message:"Appointment updated."},{headers:corsHeaders});
    }catch(err){
        console.error("Update appointment error:",err);
        return NextResponse.json(
            {error:"Failed to update appointment."},
            {status:500,headers:corsHeaders}
        );
    }
}

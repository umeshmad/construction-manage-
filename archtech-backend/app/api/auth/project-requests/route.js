import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCorsHeaders } from "@/lib/cors";
import { getSessionUser } from "@/lib/requireAuth";

export async function OPTIONS(request) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(origin) })
}

async function getServiceIdForCategory(category) {
  const [rows] = await pool.query(
    "SELECT Id FROM services WHERE category = ? ORDER BY Id LIMIT 1",
    [category]
  );
  return rows.length > 0 ? rows[0].Id : null;
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin)

  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser || sessionUser.role !== "customer") {
      return NextResponse.json(
        { error: "You must be logged in as a customer to submit a request." },
        { status: 401, headers: corsHeaders }
      );
    }

    const [customerRows] = await pool.query(
      "SELECT Id FROM customers WHERE user_id=?", [sessionUser.id]
    );

    if (customerRows.length === 0) {
      return NextResponse.json(
        { error: "No customer profile found for this account." },
        { status: 401, headers: corsHeaders }
      );
    }

    const customerId = customerRows[0].Id;

    const body = await request.json();
    const { category, title, location, description, estimatedBudget, preferredStartDate } = body

    if (!category || !title || !location || !description) {
      return NextResponse.json(
        { error: "Service type, title, location, and description are required." },
        { status: 400, headers: corsHeaders }
      );
    }

    const serviceId = await getServiceIdForCategory(category);
    if (!serviceId) {
      return NextResponse.json(
        { error: `No service found for category"${category}"` },
        { status: 401, headers: corsHeaders }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO project_requests(customer_id, service_id, title, description, estimated_budget, preferred_start_date, status)
            VALUES(?,?,?,?,?,?,'pending')`,
      [
        customerId,
        serviceId,
        title,
        description,
        estimatedBudget || null,
        preferredStartDate || null,
      ]
    );

    return NextResponse.json(
      {
        message: "Project request submitted successfully.",
        requestId: result.insertId
      },
      { status: 201, headers: corsHeaders }
    )
  } catch (err) {
    console.error("Create project request error:", err);
    return NextResponse.json(
      { error: "Failed to submit your project request." },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);


  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser || sessionUser.role !== "customer") {
      return NextResponse.json(
        { error: "You must be logged in as a customer to view this." },
        { status: 401, headers: corsHeaders }
      );
    }

    const [customerRows] = await pool.query(
      "SELECT Id FROM customers WHERE user_id = ?",
      [sessionUser.id]
    );
    if (customerRows.length === 0) {
      return NextResponse.json(
        { error: "No customer profile found for this account." },
        { status: 404, headers: corsHeaders }
      );
    }
    const customerId = customerRows[0].Id;

    const [rows] = await pool.query(
      `SELECT pr.Id, pr.title, pr.description, pr.estimated_budget, 
              pr.preferred_start_date, pr.status, pr.submitted_at, s.category
       FROM project_requests pr
       JOIN services s ON pr.service_id = s.Id
       WHERE pr.customer_id = ?
       ORDER BY pr.submitted_at DESC`,
      [customerId]
    );

    return NextResponse.json({ requests: rows }, { headers: corsHeaders });
  } catch (error) {
    console.error("Get project requests error:", error);
    return NextResponse.json(
      { error: "Failed to load your requests." },
      { status: 500, headers: corsHeaders }
    );
  }
}
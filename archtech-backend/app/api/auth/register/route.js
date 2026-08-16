import { NextResponse } from "next/server";
import pool from "@/lib/db";
import {hashPassword,createToken} from "@/lib/auth";

import { cookies } from "next/headers";
import { verifyToken } from "./auth";
 
// Returns { userId, email, role } from the JWT payload, or null.
export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
 
  if (!token) return null;
 
  const payload = verifyToken(token);
  return payload; // null if the token was invalid/expired
}
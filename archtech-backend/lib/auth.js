import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "archtech_pro_jwt_secret_key_2026_super_secure";
const JWT_EXPIRES_IN = "7d";


export async function hashPassword(plainPassword) {
    const saltRounds=10
    return bcrypt.hash(plainPassword,saltRounds);
}

export async function verifyPassword(plainPassword,hashPassword) {
    return bcrypt.compare(plainPassword,hashPassword)
}

export function createToken(payload){
    return jwt.sign(payload,JWT_SECRET,{ expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token){
    try{
        return jwt.verify(token,JWT_SECRET)
    }catch(err){
        return null;
    }
}
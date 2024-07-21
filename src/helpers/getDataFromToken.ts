import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken=(request:NextRequest)=>{
    try {
        const token=request.cookies.get("token")?.value||""
        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!)

        if(!decodedToken){
            return NextResponse.json({error:"Please login first"},{status:400})
        }
        return decodedToken.id

        
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}
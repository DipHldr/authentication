import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
 (()=>{connect()})() 

export const POST=async (request:NextRequest)=>{
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"invalid credentials"},{status:400});            
        }
        console.log("User exists")

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"invalid credentials"},{status:500});        
        }

        const tokenData={
            id:user._id,
            userName:user.userName,
            email:user.email
        }

        const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response=NextResponse.json({
            message:"Logged in successfully",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});        
    }
}
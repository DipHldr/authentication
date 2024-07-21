import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'
import {NextRequest,NextResponse} from 'next/server'
import {sendEmail} from '@/helpers/mailer'

 (()=>{connect()})() 

export const POST=async (request:NextRequest)=>{
    try {
        const reqBody=await request.json()
        const {userName,email,password}=reqBody
        //validation
        console.log(reqBody);
        const user=await User.findOne({email:email})
        if(user){
            return NextResponse.json({error:"user already exists"},{status:400});
        }
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)

        const newUser=new User({
            userName,
            email,
            password:hashedPassword
        });
        const savedUser=await newUser.save();
        console.log(savedUser);

        //send verification email

        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})
        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            data:savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}
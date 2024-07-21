import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
export const sendEmail=async ({email,emailType,userId}:any)=>{
    try {
     const hashedToken=await bcryptjs.hash(userId.toString(),10)
    if(emailType==='VERIFY'){
    await User.findByIdAndUpdate(userId,{
       $set: {
        verifyToken:hashedToken,
         verifyTokenExpiry:Date.now()+3600000
        }
    }
    )
}else if(emailType==='RESET'){
    await User.findByIdAndUpdate(userId,{
       $set: {
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+3600000
        }
    }
    )
}
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b84346d45ca836",//write it in .env file
      pass: "22590044815e09"//write it in .env file
    }
  }); 
          const mailOptions={
            from: 'chalbazzcharlie@gmail.com',
            to: email,
            subject:emailType==='VERIFY'?"Verify your Email":"Reset Your Password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to 
            ${emailType==="VERIFY"?"verify your email":"Reset your Password"}
            or copy and paste the link below in your browser
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }  
          const mailResponse=await transport.sendMail(mailOptions);
          return mailOptions;
    } catch (error:any) {
        throw new Error(error.message)
    }
}


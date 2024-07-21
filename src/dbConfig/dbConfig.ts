import mongoose from "mongoose";

export const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("mongoDb database connected!!")
       const connection= mongoose.connection
       connection.on('connected',()=>{
        console.log('MongoDb Connected')
       })

       connection.on('error',(err)=>{
        console.log('MongoDb connection Error '+err);
        process.exit()
       })
    } catch (error) {
        console.log("could not connect to db!!");
        console.log(error);
    }
}


import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import User from "../../../../../models/user";

export const GET = async (req , context) =>{

  const { email } = context.params;

  try {
    await connectDB();
      const result = await User.findOne({ email})
      if(!result){
        return new NextResponse("user not found", {status:422});
      }
      else{
        return new NextResponse(JSON.stringify(result), {status:200});
      }
    } 
   catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " + error}, {status:500});
  }
} 
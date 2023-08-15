import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import User from "../../../../../models/user";


export const PUT = async (req, context) => {

  const { email } = context.params;
  const { userEmail } = await req.json();

  try {
    await connectDB();
    const result = await User.findOne({ email })

    if (!result) {
      return new NextResponse("user not found", { status: 422 });
    }
    else {
      const deletConn = await User.findOneAndUpdate({email}, { $pull:{ connections: { email:userEmail }}})
      return new NextResponse(JSON.stringify(deletConn), { status: 200 });
    }
  }
  catch (error) {
    return NextResponse.json({ error: "500 Internal Server Error: " + error }, { status: 500 });
  }
} 
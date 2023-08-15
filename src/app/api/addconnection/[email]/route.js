import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import User from "../../../../../models/user";

export const PUT = async (req, context) => {

  const { email } = context.params;
  const { userCompany, userRole, userName, userEmail } = await req.json();

  try {
    await connectDB();
    const result = await User.findOne({ email })

    if (!result) {
      return new NextResponse("user not found", { status: 422 });
    }
    else {
      const newConn = await User.findOneAndUpdate({ email }, { $push: { connections: { role: userRole, name: userName, company: userCompany, email: userEmail } } });
      return new NextResponse(JSON.stringify(newConn), { status: 200 });
    }
  }
  catch (error) {
    return NextResponse.json({ error: "500 Internal Server Error: " + error }, { status: 500 });
  }
}


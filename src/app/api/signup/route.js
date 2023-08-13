import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import User from "../../../../models/user";
import argon2i from "argon2";

export const POST = async (req) => {
  const { fname,
    lname,
    email,
    mobile,
    password,
    skills,
    experiences,
    educations,
    certificates,
    about,
    professionalDetail } = await req.json();

  try {
    await connectDB();
    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json({ error: 'User already exists !' }, { status: 422});
    } else {
      const passHash = await argon2i.hash(password);
      const result = new User({ fname, lname, email, mobile, password:passHash, skills, experiences, educations, certificates, about, professionalDetail, name:`${fname} ${lname}` });
      const data = await result.save();

      if (data) {
        return new NextResponse('Sign up Success',{ status: 201});
      } else {
        return new NextResponse('Internal Server Error', { status: 500 });
      }
    }

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 })
  }
};
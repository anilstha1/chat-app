import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {username, password}: any = data;

    const user = await User.findOne({username});

    if (user) {
      return NextResponse.json({error: "User already exists"}, {status: 400});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save().catch((error: any) => {
      console.log(error);
    });
    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import {auth} from "@/auth";
import Gif from "@/models/gifModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const gifId = data.gif;
    console.log(data);

    const {user}: any = await auth();

    if (!user) {
      throw new Error("user not authenticated");
    }

    const gif = await Gif.findById(gifId);

    const userData = await User.findById(user.id);
    if (!userData) {
      throw new Error("user not authenticated");
    }

    userData.purchased_gifs.push(gif);
    const updatedUser = await userData.save();

    return NextResponse.json({
      message: "success",
      updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

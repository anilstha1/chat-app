import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import {auth} from "@/auth";

connect();

export async function GET(request: NextRequest) {
  try {
    const {user}: any = await auth();
    if (!user) {
      throw new Error("user not authenticated");
    }
    const userData = await User.findById(user.id);
    return NextResponse.json({
      userData,
    });
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

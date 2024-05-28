import {connect} from "@/dbConfig/dbConfig";
import Gif from "@/models/gifModel";
import {NextRequest, NextResponse} from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log("hello");
    const data = await Gif.find({});

    return NextResponse.json(
      {
        message: "Product added Successfull",
        data,
      },
      {status: 200}
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      {status: 500}
    );
  }
}

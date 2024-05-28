import {connect} from "@/dbConfig/dbConfig";
import Gif from "@/models/gifModel";
import {NextRequest, NextResponse} from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {name, url} = data;
    console.log(data);
    const newGif = await new Gif({name, url});
    const savedGif = await newGif.save();
    console.log(savedGif);

    return NextResponse.json(
      {
        message: "Product added Successfull",
        savedGif,
      },
      {status: 200}
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      {status: 500}
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    console.log("hello");
    const data = await Gif.find({});
    console.log(data);

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

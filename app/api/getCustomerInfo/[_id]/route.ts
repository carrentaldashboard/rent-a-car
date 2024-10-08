import connectDb from "@/app/models/connectDb";
import CustomerModel from "@/app/models/customer";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: any) {
  try {
    let { _id } = await params.params;
    await connectDb();
    const data = await CustomerModel.findOne({ _id: _id }).lean();
    return NextResponse.json({
      data,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}

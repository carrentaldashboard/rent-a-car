import connectDb from "@/app/models/connectDb";
import reservationModel from "@/app/models/reservation";
import VehicleModel from "@/app/models/vehicle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { createdBy } = await req.json();
    if (!createdBy) {
      return NextResponse.json(
        { error: "createdBy is required" },
        { status: 400 }
      );
    }
    await connectDb();
    const vehicleData = await VehicleModel.find({ createdBy })
      .sort({ _id: -1 })
      .lean();
    const reservationData = await reservationModel
      .find({ createdBy })
      .sort({ _id: -1 })
      .lean();
    return NextResponse.json({
      vehicleData,
      reservationData,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}

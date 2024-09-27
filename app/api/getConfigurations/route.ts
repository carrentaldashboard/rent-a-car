import connectDb from "@/app/models/connectDb";
import ColorModel from "@/app/models/Color";
import MakeModel from "@/app/models/Make";
import ModelModel from "@/app/models/Model";
import FeatureModel from "@/app/models/Feature";
import TypeModel from "@/app/models/Type";
import CountryModel from "@/app/models/Country";
import CityModel from "@/app/models/City";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const color = await ColorModel.find().sort({ _id: -1 }).lean();
    const make = await MakeModel.find().sort({ _id: -1 }).lean();
    const model = await ModelModel.find().sort({ _id: -1 }).lean();
    const feature = await FeatureModel.find().sort({ _id: -1 }).lean();
    const type = await TypeModel.find().sort({ _id: -1 }).lean();
    const country = await CountryModel.find().sort({ _id: -1 }).lean();
    const city = await CityModel.find().sort({ _id: -1 }).lean();

    let wholeData = {
      color,
      make,
      model,
      feature,
      type,
      country,
      city
    };
    return NextResponse.json({
      wholeData,
    });
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}

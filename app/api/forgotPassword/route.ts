import connectDb from "@/app/models/connectDb";
import RegistrationModel from "@/app/models/registration";
import { generateTokenForDb } from "@/app/registration/auth";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let siteUrl = "http://localhost:3000/";
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Forget Password Request",
    text: `Click on this link to reset your password ${siteUrl}/forgotPassword`,
  };

  try {
    let { email } = await req.json();
    connectDb();
    let loginData = await RegistrationModel.findOne({
      email: email,
    });
    if (!loginData) {
      return NextResponse.json({
        error: "User not found with this email",
      });
    } else {
      let { token } = generateTokenForDb({ email });
      await transporter.sendMail(mailOptions);
      await RegistrationModel.updateOne(
        { email: "ahmadrazakhalid9.0@gmail.com" },
        { $set: { fptoken: token } }
      );
      return NextResponse.json({
        error: "Check your email for instructions to reset your password.",
      });
    }
  } catch (err) {
    console.log("err: ", err);
    return NextResponse.json({
      error: "Can't process your request at the moment",
    });
  }
}
"use client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import settings1 from "@/public/settings (10).svg";
import settings2 from "@/public/settings (7).svg";
import settings3 from "@/public/settings (6).svg";
import settings9 from "@/public/settings (1).svg";
import settings10 from "@/public/settings (4).svg";
import settings12 from "@/public/settings (9).svg";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { setusernameR } from "../store/myProfile";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  async function logout() {
    try {
      await axios.post("/api/logOut");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      window.location.href = "/";
    }
  }

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] text-black w-[100%] md:w-[50%]">
            Settings
          </h3>
        </div>
        <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-[15px] mt-5">
          <div className="w-full h-fit">
            <h3 className="font-[400] text-[14px] xs:text-[16px] leading-[19px] text-black pb-">
              Search
            </h3>
            <div className="w-full h-fit flex justify-between items-center">
              <input
                className="px-2 w-[75%] md:w-[82%] h-[43px] flex justify-between items-center text-[14px] xs:text-[16px] bg-white rounded-xl border-2 leading-[19px] border-grey placeholder:placeholder-color"
                placeholder="Search..."
              ></input>
              <button className="w-[24%] md:w-[17%] px-3 h-[43px] rounded-[10px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] leading-[21px] text-center">
                Search
              </button>
            </div>
          </div>
          <div className="w-full h-fit flex flex-wrap justify-between  gap-2 md:gap-8 items-start mt-5 md:mt-8">
            <Link
              href={"Settings/MyProfile"}
              className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2"
            >
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings1.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[30px]">
                  My Profile
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
                  Manage your personal information and login credentials.
                </p>
              </div>
            </Link>
            <Link
              href={"Settings/Notification"}
              className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2"
            >
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings2.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[30px]">
                  Notification
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
                  Customize how you receive updates and reminders.{" "}
                </p>
              </div>
            </Link>
            <div
              // href={"Settings/General"}
              className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2"
            >
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings3.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[30px]">
                  General
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
                  Select your preferred language and Curruncy{" "}
                </p>
              </div>
            </div>
            <Link
              href={"Settings/Invoicing"}
              className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2"
            >
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings10.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[30px]">
                  Invoicing
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
                  Edit VAT & Taxes{" "}
                </p>
              </div>
            </Link>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings9.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[30px]">
                  Agreement
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
                  Edit agreement.{" "}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] py-3 md:py-0 h-fit md:h-[100px] flex justify-start gap-4 items-center px-2 md:px-5 bg-white rounded-[10px] border-grey border-2">
              <div className="w-[50px] h-[50px] bg-main-blue rounded-[10px] flex justify-center items-center">
                <img src={settings12.src} />
              </div>
              <div className="h-fit w-[80%]">
                <h3 className="font-[400] text-[18px] xs:text-[24px] leading-5 xs:leading-[30px]">
                  Contact Support
                </h3>
                <p className="font-[400] text-[12px] xs:text-[16px] leading-4 xs:leading-[20px]">
                  Contact customer support or IT helpdesk.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "../store/Global";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useMediaQuery } from "react-responsive";
import { TbTargetArrow } from "react-icons/tb";
import Logo from "@/public/CarRentalDashboard.svg";
import PaidIcon from "@mui/icons-material/Paid";

export default function AdminSidebar() {
  let global = useSelector((state: RootState) => state.Global);
  let companyProfile: any = useSelector(
    (state: RootState) => state.companyProfile
  );
  let pathName = usePathname();
  let [chevronState, setChevronState] = useState("");
  let [chevronStateClose, setChevronStateClose] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useEffect(() => {
    if (
      pathName === "/Users" ||
      pathName === "/UserInfo" ||
      pathName?.includes("/AddUser")
    ) {
      setChevronState("Users");
      setChevronStateClose("Users");
    } else if (pathName === "/Dashboard") {
      setChevronState("Dashboard");
      setChevronStateClose("Dashboard");
    } else if (pathName === "/Subscriptions") {
      setChevronState("Subscriptions");
      setChevronStateClose("Subscriptions");
    }
  }, [pathName]);

  let dispatch = useDispatch();

  return (
    <div
      className={`${
        global.sidebarShow ? "w-[250px] sm:w-[300px]" : "w-[70px]"
      } sidebar-height flex flex-col justify-start items-start border-r-[2px] fixed z-[100] dark:bg-dark1 bg-white xl:z-0 transitions`}
      onMouseEnter={() => dispatch(setSidebarShowR(true))}
      onMouseLeave={() =>
        dispatch(setSidebarShowR(global.sidebarShowTemp ? true : false))
      }
    >
      <div className="w-full h-[90px] dark:bg-dark1 bg-white flex justify-center border-b-[2px] transitions">
        <Link
          href={"/Dashboard"}
          className="w-full h-full flex justify-center items-center"
        >
          {companyProfile?.profilePic ? (
            <img
              src={Logo.src}
              className={`${
                global.sidebarShow ? "w-[172px] h-[50px]" : "w-[60px] h-[25px]"
              } mt-[30px `}
            />
          ) : null}
        </Link>
      </div>
      <div
        className={`w-full h-[calc(100vh-90px)] overflow-auto pt-7 ${
          global.sidebarShow ? "px-3 sm:px-3" : "px-1"
        } flex flex-col justify-start items-center gap-[2px] overflow-auto transitions`}
      >
        <Link
          href="/Dashboard"
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] ${
            chevronState === "Dashboard" && global.sidebarShow
              ? "bg-main-blue text-white font-[500]"
              : chevronStateClose === "Dashboard" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          }`}
        >
          <TbLayoutDashboardFilled
            className={`${global.sidebarShow ? "" : "fixed"} text-[24px]`}
          />
          <span className="">{global.sidebarShow ? "Dashboard" : null}</span>
        </Link>
        <div
          className={`w-full h-[49px] font-[500] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
            global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white  ${
            chevronState === "Users" && global.sidebarShow
              ? "text-main-blue font-[600] hover:font-[500]"
              : chevronStateClose === "Users" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          } rounded-[10px]`}
          onClick={() =>
            setChevronState(chevronState === "Users" ? "" : "Users")
          }
        >
          <div className="w-fit flex justify-start items-center gap-2">
            <FaUsers
              className={`${
                global.sidebarShow ? "ml-[1px]" : "ml-[-11px] fixed"
              } text-[22px]`}
            />
            {global.sidebarShow ? "Users" : null}
          </div>
          {global.sidebarShow ? (
            <div className="cursor-pointer">
              {chevronState === "Users" ? (
                <GoTriangleUp className="float-right me-5" />
              ) : (
                <GoTriangleDown className="float-right me-5" />
              )}
            </div>
          ) : null}
        </div>
        {chevronState === "Users" && global.sidebarShow ? (
          <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
            <div className="flex justify-start items-center w-full">
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-full bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[27px]"></div>
              </div>
              <Link
                href="/Users"
                className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover ${
                  pathName === "/Users" || pathName === "/UserInfo"
                    ? "bg-main-blue text-white"
                    : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "All Users" : null}
              </Link>{" "}
            </div>
            <Link
              href="/AddUser/AddNew"
              className="flex justify-start items-center w-full"
            >
              <div className="relative w-[20%] h-full">
                <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
                <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[45.2%] rounded-full top-[22.5px]"></div>
              </div>
              <div
                className={`w-[80%] h-[37px] my-[6px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
                  global.sidebarShow
                    ? "justify-start ps-5"
                    : "justify-center px-0"
                } bg-main-blue-hover  ${
                  pathName.includes("/AddUser") ? "bg-main-blue text-white" : ""
                } hover:text-white rounded-[10px]`}
              >
                {global.sidebarShow ? "Add New User" : null}
              </div>{" "}
            </Link>
          </div>
        ) : null}
        <Link
          href="/Subscriptions"
          className={`w-full h-[49px] font-[400] text-[14px] sm:text-[18px] leading-[27px] flex items-center gap-2 ${
            global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
          } bg-main-blue-hover hover:text-white rounded-[10px] ${
            chevronState === "Subscriptions" && global.sidebarShow
              ? "bg-main-blue text-white font-[500]"
              : chevronStateClose === "Subscriptions" && !global.sidebarShow
              ? "text-white bg-main-blue"
              : ""
          }`}
        >
          <PaidIcon
            className={`${global.sidebarShow ? "" : "fixed"} text-[24px]`}
          />
          <span className="">
            {global.sidebarShow ? "Subscriptions" : null}
          </span>
        </Link>
      </div>
    </div>
  );
}
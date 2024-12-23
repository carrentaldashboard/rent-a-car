"use client";
import React from "react";
import Link from "next/link";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { FaCar, FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "../store/Global";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { FaUserTie } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { RiSettings4Fill } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

export default function UserSidebar() {
  let global = useSelector((state: RootState) => state.Global);
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
    if (pathName?.includes("Customer")) {
      setChevronState("Customers");
      setChevronStateClose("Customers");
    } else if (pathName?.includes("Chauffeur")) {
      setChevronState("Chauffeurs");
      setChevronStateClose("Chauffeurs");
    } else if (
      pathName?.includes("Vehicle") ||
      pathName?.includes("Configuration")
    ) {
      setChevronState("Vehicles");
      setChevronStateClose("Vehicles");
    } else if (pathName?.includes("Reservations")) {
      setChevronState("Reservations");
      setChevronStateClose("Reservations");
    } else if (pathName?.includes("Settings")) {
      setChevronState("Settings");
      setChevronStateClose("Settings");
    } else if (pathName === "/Dashboard") {
      setChevronState("Dashboard");
      setChevronStateClose("Dashboard");
    } else if (pathName === "/Report") {
      setChevronState("Report");
      setChevronStateClose("Report");
    }
  }, [pathName]);

  let dispatch = useDispatch();

  return (
    <div
      className={`w-full h-[calc(100vh-90px)] overflow-auto pt-7 ${
        global.sidebarShow ? "px-3 sm:px-3" : "px-1"
      } flex flex-col justify-start items-center gap-[2px] overflow-auto transitions`}
    >
      <Link
        href="/Dashboard"
        className={`w-full h-[49px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
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
        <span>{global.sidebarShow ? "Dashboard" : null}</span>
      </Link>

      <div
        className={`w-full h-[49px] font-[500] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
          global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
        } bg-main-blue-hover hover:text-white  ${
          chevronState === "Reservations" && global.sidebarShow
            ? "text-main-blue font-[600] hover:font-[500]"
            : chevronStateClose === "Reservations" && !global.sidebarShow
            ? "text-white bg-main-blue"
            : ""
        } rounded-[10px]`}
        onClick={() =>
          setChevronState(chevronState === "Reservations" ? "" : "Reservations")
        }
      >
        <div className="w-fit flex justify-start items-center gap-2">
          <FaListCheck
            className={`text-[20px] ${
              global.sidebarShow ? "ml-[1.7px]" : "ml-[-11px] fixed"
            }`}
          />

          {global.sidebarShow ? "Reservations" : null}
        </div>
        {global.sidebarShow ? (
          <div className="cursor-pointer">
            {chevronState === "Reservations" ? (
              <GoTriangleUp
                className="float-right me-5"
                onClick={() => setChevronState("")}
              />
            ) : (
              <GoTriangleDown
                className="float-right me-5"
                onClick={() => setChevronState("Reservations")}
              />
            )}
          </div>
        ) : null}
      </div>
      {chevronState === "Reservations" && global.sidebarShow ? (
        <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
          <div className="flex justify-start items-center w-full">
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-full bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[27px]"></div>
            </div>
            <Link
              href="/Reservations"
              className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover ${
                pathName === "/Reservations" ||
                pathName?.includes("ReservationsInfo")
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "All Reservations" : null}
            </Link>{" "}
          </div>
          <Link
            href="/AddReservations/AddNew"
            className="flex justify-start items-center w-full"
          >
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[22.5px]"></div>
            </div>
            <div
              className={`w-[80%] h-[37px] my-[6px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover  ${
                pathName === "/AddReservations/AddNew"
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "New Reservation" : null}
            </div>{" "}
          </Link>
        </div>
      ) : null}

      <div
        className={`w-full h-[49px] font-[500] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
          global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
        } bg-main-blue-hover hover:text-white  ${
          chevronState === "Customers" && global.sidebarShow
            ? "text-main-blue font-[600] hover:font-[500]"
            : chevronStateClose === "Customers" && !global.sidebarShow
            ? "text-white bg-main-blue"
            : ""
        } rounded-[10px]`}
        onClick={() =>
          setChevronState(chevronState === "Customers" ? "" : "Customers")
        }
      >
        <div className="w-fit flex justify-start items-center gap-2">
          <FaUsers
            className={`${
              global.sidebarShow ? "ml-[1px]" : "ml-[-11px] fixed"
            } text-[22px]`}
          />
          {global.sidebarShow ? "Customers" : null}
        </div>
        {global.sidebarShow ? (
          <div className="cursor-pointer">
            {chevronState === "Customers" ? (
              <GoTriangleUp className="float-right me-5" />
            ) : (
              <GoTriangleDown className="float-right me-5" />
            )}
          </div>
        ) : null}
      </div>
      {chevronState === "Customers" && global.sidebarShow ? (
        <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
          <div className="flex justify-start items-center w-full">
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-full bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[27px]"></div>
            </div>
            <Link
              href="/Customers"
              className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover ${
                pathName === "/Customers" || pathName === "/CustomerInfo"
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "All Customers" : null}
            </Link>{" "}
          </div>
          <Link
            href="/AddCustomer/AddNew"
            className="flex justify-start items-center w-full"
          >
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[22.5px]"></div>
            </div>
            <div
              className={`w-[80%] h-[37px] my-[6px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover  ${
                pathName?.includes("AddCustomer")
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "New Customer" : null}
            </div>{" "}
          </Link>
        </div>
      ) : null}
      <div
        className={`w-full h-[49px] font-[500] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
          global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
        } bg-main-blue-hover hover:text-white  ${
          chevronState === "Chauffeurs" && global.sidebarShow
            ? "text-main-blue font-[600] hover:font-[500]"
            : chevronStateClose === "Chauffeurs" && !global.sidebarShow
            ? "text-white bg-main-blue"
            : ""
        } rounded-[10px]`}
        onClick={() =>
          setChevronState(chevronState === "Chauffeurs" ? "" : "Chauffeurs")
        }
      >
        <div className="w-fit flex justify-start items-center gap-2">
          <FaUserTie
            className={`text-[16px] ${
              global.sidebarShow ? "ml-[2px]" : "ml-[-11px] fixed"
            } text-[20px]`}
          />
          {global.sidebarShow ? "Chauffeurs" : null}
        </div>
        {global.sidebarShow ? (
          <div className="cursor-pointer">
            {chevronState === "Chauffeurs" ? (
              <GoTriangleUp
                className="float-right me-5"
                onClick={() => setChevronState("")}
              />
            ) : (
              <GoTriangleDown
                className="float-right me-5"
                onClick={() => setChevronState("Chauffeurs")}
              />
            )}
          </div>
        ) : null}
      </div>
      {chevronState === "Chauffeurs" && global.sidebarShow ? (
        <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
          <div className="flex justify-start items-center w-full">
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-full bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[27px]"></div>
            </div>
            <Link
              href="/Chauffeurs"
              className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover ${
                pathName === "/Chauffeurs" ||
                pathName?.includes("ChauffeursInfo")
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "All Chauffeurs" : null}
            </Link>{" "}
          </div>
          <Link
            href="/AddChauffeur/AddNew"
            className="flex justify-start items-center w-full"
          >
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[22.5px]"></div>
            </div>
            <div
              className={`w-[80%] h-[37px] my-[6px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover  ${
                pathName === "/AddChauffeur/AddNew"
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "New Chauffeur" : null}
            </div>{" "}
          </Link>
        </div>
      ) : null}
      <div
        className={`w-full h-[49px] font-[500] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 z-10 cursor-pointer ${
          global.sidebarShow ? "justify-between ps-5" : "justify-center px-0"
        } bg-main-blue-hover hover:text-white  ${
          chevronState === "Vehicles" && global.sidebarShow
            ? "text-main-blue font-[600] hover:font-[500]"
            : chevronStateClose === "Vehicles" && !global.sidebarShow
            ? "text-white bg-main-blue"
            : ""
        } rounded-[10px]`}
        onClick={() =>
          setChevronState(chevronState === "Vehicles" ? "" : "Vehicles")
        }
      >
        <div className="w-fit flex justify-start items-center gap-2">
          <FaCar
            className={`${
              global.sidebarShow ? "ml-[1px]" : "ml-[-12px] fixed"
            } text-[22px]`}
          />
          {global.sidebarShow ? "Vehicles" : null}
        </div>
        {global.sidebarShow ? (
          <div className="cursor-pointer">
            {chevronState === "Vehicles" ? (
              <GoTriangleUp
                className="float-right me-5"
                onClick={() => setChevronState("")}
              />
            ) : (
              <GoTriangleDown
                className="float-right me-5"
                onClick={() => setChevronState("Vehicles")}
              />
            )}
          </div>
        ) : null}
      </div>
      {chevronState === "Vehicles" && global.sidebarShow ? (
        <div className="w-full h-fit -mt-[9px]  flex flex-col justify-start items-start z-0">
          <div className="flex justify-start items-center w-full">
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-full bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[27px]"></div>
            </div>
            <Link
              href="/Vehicles"
              className={`w-[80%] h-[37px] mb-[6px] mt-[12px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover ${
                pathName === "/Vehicles" || pathName?.includes("VehicleInfo")
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "All Vehicles" : null}
            </Link>{" "}
          </div>
          <Link
            href="/AddVehicle/AddNew"
            className="flex justify-start items-center w-full"
          >
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-full bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[22.5px]"></div>
            </div>
            <div
              className={`w-[80%] h-[37px] my-[6px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover  ${
                pathName === "/AddVehicle/AddNew"
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "New Vehicle" : null}
            </div>{" "}
          </Link>
          <Link
            href="/Configuration"
            className="flex justify-start items-center w-full"
          >
            <div className="relative w-[20%] h-full">
              <div className="absolute w-[2px] h-[50%] bg-grey left-7"></div>
              <div className="absolute w-[8px] h-[8px] bg-grey left-[55%] sm:left-[55%] rounded-full top-[22.5px]"></div>
            </div>
            <div
              className={`w-[80%] h-[37px] my-[6px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
                global.sidebarShow
                  ? "justify-start ps-5"
                  : "justify-center px-0"
              } bg-main-blue-hover ${
                pathName?.includes("Configuration")
                  ? "bg-main-blue text-white"
                  : ""
              } hover:text-white rounded-[10px]`}
            >
              {global.sidebarShow ? "Configuration" : null}
            </div>
          </Link>
        </div>
      ) : null}
      <Link
        href="/Report"
        className={`w-full h-[49px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
          global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
        } bg-main-blue-hover hover:text-white rounded-[10px] ${
          chevronState === "Report" && global.sidebarShow
            ? "bg-main-blue text-white font-[500]"
            : chevronStateClose === "Report" && !global.sidebarShow
            ? "text-white bg-main-blue"
            : ""
        }`}
      >
        <TbTargetArrow
          className={`${global.sidebarShow ? "" : "fixed"} text-[24px]`}
        />
        <span>{global.sidebarShow ? "Report" : null}</span>
      </Link>
      <Link
        href="/Settings"
        className={`w-full h-[49px] font-[400] text-[16px] sm:text-[16px] leading-[27px] flex items-center gap-2 ${
          global.sidebarShow ? "justify-start ps-5" : "justify-center px-0"
        } bg-main-blue-hover hover:text-white rounded-[10px] ${
          chevronState === "Settings" && global.sidebarShow
            ? "bg-main-blue text-white font-[500]"
            : chevronStateClose === "Settings" && !global.sidebarShow
            ? "text-white bg-main-blue"
            : ""
        }`}
      >
        <RiSettings4Fill
          className={`${global.sidebarShow ? "" : "fixed"} text-[24px]`}
        />
        <span>{global.sidebarShow ? "Settings" : null}</span>
      </Link>
    </div>
  );
}

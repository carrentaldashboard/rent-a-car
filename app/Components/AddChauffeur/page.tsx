"use client";
import { RootState } from "@/app/store";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import Vehicles from "../Vehicles";
import { useSelector } from "react-redux";
import ChauffeurForms from "../ChauffeurForms/page";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";

export default function AddChauffeur() {
  let global = useSelector((state: RootState) => state.Global);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
    let dispatch = useDispatch();
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  return (
    // <div className="w-full">
    //   <div className="flex justify-start items-start relative flex-wrap">
    //     <Sidebar />
    //     <Nav />
        <div
          className={`${
            global.sidebarShow ? "nav-width" : "nav-closed-width"
          } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions`}
        >
          <ChauffeurForms />
        </div>
    //   {/* </div>
    // </div> */}
  );
}

"use client";
import React from "react";
import arrows from "@/public/arrows.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { useEffect, useState } from "react";
import d1 from "@/public/ad (1).svg";
import d2 from "@/public/ad (2).svg";
import d3 from "@/public/ad (3).svg";
import axios from "axios";
import { TextLoader } from "../Components/Loader";

import { FaEllipsisH } from "react-icons/fa";
import { PaginationComponent } from "../Components/functions/Pagination";
import { sort } from "../Components/functions/sortFunction";
import Image from "next/image";
import { useFetchData } from "../Components/functions/apiCalling";
import RevenueChart from "../Components/functions/Graphs";

export default function AdminDashboard() {
  const data: any = [
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
    {
      data: {
        name: "John Smith",
        username: "username",
        email: "example@email.com",
        companyDate: "Company name",
        expiryDate: "dd/mm/yyyy",
      },
    },
  ];
  const global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const dispatch = useDispatch();
  const [sortedData, setSortedData] = useState<any>(data);
  const [sortOrder, setSortOrder] = useState<{
    [key: string]: "asc" | "desc";
  }>({});
  useEffect(() => {
    setSortedData(data);
  }, []);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const itemsPerPage = 12;
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [vehicleLoading, setvehicleLoading] = useState<any>(true);
  const [VehiclesData, setVehiclesData] = useState<any[]>([]);
  const [reservationLoading, setreservationLoading] = useState<any>(true);
  const [reservationsData, setreservationsData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);

  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "vehicle",
    createdBy: myProfile._id,
    setData: setVehiclesData,
    setLoading: setvehicleLoading,
  });

  const rentOutVehicles = VehiclesData.filter(
    (item: any) => item.rentOut === true
  );

  useEffect(() => {
    async function getData() {
      try {
        setreservationLoading(true);
        const result = await axios.post("/api/getUser", {
          createdBy: myProfile._id,
        });
        setreservationsData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setreservationLoading(false);
      }
    }
    if (myProfile._id) getData();
  }, [global.vehicleDataReloader, myProfile._id]);

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="h-[44px] w-[100%] gap-y-3 sm:gap-y-0 flex flex-wrap justify-between md:justify-start items-center">
          <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            Admin Dashboard
          </span>
        </div>
        <div className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-11 flex flex-col justify-start items-start gap-5 mt-5">
          <div className="w-[100%] flex justify-start items-start flex-col">
            <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
              Users Details
            </span>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 py-7 px-6 rounded-[10px] border-2 border-grey dark:bg-dark2 bg-light-grey relative">
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d1.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!reservationLoading ? (
                      reservationsData?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Total Users{" "}
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d2.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? (
                      reservationsData?.length
                    ) : (
                      <TextLoader />
                    )}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Active Users
                  </div>
                </div>
              </div>
              <div className="w-[290px] h-[100px] flex justify-start flex-wrap items-center gap-x-[5%] gap-y-[5%] ps-4 rounded-[10px] border-2 border-grey dark:bg-dark1 bg-white relative">
                <div className="w-[65px] h-[65px] bg-main-blue rounded-[10px] flex justify-center items-center">
                  <Image src={d3.src} alt="" width={40} height={40} />
                </div>
                <div>
                  <div className="font-[400] text-[15px] sm:text-[26px] leading-[18px] sm:leading-[39px] h-[39px]">
                    {!vehicleLoading ? rentOutVehicles?.length : <TextLoader />}
                  </div>
                  <div className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[27px]">
                    Expired Users{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex justify-start items-start flex-col">
            <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px] mt-5">
              Revenue Summary
            </span>
            <div className="w-full h-fit flex justify-start flex-wrap items-start gap-x-3 gap-y-3 rounded-[10px] dark:bg-dark2 bg-light-grey relative">
              <RevenueChart/>
            </div>
          </div>
          <div className="w-full h-fit flex justify-between items-start">
            <div className="h-fit flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-6 py-6">
              <div className="w-full flex flex-col justify-start items-start h-fit">
                <h1 className="font-[400] text-[18px] xs:text-[24px] leading-2 xs:leading-[20px]">
                  Near To Expire{" "}
                </h1>
                <div className="w-full h-fit mt-2">
                  <div className="w-full h-fit overflow-auto rounded-[10px] border-2 border-grey relative">
                    <div className="w-[900px] 1200:w-full h-fit flex flex-col justify-start items-start dark:bg-dark2 bg-light-grey overflow-hidden mt-0 leading-[17px]">
                      <div className="w-full h-[43px] flex justify-between items-center font-[600] text-[12px] sm:text-[14px] rounded-t-[10px] text-center border-b-2 border-grey">
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[16%] 1 ps-5 cursor-pointer"
                          onClick={() =>
                            sort(
                              "make",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Name{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[16%] 2 cursor-pointer"
                          onClick={() =>
                            sort(
                              "registration",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Username{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[20%] 3 cursor-pointer"
                          onClick={() =>
                            sort(
                              "year",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Email{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[18%] 4 cursor-pointer"
                          onClick={() =>
                            sort(
                              "type",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Company{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div
                          className="text-start pe-3 flex justify-between items-center w-[16%] 6 cursor-pointer"
                          onClick={() =>
                            sort(
                              "color",
                              currentSortKey,
                              sortOrder,
                              sortedData,
                              setSortedData,
                              setSortOrder,
                              setCurrentSortKey
                            )
                          }
                        >
                          Expiry Date{" "}
                          <Image
                            alt=""
                            width={10}
                            height={10}
                            src={arrows.src}
                            className="cursor-pointer hover:ring-8 rounded-full hover:bg-gray-200 ring-gray-200"
                          />
                        </div>
                        <div className="text-center flex justify-center items-center w-[10%] pe-5 5">
                          Actions{" "}
                        </div>
                      </div>
                      {paginatedData?.length < 1 ? (
                        <span className="p-3">No Vehicles found.</span>
                      ) : (
                        paginatedData.map((item: any, index: number) => (
                          <div key={index} className="w-full">
                            <div
                              className={`w-full h-[43px] flex justify-between items-center font-[400] text-[12px] sm:text-[14px] text-center capitalize dark:bg-dark1 bg-white border-b-2 border-grey`}
                            >
                              <div className="text-start pe-3 break-words w-[16%] 1 ps-5">
                                {item?.data?.name}
                              </div>
                              <div className="text-start pe-3 break-words w-[16%] 2">
                                {item?.data?.username}
                              </div>
                              <div className="text-start pe-3 break-words w-[20%] 3">
                                {item?.data?.email}
                              </div>
                              <div className="text-start pe-3 break-words w-[18%] 4">
                                {item?.data?.companyDate}
                              </div>
                              <div className="text-start pe-3 break-words w-[16%] 6">
                                {item?.data?.expiryDate}
                              </div>
                              <div
                                className="flex justify-center items-center w-[10%] pe-5 5 h-full"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                }}
                              >
                                <FaEllipsisH className="text-main-blue hover:scale-[1.3] cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="w-full h-[32px] mt-10 flex justify-between items-center">
                    <div className="font-[400] text-[12px] sm:text-[14px] leading-[17px] text-[#878787]">
                      Showing{" "}
                      {paginatedData?.length
                        ? (page - 1) * itemsPerPage + 1
                        : 0}{" "}
                      - {Math.min(page * itemsPerPage, data?.length)} of{" "}
                      {data?.length} data
                    </div>
                    <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
                      <PaginationComponent
                        totalPages={totalPages}
                        page={page}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

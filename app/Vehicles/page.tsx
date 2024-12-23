"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import { GoTriangleDown } from "react-icons/go";
import ListView from "./ListView";
import GridView from "./GridView";
import { HiViewGrid } from "react-icons/hi";
import { FaList } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MediumLoader } from "../Components/Loader";
import {
  renameKeys,
  useHandleExport,
} from "../Components/functions/exportFunction";
import SearchEmpty from "../Components/functions/SearchEmpty";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useFetchData } from "../Components/functions/apiCalling";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [gridView, setGridView] = useState(false);
  const [loading, setLoading] = useState<any>(true);
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);

  const [vehiclesData, setVehiclesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [status, setStatus] = useState<any>("");
  const [advanceFilters, setAdvanceFilters] = useState<any>([
    {
      key: "year",
      keyValue: "",
    },
    {
      key: "type",
      keyValue: "",
    },
    {
      key: "city",
      keyValue: "",
    },
    {
      key: "color",
      keyValue: "",
    },
  ]);

  const router = useRouter();
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const handleExport = useHandleExport();

  useFetchData({
    apiName: "getSortedLeanData",
    modelName: "vehicle",
    createdBy: myProfile._id,
    setData: setVehiclesData,
    setFilteredData: setFilteredVehicles,
    setLoading: setLoading,
  });

  useEffect(() => {
    filterVehicles();
  }, [searchQuery, vehiclesData]);

  function filterVehicles() {
    if (!searchQuery) {
      setFilteredVehicles(vehiclesData);
      return;
    }

    const lowercasedQuery = searchQuery?.toLowerCase();
    const filtered = vehiclesData.filter((vehicle) => {
      const { data } = vehicle;
      const { registration, city, make, model } = data;

      const carName = `${make} ${model}`?.toLowerCase();
      return (
        registration?.toLowerCase()?.includes(lowercasedQuery) ||
        city?.toLowerCase()?.includes(lowercasedQuery) ||
        carName?.includes(lowercasedQuery)
      );
    });
    setFilteredVehicles(filtered);
  }

  function advanceFilterVehicles() {
    let filtered: any = vehiclesData;

    const lowercasedQuery = searchQuery?.toLowerCase();
    filtered = vehiclesData.filter((vehicle) => {
      const { data } = vehicle;
      const { registration, city, make, model } = data;

      const carName = `${make} ${model}`?.toLowerCase();
      return (
        registration?.toLowerCase()?.includes(lowercasedQuery) ||
        city?.toLowerCase()?.includes(lowercasedQuery) ||
        carName?.includes(lowercasedQuery)
      );
    });
    advanceFilters.forEach(({ key, keyValue }: any) => {
      if (keyValue) {
        const lowercasedQuery = keyValue?.toLowerCase();
        filtered = filtered.filter((vehicle: any) => {
          const keyValueInVehicle = vehicle.data[key]?.toLowerCase();
          return keyValueInVehicle?.includes(lowercasedQuery);
        });
      }
    });
    if (status === "On Trip") {
      filtered = filtered.filter((vehicle: any) => {
        return vehicle?.rentOut === true;
      });
    } else if (status === "In Active") {
      filtered = filtered.filter((vehicle: any) => {
        return vehicle?.active === false;
      });
    } else if (status === "Available") {
      filtered = filtered.filter((vehicle: any) => {
        return vehicle?.active === true && vehicle?.rentOut === false;
      });
    }

    setFilteredVehicles(filtered);
  }

  useEffect(() => {
    advanceFilterVehicles();
  }, [advanceFilters, status]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    setAdvanceFilters([
      {
        key: "year",
        keyValue: "",
      },
      {
        key: "type",
        keyValue: "",
      },
      {
        key: "city",
        keyValue: "",
      },
      {
        key: "color",
        keyValue: "",
      },
    ]);
  }

  const keyMap = {
    make: "Make",
    Category: "Category",
    model: "Model",
    type: "Type",
    year: "Year",
    registration: "Registration",
    color: "Color",
    colorName: "Color Name",
    fuelType: "Fuel Type",
    transmission: "Transmission",
    odometer: "Odometer",
    passengers: "Passengers",
    country: "Country",
    Ownership: "Ownership",
    Drivetrain: "Drivetrain",
    city: "City",
    postalCode: "PostalCode",
    lateHour: "Late Fee Per Hour",
    lateDay: "Late Fee Per Day",
    rentHour: "Vehicle Rent Per Hour",
    rentDay: "Vehicle Rent Per Day",
    rentWeek: "Vehicle Rent Per Week",
    rentMonth: "Vehicle Rent Per Month",
    mlFee: "Milage Fee",
    mlDay: "Milage Day",
    mlWeek: "Milage Week",
    mlMonth: "Milage Month",
    insNo: "Insurance No",
    insCompany: "Insurance Company",
    insStart: "Insurance Start",
    insEnd: "Insurance End",
    insPayable: "Insurance Payable",
    insRecurringPeriod: "Insurance Recurring_Period",
    insRecurringDate: "Insurance RecurringDate",
    insDeductible: "Insurance Deductible",
    insRemarks: "Insurance Remarks",
    fuelCapacity: "Fuel Capacity",
    engineVolume: "Engine Volume",
    vinNo: "Vin No",
    insImage: "Insurance Image",
    features: "Features",
    otherNote: "Other Note",
    damages: "Damages",
    carImages: "Car Images",
    thumbnailImage: "thumbnailImage",
    createdBy: "Created By",
    createdAt: "Created At",
    active: "Active",
  };

  const renamedArray = renameKeys(vehiclesData, keyMap);

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
            All Vehicles
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Vehicles"} className="hover:underline">
                Vehicles
              </Link>
              {" / "}
              All Vehicles
            </span>
          </span>

          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                router.push("/AddVehicle/AddNew");
              }}
            >
              Add New Vehicle
            </button>
          </div>
        </div>
        <div className="h-[44px] w-full flex justify-between gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey mt-4">
          <div className="h-[44px] w-fit flex justify-start gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
            <div className="w-[320px] h-fit flex justify-between items-center relative">
              <input
                className="pe-7 ps-7  w-[100%] h-[44px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-[5px] border-2 leading-[19px] border-grey placeholder:text-[#808080] truncate"
                placeholder="Search By Vehicle Name, Reg No, etc"
                onChange={handleSearchQueryChange}
                value={searchQuery}
              ></input>
              {searchQuery && (
                <SearchEmpty
                  classes={"right-2 text-[24px"}
                  setState={setSearchQuery}
                />
              )}
              <div className="absolute left-2 text-[#808080]">
                <CiSearch />
              </div>
            </div>
            <div className="w-[144px] h-fit">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
                  onChange={(e) => {
                    setAdvanceFilters((prevFilters: any) =>
                      prevFilters.map((filter: any) =>
                        filter.key === "type"
                          ? { ...filter, keyValue: e.target.value }
                          : filter
                      )
                    );
                  }}
                  value={
                    advanceFilters.find((filter: any) => filter.key === "type")
                      ?.keyValue || ""
                  }
                >
                  <option value="">Body Type</option>
                  {Array.from(
                    new Set(vehiclesData.map((item) => item.data.type))
                  ).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-[5px]] flex justify-center items-center pointer-events-none">
                  <GoTriangleDown className="text-[18px]" />
                </div>
                <div className="absolute left-2 text-[#808080]">
                  <CiFilter />
                </div>
              </div>
            </div>
            <div className="w-[144px] xs:w-[48%] lg:w-[30%] 1400:w-[24%] h-fit">
              <div className="w-full h-fit flex justify-between items-center relative">
                <select
                  className="truncate pe-3 font-[400] text-[14px] xs:text-[16px] leading-[19px] ps-6 w-[100%] h-[44px] flex justify-between items-center dark:bg-dark1 bg-white rounded-[5px] border-2 border-grey "
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  value={status}
                >
                  <option value="">Status</option>
                  <option value={"In Active"}>In Active</option>
                  <option value={"Available"}>Available</option>
                  <option value={"On Trip"}>On Trip</option>
                </select>
                <div className="w-[30px] h-[35px] dark:bg-dark1 bg-white absolute right-1 rounded-[5px]] flex justify-center items-center pointer-events-none">
                  <GoTriangleDown className="text-[18px]" />
                </div>
                <div className="absolute left-2 text-[#808080]">
                  <CiFilter />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[44px] w-fit flex justify-end gap-2 items-center font-[400] text-[14px] sm:text-[18px] text-grey">
            <div className="w-fit h-fit flex justify-end items-end gap-2">
              <button
                className={`w-[44px] flex justify-center items-center h-[44px] rounded-[6px] ${
                  gridView
                    ? "bg-main-blue text-white"
                    : "dark:bg-dark2 bg-light-grey dark:text-white text-black border-[1px] border-grey"
                } text-[20px]`}
                onClick={() => setGridView(true)}
              >
                <HiViewGrid />
              </button>
              <button
                className={`w-[44px] flex justify-center items-center h-[44px] rounded-[6px] ${
                  !gridView
                    ? "bg-main-blue text-white"
                    : "dark:bg-dark2 bg-light-grey dark:text-white text-black border-[1px] border-grey"
                } text-[20px]`}
                onClick={() => setGridView(false)}
              >
                <FaList />
              </button>
            </div>
            <button
              className="hover:no-underline w-[112px] h-[44px] rounded-[6px] bg-main-blue text-white font-[500] text-[12px] md:text-[18px] flex justify-center items-center leading-[0px]"
              onClick={() => {
                handleExport(
                  renamedArray?.map((item: any) => {
                    const { vehicleId, thumbnailImage, ...rest } = item.data;
                    return rest;
                  })
                );
              }}
            >
              Export
            </button>
          </div>
        </div>

        <div className="w-full h-fit -mt-3">
          {loading ? (
            <MediumLoader />
          ) : gridView ? (
            <GridView data={filteredVehicles} />
          ) : (
            <ListView data={filteredVehicles} />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { RootState } from "@/app/store";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setSeverity, setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import ListView from "./ListView";
import { SmallLoader, MediumLoader } from "../../Components/Loader";
import { setVehicleDataReloader } from "@/app/store/Global";
import { HexColorPicker } from "react-colorful";
import Link from "next/link";
import ImportExportButtons from "@/app/Components/functions/ImportExportButtons";
import SearchEmpty from "@/app/Components/functions/SearchEmpty";
import { CiSearch } from "react-icons/ci";
import { useFetchData } from "@/app/Components/functions/apiCalling";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let myProfile: any = useSelector((state: RootState) => state.myProfile);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState<any>("");
  const [dataLoading, setDataLoading] = useState<any>(true);
  const [vehiclesData, setVehiclesData] = useState<any[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [popup, setPopup] = useState(false);
  const [Color, setColor] = useState("");
  const [ColorName, setColorName] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const handleClick = () => {
    setPopup(true);
  };

  useFetchData({
    modelName: "Color",
    createdBy: myProfile._id,
    setData: setVehiclesData,
    setFilteredData: setFilteredVehicles,
    setLoading: setDataLoading,
    apiName: "getSingleConfiguration",
    sortField: "ColorName",
  });

  async function save(action: string) {
    if (Color?.trim() === "" || ColorName?.trim() === "") {
      dispatch(setAlert("Please fill the input"));
      dispatch(setSeverity("error"));
      return;
    } else if (
      vehiclesData.find(
        (item) =>
          item.ColorName?.toLowerCase() === ColorName?.trim()?.toLowerCase()
      )
    ) {
      dispatch(setAlert("This Item Already Exists"));
      dispatch(setSeverity("error"));
      return;
    }

    if (!isValidColor(Color)) {
      alert("Invalid color");
      return;
    }

    try {
      setLoading(action);
await axios.post("/api/saveSingleConfiguration", {
  model: "Color", // Specify the model name
  data: {
    Color,
    ColorName,
    createdBy: myProfile._id,
  },
});

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Color Saved Successfully"));
      if (action === "close") {
        setPopup(false);
      }
      setColor("");
      setColorName("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading("");
    }
  }
  const isValidColor = (color: any) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };
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
      const { ColorName } = vehicle;

      return ColorName?.toLowerCase()?.includes(lowercasedQuery);
    });
    setFilteredVehicles(filtered);
  }
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
            Color
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              <Link href={"/Configuration"} className="hover:underline">
                Configuration
              </Link>
              {" / "}
              Color
            </span>
          </span>
          <div className="flex justify-end items-center w-[100%] md:w-[50%] h-[44px]">
            <button
              className="w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[5px] bg-main-dark-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                handleClick();
              }}
              disabled={dataLoading}
            >
              {dataLoading ? <SmallLoader /> : "Add New"}
            </button>
          </div>
        </div>

        <div className="w-full h-fit">
          <div className="w-full h-fit mt-4 flex justify-between items-center">
            <div className="w-[320px] h-fit flex justify-between items-center relative">
              <input
                className="pe-7 ps-7  w-[100%] h-[44px] flex justify-between items-center text-[14px] xs:text-[16px] dark:bg-dark1 bg-white rounded-[5px] border-2 leading-[19px] border-grey placeholder:text-[#808080] truncate"
                placeholder="Search By Color"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
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
            <ImportExportButtons data={vehiclesData} model={"Color"} />
          </div>
          <div className="w-full h-fit mt-2">
            {dataLoading ? (
              <MediumLoader />
            ) : (
              <ListView data={filteredVehicles} />
            )}
          </div>
          {popup ? (
            <div className="items-center w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-center sm:items-center z-[10]">
              <div className="w-[90%] sm:w-[800px] h-[430px] border-[1px] border-grey rounded-[10px] mt-0 flex flex-col justify-between items-end gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 fixed modal-position modal-animation">
                <div
                  className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                >
                  <label className="flex justify-start gap-1 items-start font-[600] text-[24px] leading-[17px]">
                    Add New Color{" "}
                    <FaAsterisk className="text-[8px] text-red-500" />
                  </label>
                </div>

                <div className="w-[100%] h-[430px] rounded-[10px] mt-0 flex justify-between items-end gap-y-5 dark:bg-dark1 bg-white z-[15]">
                  <div className="w-[300px] h-full flex justify-start items-center">
                    <HexColorPicker color={Color} onChange={setColor} />
                  </div>
                  <div className="h-full w-[90%] sm:color-inputs-width h-fi mt-0 flex flex-wrap justify-between items-end gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white z-[15]  px-1 xs:px-3 md:px-4">
                    <div className="w-full h-fit flex flex-col justify-between items-center relative gap-3">
                      <div className="w-full h-fit flex justify-between items-center relative">
                        <input
                          required={true}
                          type={"text"}
                          className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[54px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                          placeholder={`Color Name Here`}
                          onChange={(e) => {
                            setColorName(e.target.value);
                          }}
                          value={ColorName}
                        />
                      </div>
                      <div
                        className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
                      >
                        <div className="w-full h-fit flex justify-between items-center relative">
                          <div
                            className="w-[32px] h-[18px] rounded-[5px] absolute top-[50%] translate-y-[-50%] left-[8px] border-2 border-grey"
                            style={{
                              backgroundColor: isValidColor(Color)
                                ? Color
                                : "transparent",
                            }}
                          ></div>
                          <input
                            required={true}
                            type={"text"}
                            className="pe-10 font-[400] text-[16px] leading-[19px] ps-[45px] w-[100%] h-[54px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                            placeholder={`Color Code Here`}
                            onChange={(e) => {
                              setColor(e.target.value);
                            }}
                            value={Color}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-full flex justify-end gap-4 items-center pt-4`}
                    >
                      <button
                        className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-10"
                        onClick={() => {
                          setPopup(false);
                          setColor("");
                          setColorName("");
                        }}
                      >
                        <FaTimes />
                      </button>
                      <button
                        className="w-[200px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                        onClick={() => save("close")}
                        disabled={loading === "" ? false : true}
                      >
                        {loading === "close" ? <SmallLoader /> : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

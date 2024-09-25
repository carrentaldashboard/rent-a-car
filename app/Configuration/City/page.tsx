"use client";
import { RootState } from "@/app/store";
import shape from "@/public/ShapeBlack.svg";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebarShowR } from "@/app/store/Global";
import axios from "axios";
import ListView from "./ListView";
import { SmallLoader, MediumLoader } from "../../Components/Loader";
import { setVehicleDataReloader } from "@/app/store/Global";
import { CountryCity } from "@/app/Components/functions/CountryStateCity";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState<any>("");
  const [dataLoading, setDataLoading] = useState<any>(true);
  const [showError, setShowError] = useState(null);
  const [vehiclesData, setVehiclesData] = useState<any[]>([]);
  const [makeData, setMakeData] = useState<any[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const [popup, setPopup] = useState(false);
  const [city, setCity] = useState("");
  const [Make, setMake] = useState("");
  // const [CityReloader, setCityReloader] = useState(0);

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

  useEffect(() => {
    async function getData() {
      try {
        setDataLoading(true);
        const result = await axios.post("/api/getCity");
        const result2 = await axios.post("/api/getCountry");
        setMakeData(result2?.data?.data);

        if (result?.data?.data) {
          setVehiclesData(result.data.data);
        } else {
          setShowError(result?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDataLoading(false);
      }
    }
    getData();
  }, [global.vehicleDataReloader]);

  async function save(action: string) {
    if (city.trim() === "" || Make.trim() === "") {
      alert("Please fill the input");
      return;
    } else if (vehiclesData.find((item) => item.city === city.trim())) {
      alert("This Item Already Exists");
      return;
    }

    try {
      setLoading(action);
      let result: any = await axios.post(`/api/saveCity`, {
        country: Make,
        city: city,
      });
      console.log(result);
      // setCityReloader(CityReloader + 1);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      if (action === "close") {
        setPopup(false);
      }
      setCity("");
      setMake("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading("");
    }
  }
  let { countries, cities } = CountryCity(Make);
  console.log(Make);
  console.log(countries, cities);

  return (
    <div
      className={`${
        global.sidebarShow ? "nav-width" : "nav-closed-width"
      } absolute right-0 w-fit h-fit mt-[90px] pt-5 transitions dark:text-white text-black`}
    >
      <div
        className={`w-full h-fit flex flex-col justify-start items-start gap-[0px] md:gap-[20px] pe-[10px] md:pe-[50px] ps-[10px] md:ps-[40px] pb-10`}
      >
        <div className="w-[100%] gap-y-3 flex flex-wrap justify-between md:justify-start items-end">
          <h3 className="font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-5 md:leading-[38px] dark:text-white text-black w-[100%] md:w-[50%]">
            City
            <p className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[18px] leading-5 md:leading-[21px] dark:text-white text-black">
              Configuration / City
            </p>
          </h3>
          <div className="flex justify-start md:justify-end gap-3 items-end w-[100%] md:w-[50%]">
            <button
              className="w-fit px-3 md:px-6 py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[600] text-[12px] md:text-[18px] leading-[21px] text-center"
              onClick={() => {
                handleClick();
              }}
              disabled={dataLoading}
            >
              {dataLoading ? <SmallLoader /> : "Add New"}
            </button>
          </div>
        </div>

        <div className="w-full h-[73vh] relative">
          {dataLoading ? (
            <MediumLoader />
          ) : (
            <ListView data={vehiclesData} makeData={makeData} />
          )}

          {popup ? (
            <div className="w-full h-full bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-center sm:items-center z-[10] bg-red-40">
              <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 fixed modal-position">
                <div className="w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1">
                  <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                    Select Country
                    <FaAsterisk className="text-[6px] text-red-600" />
                  </label>
                  <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                    <select
                      className="pe-10 font-[400] text-[16px] leading-[19px] ps-1 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
                      required={true}
                      onChange={(e) => {
                        setMake(e.target.value);
                      }}
                      value={Make}
                    >
                      <option value={""}>Select</option>
                      {makeData?.map((item: any, key: number) => (
                        <option value={item?.country} key={key}>
                          {item?.country}
                        </option>
                      ))}
                    </select>
                    <div className="w-[30px] h-[35px] dark:bg-dark1 input-color absolute right-1 rounded-xl flex justify-center items-center pointer-events-none">
                      <img
                        src={shape.src}
                        className="w-[10.5px]  dark:filter dark:brightness-[0] dark:invert"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`w-[100%] h-fit bg-red-30 flex flex-col justify-start items-start gap-1`}
                >
                  <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                    {"Add New"}
                    <FaAsterisk className="text-[6px] text-red-600" />
                  </label>
                  <div className="w-full h-fit flex justify-between items-center relative overflow-hidde">
                    <select
                      required={true}
                      className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      value={city}
                    >
                      <option value="">Select</option>
                      {cities.map((item: any) => (
                        <option value={item.label}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  className={`w-full flex justify-end gap-4 items-center pt-4`}
                >
                  <button
                    className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                    onClick={() => {
                      setPopup(false);
                      setCity("");
                      setMake("");
                    }}
                  >
                    <FaTimes />
                  </button>
                  <button
                    className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                    onClick={() => save("close")}
                    disabled={loading === "" ? false : true}
                  >
                    {loading === "close" ? <SmallLoader /> : "Save and Close"}
                  </button>
                  <button
                    className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                    onClick={() => save("new")}
                    disabled={loading === "" ? false : true}
                  >
                    {loading === "new" ? <SmallLoader /> : "Save and New"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

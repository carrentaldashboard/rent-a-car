"use client";
import React from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setAlert, setSidebarShowR } from "@/app/store/Global";
import { useParams } from "next/navigation";
import { FormEvent, useState, useEffect, useRef, KeyboardEvent } from "react";
import Rental from "./Rental";
import Insurances from "./Insurances";
import Others from "./Others";
import Damages from "./Damages";
import Feature from "./Feature";
import Info from "./Info";
import axios from "axios";
import { LoaderOnSave, SmallLoader } from "../../Components/Loader";
import { useRouter } from "next/navigation";
import {
  resetState,
  setAllValues,
} from "@/app/store/Vehicle";
import { setConfigurations } from "@/app/store/Configurations";
import Link from "next/link";
import { resetting } from "@/app/store/Vehicle";

export default function Vehicles() {
  const params = useParams();
  const { vehicleUpdateAction } = params;
  const global = useSelector((state: RootState) => state.Global);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const [currentPage, setCurrentPage] = useState(0);
  const [goToPage, setGoToPage] = useState(0);
  const vehicle = useSelector((state: RootState) => state.Vehicle);
  const [loading, setLoading] = useState<any>(false);
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const router = useRouter();
  const formRef = useRef<any>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result: any = await axios.post(
          `/api/getVehicleInfo/${vehicleUpdateAction}`
        );
        if (result?.data?.data) {
          dispatch(setAllValues(result?.data?.data?.data));
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
        setDeleteTrigger(deleteTrigger + 1);
      }
    }
    if (vehicleUpdateAction !== "AddNew") {
      getData();
    }
    return () => {
      if (vehicleUpdateAction !== "AddNew") {
        dispatch(resetState());
      }
    };
  }, []);

  let handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(goToPage);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  async function saveData(action: string) {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < vehicle.carImages?.length; i++) {
        formData.append("files", vehicle.carImages[i]);
      }
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const formData4 = new FormData();
      for (let i = 0; i < vehicle.insImage?.length; i++) {
        formData4.append("files", vehicle.insImage[i]);
      }
      const res4 = await axios.post("/api/upload", formData4, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData2 = new FormData();
      formData2.append("length1", vehicle.damages?.length);

      for (let i = 0; i < vehicle.damages?.length; i++) {
        formData2.append("length2", vehicle.damages[i]?.files?.length);

        for (let j = 0; j < vehicle.damages[i]?.files?.length; j++) {
          formData2.append("files", vehicle.damages[i]?.files[j]);
        }
      }

      const res2 = await axios.post("/api/uploadNested", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let tempArray = vehicle.damages;
      for (let i = 0; i < vehicle.damages?.length; i++) {}

      const updatedObjects = tempArray.map((obj: any, index: any) => ({
        ...obj,
        files: res2?.data?.message[index].map((url: any) => url),
      }));

      await axios.post(`/api/saveVehicle`, {
        vehicle: {
          ...vehicle,
          carImages: res?.data?.message,
          insImage: res4?.data?.message,
          damages: updatedObjects,
        },
        createdBy: myProfile._id,
      });
      dispatch(setAlert("Vehicle Saved Successfully"));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      if (action === "close") {
        router.push("/Vehicles");
      } else {
        setCurrentPage(0);
        dispatch(resetState());
      }
    }
  }
  async function updateData(action: string) {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < vehicle.carImages?.length; i++) {
        formData.append("files", vehicle.carImages[i]);
      }
      const res = await axios.post("/api/uploadWithCondition", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const formData4 = new FormData();
      for (let i = 0; i < vehicle.insImage?.length; i++) {
        formData4.append("files", vehicle.insImage[i]);
      }
      const res4 = await axios.post("/api/uploadWithCondition", formData4, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData2 = new FormData();
      formData2.append("length1", vehicle.damages?.length);

      for (let i = 0; i < vehicle.damages?.length; i++) {
        formData2.append("length2", vehicle.damages[i]?.files?.length);

        for (let j = 0; j < vehicle.damages[i]?.files?.length; j++) {
          formData2.append("files", vehicle.damages[i]?.files[j]);
        }
      }

      const res2 = await axios.post("/api/uploadNested", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let tempArray = vehicle.damages;
      for (let i = 0; i < vehicle.damages?.length; i++) {}

      const updatedObjects = tempArray.map((obj: any, index: any) => ({
        ...obj,
        files: res2?.data?.message[index].map((url: any) => url),
      }));

      await axios.post(`/api/updateVehicle/${vehicleUpdateAction}`, {
        ...vehicle,
        carImages: res?.data?.message,
        insImage: res4?.data?.message,
        damages: updatedObjects,
      });

      if (action === "close") {
        router.push("/Vehicles");
      }
      dispatch(setAlert("Vehicle Updated Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const submitButton = () => {
    if (formRef.current) {
      formRef.current?.click();
    }
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
        <div className="w-[100%]  flex justify-start items-end">
          <span className="flex flex-col justify-between font-[600] text-[16px] xs:text-[18px] md:text-[25px] leading-none dark:text-white text-black w-[100%] md:w-[50%] h-[44px]">
            {vehicleUpdateAction !== "AddNew"
              ? "Update Vehicle "
              : "Add New Vehicle"}
            <span className="text-grey font-[400] text-[12px] xs:text-[14px] md:text-[16px] leading-none">
              {" "}
              <Link href={"/Vehicles"} className="hover:underline">
                Vehicles
              </Link>
              {" / "}
              {vehicleUpdateAction !== "AddNew"
                ? "Update Vehicle"
                : "Add New Vehicle"}
            </span>
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown} // Add the event handler here
          className="w-full h-fit dark:bg-dark2 bg-light-grey rounded-xl border-2 border-grey py-5 md:py-10 px-1 xs:px-3 md:px-8 flex flex-col justify-start items-start relative mt-5"
        >
          <div className="w-full h-fit flex flex-col justify-start items-center">
            <div className="w-full h-[50px] flex justify-between items-center relative font-[500] text-[18px] md:text-[24px] count-button">
              <div className="w-[84%] h-[10px] flex justify-start items-center absolute top-[20px] left-[8%] border-[1px] border-grey dark:bg-dark1 bg-white z-[0]">
                <div
                  className={` h-full flex justify-start items-center bg-main-blue z-[0] transitions2 rounded-full`}
                  style={{ width: `${currentPage * 20}%` }}
                ></div>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(0);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] pt-[0.20rem] ${
                    currentPage >= 0
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  <span className="text-center -translate-x-[2px]">1</span>
                </button>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(1);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] pt-[0.20rem] ${
                    currentPage >= 1
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  2
                </button>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(2);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] pt-[0.20rem] ${
                    currentPage >= 2
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  }
                     flex justify-center items-center rounded-full z-[5]`}
                >
                  3
                </button>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(3);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] pt-[0.20rem] ${
                    currentPage >= 3
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  4
                </button>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(4);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] pt-[0.20rem] ${
                    currentPage >= 4
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  5
                </button>
              </div>
              <div className="w-[15%] h-[50px]  flex justify-center items-center z-[5]">
                <button
                  onClick={() => {
                    setGoToPage(5);
                    submitButton();
                  }}
                  className={`w-[30px] md:w-[60px] h-[30px] md:h-[60px] pt-[0.20rem] ${
                    currentPage >= 5
                      ? "transitions2 bg-main-blue text-white"
                      : "dark:bg-dark1 bg-white border-[1px] border-grey"
                  } flex justify-center items-center rounded-full z-[5]`}
                >
                  6
                </button>
              </div>
            </div>
            <div className="w-full h-[50px] flex justify-between items-center relative text-[10px] sm:text-[12px] md:text-[16px] leading-[14px] md:leading-[19px] text-shadow">
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 0 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Vehicle Information
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 1 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Features
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 2 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Insurance Info
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 3 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Rental Information
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 4 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Damages
              </div>
              <div
                className={`w-[15%] h-[50px]  flex justify-center text-center items-center ${
                  currentPage >= 5 ? "text-main-blue font-[600]" : " font-[400]"
                }`}
              >
                Others
              </div>
            </div>
          </div>

          {currentPage === 0 ? (
            <Info />
          ) : currentPage === 1 ? (
            <Feature />
          ) : currentPage === 2 ? (
            <Insurances />
          ) : currentPage === 3 ? (
            <Rental />
          ) : currentPage === 4 ? (
            <Damages />
          ) : currentPage === 5 ? (
            <Others />
          ) : null}

          <div
            className={`w-full h-fit md:h-[100px] pt-6 flex flex-wrap gap-y-2 justify-between items-center`}
          >
            <div className="w-[40%] flex justify-start item-center gap-1 md:gap-3">
              {currentPage !== 0 ? (
                <button
                  className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  Back
                </button>
              ) : null}
            </div>

            <div className="w-[60%] flex justify-end item-center gap-1 md:gap-3">
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    resetting(
                      currentPage === 0
                        ? [
                            "make",
                            "model",
                            "type",
                            "year",
                            "registration",
                            "color",
                            "fuelType",
                            "transmission",
                            "odometer",
                            "passengers",
                            "country",
                            "city",
                            "CarImage",
                            "thumbnailImage",
                            "engineVolume",
                            "vinNo",
                            "fuelCapacity",
                            "colorName",
                            "Category",
                            "Ownership",
                            "Drivetrain",
                          ]
                        : currentPage === 1
                        ? ["features"]
                        : currentPage === 2
                        ? [
                            "insNo",
                            "insCompany",
                            "insEnd",
                            "insStart",
                            "insPayable",
                            "insDeductible",
                            "insRecurringPeriod",
                            "insRecurringDate",
                            "insRemarks",
                            "insImage",
                          ]
                        : currentPage === 3
                        ? [
                            "rentHour",
                            "rentDay",
                            "rentWeek",
                            "rentMonth",
                            "mlDay",
                            "mlWeek",
                            "mlMonth",
                            "mlFee",
                            "lateHour",
                            "lateDay",
                          ]
                        : currentPage === 4
                        ? ["damages"]
                        : currentPage === 5
                        ? ["otherNote"]
                        : null
                    )
                  );
                }}
              >
                Reset
              </button>

              {currentPage === 5 ? (
                <>
                  {vehicleUpdateAction !== "AddNew" ? (
                    <>
                      {loading ? (
                        <LoaderOnSave />
                      ) : (
                        <div className="flex justify-start items-center gap-1 md:gap-3">
                          <button
                            className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                            disabled={loading}
                            onClick={() => {
                              updateData("close");
                            }}
                          >
                            {loading ? <SmallLoader /> : "Update and Close"}
                          </button>
                          <div />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {loading ? (
                        <LoaderOnSave />
                      ) : (
                        <div className="flex justify-start items-center gap-1 md:gap-3">
                          <button
                            className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                            disabled={loading}
                            onClick={() => {
                              saveData("close");
                            }}
                          >
                            {loading ? <SmallLoader /> : "Save and Close"}
                          </button>
                          <button
                            className={`px-2 md:px-0 w-fit md:w-[206px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center`}
                            disabled={loading}
                            onClick={() => {
                              saveData("new");
                            }}
                          >
                            {loading ? <SmallLoader /> : "Save and New"}
                          </button>
                          <div />
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="px-2 md:px-0 w-fit md:w-[240px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                    onClick={() => {
                      setGoToPage(currentPage + 1);
                      submitButton();
                    }}
                  >
                    Save and Continue
                  </button>
                  <button
                    ref={formRef}
                    className="absolute hidden"
                    type="submit"
                  ></button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setConfigurations } from "@/app/store/Configurations";
import axios from "axios";
import image404 from "@/public/image404.png";

export default function Damages() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  const myProfile: any = useSelector((state: RootState) => state.myProfile);
  const [damageIndex, setdamageIndex] = useState<any>(0);
  const [imagePopup, setImagePopup] = useState<boolean>(false);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [imageLength, setImageLength] = useState<any>(
    vehicleInfo.damages[damageIndex]?.files?.length
  );
  const [loading, setLoading] = useState<any>(false);

  let dispatch = useDispatch();

  useEffect(() => {
    setImageLength(vehicleInfo.damages[damageIndex]?.files?.length);
  }, [damageIndex]);

  useEffect(() => {
    async function getData2() {
      try {
        setLoading(true);
        let result: any = await axios.post(`/api/getConfigurations`, {
          createdBy: myProfile._id,
        });
        dispatch(setConfigurations(result?.data?.wholeData));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (myProfile._id) getData2();
  }, [myProfile._id]);
  let exteriorImg = Configurations?.Configurations?.type?.find(
    (item: any) => item.Type === vehicleInfo.type
  )?.exterior;
  let interiorImg = Configurations?.Configurations?.type?.find(
    (item: any) => item.Type === vehicleInfo.type
  )?.interior;

  return (
    <div className="w-full h-full py-4 px-5 flex justify-between items-start">
      {vehicleInfo.damages.length > 0 ? (
        <>
          <div className="w-[20%] h-[120px] flex flex-col justify-start items-start relative">
            <img
              src={
                vehicleInfo.damages[damageIndex]?.exterior
                  ? exteriorImg
                  : interiorImg
              }
              className="w-[100%] h-[120px] bg-whit"
            />
            {vehicleInfo.damages.map((item: any, index: any) => (
              <>
                {vehicleInfo.damages[damageIndex]?.exterior ? (
                  item.exterior ? (
                    <div
                      className={`absolute w-[10px] h-[10px] rounded-full ${
                        item.degree === "Low"
                          ? "bg-green-400 "
                          : item.degree === "Medium"
                          ? "bg-yellow-300"
                          : item.degree === "High"
                          ? "bg-orange-500"
                          : item.degree === "Very High"
                          ? "bg-red-500"
                          : ""
                      } text-black text-[5px] flex justify-center items-center font-[600]`}
                      key={index}
                      style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  ) : null
                ) : !vehicleInfo.damages[damageIndex]?.exterior ? (
                  !item.exterior ? (
                    <div
                      className={`absolute w-[10px] h-[10px] rounded-full ${
                        item.degree === "Low"
                          ? "bg-green-400 "
                          : item.degree === "Medium"
                          ? "bg-yellow-300"
                          : item.degree === "High"
                          ? "bg-orange-500"
                          : item.degree === "Very High"
                          ? "bg-red-500"
                          : ""
                      } text-black text-[5px] flex justify-center items-center font-[600]`}
                      key={index}
                      style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  ) : null
                ) : null}
              </>
            ))}
          </div>
          <div className="w-[75%]  h-[120px] flex flex-col justify-start items-start overflow-auto scroll2 overscroll-behavior-block">
            <div className="w-full-6px h-[40px] flex justify-between items-center border-b-[2px] mb-1 ">
              <span className="w-[10%] h-[30px] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Image
              </span>
              <span className="w-[7%] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                No
              </span>
              <span className="w-[20%] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Type
              </span>
              <span className="w-[20%] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Position
              </span>
              <span className="w-[20%] font-[600] text-[12px] xs:text-[14px] md:text-[13px] leading-[27px]">
                Degree
              </span>
            </div>{" "}
            <div className="w-[100%]  h-[85px] flex flex-col justify-start items-start overflow-auto scroll2">
              {vehicleInfo.damages.map((item: any, index: number) => (
                <div className="w-full h-[40px] flex justify-between items-end border-b-[2px]">
                  <img
                    className="w-[40px] h-[30px] my-1 font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none rounded-[5px]"
                    src={item?.files[0]}
                    onClick={() => {
                      setImagePopup(true);
                      setdamageIndex(index);
                    }}
                  />
                  <span className="pb-2 w-[7%] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                    {JSON.stringify(index + 1).padStart(2, "0")}{" "}
                  </span>
                  <span className="pb-2 w-[20%] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                    {item?.damageType}
                  </span>
                  <span className="pb-2 w-[20%] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                    {item?.exterior ? "Exterior" : "Interior"}
                  </span>
                  <span className="pb-2 w-[20%] font-[400] text-[12px] xs:text-[14px] md:text-[13px] leading-none">
                    {item?.degree}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {imagePopup && (
            <div
              className="w-[100%] h-[100%] flex justify-center items-center scroll absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
              onClick={() => {
                setImagePopup(false);
                setZoomed(false);
              }}
            >
              <div className="w-[700px] h-[700px] relative overflow-hidden scroll border-2 border-black">
                <div
                  className="relative"
                  style={{
                    transform: `${zoomed ? "scale(1.4)" : "scale(1)"}`,
                    transition: "transform 0.3s ease",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden", // To hide the overflow while zooming
                  }}
                >
                  <img
                    src={
                      vehicleInfo.damages[damageIndex]?.files[0] || image404.src
                    }
                    className="w-[100%] h-[100%] object-cover" // Added object-cover for proper scaling
                    style={{
                      cursor: `${zoomed ? "zoom-out" : "zoom-in"}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomed(!zoomed);
                    }}
                  />
                </div>
                <span
                  className="cursor-pointer font-[400] text-[30px] p-1 leading-[12px] text-red-500 absolute top-3 right-3 w-fit shadow dark:bg-dark1 bg-white rounded-full"
                  onClick={() => {
                    setImagePopup(false);
                    setZoomed(false);
                  }}
                >
                  <FaTimes />
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <span className="py- font-[400] text-[14px] leading-[27px]">
          No Damage Added
        </span>
      )}
    </div>
  );
}

"use client";
import CarExterior from "@/public/car-sedan-exterior.png";
import CarInterior from "@/public/car-sedan-interior (1).png";
import { FaEye } from "react-icons/fa";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Damages() {
  let { vehicleInfo } = useSelector((state: RootState) => state.VehicleInfo);
  const [damageIndex, setdamageIndex] = useState<any>(0);
  const [imageIndex, setImageIndex] = useState<any>(0);
  const [imageLength, setImageLength] = useState<any>(
    vehicleInfo.damages[damageIndex]?.files?.length
  );
  useEffect(() => {
    setImageLength(vehicleInfo.damages[damageIndex]?.files?.length);
    setImageIndex(0);
  }, [damageIndex]);

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-center gap-y-[5%] pt-6 pb-8 px-6 border-grey mt-">
      <div className="w-[23%] h-fit flex flex-col justify-start items-start relative">
        <img
          src={
            vehicleInfo.damages[damageIndex]?.exterior
              ? CarExterior.src
              : CarInterior.src
          }
          className="w-[250px] h-[300px]"
        />
        {vehicleInfo.damages.map((item: any, index: any) => (
          <>
            {vehicleInfo.damages[damageIndex]?.exterior ? (
              item.exterior ? (
                <div
                  className={`absolute w-[15px] h-[15px] rounded-full ${
                    index === damageIndex ? "bg-main-blue" : "bg-grey-of-text"
                  } text-white text-[8px] flex justify-center items-center font-[600]`}
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
                  className={`absolute w-[15px] h-[15px] rounded-full ${
                    index === damageIndex ? "bg-main-blue" : "bg-grey-of-text"
                  } text-white text-[8px] flex justify-center items-center font-[600]`}
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
      <div className="w-[40%] h-fit flex flex-col justify-start items-start  ">
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px]">
          <p className="w-[50px]  font-[600] text-[18px] leading-[27px] text-start">
            No
          </p>
          <p className="w-[60%]  font-[600] text-[18px] leading-[27px] text-start">
            Damage Type
          </p>
          <p className="w-[100px]  font-[600] text-[18px] leading-[27px] text-start">
            Degree
          </p>
        </div>
        {vehicleInfo.damages.map((item: any, index: number) => (
          <div
            className="w-full h-fit flex justify-between items-start py-[3px] border-b-[2px] cursor-pointer"
            onClick={() => {
              setdamageIndex(index);
            }}
          >
            <p className="w-[50px]  font-[400] text-[18px] leading-[27px] text-start">
              {index + 1}
            </p>
            <p className="w-[60%]  font-[400] text-[18px] leading-[27px] text-start">
              {item.damageType}
            </p>
            <p className="flex justify-between items-center w-[100px]  font-[400] text-[18px] leading-[27px] text-start">
              {item.degree}
              <FaEye
                className={
                  index === damageIndex ? "text-main-blue" : "text-grey"
                }
              />
            </p>
          </div>
        ))}
      </div>
      <div className="w-[25%] h-[100%] flex flex-col justify-start items-start ">
        <div className="w-[250px] h-[300px] flex justify-center items-center mx-auto">
          <img
            src={vehicleInfo.damages[damageIndex]?.files[imageIndex]}
            className="w-[100%] h-[100%]"
          />
        </div>

        <div className="w-full h-[30px] mx-auto mt-4 text-[20px] flex justify-between items-center">
          <FaChevronLeft
            onClick={() =>
              setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageIndex)
            }
            className={`${imageIndex > 0 ? "" : "text-grey"} cursor-pointer`}
          />
          <FaChevronRight
            onClick={() =>
              setImageIndex(
                imageIndex < imageLength - 1 ? imageIndex + 1 : imageIndex
              )
            }
            className={`${
              imageIndex < imageLength - 1 ? "" : "text-grey"
            } cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
}
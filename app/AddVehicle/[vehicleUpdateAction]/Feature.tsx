"use client";
import React, { useEffect } from "react";
import demyIcon from "@/public/features (1).png";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { setfeatures } from "@/app/store/Vehicle";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Feature() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let featuresDisplayArray: any = Configurations?.Configurations?.feature?.map(
    (item: any) => item.Feature
  );
  let iconsDisplayArray: any = Configurations?.Configurations?.feature?.map(
    (item: any) => item
  );
  let dispatch = useDispatch();

  let [featuresSubmitArray, setFeaturesSubmitArray] = useState<any>(
    vehicle.features
  );

  function handleClick(name: string) {
    setFeaturesSubmitArray((prevArray: any) => {
      const newArray = prevArray?.includes(name)
        ? prevArray.filter((item: any) => item !== name)
        : [...prevArray, name];

      dispatch(setfeatures(newArray));
      return newArray;
    });
  }
  const categories = [
    "Basic Comfort Features",
    "Safety Features",
    "Convenience Features",
  ];
  useEffect(() => {
    if (vehicle.features === "") {
      setFeaturesSubmitArray([""]);
    }
  }, [vehicle.features]);

  return (
    <div className="w-full h-fit">
      <div className="w-full h-fit">
        {categories.map((categoryItem) => (
          <div className="flex flex-wrap justify-start items-start gap-x-[4%] lg:gap-x-[6.66%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8">
            <span className="flex justify-between gap-4 items-end font-[600] text-[20px] w-full my-1 c">
              {categoryItem}
              <span className="text-[16px] w-fit text-center font-[400]">
                Not found?{" "}
                <Link
                  href={"/Configuration/Features"}
                  className="text-[#3d84ff] no-underline hover:underline capitalize"
                >
                  Add new!
                </Link>
              </span>
            </span>
            {featuresDisplayArray?.map(
              (item: any, index: any) =>
                iconsDisplayArray[index].Box === categoryItem && (
                  <button
                    className={`w-[100%] sm:w-[48%] lg:w-[20%] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] truncate px-3
                ${
                  vehicle.features?.includes(item)
                    ? "bg-main-blue text-white font-[500] border-2 border-transparent"
                    : "dark:bg-dark1 input-color border-2 border-grey font-[400]"
                } 
                font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center flex justify-start items-center gap-4`}
                    key={index}
                    onClick={() => {
                      handleClick(item);
                    }}
                  >
                    <Image
                      width={20}
                      height={20}
                      className={`w-[20px] h-[20px] ${
                        vehicle.features?.includes(item)
                          ? "filter brightness-[0] invert"
                          : ""
                      }`}
                      src={
                        iconsDisplayArray[index].Icon
                          ? iconsDisplayArray[index].Icon
                          : demyIcon.src
                      }
                      alt=""
                    />
                    <span className="w-[90%] truncate text-start">{item}</span>
                  </button>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

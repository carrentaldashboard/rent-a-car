"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { MediumLoader } from "../../Components/Loader";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setcustomer_idR, setcustomerNameR } from "@/app/store/reservations";
import image404 from "@/public/image404.png";
import SearchEmpty from "@/app/Components/functions/SearchEmpty";
import Image from "next/image";

interface dataType {
  data: Array<Object>;
  loading: boolean;
}

export default function Info({ data, loading }: dataType) {
  let reservation = useSelector((state: RootState) => state.reservation);
  let customersData: any = data;
  const [filteredCustomer, setFilteredCustomer] = useState<any[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>("");

  let dispatch = useDispatch();
  const customerRefs = useRef<any[]>([]); // Use ref to store customer divs

  function filterCustomer() {
    if (!searchQuery) {
      setFilteredCustomer(customersData);
      return;
    }

    const lowercasedQuery = searchQuery?.toLowerCase();
    const filtered = customersData.filter((vehicle: any) => {
      const { data } = vehicle;
      const { name } = data;

      return name?.toLowerCase()?.includes(lowercasedQuery);
    });
    setFilteredCustomer(filtered);
  }

  useEffect(() => {
    filterCustomer();
  }, [searchQuery, customersData]);

  // Scroll to the selected customer when it changes
  useEffect(() => {
    const selectedIndex = filteredCustomer.findIndex(
      (item: any) => item._id === reservation.customer_id
    );
    if (selectedIndex !== -1 && customerRefs.current[selectedIndex]) {
      customerRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center", // Scroll to the center of the container
      });
    }
  }, [reservation.customer_id, filteredCustomer]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value?.trim());
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8 overflow-auto scroll">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Select Customer
        </span>

        <div className="w-full flex flex-wrap justify-center items-center h-fit gap-1">
          <span className="w-full text-start font-[400] text-[14px] leading-[17px]">
            Search Customer
          </span>
          <div className="w-full h-fit relative">
            <input
              className="w-full h-[43px] flex justify-start ps-5 items-center border-[1px] border-grey rounded-[10px] dark:bg-dark1 input-color text-[16px] leading-[19px] placeholder:dark:text-white text-black"
              placeholder="Search By Name"
              onChange={handleSearchQueryChange}
              value={searchQuery}
            />
            {searchQuery && (
              <SearchEmpty
                classes={"right-[0%] md:right-[2%] w-[3.5%] top-0"}
                setState={setSearchQuery}
              />
            )}
          </div>
        </div>

        {loading ? (
          <MediumLoader />
        ) : (
          filteredCustomer?.map((item: any, index: number) => (
            <div
              key={item._id}
              ref={(el: any) => (customerRefs.current[index] = el)} // Assign ref to each customer div
              className="w-[100%] rounded-[15px] px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative"
            >
              <div className="w-[130px] h-[130px] object-cover overflow-hidden rounded-[10px] border-[1px] border-grey relative">
                <img
                  alt=""
                  src={item?.data?.customerImage || image404.src}
                />
              </div>
              <div className="w-full sm:w-[55%] h-fit flex justify-center sm:justify-start flex-wrap items-center gap-1">
                <div className="w-full flex justify-center sm:justify-start items-center pe-0 sm:pe-5  leading-6">
                  <span className="font-[600] text-[15px] xs:text-[24px] leading-6 sm:leading-[36px]">
                    {item.data.name}
                  </span>
                </div>
                <div className="w-full flex justify-center sm:justify-start items-center">
                  <span className="font-[500] text-[14px] xs:text-[20px] leading-6 sm:leading-[30px]">
                    {item.data.phone}
                  </span>
                </div>
                <div className="w-full flex justify-between items-center sm:items-start flex-col font-[400] text-[14px] leading-6 sm:leading-[21px]">
                  <div className="flex justify-start items-center gap-2 w-fit sm:w-[100%] pe-0 sm:pe-5">
                    <span className="w-fit">City:</span>
                    <span className="w-fit">{item.data.city}</span>
                  </div>
                  <div className="flex justify-start items-center gap-2 w-fit sm:w-[100%]">
                    <span className="w-fit">Country:</span>
                    <span className="w-fit">{item.data.country}</span>
                  </div>
                </div>
              </div>
              <button
                className={`w-full sm:w-[120px] h-[30px] rounded-[10px] ${
                  reservation.customer_id === item._id
                    ? "bg-dark-grey"
                    : "bg-main-blue"
                } text-white font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center`}
                onClick={() => {
                  dispatch(
                    setcustomer_idR(
                      reservation.customer_id === item._id ? "" : item._id
                    )
                  );
                  dispatch(
                    setcustomerNameR(
                      reservation.customerName === item?.data.name
                        ? ""
                        : item?.data.name
                    )
                  );
                }}
              >
                {reservation.customer_id === item._id ? "Selected" : "Select"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

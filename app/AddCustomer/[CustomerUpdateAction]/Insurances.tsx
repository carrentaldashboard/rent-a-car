"use client";
import React, { useEffect, useState } from "react";
import {
  TempTypeInput,
  TypeInput,
} from "../../Components/InputComponents/TypeInput";
import {
  SelectInput,
  TempSelectInput,
} from "../../Components/InputComponents/SelectInput";
import {
  setemergencyContactNameR,
  setemergencyContactPhoneR,
  setemergencyContactRelationR,
} from "@/app/store/Customer";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FaAsterisk, FaTimes } from "react-icons/fa";
import { SmallLoader } from "@/app/Components/Loader";

export default function Insurances() {
  let customer = useSelector((state: RootState) => state.Customer);
  let dispatch = useDispatch();
  let [other, setOther] = useState("");
  let [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (customer.emergencyContactRelation === "Other") setPopUp(true);
  }, [customer.emergencyContactRelation]);


  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Emergency Information
        </span>

        <TempTypeInput
          setState={setemergencyContactNameR}
          label={"Emergency Contact Name"}
          value={customer.emergencyContactName}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setemergencyContactRelationR}
          label={"Relation"}
          value={customer.emergencyContactRelation}
          required={false}
          options={
            !other
              ? ["Father", "Mother", "Brother", "Other"]
              : [
                  "Father",
                  "Mother",
                  "Brother",
                  customer.emergencyContactRelation,
                  "Other",
                ]
          }
        />
        <TempTypeInput
          setState={setemergencyContactPhoneR}
          label={"Emergency Phone"}
          value={customer.emergencyContactPhone}
          required={false}
          type={"number"}
        />
      </div>
      {popUp && (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-[0px] left-0 flex justify-center item-center sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-0 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-14 px-1 xs:px-3 md:px-10 modal-position">
            <div
              className={`w-[100%] h-fit flex flex-col justify-start items-start gap-1`}
            >
              <label className="flex justify-start gap-1 items-start font-[600] text-[14px] leading-[17px]">
                {"Add New"}
                <FaAsterisk className="text-[6px]" />
              </label>
              <div className="w-full h-fit flex justify-between items-center relative">
                <input
                  required={true}
                  type={"text"}
                  className="pe-10 font-[400] text-[16px] leading-[19px] ps-2 w-[100%] h-[43px] flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey truncate"
                  placeholder={`Enter Text Here`}
                  onChange={(e) => {
                    setOther(e.target.value);
                  }}
                  value={other}
                />
              </div>
            </div>

            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color  text-gray-500 font-[400] text-[12px] md:text-[18px] leading-[21px] absolute top-2 right-"
                onClick={() => {
                  setOther("");
                  setPopUp(false);
                }}
              >
                <FaTimes />
              </button>
              <button
                className="w-[230px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  dispatch(setemergencyContactRelationR(other));
                  setPopUp(false);
                  // setOther("");
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

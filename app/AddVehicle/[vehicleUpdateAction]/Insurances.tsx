"use client";
import Image from "next/image";
import upload from "@/public/Paper Upload.svg";
import React from "react";
import {
  TempTypeInput,
  TempTypeInputSign,
} from "../../Components/InputComponents/TypeInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setinsNo,
  setinsCompany,
  setinsEnd,
  setinsStart,
  setinsPayable,
  setinsDeductible,
  setinsRecurringPeriod,
  setinsRecurringDate,
  setinsRemarks,
  setinsImage,
} from "@/app/store/Vehicle";
import { TempSelectInputLink } from "@/app/Components/InputComponents/SelectInput";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import { useFileDrop } from "@/app/Components/functions/onDragFromDrag";
import { useDropzone } from "react-dropzone";

export default function Insurances() {
  let vehicle = useSelector((state: RootState) => state.Vehicle);
  let Configurations = useSelector((state: RootState) => state.Configurations);
  let dispatch = useDispatch();
  let global = useSelector((state: RootState) => state.Global);
  const onDrop = useFileDrop((files: any[]) => {
    const uniqueFiles = files.filter(
      (file) =>
        !vehicle?.insImage.some(
          (existingFile: any) => existingFile.name === file.name
        )
    );
    if (uniqueFiles?.length > 0) {
      dispatch(setinsImage([...vehicle?.insImage, ...uniqueFiles]));
    }
  });

  const {
    getRootProps,
    getInputProps,
    // isDragActive,
  } = useDropzone({
    onDrop: onDrop,
  });

  return (
    <div className="w-full h-fit">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Insurance Information
        </span>
        <TempSelectInputLink
          setState={setinsCompany}
          label={"Company Name"}
          value={vehicle.insCompany}
          required={false}
          options={Configurations?.Configurations?.Insurance?.map(
            (item: any) => item.Insurance
          )}
          link={"/Configuration/Insurance"}
        />
        <TempTypeInput
          setState={setinsNo}
          label={"Policy No"}
          value={vehicle.insNo}
          required={false}
          type={"number"}
        />
        <TempTypeInputSign
          setState={setinsPayable}
          label={"Charge Payable"}
          value={vehicle.insPayable}
          required={false}
          type={"number"}
          sign={global.currentCurrency}
        />
        <TempTypeInputSign
          setState={setinsDeductible}
          label={"Deductible"}
          value={vehicle.insDeductible}
          required={false}
          type={"number"}
          sign={"%"}
        />
        <TempTypeInput
          setState={setinsStart}
          label={"Start Date"}
          value={vehicle.insStart}
          required={false}
          type={"date"}
        />
        <TempTypeInput
          setState={setinsEnd}
          label={"End Date"}
          value={vehicle.insEnd}
          required={false}
          type={"date"}
        />
        {/* <TempTypeInput
          setState={setinsRecurringPeriod}
          label={"Recurring Period"}
          value={vehicle.insRecurringPeriod}
          required={false}
          type={"text"}
        /> */}
        <TempSelectInputLink
          setState={setinsRecurringPeriod}
          label={"Recurring Period"}
          value={vehicle.insRecurringPeriod}
          required={false}
          options={Configurations?.Configurations?.Insurance?.map(
            (item: any) => item.recurring
          )}
          link={"/Configuration/Insurance"}
        />
        <TempTypeInput
          setState={setinsRecurringDate}
          label={"Recurring Date"}
          value={vehicle.insRecurringDate}
          required={false}
          type={"date"}
        />
        <div className="w-[100%] h-fit flex flex-col justify-start items-start gap-1">
          <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
            Remarks
          </label>
          <textarea
            className="w-full pe-2 py-3 font-[400] text-[16px] leading-[19px] ps-2  flex justify-between items-center dark:bg-dark1 input-color rounded-xl border-2 border-grey"
            rows={6}
            cols={6}
            onChange={(e) => dispatch(setinsRemarks(e.target.value))}
            value={vehicle.insRemarks}
            placeholder="Enter Remarks Here"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Upload Insurance Images
        </span>
        <div
          className="w-full h-[170px] rounded-[12px] border-dashed border-2 flex flex-col justify-center items-center cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />

                    <Image
            src={upload.src}
            alt=""
            width={32}
            height={32}
            
          />
          <span className="font-[600] text-[12px] xs:text-[13px] md:text-[14px] dark:text-white text-black my-[5px]">
            Drag & Drop or
            <span className="text-link-blue cursor-pointer"> choose file </span>
            to upload
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Select JPG, PNG or PDF{" "}
          </span>
          <span className="font-[400] text-[14px] leading-[14px] text-[#515978]">
            Maximum size 1 MB{" "}
          </span>
        </div>
        <div className="w-full h-fit flex justify-start items-center gap-5 overflow-auto py-[2px]">
          <Thumbs files={vehicle?.insImage} setFiles={setinsImage} />
        </div>
      </div>
    </div>
  );
}

"use client";
import checkBlue from "@/public/checkBlue.svg";
import checkBlack from "@/public/checkBlack.png";
import car from "@/public/chauffeursPic.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { MediumLoader } from "../../Loader";
import { setchauffeur_idR, setwithChauffeur } from "@/app/store/reservations";

interface dataType {
  data: Array<Object>;
  loading: boolean;
}

export default function Rental({ data, loading }: dataType) {
  let reservation = useSelector((state: RootState) => state.reservation);
  const [exterior, setExterior] = useState(true);
  const chauffeursData: any = data;
  const [filteredchauffeur, setFilteredchauffeur] = useState<any[]>(data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let dispatch = useDispatch();

  function filterchauffeur() {
    if (!searchQuery) {
      setFilteredchauffeur(chauffeursData);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = chauffeursData.filter((vehicle: any) => {
      const { data } = vehicle;
      const { name } = data;

      return name.toLowerCase().includes(lowercasedQuery);
    });
    setFilteredchauffeur(filtered);
  }

  useEffect(() => {
    filterchauffeur();
  }, [searchQuery, chauffeursData]);

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.trim());
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-start gap-x-[4%] gap-y-5 w-full h-full bg-white mt-5 rounded-[10px] border-2 border-grey  px-1 xs:px-3 md:px-11 py-8 overflow-auto scroll">
        <div className="w-[100%] h-fit flex flex-wrap justify-center items-center bg-green-20 gap-y-2 gap-x-5 font-[500] text-[14px] md:text-[16px] leading-[19px] ">
          <button
            className={`pe-3 md:pe-0 w-fit md:w-[190px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-2 ps-3 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
              exterior ? "bg-main-blue text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setExterior(true);
              dispatch(setwithChauffeur(true));
            }}
          >
            {exterior ? (
              <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
              </div>
            ) : (
              <div className="w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
              </div>
            )}
            With chauffeur
          </button>
          <button
            className={`pe-3 md:pe-0 w-fit md:w-[190px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] border-2 border-grey flex justify-start gap-2 ps-3 items-center font-[400] text-[14px] md:text-[16px] leading-[19px] text-center ${
              !exterior ? "bg-main-blue text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setExterior(false);
              dispatch(setwithChauffeur(false));
            }}
          >
            {!exterior ? (
              <div className="w-[20px] h-[20px] bg-main-blue rounded-full flex justify-center items-center border-[2px] border-white">
                <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
              </div>
            ) : (
              <div className="w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center border-[2px] border-black">
                <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
              </div>
            )}
            Without chauffeur
          </button>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center h-fit gap-1">
          <span className="w-full text-start font-[400] text-[14px] leading-[17px]">
            Search chauffeur
          </span>
          <input
            className="w-full h-[43px] flex justify-start ps-5 items-center border-[1px] border-grey rounded-[10px] input-color text-[16px] leading-[19px] placeholder:text-black"
            placeholder="Search By Name"
            onChange={handleSearchQueryChange}
          />
        </div>
        {loading ? (
          <MediumLoader />
        ) : (
          filteredchauffeur?.map((item: any, index: number) => (
            <div className="w-[100%] rounded-[15px] shadow px-5 py-6 flex flex-col sm:flex-row justify-start gap-4 items-center relative">
              <div className="w-[133px] overflow-hidden rounded-[10px] border-[1px] border-grey">
                <div className="w-[130px] h-[130px] object-cover overflow-hidden rounded-[10px] border-[1px] border-grey">
                  <img
                    src={item.data.chauffeurImage}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full sm:w-[55%] h-fit flex justify-center sm:justify-start flex-wrap items-center gap-1">
                <div className="w-full flex justify-center sm:justify-start items-center  pe-0 sm:pe-5 -mb-1">
                  <p className="font-[600] text-[15px] xs:text-[24px] leading-6 sm:leading-[36px]">
                    {item.data.name}
                  </p>
                </div>
                <div className="w-full flex justify-center sm:justify-start items-center">
                  <p className="font-[500] text-[14px] xs:text-[20px] leading-6 sm:leading-[30px]">
                    {item.data.phone}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center sm:items-start flex-col font-[400] text-[14px] leading-5 sm:leading-[21px]">
                  <div className="flex justify-start items-center gap-2 w-fit sm:w-[40%] pe-0 sm:pe-5">
                    <p className="w-fit">City:</p>
                    <p className="w-fit">{item.data.city}</p>
                  </div>
                  <div className="flex justify-start items-center gap-2 w-fit sm:w-[50%]">
                    <p className="w-fit">Country:</p>
                    <p className="w-fit">{item.data.country}</p>
                  </div>
                </div>
              </div>
              <button
                className={`w-full sm:w-[120px] h-[30px] rounded-[10px] ${
                  reservation.chauffeur_id === item._id
                    ? "bg-dark-grey"
                    : "bg-main-blue"
                } text-white font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-5 sm:leading-[21px] text-center`}
                onClick={() => {
                  dispatch(
                    setchauffeur_idR(
                      reservation.chauffeur_id === item._id ? "" : item._id
                    )
                  );
                }}
              >
                {reservation.chauffeur_id === item._id ? "Selected" : "Select"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

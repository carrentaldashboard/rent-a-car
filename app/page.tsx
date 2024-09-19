"use client";
import loginPage1 from "@/public/Vector 11.png";
import loginPage2 from "@/public/Vector 10 (1).png";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import car from "@/public/Layer_1 (1).svg";
// import car from "@/public/car.svg";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  setprofilePicR as setCompanyLogo,
  setprofilePic2R as setCompanyLogo2,
} from "./store/companyProfile";

export default function Vehicles() {
  let global = useSelector((state: RootState) => state.Global);
  let companyProfile: any = useSelector(
    (state: RootState) => state.companyProfile
  );
  const [loading, setLoading] = useState<any>(false);
  let dispatch = useDispatch();
  
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await axios.post(`/api/getcompanyProfile`);
        dispatch(setCompanyLogo(result?.data?.data?.profilePic));
        dispatch(setCompanyLogo2(result?.data?.data?.profilePic2));
        console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [global.companyProfileReloader]);

  return (
    <div className="w-full h-fit">
      <div className="w-full h-[100vh] flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[50%] h-[40%] sm:h-[50%] lg:h-full flex justify-center items-center bg-main-blue relative">
          <img
            src={loginPage2.src}
            className="w-[100% h-[90%] absolute bottom-0 right-0"
          />
          <img
            src={loginPage1.src}
            className="w-[100%] h-[50%] absolute bottom-0 left-0"
          />

          <div className="w-[90%] sm:w-fit h-fit flex flex-col justify-center items-start gap-2 sm:gap-[20px] z-[10]">
            <img
              src={
                companyProfile?.profilePic2
                  ? companyProfile.profilePic2
                  : car.src
              }
              className="w-[120px] sm:w-[175px] z-10"
            />
            <h1 className="font-[600] text-[40px] sm:text-[70px] leading-[40px] sm:leading-[73px] capitalize text-white">
              {global.loginPage ? (
                <>
                  welcome <br /> back!
                </>
              ) : (
                <>
                  Forgot <br /> Password?
                </>
              )}
            </h1>
            <p className="font-[400] text-[15px] sm:text-[18px] leading-[18px] sm:leading-[22px] text-white z-10 ">
              Are you ready to efficiently manage your fleet and
              <br className="hidden sm:block" />
              reservations? Let's work together to ensure everything
              <br className="hidden sm:block" />
              runs smoothly and seamlessly.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-[60%] sm:h-[50%] lg:h-full bg-white flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            {global.loginPage ? <Login /> : <ForgotPassword />}
          </div>
        </div>
      </div>
    </div>
  );
}

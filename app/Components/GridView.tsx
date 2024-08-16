import car2 from "@/public/car (2).svg";
import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";

interface dataType {
  data: Array<Object>;
}

export default function GridView({ data }: dataType) {
  console.log(data);

  return (
    <div className="w-full h-fit mt-4">
      <h3 className="w-full flex justify-end items-center font-[400] text-[14px] sm:text-[18px] leading-[21px] text-grey">
        <span className="underline cursor-pointer">Export</span>
      </h3>

      <div className="w-full h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] px-1 xs:px-3 md:px-11 pb-3 md:pb-12 pt-0 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-2">
        {data?.map((item: any) => (
          <Link
            href={"/Components/CarInfo"}
            className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
          >
            <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
              <FaEllipsis />
            </div>
            <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
              <img src={car2.src} className="w-full h-full" />
            </div>
            <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
              <div className="w-full flex justify-start items-center pe-5 -mb-1">
                <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                  Honda City
                </p>
              </div>
              <div className="w-full flex justify-start items-center">
                <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                  LEM 1234
                </p>
              </div>
              <div className="w-full flex justify-start 1400:justify-between items-center">
                <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                    Year:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                    {item?.data?.year}
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    Type:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    {item?.data?.type}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-start 1400:justify-between items-center">
                <div className="flex justify-start items-center gap-2 w-[40%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                    Color:
                  </p>
                  <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                    <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    City:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    {item?.data?.city}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
        {/* <Link
          href={"/Components/CarInfo"}
          className="w-[100%] lg:w-[47.5%] h-[183px bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
        >
          <div className="absolute top-5 right-5 rotate-90 hover:cursor-pointer">
            <FaEllipsis />
          </div>
          <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
            <img src={car2.src} className="w-full h-full" />
          </div>
          <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
            <div className="w-full flex justify-start items-center pe-5 -mb-1">
              <p className="font-[500] text-[18px] xs:text-[24px] leading-5 xs:leading-[36px]">
                Honda City
              </p>
            </div>
            <div className="w-full flex justify-start items-center">
              <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                LEM 1234
              </p>
            </div>
            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%] pe-5">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[42%]">
                  Year:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[40%]">
                  2024
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Type:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Sedan
                </p>
              </div>
            </div>

            <div className="w-full flex justify-start 1400:justify-between items-center">
              <div className="flex justify-start items-center gap-2 w-[40%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  Color:
                </p>
                <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px]">
                  <div className="w-[23px] h-[12px] bg-black rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  City:
                </p>
                <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                  Atlanta
                </p>
              </div>
            </div>
          </div>
        </Link> */}
      </div>
      <div className="w-full h-[32px] mt-5 md:mt-10 flex justify-between items-center">
        <div className="font-[400] text-[10px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing 12 from 100 data
        </div>
        <div className="font-[600] text-[10px] sm:text-[14px] leading-[17px]">
          <div className="w-fit h-full flex justify-end items-center gap-1 sm:gap-4">
            <FaAngleDoubleLeft />
            <div className="flex justify-center items-center">
              <div className="ms-4 bg-main-blue text-white rounded-[5px] w-[32px] h-[32px] flex justify-center items-center">
                1
              </div>
              <div className="w-[32px] h-[32px] flex justify-center items-center bg- text-[#878787]">
                2
              </div>
            </div>
            <FaAngleDoubleRight />
          </div>
        </div>
      </div>
    </div>
  );
}

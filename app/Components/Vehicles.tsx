import { FaBars, FaBeer, FaHamburger, FaSquare } from "react-icons/fa";
import grid from "@/public/Group 109.svg";
import list from "@/public/Group 110.svg";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  GridViewRounded,
  Menu,
  MenuOpen,
  MenuRounded,
} from "@mui/icons-material";
import { BiMenu } from "react-icons/bi";
import { FcMenu } from "react-icons/fc";
export default function Vehicles() {
  return (
    <div className="nav-width h-full bg-green-30 absolute right-0 flex flex-col justify-start items-start gap-[20px]">
      <div className="w-full h-[200px bg-yellow-30">
        <h3 className="font-[600] text-[25px] leading-[38px] text-black">
          All Vehicles
        </h3>
        <div className="flex justify-between items-start">
          <p className="text-grey font-[400] text-[18px] leading-[21px] text-black">
            Lorem ipsum is a placeholder text commonly used
            <br /> to demonstrate the visual form.
          </p>
          <button className="px-3 py-1 rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[30px] text-center">
            Add New Vehicle
          </button>
        </div>
      </div>
      <div className="w-full h-fit bg-light-grey rounded-xl border-2 border-grey py-4 px-10 flex flex-col justify-start items-start gap-[15px]">
        <div className="w-full h-fit">
          <h3 className="font-[400] text-[14px] leading-[17px] text-black">
            Search
          </h3>
          <div className="w-full h-fit flex justify-between items-center">
            <input className="px-5 w-[80%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"></input>
            <button className="w-[17%] px-3 py-1 rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[30px] text-center">
              Search
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="w-[18%] h-fit ">
            <h3 className="font-[400] text-[14px] leading-[17px] text-black ">
              Registration No.
            </h3>
            <div className="w-full h-fit flex justify-between items-center ">
              <input
                className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey"
                value={"MBU56i403378"}
              ></input>
            </div>
          </div>
          <div className="w-[15%] h-fit ">
            <h3 className="font-[400] text-[14px] leading-[17px] text-black ">
              Make
            </h3>
            <div className="w-full h-fit flex justify-between items-center ">
              <select className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
                <option value="">Suzuki</option>
                <option value="">Suzuki</option>
                <option value="">Suzuki</option>
                <option value="">Suzuki</option>
              </select>
            </div>
          </div>
          <div className="w-[15%] h-fit ">
            <h3 className="font-[400] text-[14px] leading-[17px] text-black ">
              Model
            </h3>
            <div className="w-full h-fit flex justify-between items-center ">
              <select className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
                <option value="">Swift</option>
                <option value="">Swift</option>
                <option value="">Swift</option>
                <option value="">Swift</option>
              </select>
            </div>
          </div>
          <div className="w-[15%] h-fit ">
            <h3 className="font-[400] text-[14px] leading-[17px] text-black ">
              Year
            </h3>
            <div className="w-full h-fit flex justify-between items-center ">
              <select className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
                <option value="">2024</option>
                <option value="">2024</option>
                <option value="">2024</option>
                <option value="">2024</option>
              </select>
            </div>
          </div>
          <div className="w-[15%] h-fit ">
            <h3 className="font-[400] text-[14px] leading-[17px] text-black ">
              Type
            </h3>
            <div className="w-full h-fit flex justify-between items-center ">
              <select className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
                <option value="">Sedan</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
                <option value="">Sedan</option>
              </select>
            </div>
          </div>
          <div className="w-[15%] h-fit ">
            <h3 className="font-[400] text-[14px] leading-[17px] text-black ">
              Color
            </h3>
            <div className="w-full h-fit flex justify-between items-center ">
              <select className=" font-[400] text-[14px] leading-[18px] px-5 w-[100%] h-[40px] flex justify-between items-center bg-white rounded-xl border-2 border-grey">
                <option value="">Red</option>
                <option value="">Red</option>
                <option value="">Red</option>
                <option value="">Red</option>
              </select>
            </div>
          </div>
        </div>
        <h3 className="font-[400] text-[14px] leading-[17px] text-black underline">
          Show Less
        </h3>
      </div>
      <div className="w-full h-fit">
        <div>
          <div className="w-full h-fit flex justify-end gap-4 items-center">
            <div className="w-fit h-fit flex justify-end items-center gap-3">
              <button className="w-[42px] flex justify-center items-center h-[39px] rounded-[10px] bg-light-grey border-2 border-grey text-main-blue font-[500] text-[20px] leading-[30px] text-center">
                <GridViewRounded />
              </button>
              <button className="w-[42px] flex justify-center items-center h-[39px] rounded-[10px] bg-main-blue text-white font-[900] text-[20px] leading-[30px] text-center">
                <MenuRounded />
              </button>
            </div>
            <button className="w-fit px-8 py-1 rounded-[10px] bg-main-blue text-white font-[500] text-[20px] leading-[30px] text-center">
              Export
            </button>
          </div>
          <h3 className="font-[400] text-[14px] leading-[17px] text-grey">
            Delete Multiple <span className="ps-1"></span>|
            <span className="ps-1"></span> Active/Inactive Multiple
          </h3>
        </div>
        <div className="w-full h-[400px]">
          <table></table>
        </div>
      </div>
    </div>
  );
}

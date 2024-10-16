import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setAlert, setVehicleDataReloader } from "../store/Global";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
// import { SmallLoader } from "../Loader";
// import { useHandleExport } from "../functions/exportFunction";
import { SmallLoader } from "../Components/Loader";
import { useHandleExport } from "../Components/functions/exportFunction";
import image404 from "@/public/image404.png";
import { PaginationComponent } from "../Components/functions/Pagination";

interface dataType {
  data: Array<Object>;
}

export default function GridView({ data }: dataType) {
  let global = useSelector((state: RootState) => state.Global);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [popup, setPopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleExport = useHandleExport(); // Use the hook to get the handleExport function

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };
  const dispatch = useDispatch();

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const router = useRouter();

  const content = (
    <div className="flex flex-col justify-start items-start">
      Delete Edit Active
    </div>
  );

  const [isOpen, setIsOpen] = useState("");

  const toggleDropdown = (e: any) => {
    if (isOpen === e) {
      setIsOpen("");
    } else {
      setIsOpen(e);
    }
  };
  async function deleteItem(_id: any) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.delete(`/api/deleteVehicle/${_id}`);
      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Vehicle Deleted Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  async function updateActive(_id: any, active: boolean) {
    try {
      // setEditLoading(true);
      let result: any = await axios.post(`/api/updateActive/${_id}`, {
        active: !active,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          !active
            ? "Selective Vehicle Activated Successfully"
            : "Selective Vehicle Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      // setEditLoading(false);
    }
  }
  return (
    <div className="w-full h-fit">
      <div className="w-full h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] px-1 xs:px-3 md:px-11 pb-3 md:pb-12 pt-0 rounded-[10px] bg-light-grey border-2 border-grey dark:bg-dark2 bg-light-grey mt-2">
        {paginatedData.map((item: any, index: number) => (
          <Link
            key={index} // Added unique key prop
            href={`/VehicleInfo/${item?._id}`}
            className="w-[100%] lg:w-[47.5%] h-[183px dark:bg-dark1 bg-white mt-[5%] rounded-[15px] shadow px-0 md:px-5 lg:px-2 1400:px-5 py-2 xs:py-6 flex justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
          >
            <div
              className="absolute top-5 right-5 hover:cursor-pointer bg w-[30px] h-[30px] rounded-full flex justify-center items-center dark:hover:bg-slate-500 hover:bg-gray-200"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <FaEllipsisVertical
                onClick={() => {
                  toggleDropdown(item?._id);
                }}
              />
              <div className="relative">
                {isOpen === item._id && (
                  <div className="w-[130px] z-10 dark:bg-dark2 bg-light-grey rounded-lg shadow absolute top-4 overflow-hidden right-0 text-md dark:text-white text-black flex flex-col justify-start items-center py-3">
                    <button
                      className="px-4 py-2 dark:hover:bg-slate-500 hover:bg-gray-200 w-[85%] rounded-[5px] text-start"
                      onClick={() => {
                        router.push(`/AddVehicle/${item?._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <div className="mx-auto mt-1 mb-1 w-[100%] h-[0px] border-t-[1px border-[#d9d9d9]"></div>
                    <button
                      className="px-4 py-2 dark:hover:bg-slate-500 hover:bg-gray-200 w-[85%] rounded-[5px] text-start"
                      onClick={() => {
                        setPopup(true);
                        setItemToDelete(item?._id);
                      }}
                    >
                      Delete
                    </button>
                    <div className="mx-auto mt-1 mb-1 w-[100%] h-[0px] border-t-[1px border-[#d9d9d9]"></div>
                    <button
                      className="px-4 py-2 dark:hover:bg-slate-500 hover:bg-gray-200 w-[85%] rounded-[5px] text-start"
                      onClick={() => {
                        updateActive(item?._id, item?.active);
                      }}
                    >
                      {item.active ? "Inactive" : "Active"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-[120px] xs:w-[170px] h-[139px] overflow-hidden rounded-[15px]">
              {item?.data?.carImages ? (
                <img
                  src={
                    item?.data?.carImages[item?.data?.thumbnailImage] ||
                    image404.src
                  }
                  className="w-full h-full"
                />
              ) : null}
            </div>
            <div className="w-[80%] md:w-[40%] lg:w-[55%] h-fit flex justify-start flex-wrap items-center gap-1 ">
              <div className="w-full flex justify-start items-center pe- -mb-1">
                <p className="font-[500] text-[18px] xs:text-[24px] leading-[34px] xs:leading-0 truncate">
                  {item?.data?.make} {item?.data?.model}
                </p>
              </div>
              <div className="w-full flex justify-start items-center">
                <p className="font-[400] text-[12px] xs-text-[14px] leading-5 xs:leading-[21px]">
                  {item?.data?.registration}
                </p>
              </div>
              <div className="w-full flex justify-start 1400:justify-between items-center">
                <div className="flex justify-start items-center gap-2 w-[50%] pe-5">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[70%]">
                    Making Year:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    {item?.data?.year}
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    Type:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[70%]">
                    {item?.data?.type}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-start 1400:justify-between items-center">
                <div className="flex justify-start items-start gap-2 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] h-[18px]">
                    Color:
                  </p>
                  <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px] h-[18px] flex justify-center items-center">
                    <div
                      className="w-[23px] h-[12px] rounded-full"
                      style={{
                        backgroundColor: item?.data?.color,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2 1400:gap-0 w-[50%]">
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[30%]">
                    City:
                  </p>
                  <p className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit 1400:w-[70%]">
                    {item?.data?.city}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {popup ? (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9)] rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] mt-10 flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white shadow z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 fixed modal-position">
            <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Are you sure you want to delete this item ?
              </label>
            </div>
            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  setPopup(false);
                }}
              >
                No
              </button>
              <button
                className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  deleteItem(itemToDelete);
                }}
                disabled={deleteLoading}
              >
                {deleteLoading ? <SmallLoader /> : "Yes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="w-full h-[32px] mt-5 md:mt-10 flex justify-between items-center">
        <div className="font-[400] text-[10px] sm:text-[14px] leading-[17px] text-[#878787]">
          Showing {paginatedData.length ? (page - 1) * itemsPerPage + 1 : 0} -{" "}
          {Math.min(page * itemsPerPage, data.length)} of {data.length} data
        </div>
        <PaginationComponent
          totalPages={totalPages}
          page={page}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}

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
  const [itemToDeleteMany, setItemToDeleteMany] = useState<any>([]);
  const [deleteManyPopup, setDeleteManyPopup] = useState(false);

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

  async function deleteManyItem() {
    try {
      setDeleteLoading(true);
      let result: any = await axios.post(`/api/deleteManyVehicle`, {
        _ids: itemToDeleteMany,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(setAlert("Selective Vehicles Deleted Successfully"));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }
  function handlePushItem(_id: any) {
    setItemToDeleteMany((prevArray: any) => {
      // Check if the item is already present in the array
      const isPresent = prevArray.includes(_id);

      // Return a new array with the item either added or removed
      if (isPresent) {
        // Remove the item
        return prevArray.filter((item: any) => item !== _id);
      } else {
        // Add the item
        return [...prevArray, _id];
      }
    });
  }
  const allIds = data.map((item: any) => item?._id);
  async function UpdateActiveManyItem(active: boolean) {
    try {
      setDeleteLoading(true);
      let result: any = await axios.post(`/api/updateManyActive`, {
        _ids: itemToDeleteMany,
        active: active,
      });

      dispatch(setVehicleDataReloader(global.vehicleDataReloader + 1));
      dispatch(
        setAlert(
          active
            ? "Selective Vehicles Activated Successfully"
            : "Selective Vehicles Deactivated Successfully"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  }

  return (
    <div className="w-full h-fit">
      <div
        className={`h-[24px] w-fit flex justify-between items-end font-[400] text-[14px] sm:text-[18px] leading-[18px] ${
          itemToDeleteMany.length < 1 ? "text-grey" : " text-main-blue"
        }  `}
      >
        {itemToDeleteMany.length >= 1 && (
          <span>
            <span>
              <button
                className={`${
                  itemToDeleteMany.length < 1
                    ? ""
                    : "cursor-pointer hover:underline"
                }`}
                onClick={() => {
                  setDeleteManyPopup(true);
                }}
                disabled={itemToDeleteMany.length < 1 ? true : false}
              >
                Delete Multiple
              </button>
            </span>
            <span className="ps-1"></span>|<span className="ps-1"></span>
            <span
              className={`${
                itemToDeleteMany.length < 1
                  ? ""
                  : "cursor-pointer hover:underline"
              }`}
              onClick={() => {
                UpdateActiveManyItem(true);
              }}
            >
              Active /
            </span>
            <span
              className={`${
                itemToDeleteMany.length < 1
                  ? ""
                  : "cursor-pointer hover:underline"
              }`}
              onClick={() => {
                UpdateActiveManyItem(false);
              }}
            >
              Inactive Multiple
            </span>
          </span>
        )}
      </div>

      <div className="w-full h-fit flex justify-start flex-wrap items-start rounded-[10px] bg-light-gre pb-4 px-3 border-2 border-grey dark:bg-dark2 bg-light-grey mt-2">
        <div className="w-full h-fit flex justify-center items-start">
          <div className="w-[33.33%] h-fit flex justify-center items-start">
            <div className="w-[100%] lg:w-[340px] 2xl:w-[90%] flex justify-start gap-2 items-center mt-4">
              <div
                className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                  itemToDeleteMany.length === data.length && data.length !== 0
                    ? "bg-check"
                    : ""
                } border-2 border-dark-grey`}
                onClick={() => {
                  setItemToDeleteMany(
                    itemToDeleteMany.length !== data.length ? allIds : []
                  );
                }}
              ></div>
              <span
                onClick={() => {
                  setItemToDeleteMany(
                    itemToDeleteMany.length !== data.length ? allIds : []
                  );
                }}
                className="text-[14px] font-[600] cursor-pointer"
              >
                Select All
              </span>
            </div>
          </div>
          <div className="w-[33.33%] h-fit flex justify-center items-start">
            <div className="w-[100%] lg:w-[340px] 2xl:w-[90%] dark:bg-dark1 bg-whit  flex flex-col justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"></div>
          </div>
          <div className="w-[33.33%] h-fit flex justify-center items-start">
            <div className="w-[100%] lg:w-[340px] 2xl:w-[90%] dark:bg-dark1 bg-whit  flex flex-col justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"></div>
          </div>
        </div>
        {paginatedData.map((item: any, index: number) => (
          <div className="lg:w-[33.33%] 3xl:w-[25%] h-fit flex justify-center items-start mt-4">
            <div
              key={index}
              className="w-[100%] lg:w-[330px] 2xl:w-[90%] h-[375px] dark:bg-dark1 bg-white p-3 flex flex-col justify-start gap-2 md:gap-8 lg:gap-0 lg:justify-between items-center relative"
            >
              <div className="w-[100%] h-fit flex justify-between items-center">
                <div className="w-full h-fit flex justify-between items-start py-1 border-color">
                  <span className="w-fit dark:text-white text-black mt-[3px] flex flex-col justify-center items-start">
                    <span className="w-full font-[600] text-[20px] leading-none">
                      {item?.data?.make} {item?.data?.model}
                    </span>
                    <span className="text-[10px] w-full font-[400] truncate">
                      {item?.data?.type}
                    </span>
                  </span>
                  <div className="flex justify-start items-start w-fit h-fit gap-3">
                    <div className="flex flex-col justify-start items-start w-[111px] h-fit">
                      <div className="flex justify-start items-center w-[111px] h-[24px] bg-[#F6F6F6] border-[1px] border-black rounded-[3px] overflow-hidden">
                        <div className="w-[33px] h-[24px] bg-[#054B86]"></div>
                        <span className="font-[600] flex justify-center items-center text-[12px] text-black w-[100%]">
                          <span className="w-[80px] truncate">
                            {item?.data?.registration}
                          </span>
                        </span>
                      </div>
                      <div className="w-full font-[400] text-[10px] truncate leading-none h-fit py-1">
                        VIN: {item?.data?.vinNo}
                      </div>
                    </div>
                    <div className="text-center truncate w-[20px] h-[24px]  flex justify-center items-center ">
                      <div
                        className={`w-[15px] h-[15px] rounded-[1px] cursor-pointer ${
                          itemToDeleteMany?.includes(item?._id)
                            ? "bg-check"
                            : ""
                        } border-2 border-dark-grey`}
                        onClick={(event) => {
                          handlePushItem(item?._id);
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] h-[173px] flex justify-center items-center gap-1">
                {item?.data?.carImages ? (
                  <img
                    src={
                      item?.data?.carImages[item?.data?.thumbnailImage] ||
                      image404.src
                    }
                    className="h-full"
                  />
                ) : null}
              </div>
              <div className="w-[100%] h-fit flex flex-col justify-between items-start gap-1 ">
                <span
                  className={`border-[1px] px-3 rounded-[5px] h-[22px] flex justify-center items-center text-[12px] mb-1 ${
                    item?.rentOut
                      ? "progress-status"
                      : !item?.active
                      ? "cancel-status"
                      : "complete-status"
                  }`}
                >
                  {item?.rentOut
                    ? "On Trip"
                    : !item?.active
                    ? "Inactive"
                    : "Available"}
                </span>
                <div className="w-[100%] h-fit flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2 w-fit ">
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      Color:
                    </span>
                    <div className="font-[400] text-[9px] xs:text-[12px] leading-[18px] h-[18px] flex justify-center items-center w-fit">
                      <div
                        className="w-[23px] h-[12px] rounded-full"
                        style={{
                          backgroundColor: item?.data?.color,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 w-fit ">
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      Year:
                    </span>
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      {item?.data?.year}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-2 w-fit ">
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      City:
                    </span>
                    <span className="font-[400] text-[9px] xs:text-[12px] leading-[18px] w-fit">
                      {item?.data?.city}
                    </span>
                  </div>
                </div>
                <div className="w-[100%] h-[44px] flex justify-between items-center">
                  <Link
                    href={`/VehicleInfo/${item?._id}`}
                    className="bg-main-blue rounded-[5px] w-[84%] h-full flex justify-center items-center text-[18px] font-[500] text-white hover:opacity-[0.9]"
                  >
                    View More
                  </Link>
                  <div className="bg-white border-[1px] border-grey rounded-[5px] w-[15%] h-full flex justify-center items-center">
                    <div
                      className="hover:cursor-pointer bg w-full h-full flex justify-center items-center rounded-[5px]"
                      onClick={() => {
                        toggleDropdown(item?._id);
                      }}
                    >
                      <div className="w-full h-full bg-hover-light-grey flex justify-center items-center rounded-[5px]">
                        <FaEllipsisVertical />
                      </div>
                      <div className="relative">
                        {isOpen === item._id && (
                          <div className="w-[130px] z-10 dark:bg-dark2 bg-light-grey rounded-lg  absolute bottom-4 overflow-hidden -right-5 text-md dark:text-white text-black flex flex-col justify-start items-center py-3">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {popup ? (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
          <div className="w-[90%] sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%] gap-y-5 dark:bg-dark1 bg-white  z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position fixed modal-position">
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
      {deleteManyPopup ? (
        <div className="w-full h-full dark:bg-blackOpacity bg-[rgba(255,255,255,0.9) rounded-[10px] absolute top-0 left-0 flex justify-center item-start sm:items-center z-[10]">
          <div className="w-[90%]  sm:w-[500px] h-fit border-[1px] border-grey rounded-[10px] flex flex-wrap justify-between items-start gap-x-[4%]  gap-y-5 dark:bg-dark1 bg-white  z-[15]  py-3 xs:py-5 md:py-10 px-1 xs:px-3 md:px-10 modal-position">
            <div className="w-full h-fit flex flex-col justify-start items-start gap-1">
              <label className="flex justify-start gap-1 items-start font-[400] text-[14px] leading-[17px]">
                Are you sure you want to delete these items
              </label>
            </div>
            <div className={`w-full flex justify-end gap-4 items-center pt-4`}>
              <button
                className="px-2 md:px-0 w-fit md:w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] dark:bg-dark1 input-color border-2 border-grey text-main-blue  font-[500] text-[12px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  setDeleteManyPopup(false);
                }}
              >
                No
              </button>
              <button
                className="w-[140px] py-2 md:py-0 h-fit md:h-[44px] rounded-[10px] bg-main-blue text-white  font-[500] text-[12px] xs:text-[14px] md:text-[18px] leading-[21px] text-center"
                onClick={() => {
                  deleteManyItem();
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

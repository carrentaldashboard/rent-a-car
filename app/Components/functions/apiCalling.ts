// get Data and set in State

import { useEffect } from "react";
import axios from "axios";

export function useFetchData({
  modelName,
  createdBy,
  setData,
  setFilteredData,
  setLoading,
}: any) {
  let global = useSelector((state: RootState) => state.Global);
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await axios.post("/api/getSortedLeanData", {
          createdBy,
          modelName,
        });

        if (result?.data?.data) {
          setData(result.data.data);
          if (setFilteredData) {
            setFilteredData(result.data.data); // Only set filtered data if the function is provided
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (createdBy) getData();
  }, [
    createdBy,
    modelName,
    setData,
    setFilteredData,
    setLoading,
    global.vehicleDataReloader,
  ]);
}

// multiple active / inactive api calling

import { useDispatch, useSelector } from "react-redux";
import { setAlert, setVehicleDataReloader } from "@/app/store/Global";
import { RootState } from "@/app/store";

type UpdateActiveManyItemProps = {
  active: boolean;
  itemToDeleteMany: string[];
  model: string;
  setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setItemToDelete: React.Dispatch<React.SetStateAction<any>>;
};

const useUpdateActiveManyItem = () => {
  const dispatch = useDispatch();

  const updateActiveManyItem = async ({
    active,
    itemToDeleteMany,
    model,
    setDeleteLoading,
    setPopup,
    setItemToDelete,
  }: UpdateActiveManyItemProps) => {
    console.log(active, model);

    try {
      setDeleteLoading(true);
      await axios.post(`/api/updateMultipleActive`, {
        _ids: itemToDeleteMany,
        active: active,
        model: model,
      });

      dispatch(setVehicleDataReloader((prev: any) => prev + 1));
      dispatch(
        setAlert(
          active
            ? `Selective ${
                model.charAt(0).toUpperCase() + model.slice(1)
              }s Activated Successfully`
            : `Selective ${
                model.charAt(0).toUpperCase() + model.slice(1)
              }s Deactivated Successfully`
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
      setPopup(false);
      setItemToDelete(null);
    }
  };

  return { updateActiveManyItem };
};

export default useUpdateActiveManyItem;

// single active / inactive api calling

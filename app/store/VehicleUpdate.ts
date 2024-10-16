import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  vehicleId: "update",
  make: "",
  model: "",
  type: "",
  year: "",
  registration: "",
  color: "",
  fuelType: "",
  transmission: "",
  odometer: "",
  passengers: "",
  country: "",
  city: "",
  postalCode: "",
  rentHour: "",
  rentDay: "",
  rentWeek: "",
  rentMonth: "",
  insNo: "",
  insCompany: "",
  insEnd: "",
  features: [],
  otherNote: "",
  damages: [],
  carImages: [],
};

export const VehicleUpdateSlice = createSlice({
  name: "VehicleUpdate",
  initialState,
  reducers: {
    setvehicleIdR: (state, action) => {
      state.vehicleId = action.payload;
    },
    setmakeR: (state, action) => {
      state.make = action.payload;
    },
    setmodelR: (state, action) => {
      state.model = action.payload;
    },
    settypeR: (state, action) => {
      state.type = action.payload;
    },
    setyearR: (state, action) => {
      state.year = action.payload;
    },
    setregistrationR: (state, action) => {
      state.registration = action.payload;
    },
    setcolorR: (state, action) => {
      state.color = action.payload;
    },
    setfuelTypeR: (state, action) => {
      state.fuelType = action.payload;
    },
    settransmissionR: (state, action) => {
      state.transmission = action.payload;
    },
    setodometerR: (state, action) => {
      state.odometer = action.payload;
    },
    setpassengersR: (state, action) => {
      state.passengers = action.payload;
    },
    setcountryR: (state, action) => {
      state.country = action.payload;
    },
    setcityR: (state, action) => {
      state.city = action.payload;
    },
    setpostalCodeR: (state, action) => {
      state.postalCode = action.payload;
    },
    setrentHour: (state, action) => {
      state.rentHour = action.payload;
    },
    setrentDay: (state, action) => {
      state.rentDay = action.payload;
    },
    setrentWeek: (state, action) => {
      state.rentWeek = action.payload;
    },
    setrentMonth: (state, action) => {
      state.rentMonth = action.payload;
    },
    setinsNo: (state, action) => {
      state.insNo = action.payload;
    },
    setinsCompany: (state, action) => {
      state.insCompany = action.payload;
    },
    setinsEnd: (state, action) => {
      state.insEnd = action.payload;
    },
    setfeatures: (state, action) => {
      state.features = action.payload;
    },
    setotherNote: (state, action) => {
      state.otherNote = action.payload;
    },
    setdamages: (state, action) => {
      state.damages = action.payload;
    },
    setCarImages: (state, action) => {
      state.carImages = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setvehicleIdR,
  setmakeR,
  setmodelR,
  settypeR,
  setyearR,
  setregistrationR,
  setcolorR,
  setfuelTypeR,
  settransmissionR,
  setodometerR,
  setpassengersR,
  setcountryR,
  setcityR,
  setpostalCodeR,
  setrentHour,
  setrentDay,
  setrentWeek,
  setrentMonth,
  setinsNo,
  setinsCompany,
  setinsEnd,
  setfeatures,
  setotherNote,
  setdamages,
  setCarImages,
  setAllValues,
} = VehicleUpdateSlice.actions;

export default VehicleUpdateSlice.reducer;

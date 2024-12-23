import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: false,
  sidebarShowTemp: true,
  loginPage: true,
  check: "",
  vehicleDataReloader: 0,
  myProfileReloader: 0,
  currentCurrency: "",
  unit: "KM",
  theme: "",
  alert: "",
  severity: "success",
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setSidebarShowR: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setSidebarShowTempR: (state, action) => {
      state.sidebarShowTemp = action.payload;
    },
    setLoginPageR: (state, action) => {
      state.loginPage = action.payload;
    },
    setCheck: (state, action) => {
      state.check = action.payload;
    },
    setVehicleDataReloader: (state, action) => {
      state.vehicleDataReloader = action.payload;
    },
    setMyProfileReloader: (state, action) => {
      state.myProfileReloader = action.payload;
    },
    setcurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
    setunit: (state, action) => {
      state.unit = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
  },
});

export const {
  setSidebarShowR,
  setSidebarShowTempR,
  setLoginPageR,
  setCheck,
  setVehicleDataReloader,
  setMyProfileReloader,
  setcurrentCurrency,
  setunit,
  setTheme,
  setAlert,
  setSeverity,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;

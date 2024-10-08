import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vatPercentage: "",
  vatInclude: false,
  paymentInfo: "",
  additionalInfo: "",
  terms: "",
};

export const InvoicingSlice = createSlice({
  name: "Invoicing",
  initialState,
  reducers: {
    setvatPercentageR: (state, action) => {state.vatPercentage = action.payload},
    setvatIncludeR: (state, action) => {state.vatInclude = action.payload},
    setpaymentInfoR: (state, action) => {state.paymentInfo = action.payload},
    setadditionalInfoR: (state, action) => {state.additionalInfo = action.payload},
    settermsR: (state, action) => {state.terms = action.payload},
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setvatPercentageR,
  setvatIncludeR,
  setpaymentInfoR,
  setadditionalInfoR,
  settermsR,
  setAllValues,
} = InvoicingSlice.actions;

export default InvoicingSlice.reducer;

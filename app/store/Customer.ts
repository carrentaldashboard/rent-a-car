import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  customerType: "",
  name: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  color: "",
  emailAddress: "",
  phone: "",
  alternativePhone: "",
  passengers: "",
  streetAddress: "",
  country: "",
  city: "",
  postalCode: "",
  isVip: false,
  customerImage: [],
  state: "",
  ref1Name: "",
  ref1Phone: "",
  ref1Address: "",
  ref1Relation: "",
  ref2Name: "",
  ref2Phone: "",
  ref2Address: "",
  ref2Relation: "",
  passportNumber: "",
  passportValid: "",
  passportCountry: "",
  passportImages: [],
  licenseNumber: "",
  licenseValid: "",
  licenseCountry: "",
  licenseImages: [],
  idCard: false,
  other: false,
  otherNumber: "",
  otherValid: "",
  otherCountry: "",
  otherImages: [],
  emergency: [
    {
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
    },
  ],
  additional: "",
  reference: [
    {
      refName: "",
      refPhone: "",
      refAddress: "",
      refRelation: "",
      refImages: [],
    },
  ],
};

export const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    setcustomerTypeR: (state, action) => {
      state.customerType = action.payload;
    },
    setnameR: (state, action) => {
      state.name = action.payload;
    },
    setgenderR: (state, action) => {
      state.gender = action.payload;
    },
    setdateOfBirthR: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setnationalityR: (state, action) => {
      state.nationality = action.payload;
    },
    setcolorR: (state, action) => {
      state.color = action.payload;
    },
    setemailAddressR: (state, action) => {
      state.emailAddress = action.payload;
    },
    setphoneR: (state, action) => {
      state.phone = action.payload;
    },
    setalternativePhoneR: (state, action) => {
      state.alternativePhone = action.payload;
    },
    setpassengersR: (state, action) => {
      state.passengers = action.payload;
    },
    setstreetAddressR: (state, action) => {
      state.streetAddress = action.payload;
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
    setisVipR: (state, action) => {
      state.isVip = action.payload;
    },
    setcustomerImageR: (state, action) => {
      state.customerImage = action.payload;
    },
    setstateR: (state, action) => {
      state.state = action.payload;
    },
    setref1NameR: (state, action) => {
      state.ref1Name = action.payload;
    },
    setref1PhoneR: (state, action) => {
      state.ref1Phone = action.payload;
    },
    setref1AddressR: (state, action) => {
      state.ref1Address = action.payload;
    },
    setref1RelationR: (state, action) => {
      state.ref1Relation = action.payload;
    },
    setref2NameR: (state, action) => {
      state.ref2Name = action.payload;
    },
    setref2PhoneR: (state, action) => {
      state.ref2Phone = action.payload;
    },
    setref2AddressR: (state, action) => {
      state.ref2Address = action.payload;
    },
    setref2RelationR: (state, action) => {
      state.ref2Relation = action.payload;
    },
    setpassportNumberR: (state, action) => {
      state.passportNumber = action.payload;
    },
    setpassportValidR: (state, action) => {
      state.passportValid = action.payload;
    },
    setpassportCountryR: (state, action) => {
      state.passportCountry = action.payload;
    },
    setpassportImagesR: (state, action) => {
      state.passportImages = action.payload;
    },
    setlicenseNumberR: (state, action) => {
      state.licenseNumber = action.payload;
    },
    setlicenseValidR: (state, action) => {
      state.licenseValid = action.payload;
    },
    setlicenseCountryR: (state, action) => {
      state.licenseCountry = action.payload;
    },
    setlicenseImagesR: (state, action) => {
      state.licenseImages = action.payload;
    },
    setidCardR: (state, action) => {
      state.idCard = action.payload;
    },
    setotherNumberR: (state, action) => {
      state.otherNumber = action.payload;
    },
    setotherValidR: (state, action) => {
      state.otherValid = action.payload;
    },
    setotherCountryR: (state, action) => {
      state.otherCountry = action.payload;
    },
    setotherR: (state, action) => {
      state.other = action.payload;
    },
    setotherImagesR: (state, action) => {
      state.otherImages = action.payload;
    },
    addContact: (state) => {
      state.emergency.push({
        emergencyName: "",
        emergencyPhone: "",
        emergencyRelation: "",
      });
    },
    updateContact: (state, action) => {
      const { index, contact } = action.payload;
      state.emergency[index] = contact;
    },
    removeContact: (state, action) => {
      state.emergency.splice(action.payload, 1);
    },
    setadditionalR: (state, action) => {
      state.additional = action.payload;
    },
    addReference: (state) => {
      state.reference.push({
        refName: "",
        refPhone: "",
        refAddress: "",
        refRelation: "",
        refImages: [],
      });
    },
    updateReference: (state, action) => {
      const { index, reference } = action.payload;
      state.reference[index] = reference;
    },
    removeReference: (state, action) => {
      state.reference.splice(action.payload, 1);
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
    resetting: (state, action) => {
      const keysToReset = action.payload;
      keysToReset.forEach((key: any) => {
        if (key in state) {
          state[key] = initialState[key];
        }
      });
    },
  },
});

export const {
  setcustomerTypeR,
  setnameR,
  setgenderR,
  setdateOfBirthR,
  setnationalityR,
  setcolorR,
  setemailAddressR,
  setphoneR,
  setalternativePhoneR,
  setpassengersR,
  setstreetAddressR,
  setcountryR,
  setcityR,
  setpostalCodeR,
  setisVipR,
  setcustomerImageR,
  setAllValues,
  resetState,
  setstateR,
  setref1NameR,
  setref1PhoneR,
  setref1AddressR,
  setref1RelationR,
  setref2NameR,
  setref2PhoneR,
  setref2AddressR,
  setref2RelationR,
  setpassportNumberR,
  setpassportValidR,
  setpassportCountryR,
  setpassportImagesR,
  setlicenseNumberR,
  setlicenseValidR,
  setlicenseCountryR,
  setlicenseImagesR,
  setidCardR,
  setotherNumberR,
  setotherValidR,
  setotherCountryR,
  setotherImagesR,
  setotherR,
  addContact,
  removeContact,
  updateContact,
  setadditionalR,
  addReference,
  removeReference,
  updateReference,
  resetting,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;

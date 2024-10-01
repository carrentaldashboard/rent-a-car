import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  profilePic: { type: String, required: false, default: "" },
  username: {
    type: String,
    required: true,
    default: "",
    unique: true,
  },
  email: { type: String, required: true, default: "", unique: true },
  firstName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  name: { type: String, required: true, default: "" },
  phone: { type: String, required: true, default: "" },
  company: { type: String, required: true, default: "" },
  country: { type: String, required: false, default: "" },
  state: { type: String, required: false, default: "" },
  city: { type: String, required: false, default: "" },
  plan: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  admin: { type: Boolean, required: true, default: false },
  address: { type: String, required: false, default: "" },
  fptoken: { type: String },
});
const RegistrationModel =
  mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);

export default RegistrationModel;

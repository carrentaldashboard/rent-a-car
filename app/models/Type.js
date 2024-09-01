import mongoose from "mongoose";

const TypeSchema = mongoose.Schema({
  Type: { type: String, required: true },
});
const TypeModel =
  mongoose.models.Type || mongoose.model("Type", TypeSchema);

export default TypeModel;
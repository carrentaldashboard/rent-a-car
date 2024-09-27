import mongoose from "mongoose";

const FeatureSchema = mongoose.Schema(
  {
    Feature: { type: String, required: true },
  },
  {
    timestamps: true, // Enable timestamps
  }
);
const FeatureModel =
  mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);

export default FeatureModel;

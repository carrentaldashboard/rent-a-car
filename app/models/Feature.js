import mongoose from "mongoose";

const FeatureSchema = mongoose.Schema(
  {
    Feature: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const FeatureModel =
  mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);

export default FeatureModel;

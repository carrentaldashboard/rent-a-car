import mongoose from "mongoose";

const updateAgreementSchema = mongoose.Schema(
  {
    data: { type: Object },
    active: { type: Boolean, default: true },
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
const updateAgreementModel =
  mongoose.models.updateAgreement || mongoose.model("updateAgreement", updateAgreementSchema);

export default updateAgreementModel;

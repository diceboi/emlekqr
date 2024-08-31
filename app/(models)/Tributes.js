import mongoose from "mongoose";

const { Schema } = mongoose;

const tributeSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    fromprofileid: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    deleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tribute =
  mongoose.models.Tribute || mongoose.model("Tribute", tributeSchema);

export default Tribute;

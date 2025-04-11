import mongoose from "mongoose";

const { Schema } = mongoose;

const ittjartamSchema = new Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    adatlap: {
      type: String,
      required: true,
    },
    anonym: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ittjartam =
  mongoose.models.Ittjartam ||
  mongoose.model("Ittjartam", ittjartamSchema);

export default Ittjartam;

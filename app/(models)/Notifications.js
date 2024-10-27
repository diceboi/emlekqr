import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    personal: {
      type: Boolean,
      required: true,
    },
    viewed: {
      type: Boolean,
      required: true,
    },
    notificationtype: {
      type: String,
      required: true,
    },
    adatlap: {
      type: String,
      required: true,
    },
    from: {
        type: String,
        required: true,
    },
    images: [
        {
        type: String,
        },
    ],
    videos: [
        {
        type: String,
        },
    ],
    message: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;

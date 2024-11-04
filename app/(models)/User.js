import mongoose from "mongoose";
import { type } from "os";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vezeteknev: {
      type: String,
      required: true,
    },
    keresztnev: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    secret: {
      type: String,
      require: false
    },
    checkoutSession: {
      type: String,
      require: false
    },
    zip: {
      type: String,
      require: false
    },
    city: {
      type: String,
      require: false
    },
    address1: {
      type: String,
      require: false
    },
    address2: {
      type: String,
      require: false
    },
    phone: {
      type: String,
      require: false
    },
    stripeSubscription: {
      type: String,
      require: false
    },
    resetToken: {
      type: String,
      require: false,
    },
    resetTokenExpiry: {
      type: Date,
      require: false,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

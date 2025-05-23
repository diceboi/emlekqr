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
    },
    image: {
      type: String,
      require: false,
    },
    aszf: {
      type: Boolean,
      require: false,
    },
    marketing: {
      type: Boolean,
      require: false,
    },
    type: {
      type: String,
      require: false,
      default: 'user'
    },
    couponcode: {
      type: String,
      require: false,
    },
    uzletnev: {
      type: String,
      require: false,
    },
    bankszamlaszam: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

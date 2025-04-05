import mongoose from "mongoose";

const { Schema } = mongoose;

const emlekadatlapSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    graveyard: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    story: [
      {
        year: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: false,
        },
        data: {
          type: String,
          required: false,
        },
        images: [
          {
            type: String,
          },
        ],
      },
    ],
    media: {
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
    },
    tributes: {
      type: String,
      required: false,
    },
    profileimage: {
      type: String,
      required: false,
    },
    coverimage: {
      type: String,
      required: false,
    },
    owner: {
      type: String,
      required: true,
      unique: false,
    },
    coowner: {
      type: String,
      required: false,
    },
    born: {
      type: String,
      required: false,
    },
    died: {
      type: String,
      required: false,
    },
    quote: {
      type: String,
      required: false,
    },
    secret: {
      type: String,
      required: false,
    },
    subscription: {
      type: String,
      required: false,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Emlekadatlap =
  mongoose.models.Emlekadatlap ||
  mongoose.model("Emlekadatlap", emlekadatlapSchema);

export default Emlekadatlap;

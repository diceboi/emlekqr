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
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    graveyard: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    story: [
      {
        year: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        data: {
          type: String,
          required: true,
        },
        images: [{
          type: String,
        }],
      }
    ],
    media: {
      images: [{
          type: String,
        }],
      videos: [{
          type: String,
        }]
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
      required: false,
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
  },
  {
    timestamps: true,
  }
);

const Emlekadatlap = mongoose.models.Emlekadatlap || mongoose.model("Emlekadatlap", emlekadatlapSchema);

export default Emlekadatlap;

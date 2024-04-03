import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Sikeres MongoDB csatalakozás.");
  } catch (error) {
    throw new Error("Nem sikerült csatlakozni az adatbázishoz");
  }
};

export default connect;
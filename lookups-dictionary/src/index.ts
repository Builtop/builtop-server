import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error("invalid DB connection string");
    }

    await mongoose.connect(process.env.DB_URI);

    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Service (Lookups-dictionary) is running on port ${
          process.env.PORT || 4000
        }`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

start();

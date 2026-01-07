import mongoose from "mongoose";

export async function initDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("-> Database connection: SUCCESSFUL");
  } catch (error) {
    console.log("-> Database connection: FAILED", error);
    //process.exit(1);
  }
}

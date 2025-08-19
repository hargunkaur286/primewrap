import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  }
});

export const Subscribers = mongoose.model("Subscribers", subscribersSchema);

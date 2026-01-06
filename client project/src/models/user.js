import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  location: {
    type: {
      type: String, // "Point" ka matlab: ek exact location
      default: "Point", // enum: ["Point"] → sirf "Point" allow hoga
      required: true,
    },
    coordinates: {
      type: [Number], // // [lng, lat]
      required: true,
    },
  },

   socketId: {
    type: String,
    default: null,
  },
  // fcmToken: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ location: "2dsphere" });
export default mongoose.model("User", userSchema);

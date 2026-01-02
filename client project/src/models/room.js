import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: [Number],
  },
   
  createdBy: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  expiresAt: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default:Date.now
  },
});

roomSchema.index({expiresAt: 1}, {expireAfterSecond: 0});

export default mongoose.model("Room", roomSchema);

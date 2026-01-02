import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  encryptedText: String,
  imageUrl: String,                 

  expiresAt: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.index({ expiresAt: 1 }, { expireAfterSecond: 0 });

export default mongoose.model("Message", messageSchema);

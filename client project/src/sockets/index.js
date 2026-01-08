import { message } from "./chat.js";
import User from "../models/user.js";

export const sockethandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Register socketId for user
    socket.on("register-user", async ({ userId }) => {
      await User.findByIdAndUpdate(userId, {
        socketId: socket.id,
      });
    });

    message(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
    });
  });
};

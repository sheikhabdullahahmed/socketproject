import { message } from "./chat.js";
// import User from "../models/user.js";

export const sockethandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // socket.on("register-user", async ({ userId, lng, lat }) => {
    //   await User.findByIdAndUpdate(userId, {
    //     socketId: socket.id,
    //     location: {
    //       type: "Point",
    //       coordinates: [lng, lat],
    //     },
    //   });
    // });

    message(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
    });
  });
};

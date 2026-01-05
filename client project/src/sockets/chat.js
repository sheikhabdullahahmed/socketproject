import Message from "../models/message.js";
import User from "../models/user.js";

export const message = (io, socket) => {
  // Join message
  socket.on("join-room", async ({ roomId, userId }) => {
    socket.join(roomId);
    // console.log(`User ${socket.id} joined room ${roomId}`);

    const joinUser = await User.findById(userId);

    const nearbyUsers = await User.find({
      location: {
        $near: {
          $geometry: joinUser.location,
          $maxDistance: 5000, //  5 km = 5000 meters
        },
      },
      socketId: { $ne: null },
      _id: { $ne: userId },
    });

    nearbyUsers.forEach((user) => {
      io.to(user.socketId).emit("nearby-notification", {
        message: "kisi nay ape kay  qareeb room join kia ha",
        roomId,
      });
    });
  });

  // Send message
  socket.on("send-message", async (data) => {
    const { roomId, sender, encryptedText, imageUrl } = data;

    const messagess = await Message.create({
      roomId,
      sender,
      encryptedText,
      imageUrl,
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hour kay lia
    });
    io.to(roomId).emit("receive-message", messagess);
  });

  //   Leave room
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
  });
};

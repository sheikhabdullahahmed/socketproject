import Message from "../models/message.js";

export const message = (io, socket) => {
  // Join message
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
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

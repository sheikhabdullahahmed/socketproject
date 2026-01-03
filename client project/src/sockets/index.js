import { message } from "./chat.js";

export const sockethandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        message(io, socket);

        socket.on("disconnect", () => {
            console.log("Socket disconnected", socket.id);
        })
    })
}
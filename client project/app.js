dotenv.config();
import http from "http";
import cookieParser from "cookie-parser";
import e from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import  cors from 'cors'
import { connectDB } from "./src/config/db.js";
import { sockethandler } from "./src/sockets/index.js";
import authRoutes from "./src/controller/auth/routes.controller.js";
import roomroutes from "./src/controller/room/routes.controller.js";
import path from "path";

const app = e();

// important note;
// jab apnay socket use karna ha tu server.listen ho ga 

// HTTP server banana ZAROORI hai
const server = http.createServer(app);
const PORT = 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies
}));

sockethandler(io);

app.use(e.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomroutes);



// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// app.use(e.static(path.join(path.resolve("./public"))))
app.use(e.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(path.resolve("./public"), "index.html"));
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

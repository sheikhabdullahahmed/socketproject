dotenv.config(); 
import cookieParser from "cookie-parser";
import e from "express";
import dotenv from "dotenv";
import {connectDB} from './src/config/db.js'
import authRoutes from './src/controller/auth/routes.controller.js'
import roomroutes from './src/controller/room/routes.controller.js'


const app = e()
const PORT =5000;

app.use(e.json());
app.use(cookieParser())

connectDB()


app.use("/api/auth", authRoutes)
app.use("/api/room", roomroutes)


app.get("/", (req, res) => {
  res.send(" API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import {Register} from './pages/auth/Register'
import Login from './pages/auth/Login'
import  CreateRoom  from "./pages/room/CreateRoom";
import ChatBox from "./Components/chat/ChatBox";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/creatroom" element={<CreateRoom />} />
      <Route path="`/room/${data.room.roomId}`" element={<ChatBox />} />


    </Routes>
    </BrowserRouter>
  );
}

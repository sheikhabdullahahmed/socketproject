import room from "../../models/room.js";
import Room from "../../models/room.js";
// import User from "../../models/user.js";
import { v4 as uuidv4 } from "uuid";

// crate room

export const createroom = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location)
      return res.status(400).json({ message: "Location required" });

    const room = await Room.create({
      roomId: uuidv4(),
      location,
      createdBy: req.userId,
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hour kay lia
    });
     console.log(room),

    res.status(201).json({ room });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// routing ka thora issue ta may ya dey raha ha ta /room/room/:id 
// is tarha nhi ho taha ha ya ho ta ha room/:roomId

// join room
export const joinroom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.expiresAt < new Date())
      return res.status(410).json({ message: "Room expired" });

    res.json({ message: "Room joined", room });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



import Room from "../../models/room.js";
// import User from "../../models/user.js";
import { v4 as uuidv4 } from "uuid";

// crate room

export const createroom = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng)
      return res.status(400).json({ message: "Location required" });

    const room = await Room.create({
      roomId: uuidv4(),
      location: {
        type: "Point",
        coordinates: [lat, lng],
      },
      createdBy: req.userId,
    //   console.log("req.userId =", req.userId);
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hour kay lia
    });

    res.status(201).json({ room });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// join room
export const joinroom = async(req,res) => {
    try {
        const {roomId} = req.params;

        const room = await Room.findOne({roomId});

        if(!room) 
        return res.status(404).json({message: "Room not found"});
        
        if(room.expiresAt < new Date())
            return res.status(410).json({message: "Room expired"})

        res.josn({message: "Room joined", room})
    } catch (err ) {
        res.status(400).json({message: err.message});
    }
}




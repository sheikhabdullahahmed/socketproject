import React from "react";
import { useState } from "react";
import { Createroom } from "../../services/room.service";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const creatroom = async () => {
    if (!location) {
      console.error("Location is not ready yet");

      return; 
    }
    try {
      const { data } = await Createroom({
         location: {
        type: "Point",
        coordinates: [location.lng!, location.lat!], //  GeoJSON format
      },
      });
      console.log("Room created:", data);
    } catch (error) {
      setError((error as Error).message || "Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <form action="">
          <h2>Rooms</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={creatroom}>Create Room</button>
        </form>
        <input
          placeholder="Enter Room ID"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button>Join Room</button>
      </div>
    </div>
  );
}

export default CreateRoom;
